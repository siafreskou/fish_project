import React, { useState, useEffect, useRef } from "react";
import { useResponsive } from 'ahooks';
import { FaSearch,FaSlidersH } from "react-icons/fa";
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
  const { xs, sm, md, lg, xl } = responsiveInfo;
  const [isAdvancedOpen, setIsAdvancedOpen] = useState(false);

  console.log(xs, sm, md, lg, xl);

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
        const fishWithFishBaseId = fishData.find(fish => fish.fishbase_id);

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

    // Check if search is a single word without spaces
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
      // Do an exact match and call API if necessary
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

  return (
    <div className={`search-container ${xl ? "xl-screen" : ""}`} ref={searchBarRef}>
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
            <label>
              Age:
              <input type="text" placeholder="Enter age..." />
            </label>
            <label>
              Weight:
              <input type="text" placeholder="Enter weight..." />
            </label>
            <label>
              Length:
              <input type="text" placeholder="Enter length..." />
            </label>
            <label>
            IUCN Status:
              <select name="status" >
              <option value="harmless">harmless</option>
              <option value="not_evaluated">not evaluated</option>
              <option value="near_threatened">near threatened</option>
              </select>
            </label>
            <label>
            Fishing Gear:
            <select name="fishingGear">
              <option value="bottom_trawls">Bottom trawls (nei)</option>
              <option value="single_boat_bottom_otter_trawls">Single boat bottom otter trawls</option>
              <option value="gillnets_and_entangling_nets">Gillnets and entangling nets (nei)</option>
              <option value="twin_bottom_otter_trawls">Twin bottom otter trawls</option>
              <option value="longlines_nei">Longlines (nei)</option>
              <option value="danish_seines">Danish seines</option>
              <option value="midwater_trawls">Midwater trawls (nei)</option>
              <option value="scottish_seines">Scottish seines</option>
              <option value="set_gillnets_anchored">Set gillnets (anchored)</option>
              <option value="bottom_pair_trawls">Bottom pair trawls</option>
              <option value="trawls">Trawls</option>
              <option value="vertical_lines">Vertical Lines</option>
              <option value="handlines_hand_operated">Handlines hand operated</option>
              <option value="set_longlines">Set longlines</option>
              <option value="purse_seines">Purse seines</option>
              <option value="seine_nets">Seine nets (nei)</option>
              <option value="pots">Pots</option>
              <option value="mechanized_lines">Mechanized lines</option>
              <option value="hooks_and_lines">Hooks and lines (nei)</option>
              <option value="drifting_longlines">Drifting longlines</option>
              <option value="handlines_and_hand_operated_pole_and_lines">Handlines and hand-operated pole-and-lines</option>
              <option value="trolling_lines">Trolling lines</option>
              <option value="cast_nets">Cast nets</option>
              <option value="gear_nei">Gear (nei)</option>
              <option value="beach_seines">Beach seines</option>
              <option value="drift_gillnets">Drift gillnets</option>
              <option value="harpoons">Harpoons</option>
              <option value="traps_nei">Traps (nei)</option>
              <option value="buoy_gear">Buoy gear</option>
              <option value="pole_lines_hand_operated">Pole-lines hand operated</option>
              <option value="encircling_gillnets">Encircling gillnets</option>
            </select>
            </label>
          </div>
          <button onClick={executeSearch} className="apply-advanced-button">
            Apply Filters
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
}

export default Searchbar;


