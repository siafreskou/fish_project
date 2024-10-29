import React, { useState, useEffect, useRef } from "react";
import { useResponsive } from 'ahooks';
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
  const [noFishFound, setNoFishFound] = useState(false);
  const responsiveInfo = useResponsive();
 const {xs,sm,md,lg,xl} = responsiveInfo;
 console.log(xs,sm,md,lg,xl);


  // Fetch CSV data
  useEffect(() => {
    Papa.parse(CSV_FILE_PATH, {
      download: true,
      header: false,
      complete: (result) => {
        const fishNames = result.data.map((row) => row[0]);
        console.log("CSV Data:", fishNames);
        setFishList(fishNames);
      },
      error: (error) => {
        console.error("Error fetching or parsing CSV:", error);
      },
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

 
  const fetchFishData = (fish) => {
    setFilteredFishes([]);
    setLoading(true);
    setNoFishFound(false);
  
    axios
      .get(
        `https://isl.ics.forth.gr/grsf/grsf-api/resources/searchspeciesnames?common_name=${fish}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        const fishData = response.data.result;
  
        // Check if there's a fish with fishbase_id
        const fishWithFishBaseId = fishData.find(fish => fish.fishbase_id);
  
        if (fishWithFishBaseId) {
          const fishbaseId = fishWithFishBaseId.fishbase_id;
          const fish3aCODE = fishWithFishBaseId._3a_code;
          const fishgbif_id = fishWithFishBaseId.gbif_id;
  
          console.log(
            "API Response:",
            fishWithFishBaseId,
            "FishBase ID:",
            fishbaseId,
            "3aCODE:",
            fish3aCODE,
            "GBIF ID:",
            fishgbif_id
          );
  
          // Navigate to fish details page only if fishbase_id exists
          navigate(`/fish/${fish}`, {
            state: { fishbaseId, fish3aCODE, fishgbif_id },
          });
        } else {
          console.error("No fish found with a FishBase ID");
          setNoFishFound(true);
        }
      })
      .catch((error) => {
        console.error("Error fetching fish data:", error);
      })
      .finally(() => {
        setLoading(false); // Stop loader when the API call ends
      });
  };
  

  // Filter fish suggestions when typing
  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);

    // Only filter and show suggestions if input is at least 3 characters long
    if (value.length >= 3) {
      const filtered = fishList.filter(
        (fish) =>
          typeof fish === "string" &&
          fish.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredFishes(filtered);
    } else {
      setFilteredFishes([]); // Clear suggestions if less than 3 characters
    }
  };

  const handleFishClick = (fish) => {
    setSearchTerm(fish); // Set the search input to the clicked fish
    setFilteredFishes([]); // Close suggestions
    fetchFishData(fish); // Call the API
  };

  // Handle search when pressing Enter
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      executeSearch();
    }
  };

  // Handle search when clicking the Search button
  const handleSearchClick = () => {
    executeSearch();
  };

  // Function to execute search logic
  const executeSearch = () => {
    const searchValue = searchTerm ? searchTerm.trim() : "";

    const exactMatch = fishList.find(
      (fish) =>
        typeof fish === "string" &&
        fish.toLowerCase() === searchValue.toLowerCase()
    );

    if (exactMatch) {
      fetchFishData(exactMatch);
    }
  };

  return (
    <div className={`search-container ${xl?"xl-screen":""}`} ref={searchBarRef}>
      <div className="search_withButton">
        <div className="input-container">
          <FaSearch className="search-icon" />
          <input
            className={`input-field`}
            placeholder="Type to search..."
            value={searchTerm}
            onChange={handleSearchChange}
            onKeyDown={handleKeyDown}
          />
        </div>
        <div className="button_search">
          <button className="search-button" onClick={handleSearchClick} disabled={loading}>
            {loading ? <div className="loader"></div> : "Search"}
          </button>
        </div>
      </div>

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

      {noFishFound && (
        <div className="no-fish-message">
          No fish found with the name "{searchTerm}"
        </div>
      )}
    </div>
  );
};

export default Searchbar;


