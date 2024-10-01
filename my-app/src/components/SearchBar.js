import React, { useState, useEffect, useRef } from "react";
import { FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Papa from "papaparse";
import axios from "axios";
import "./SearchBar.css";
const CSV_FILE_PATH = "/GRSF_common_names.csv";

const Searchbar = () => {
  const [fishList, setFishList] = useState([]);
  const [filteredFishes, setFilteredFishes] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const searchBarRef = useRef();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

   // Fetch CSV data 
   useEffect(() => {
    Papa.parse(CSV_FILE_PATH, {
      download: true,
      header: false,
      complete: (result) => {
        const fishNames = result.data.map((row) => row[0]); 
        console.log('CSV Data:', fishNames);
        setFishList(fishNames);
      },
      error: (error) => {
        console.error('Error fetching or parsing CSV:', error);
      }
    });
  }, []);
  
  // Close suggestions when clicking outside the search bar
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        searchBarRef.current &&
        !searchBarRef.current.contains(event.target)
      ) {
        setFilteredFishes([]);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [searchBarRef]);

  // Function to call API for the selected fish
  const fetchFishData = (fish) => {
    setLoading(true);
    axios
      .get(` https://isl.ics.forth.gr/grsf/grsf-api/resources/searchspeciesnames?common_name=${fish}`, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        const fishData = response.data.result[0];
        const fishbaseId = fishData?.fishbase_id;
        const fish3aCODE = fishData?._3a_code;
        const fishgbif_id = fishData?.gbif_id;

        const hasFish = fishbaseId && fish3aCODE && fishgbif_id;

        console.log(
          "API Response:",
          response.data,
          "FishBase ID:",
          fishbaseId,
          "3aCODE:",
          fish3aCODE,
          "gbif_id",
          fishgbif_id
        );
        hasFish &&
          navigate(`/fish/${fish}`, {
            state: { fishbaseId, fish3aCODE, fishgbif_id },
          });
      })
      .catch((error) => {
        console.error("Error fetching fish data:", error);
      })
      .finally(() => {
        setLoading(false); // Stop loader when the API call ends
      });
  };

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);

    if (value.length > 0) {
      const filtered = fishList.filter(
        (fish) =>
          typeof fish === "string" &&
          fish.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredFishes(filtered);
    } else {
      setFilteredFishes([]);
    }
  };

  // Call API when a fish suggestion is clicked
  const handleFishClick = (fish) => {
    fetchFishData(fish); // Call the API
  };

  // Call API when pressing Enter
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      const searchValue = searchTerm ? searchTerm.trim() : "";

      const exactMatch = fishList.find(
        (fish) =>
          typeof fish === "string" &&
          fish.toLowerCase() === searchValue.toLowerCase()
      );

      if (exactMatch) {
        fetchFishData(exactMatch);
      } else if (filteredFishes.length > 0) {
      }
    }
  };

  return (
    <div className="search-container" ref={searchBarRef}>
      <div className="input-container">
        <FaSearch className="search-icon" />
        <input
          className="input-field"
          placeholder="Type to search..."
          value={searchTerm}
          onChange={handleSearchChange}
          onKeyDown={handleKeyDown}
        />
      </div>

      {loading && <div className="loader"></div>}
      {filteredFishes.length > 0 && (
        <div className="suggestions-list">
          {filteredFishes.map((fish, index) => (
            <li
              key={index}
              className="suggestion-item"
              onClick={() => handleFishClick(fish)}
            >
              {fish}
            </li>
          ))}
        </div>
      )}
    </div>
  );
};

export default Searchbar;



