// import React, { useEffect, useState } from 'react';
// import { useLocation, useParams } from 'react-router-dom';
// import './FishDetails.css';
// import axios from 'axios';

// const FishDetails = () => {
//     const { fishName } = useParams();
//     const location = useLocation();
//     const fishbaseId = location.state?.fishbaseId; 
//     const fish3aCODE = location.state?.fish3aCODE; 
//     const fishgbif_id = location.state?.fishgbif_id; 
//     const [fishData, setFishData] = useState(null); 
//     const [loading, setLoading] = useState(true); 
//     const [error, setError] = useState(null); 
  
// // Fetch fish data from 3aCODE API
// useEffect(() => {
//   const fetchFishDataFrom3aCODE = async () => {
//     if (!fish3aCODE) return;

//     try {
//       const response = await axios.get(
//         `https://isl.ics.forth.gr/grsf/grsf-api/resources/getfisheriesbasic?species_code=${fish3aCODE}&genus=${fishbaseId}`
//       );
//       console.log(response.data); 

//       if (response.data.result) {
//         setFishData(prevData => ({ ...prevData, ...response.data.result })); // Merge previous data
//       } else {
//         setError('No data found for this fish.');
//       }
//       setLoading(false);
//     } catch (error) {
//       console.error('Error fetching fish data:', error);
//       setError('Failed to fetch fish data');
//       setLoading(false);
//     }
//   };

//   fetchFishDataFrom3aCODE();
// }, [fish3aCODE]);
// };