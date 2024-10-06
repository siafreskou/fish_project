// // Fish3aDataFetcher.js
// import React, { useEffect, useState } from "react";
// import axios from "axios";

// const Fish3aDataFetcher = ({ fish3aCODE, onDataFetched }) => {
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     if (fish3aCODE) {
//       axios
//         .get(
//           `https://isl.ics.forth.gr/grsf/grsf-api/resources/getfisheriesbasic?species_code=HAD&area_code=99000042&gear_code=03.19&flag_code=IRL`
//         )
//         .then((response) => {
//           console.log("3aCODE API response:", response.data);
//           if (response.data.result) {
//             onDataFetched(response.data.result); // Passing the fetched data back to the parent
//           }
//         })
//         .catch((error) => {
//           console.error("Error fetching fish data from 3aCODE:", error);
//         })
//         .finally(() => {
//           setLoading(false);
//         });
//     }
//   }, [fish3aCODE, onDataFetched]);

//   if (loading) {
//     return <p>Loading 3aCODE data...</p>;
//   }

//   return null; // This component doesn't render anything itself
// };

// export default Fish3aDataFetcher;
