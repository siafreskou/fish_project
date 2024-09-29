import React, { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import './FishDetails.css';
import axios from 'axios';

const FishDetails = () => {
  const { fishName } = useParams();
  const location = useLocation();
  const fishbaseId = location.state?.fishbaseId; 
  const fish3aCODE = location.state?.fish3aCODE; 
  const fishgbif_id = location.state?.fishgbif_id; 
  const [fishData, setFishData] = useState({}); 
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null); 

  
  const [hasData, setHasData] = useState(false);

  useEffect(() => {
    const fetchFishDataFromFishBase = async () => {
      if (!fishbaseId) return;

      try {
        const response = await axios.get(
          `https://isl.ics.forth.gr/grsf/grsf-api/resources/fishbase_info?id=${fishbaseId}`
        );
        console.log('FishBase API response:', response.data);

        if (response.data.result) {
          setFishData(prevData => ({
            ...prevData,
            fishBaseData: response.data.result
          }));
          setHasData(true);  
        }
      } catch (error) {
        console.error('Error fetching fish data from FishBase:', error);
      } finally {
        setLoading(false);  
      }
    };

    fetchFishDataFromFishBase();
  }, [fishbaseId]);


  useEffect(() => {
    const fetchFishDataFrom3aCODE = async () => {
      if (!fish3aCODE) return;

      try {
        const response = await axios.get(
          `https://isl.ics.forth.gr/grsf/grsf-api/resources/getfisheriesbasic?species_code=${fish3aCODE}`
        );
        console.log('3aCODE API response:', response.data);

        if (response.data.result) {
          setFishData(prevData => ({
            ...prevData,
            fish3aData: response.data.result
          }));
          setHasData(true);  
        }
      } catch (error) {
        console.error('Error fetching fish data from 3aCODE:', error);
      } finally {
        setLoading(false);  
      }
    };

    fetchFishDataFrom3aCODE();
  }, [fish3aCODE]);

  if (loading) {
    return <div>Loading...</div>; 
  }

  if (!hasData) {
    return <div>No data found for this fish.</div>; 
  }

  return (
    <div>
      <h1 className="fish-name">{fishData.fishBaseData?.name || fishData.fish3aData?.name}</h1> 
      
      {fishData && (
        <div className="fish-info">
          {fishData.fishBaseData?.photos && fishData.fishBaseData.photos.length > 0 && (
            <div className="fish-photos">
              {fishData.fishBaseData.photos.map((photo, index) => (
                <img key={index} src={photo} alt={`Fish ${index}`} style={{ width: '200px', height: 'auto', margin: '10px' }} />
              ))}
            </div>
          )}

          {fishData.fishBaseData && (
            <div>
              <p><strong>Environment:</strong> {fishData.fishBaseData.environment ? fishData.fishBaseData.environment.join(', ') : 'N/A'}</p>
              <p><strong>Distribution:</strong> {fishData.fishBaseData.distribution}</p>
              <p><strong>Distribution Range:</strong> {fishData.fishBaseData.dimensions?.distribution_range}</p>
              <p><strong>Climate Zone:</strong> {fishData.fishBaseData.climate_zone}</p>
              <p><strong>Max Age:</strong> {fishData.fishBaseData.dimensions?.max_age} years</p>
              <p><strong>Max Depth:</strong> {fishData.fishBaseData.dimensions?.max_depth} m</p>
              <p><strong>Max Length:</strong> {fishData.fishBaseData.dimensions?.max_length} cm</p>
              <p><strong>Max Weight:</strong> {fishData.fishBaseData.dimensions?.max_weight} kg</p>
              <p><strong>Average Length:</strong> {fishData.fishBaseData.dimensions?.average_length} cm</p>
              <p><strong>IUCN Status:</strong> {fishData.fishBaseData.iucn_status }</p>
              <p><strong>Biology:</strong> {fishData.fishBaseData.biology}</p>
              <p><strong>Threat to Humans:</strong> {fishData.fishBaseData.threat_to_humans}</p>
            </div>
          )}

          <h2>3aCODE Information</h2>
          {fishData.fish3aData && (
            <div>
              <p><strong>Biology:</strong> {fishData.fish3aData.biology}</p>
              <p><strong>IUCN Status:</strong> {fishData.fish3aData.iucn_status}</p>
              <p><strong>Threat to Humans:</strong> {fishData.fish3aData.threat_to_humans}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default FishDetails;





