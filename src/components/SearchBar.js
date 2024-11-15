import React, { useState, useEffect, useRef } from "react";
import { useResponsive } from "ahooks";
import { FaSearch, FaSlidersH } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Papa from "papaparse";
import axios from "axios";
import "./SearchBar.css";
import InputField from "./AdvancedComponents/InputField";

const CSV_FILE_PATH = "/GRSF_common_names.csv";

const Searchbar = () => {
  const [fishList, setFishList] = useState([]);
  const [filteredFishes, setFilteredFishes] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const [noFishFound, setNoFishFound] = useState(false);
  const searchBarRef = useRef();
  const navigate = useNavigate();
  const responsiveInfo = useResponsive();
  const { xs, sm, md, lg, xl } = responsiveInfo;
  const [isAdvancedOpen, setIsAdvancedOpen] = useState(false);

  // State variables for the advanced search fields
  const [countryValue, setCountryValue] = useState("");
  const [ageValue, setAgeValue] = useState("");
  const [weightValue, setWeightValue] = useState("");
  const [lengthValue, setLengthValue] = useState("");
  const [statusValue, setStatusValue] = useState("");
  const [gearValue, setGearValue] = useState("");

  const toggleAdvancedSearch = () => {
    setIsAdvancedOpen(!isAdvancedOpen);
  };

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
      if (searchBarRef.current && !searchBarRef.current.contains(event.target)) {
        setFilteredFishes([]);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [searchBarRef]);

  // Fetch fish data from API
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
        const fishWithFishBaseId = fishData.find((fish) => fish.fishbase_id);

        if (fishWithFishBaseId) {
          const { fishbase_id: fishbaseId, _3a_code: fish3aCODE, gbif_id: fishgbif_id } = fishWithFishBaseId;

          console.log("API Response:", fishWithFishBaseId);

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
        setLoading(false);
      });
  };

  // Filter fish suggestions when typing
  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);

    if (value.length >= 3) {
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

  const handleFishClick = (fish) => {
    setSearchTerm(fish);
    setFilteredFishes([]);
    fetchFishData(fish);
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

    if (searchValue && !/\s/.test(searchValue)) {
      const broadMatches = fishList.filter((fish) =>
        fish.toLowerCase().includes(searchValue.toLowerCase())
      );

      if (broadMatches.length > 0) {
        navigate("/results", {
          state: { matchingFishes: broadMatches, searchTerm: searchValue },
        });
      } else {
        fetchFishData(searchValue);
      }
    } else {
      const exactMatch = fishList.find(
        (fish) =>
          typeof fish === "string" &&
          fish.toLowerCase() === searchValue.toLowerCase()
      );

      if (exactMatch) {
        fetchFishData(exactMatch);
      }
    }
  };

  // Handle changes for advanced search fields
  const handleInputChange = (value, type) => {
    console.log(`${type} Value changed to:`, value);  // Console log to verify input value

    if (type === "country") {
      setCountryValue(value);
    } else if (type === "age") {
      setAgeValue(value);
    } else if (type === "weight") {
      setWeightValue(value);
    } else if (type === "length") {
      setLengthValue(value);
    } else if (type === "status") {
      setStatusValue(value);
    } else if (type === "gear") {
      setGearValue(value);
    }

    console.log({
      countryValue,
      ageValue,
      weightValue,
      lengthValue,
      statusValue,
      gearValue
    });
  };

  return (
    <div className={`search-container ${xl ? "xl-screen" : ""}`} ref={searchBarRef}>
      <div className="search_withButton">
        <div className="input-container">
          <FaSearch className="search-icon" />
          <input
            className="input-field"
            placeholder="Type to search..."
            value={searchTerm}
            onChange={handleSearchChange}
            onKeyDown={handleKeyDown}
          />
          <FaSlidersH
            className="advanced-search-icon"
            onClick={toggleAdvancedSearch}
            title="Advanced Search"
          />
        </div>
        <div className="button_search">
          <button className="search-button" onClick={handleSearchClick} disabled={loading}>
            {loading ? <div className="loader"></div> : "Search"}
          </button>
        </div>
      </div>

      {isAdvancedOpen && (
        <div className="advanced-search-container">
          <h3>Advanced Search</h3>
          <div className="advanced-search-fields">
            <InputField type="country" value={countryValue} onChange={(e) => handleInputChange(e.target.value, "country")} />
            <InputField type="age" value={ageValue} onChange={(e) => handleInputChange(e.target.value, "age")} />
            <InputField type="weight" value={weightValue} onChange={(e) => handleInputChange(e.target.value, "weight")} />
            <InputField type="length" value={lengthValue} onChange={(e) => handleInputChange(e.target.value, "length")} />
            <InputField type="status" value={statusValue} onChange={(e) => handleInputChange(e.target.value, "status")} />
            <InputField type="gear" value={gearValue} onChange={(e) => handleInputChange(e.target.value, "gear")} />
          </div>
          <button onClick={executeSearch} className="apply-advanced-button">
            Search
          </button>
        </div>
      )}

      {filteredFishes.length > 0 && (
        <div className="suggestions-list">
          {filteredFishes.map((fish, index) => (
            <li key={index} className="suggestion-item" onClick={() => handleFishClick(fish)}>
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





