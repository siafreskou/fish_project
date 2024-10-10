import "../App.css";
import Map from "./Maps";
import Searchbar from "./SearchBar";
import "./MainPage.css";

const MainPage = () => {
  return (
    <div>
      <div className="fix_main"
        
      >
        <div className="search">
          <Searchbar />
        </div>
        <div>
          <div className="findfisher">
            <h1>Let's Discover</h1>
          </div>
          <div className="findfisher2">
            <h1>fish world</h1>
          </div>
        </div>
      </div>
      <div className="location">
        <Map />
      </div>
    </div>
  );
};

export default MainPage;