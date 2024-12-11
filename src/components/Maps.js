// import React, { useState, useEffect } from 'react';
// import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
// import 'leaflet/dist/leaflet.css';

// // Function to display the user's current location on a map
// function Map() {
//   const [position, setPosition] = useState(null);  // State to store user's position
//   const [error, setError] = useState(null);  // State to handle errors

//   // Get user's current location using Geolocation API
//   useEffect(() => {
//     if ('geolocation' in navigator) {
//       navigator.geolocation.getCurrentPosition(
//         (pos) => {
//           const { latitude, longitude } = pos.coords;
//           setPosition([latitude, longitude]);  // Set latitude and longitude in state
//         },
//         (err) => {
//           setError(err.message);  
//         }
//       );
//     } else {
//       setError('Geolocation is not supported by your browser.');
//     }
//   }, []);

//   return (
//     <div>
//       {error && <p>Error: {error}</p>}
      
//       {position ? (
//         <div  style={{ marginTop: '100px' }}> 
//           <p>Your Latitude: {position[0]}</p>
//           <p>Your Longitude: {position[1]}</p>

//           <MapContainer
//             center={position}
//             zoom={13}
//             scrollWheelZoom={true}
//             style={{ height: '200px', width: '40%' }}  
//           >
            
//             <TileLayer
//               attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//               url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//             />
            
            
//             <Marker position={position}>
//               <Popup>
//                 You are here: {position[0]}, {position[1]}
//               </Popup>
//             </Marker>
//           </MapContainer>
//         </div>
//       ) : (
//         <p>Locating you...</p>
//       )}
//     </div>
//   );
// }

// export default Map;

