// import React, { useEffect } from 'react';
// import axios from 'axios';

// const FishAPI = ({ searchTerm }) => {
//   const fetchData = async () => {
//     if (!searchTerm) return; 
//     try {
//       const response = await axios.get(`https://isl.ics.forth.gr/grsf/grsf-api/resources/searchspeciesnames?common_name=${searchTerm}`);
//       console.log(response.data); 
//     } catch (error) {
//       console.error('Error fetching data:', error);
//     }
//   };

//   useEffect(() => {
//     fetchData();
//   }, [searchTerm]); 

//   return null; 
// };

// export default FishAPI;

