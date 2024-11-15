import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import "./ListFishes.css"; // Optional: You can create a custom CSS file

const ListFishes = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  // Extract fish names passed via the state
  const { fishNames } = location.state || {}; 
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Handle click on fish name to fetch its details
  const handleFishClick = (fishName) => {
    setLoading(true);
    setError(null);
    
    // Fetch detailed data based on the fish name
    axios
      .get(`https://isl.ics.forth.gr/grsf/grsf-api/resources/searchspeciesnames?common_name=${fishName}`, {
        headers: { "Content-Type": "application/json" },
      })
      .then((response) => {
        const fishData = response.data.result.find(fish => fish.fishbase_id);

        if (fishData) {
          const { fishbase_id: fishbaseId, _3a_code: fish3aCODE, gbif_id: fishgbif_id } = fishData;
          navigate(`/fish/${fishName}`, {
            state: { fishbaseId, fish3aCODE, fishgbif_id },
          });
        } else {
          setError(`No detailed data found for "${fishName}"`);
        }
      })
      .catch((err) => {
        console.error("Error fetching fish data:", err);
        setError("Failed to load fish details. Please try again.");
      })
      .finally(() => setLoading(false));
  };

  return (
    <div className="fish-results-container">
      <h2>Fish Results</h2>
      {error && <p className="error-message">{error}</p>} {/* Show error message */}
      
      {fishNames && fishNames.length > 0 ? (
        <ul>
          {fishNames.map((fish, index) => (
            <li key={index} onClick={() => handleFishClick(fish)} className="clickable-fish-name">
              {fish} {/* Display fish names as a list */}
            </li>
          ))}
        </ul>
      ) : (
        <p>No fish found.</p> // If no fish names are found
      )}

      {/* Button to navigate back to previous page */}
      <button className="back-button" onClick={() => navigate(-1)}>
        Back to Search
      </button>

      {loading && <p>Loading fish details...</p>} {/* Show loading text */}
    </div>
  );
};

export default ListFishes;

