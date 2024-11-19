// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// const API_endpoint = 'https://api.openweathermap.org/data/3.0/onecall';
// const API_key = 'fb7b92122bb5dcce8d718da5d40de1df';

// function Loc() {
//   const [latitude, setLatitude] = useState(null);
//   const [longitude, setLongitude] = useState(null);
//   const [weatherData, setWeatherData] = useState(null);

//   useEffect(() => {
//     // Get the user's current location
//     navigator.geolocation.getCurrentPosition((position) => {
//       setLatitude(position.coords.latitude);
//       setLongitude(position.coords.longitude);
//     }, (error) => {
//       console.error("Error fetching location", error);
//     });
//   }, []);

//   useEffect(() => {
//     // Make the API call once latitude and longitude are available
//     if (latitude && longitude) {
//       axios.get(`${API_endpoint}?lat=${latitude}&lon=${longitude}&exclude=hourly,daily&appid=${API_key}`)
//         .then((response) => {
//           setWeatherData(response.data); // Store weather data in state
//           console.log(response.data);
//         })
//         .catch((error) => {
//           console.error("Error fetching weather data", error);
//         });
//     }
//   }, [latitude, longitude]); // Trigger when lat/lon change

//   return (
//     <div className='location'>
//       {weatherData ? (
//         <div>
//           <h3>Weather Data:</h3>
//           <pre>{JSON.stringify(weatherData, null, 2)}</pre>
//         </div>
//       ) : (
//         <p></p>
//       )}
//     </div>
//   );
// }

// export default Loc;
