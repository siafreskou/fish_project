import React, { useState, useEffect, useRef } from 'react';
import { FaSearch } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import Papa from 'papaparse'; 
import './SearchBar.css';

const CSV_FILE_PATH = '/GRSF_common_names.csv';

const Searchbar = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [fishList, setFishList] = useState([]); 
  const [filteredFishes, setFilteredFishes] = useState([]);
  const searchBarRef = useRef(null);
  const navigate = useNavigate();

  
  useEffect(() => {
    Papa.parse(CSV_FILE_PATH, {
      download: true,
      header: false, // No headers 
      complete: (result) => {
        const fishNames = result.data.map((row) => row[0]); 
        console.log('CSV Data:', fishNames);
        setFishList(fishNames);
      },
      error: (error) => {
        console.error('Error fetching or parsing CSV:', error);
      }
    });
  }, []);

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
      const filtered = fishList.filter(
        (fish) => typeof fish === 'string' && fish.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredFishes(filtered);
    } else {
      setFilteredFishes([]);
    }
  };

  const handleFishClick = (fish) => {
    navigate(`/fish/${fish}`);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      const exactMatch = fishList.find(
        (fish) => typeof fish === 'string' && fish.toLowerCase() === searchTerm.toLowerCase()
      );

      if (exactMatch) {
        navigate(`/fish/${exactMatch}`);
      } else if (filteredFishes.length > 0) {
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
          onKeyDown={handleKeyDown}
        />
      </div>

      {filteredFishes.length > 0 && (
        <div className="suggestions-list">
          {filteredFishes.map((fish, index) => (
            <li key={index} className="suggestion-item" onClick={() => handleFishClick(fish)}>
              {fish}
            </li>
          ))}
        </div>
      )}
    </div>
  );
};

export default Searchbar;


