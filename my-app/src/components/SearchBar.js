import React, { useState, useEffect, useRef } from 'react';
import { FaSearch } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import "./SearchBar.css";

const fishList = [
  "smelt",
  "trout",
  "sardine",
  "swordfish",
  "seabass",
  "redfish",
  "sole"
];

const Searchbar = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredFishes, setFilteredFishes] = useState([]);
  const searchBarRef = useRef(null);
  const navigate = useNavigate(); // Hook for navigation

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchBarRef.current && !searchBarRef.current.contains(event.target)) {
        setFilteredFishes([]);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);

    if (value.length > 0) {
      const filtered = fishList.filter((fish) =>
        fish.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredFishes(filtered);
    } else {
      setFilteredFishes([]);
    }
  };

  const handleFishClick = (fish) => {
    navigate(`/fish/${fish}`); // Navigate to the fish details page
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      const exactMatch = fishList.find((fish) =>
        fish.toLowerCase() === searchTerm.toLowerCase()
      );
      
      if (exactMatch) {
        // Navigate to the exact match
        navigate(`/fish/${exactMatch}`);
      } else if (filteredFishes.length > 0) {
        // Navigate to the first suggestion if no exact match
        navigate(`/fish/${filteredFishes[0]}`);
      }
    }
  };

  return (
    <div className="search-container" ref={searchBarRef}>
      <div className="input-container">
        <FaSearch className="search-icon" />
        <input
          className="input-field"
          placeholder="Type to search..."
          value={searchTerm}
          onChange={handleSearchChange}
          onKeyDown={handleKeyDown} // Add Enter key event listener
        />
      </div>

      {filteredFishes.length > 0 && (
        <div className="suggestions-list">
          {filteredFishes.map((fish, index) => (
            <li
              key={index}
              className="suggestion-item"
              onClick={() => handleFishClick(fish)} // Handle click event
            >
              {fish}
            </li>
          ))}
        </div>
      )}
    </div>
  );
};

export default Searchbar;


