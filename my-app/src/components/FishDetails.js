import React, { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import './FishDetails.css';
import axios from 'axios';

const FishDetails = () => {
  const { fishName } = useParams();
  const location = useLocation();
  const fishbaseId = location.state?.fishbaseId; 

  const [fishData, setFishData] = useState(null); 
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null); 


  useEffect(() => {
    const fetchFishData = async () => {
      try {
        const response = await axios.get(
          `https://isl.ics.forth.gr/grsf/grsf-api/resources/fishbase_info?id=${fishbaseId}`
        );
        console.log(response.data); 
        
        if (response.data.result) {
          setFishData(response.data.result); 
        } else {
          setError('No data found for this fish.');
        }
        setLoading(false);
      } catch (error) {
        console.error('Error fetching fish data:', error);
        setError('Failed to fetch fish data'); 
        setLoading(false); 
      }
    };

    if (fishbaseId) {
      fetchFishData();
    }
  }, [fishbaseId]); 

  if (loading) {
    return <p>Loading...</p>; 
  }

  if (error) {
    return <p>{error}</p>; 
  }

  return (
    <div>
      <h1 className="fish-name">{fishData.name}</h1> 
      

      {/* Display the fish data if available */}
      {fishData && (
        <div className="fish-info">
          {/* Display images if available */}
          {fishData.photos && fishData.photos.length > 0 && (
            <div className="fish-photos">
              {fishData.photos.map((photo, index) => (
                <img key={index} src={photo} alt={`Fish ${index}`} style={{ width: '200px', height: 'auto', margin: '10px' }} />
              ))}
            </div>
          )}
          <h2>Fish Information</h2>
          <p><strong>Environment:</strong> {fishData.environment ? fishData.environment.join(', ') : 'N/A'}</p>
          <p><strong>Distribution:</strong> {fishData.distribution}</p>
          <p><strong>Distribution Range:</strong> {fishData.distribution_range}</p>
          <p><strong>Climate Zone:</strong> {fishData.climate_zone }</p>
          <p><strong>Max Age:</strong> {fishData.dimensions?.max_age} years</p>
          <p><strong>Max Depth:</strong> {fishData.dimensions?.max_depth} m</p>
          <p><strong>Min Depth:</strong> {fishData.dimensions?.min_depth} m</p>
          <p><strong>Max Length:</strong> {fishData.dimensions?.max_length} cm</p>
          <p><strong>Max Weight:</strong> {fishData.dimensions?.max_weight} kg</p>
          <p><strong>Average Length:</strong> {fishData.dimensions?.average_length} cm</p>
          <p><strong>IUCN Status:</strong> {fishData.iucn_status }</p>
          <p><strong>Biology:</strong> {fishData.biology}</p>
          <p><strong>Threat to Humans:</strong> {fishData.threat_to_humans}</p>
          
        </div>
      )}
    </div>
  );
};

export default FishDetails;




