import Navbar from "./components/NavBar";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import FishDetails from "./components/FishDetails";
import MainPage from "./components/MainPage";
import { configResponsive } from 'ahooks';
import ListPage from "./components/ListPage/ListPage"
import ListFishes from "./components/ListFishes/ListFishes";
function App() {
  return (
    <div className="App">
      <div className="navbar-container">
        
        <Navbar />
      </div>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/results" element={<ListPage />} />
        <Route path="/ListFishes"element={<ListFishes />} />
        <Route path="/fish/:fishName" element={<FishDetails />} />
      </Routes>
    </div>
  );
}

export default App;


