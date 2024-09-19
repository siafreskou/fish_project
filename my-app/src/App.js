
import './App.css';
import { Findfisher, Findfisher2 } from './components/test';
import Searchbar from './components/SearchBar';
import Navbar from './components/NavBar';
import Loc from './components/location';
import Map from './components/Maps';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import FishDetails from './components/FishDetails'; 

function App() {
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
              <div className='location'><Loc /></div>
              <div className='search'><Searchbar /></div>
              <div className='location'><Map /></div>
            </>
          } />
          <Route path="/fish/:fishName" element={<FishDetails />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

