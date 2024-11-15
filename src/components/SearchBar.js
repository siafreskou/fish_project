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
  const [depthValue, setDepthValue] = useState("");
  const [depth2Value, setDepth2Value] = useState("");
  const [threat_to_humansValue, setthreat_to_humansValue] = useState("");

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
  const fetchFishData = (fish, advancedParams) => {
  setFilteredFishes([]);
  setLoading(true);
  setNoFishFound(false);

  // Construct the query params based on the advanced search
  const params = new URLSearchParams();

  if (fish && fish.trim()) {
    params.append("common_name", fish);
  }

  if (advancedParams) {
    if (advancedParams.country) params.append("country", advancedParams.country);
    if (advancedParams.age) params.append("max_age", advancedParams.age);

    if (advancedParams.weight) {
      params.append("max_weight", advancedParams.weight);
    }

    if (advancedParams.length) params.append("max_length", advancedParams.length);
    if (advancedParams.status) params.append("iucn_status", advancedParams.status);
    if (advancedParams.depth) params.append("min_depth", advancedParams.depth);
    if (advancedParams.depth2) params.append("max_depth", advancedParams.depth2);
    if (advancedParams.threat_to_humans) params.append("threat_to_humans", advancedParams.threat_to_humans);
  }

  // Perform the API request
  axios
  .get(`https://isl.ics.forth.gr/grsf/grsf-api/resources/fishbase_search?${params.toString()}`, {
    headers: {
      "Content-Type": "application/json",
    },
  })
  .then((response) => {
    // Ensure that response.data.result is not undefined or null and is an array
    const fishData = Array.isArray(response.data.result) ? response.data.result : [];
    
    // Extract fish names safely
    const fishNames = fishData.map((fish) => fish.name); 

    if (fishNames.length > 0) {
      // Navigate to results page with fish names
      navigate("/ListFishes", {
        state: { fishNames },
      });
    } else {
      console.error("No fish found.");
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
  
  
  const executeSearch = () => {
    const searchValue = searchTerm ? searchTerm.trim() : "";
    
    // Construct the advanced search parameters
    const advancedParams = {
      country: countryValue,
      age: ageValue,
      weight: weightValue,
      length: lengthValue,
      status: statusValue,
      depth: depthValue,
      depth2: depth2Value,
      threat_to_humans: threat_to_humansValue,
    };
  
    // Check if we have either a search term or advanced parameters set
    if (searchValue && !/\s/.test(searchValue)) {
      const broadMatches = fishList.filter((fish) =>
        fish.toLowerCase().includes(searchValue.toLowerCase())
      );
  
      if (broadMatches.length > 0) {
        navigate("/results", {
          state: { matchingFishes: broadMatches, searchTerm: searchValue },
        });
      } else {
        // Use the advanced search parameters when calling the API
        fetchFishData(searchValue, advancedParams);
      }
    } else if (Object.values(advancedParams).some(value => value)) {
      // If no search term but there are advanced parameters, trigger the API call
      fetchFishData(searchTerm, advancedParams);
    } else {
      // If there's no search term and no advanced parameters, do nothing or handle appropriately
      console.log("No search term or advanced parameters provided.");
    }
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
    } else if (type === "depth") {
      setDepthValue(value);
    }
    else if (type === "depth2") {
      setDepth2Value(value);
    }
    else if (type === "threat_to_humans") {
      setthreat_to_humansValue(value);
    }

    console.log({
      countryValue,
      ageValue,
      weightValue,
      lengthValue,
      statusValue,
      depthValue,
      depth2Value,
      threat_to_humansValue
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
            <InputField type="depth" value={depthValue} onChange={(e) => handleInputChange(e.target.value, "depth")} />
            <InputField type="depth2" value={depth2Value} onChange={(e) => handleInputChange(e.target.value, "depth2")} />
            <InputField type="threat_to_humans" value={threat_to_humansValue} onChange={(e) => handleInputChange(e.target.value, "threat_to_humans")} />
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





