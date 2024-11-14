import React, { useState, useEffect, useRef } from "react";
import { useResponsive } from 'ahooks';
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
  const searchBarRef = useRef();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [noFishFound, setNoFishFound] = useState(false);
  const responsiveInfo = useResponsive();
  const { xs, sm, md, lg, xl } = responsiveInfo;
  const [isAdvancedOpen, setIsAdvancedOpen] = useState(false);

  // Advanced search fields
  const [country, setCountry] = useState("");
  const [age, setAge] = useState("");
  const [weight, setWeight] = useState("");
  const [length, setLength] = useState("");
  const [status, setStatus] = useState("");
  const [gear, setGear] = useState("");

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

  // Fetch fish data from API with additional parameters for advanced search
  const fetchFishData = (fish, advancedParams = {}) => {
    setFilteredFishes([]);
    setLoading(true);
    setNoFishFound(false);

    // Base URL of the API
    const baseURL = "https://isl.ics.forth.gr/grsf/grsf-api/resources/fishbase_search";
    const params = {
      iucn_status: status || "vulnerable",  // Defaulting to "vulnerable" if no status is provided
      common_name: fish,
      country,
      age,
      weight,
      length,
      gear,
      ...advancedParams,
    };

    // Remove empty parameters
    const queryParams = Object.fromEntries(Object.entries(params).filter(([_, v]) => v));

    axios
      .get(baseURL, {
        headers: { "Content-Type": "application/json" },
        params: queryParams,
      })
      .then((response) => {
        const fishData = response.data.result;
        if (fishData.length > 0) {
          navigate("/results", {
            state: { fishData, searchTerm: fish },
          });
        } else {
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
        (fish) => typeof fish === "string" && fish.toLowerCase().includes(value.toLowerCase())
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

  // Function to execute search logic
  const executeSearch = () => {
    const searchValue = searchTerm ? searchTerm.trim() : "";

    const advancedParams = isAdvancedOpen
      ? { country, age, weight, length, status, gear }
      : {};  // Add advanced parameters only if advanced search is open

    if (searchValue && !/\s/.test(searchValue)) {
      const broadMatches = fishList.filter((fish) =>
        fish.toLowerCase().includes(searchValue.toLowerCase())
      );

      if (broadMatches.length > 0) {
        navigate("/results", {
          state: { matchingFishes: broadMatches, searchTerm: searchValue },
        });
      } else {
        fetchFishData(searchValue, advancedParams);
      }
    } else {
      const exactMatch = fishList.find(
        (fish) => typeof fish === "string" && fish.toLowerCase() === searchValue.toLowerCase()
      );

      if (exactMatch) {
        fetchFishData(exactMatch, advancedParams);
      }
    }
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
          <button className="search-button" onClick={executeSearch} disabled={loading}>
            {loading ? <div className="loader"></div> : "Search"}
          </button>
        </div>
      </div>

      {isAdvancedOpen && (
        <div className="advanced-search-container">
          <h3>Advanced Search</h3>
          <div className="advanced-search-fields">
            <InputField type="country" value={country} onChange={(e) => setCountry(e.target.value)} />
            <InputField type="age" value={age} onChange={(e) => setAge(e.target.value)} />
            <InputField type="weight" value={weight} onChange={(e) => setWeight(e.target.value)} />
            <InputField type="length" value={length} onChange={(e) => setLength(e.target.value)} />
            <InputField type="status" value={status} onChange={(e) => setStatus(e.target.value)} />
            <InputField type="gear" value={gear} onChange={(e) => setGear(e.target.value)} />
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


