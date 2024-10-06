import Navbar from "./components/NavBar";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import FishDetails from "./components/FishDetails";
import MainPage from "./components/MainPage";
function App() {
  return (
    <div className="App">
      <div className="navbar">
        
        <Navbar />
      </div>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/fish/:fishName" element={<FishDetails />} />
      </Routes>
    </div>
  );
}

export default App;


