import React from 'react';
import { useParams } from 'react-router-dom';
import './FishDetails.css';

const FishDetails = () => {
  const { fishName } = useParams(); // Get the fish name from the URL

  const fishImages = {
    smelt: 'https://upload.wikimedia.org/wikipedia/commons/2/2b/Pond_smelt_illustration.jpg',
    trout: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTYo4NHuSXvpvIwTjG3TUVmF_oSG5CPwUFjsA&s',
    sardine: 'https://www.msc.org/images/default-source/msc-english/content-banner/fish-to-eat/sardine.jpg?sfvrsn=8f6e89ac_7',
    swordfish: 'https://www.fisheries.noaa.gov/s3//styles/original/s3/2022-09/640x427-Swordfish-NOAAFisheries.png?itok=D35ccWSJ',
    seabass: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRyVJ5IzvvvpHne6YR0j0fJcX7hev6coaPseA&s',
    redfish: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRZjuF_F27nMncvavwqeMcEjR1HQjVORhZB1g&s',
    sole: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS1q6YcJ-NOf-ik_e2JyC30h6QoRETURvAAEw&s'
  };

  const fishImage = fishImages[fishName] || 'https://example.com/default-fish.jpg'; 

  return (
    <div>
      <img
        className="fish-image"
        src={fishImage}
        alt={fishName}
        style={{ width: '500px', height: 'auto' }}
      />
      <h1 className="fish-name">{fishName}</h1>
      <p className='location'>Location</p>
      
    </div>
  );
};

export default FishDetails;

