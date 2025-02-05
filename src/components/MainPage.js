import "../App.css";
import { useResponsive } from 'ahooks';
import Searchbar from "./SearchBar";
import "./MainPage.css";


const MainPage = () => {
  const responsiveInfo = useResponsive();
  const {xl} = responsiveInfo;

  return (
    <div className={`container `}>
      <div className={`fix_main ${xl ? "xl-screen-gap" : ""}`}>
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
      {/* <div className="location">
        <Map />
      </div> */}
    </div>
  );
};

export default MainPage;

