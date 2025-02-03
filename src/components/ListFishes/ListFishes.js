import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import "./ListFishes.css";

const ListFishes = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { fishNames } = location.state || {};
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleFishClick = (fishName) => {
    setLoading(true);
    setError(null);

    axios
      .get(
        `https://demos.isl.ics.forth.gr/verifish/verifish-api/resources/searchspeciesnames?common_name=${fishName}`,
        {
          headers: { "Content-Type": "application/json" },
        }
      )
      .then((response) => {
        const fishData = response.data.result.find((fish) => fish.fishbase_id);

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
      {error && <p className="error-message">{error}</p>}

      {fishNames && fishNames.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>Fish Name</th>
            </tr>
          </thead>
          <tbody>
            {fishNames.map((fish, index) => (
              <tr key={index} onClick={() => handleFishClick(fish)}>
                <td>{fish}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No fish found.</p>
      )}

      <button className="back-button" onClick={() => navigate(-1)}>
        Back to Search
      </button>

      {loading && <p>Loading fish details...</p>}
    </div>
  );
};

export default ListFishes;


