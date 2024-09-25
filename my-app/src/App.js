import './App.css';
import { useState } from 'react';
import { Findfisher, Findfisher2 } from './components/test';
import Searchbar from './components/SearchBar';
import Navbar from './components/NavBar';
import Map from './components/Maps';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import FishDetails from './components/FishDetails'; 


function App() {
  const [searchTerm, setSearchTerm] = useState(''); // State for search term

  return (
    <Router>
      <div className="App">
        <div className='navbar'>
          <Navbar />
        </div>

        <Routes>
          <Route path="/" element={
            <>
              <div className="findfisher"><Findfisher /></div>
              <div className="findfisher2"><Findfisher2 /></div>
              <div className='search'>
                <Searchbar setSearchTerm={setSearchTerm} /> {/* Pass setSearchTerm to Searchbar */}
              </div>
              {/* <div className='location'><Map /></div> */}
              <div className="location"><Map /></div>
            </>
          } />
          <Route path="/fish/:fishName" element={<FishDetails />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;


