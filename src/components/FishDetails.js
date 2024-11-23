import React, { useEffect, useState } from "react";
import { useResponsive } from 'ahooks';
import { useLocation } from "react-router-dom";
import "./FishDetails.css"; 
import axios from "axios";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Tag from "./Tags/Tag";
import Text from "./Text/Text";

const FishDetails = () => {
  const location = useLocation();
  const fishbaseId = location.state?.fishbaseId;
  const fish3aCODE = location.state?.fish3aCODE;
  const [fishData, setFishData] = useState({});
  const [loading, setLoading] = useState(true);
  const [loadingFish3aData, setLoadingFish3aData] = useState(true);
  const [hasData, setHasData] = useState(false);
  const [showMore, setShowMore] = useState(false);
  const responsiveInfo = useResponsive();
  const {xs} = responsiveInfo;
  const [showRecipes, setShowRecipes] = useState(false);
  const [recipes, setRecipes] = useState([]);  
  const [activeTab, setActiveTab] = useState("info");
  


  const CustomNextArrow = ({ className, style, onClick }) => {
    return (
      <div
        className={className}
        style={{
          ...style,
          display: "block",
          background: "blue",
          borderRadius: "50%",
          right: "-30px",
          zIndex: 1,
        }}
        onClick={onClick}
      />
    );
  };

  const CustomPrevArrow = ({ className, style, onClick }) => {
    return (
      <div
        className={className}
        style={{
          ...style,
          display: "block",
          background: "blue",
          borderRadius: "50%",
          left: "-30px",
          zIndex: 1,
        }}
        onClick={onClick}
      />
    );
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    nextArrow: <CustomNextArrow />,
    prevArrow: <CustomPrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const fetchFishDataFromFishBase = () => {
    axios
      .get(
        `https://isl.ics.forth.gr/grsf/grsf-api/resources/fishbase_info?id=${fishbaseId}`
      )
      .then((response) => {
        console.log("FishBase API response:", response.data);
        if (response.data.result) {
          setFishData((prevData) => ({
            ...prevData,
            fishBaseData: response.data.result,
          }));
          setHasData(true);
        }
      })
      .catch((error) => {
        console.error("Error fetching fish data from FishBase:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const fetchFishDataFrom3aCODE = () => {
    setLoadingFish3aData(true);
    axios
      .get(
        `https://isl.ics.forth.gr/grsf/grsf-api/resources/getfisheriesbasic?species_code=${fish3aCODE}&pending=true`
      )
      .then((response) => {
        console.log("3aCODE API response:", response.data);
        if (response.data) {
          setFishData((prevData) => ({
            ...prevData,
            fish3aData: response.data,
          }));
          setHasData(true);
        }
      })
      .catch((error) => {
        console.error("Error fetching fish data from 3aCODE:", error);
      })
      .finally(() => {
        setLoadingFish3aData(false);
      });
  };

  const fetchFishDataFromRecipes = (fishName) => {
    setLoadingFish3aData(true);
    axios
      .get(
        `https://isl.ics.forth.gr/grsf/grsf-api/resources/get_recipes?name=${fishName}`
      )
      .then((response) => {
        console.log("Recipes API response:", response.data);
        if (response.data && response.data.result) {
          setRecipes(response.data.result);  // Store the 'result' array in the recipes state
        }
      })
      .catch((error) => {
        console.error("Error fetching recipes:", error);
      })
      .finally(() => {
        setLoadingFish3aData(false);
      });
  };
  
  

  useEffect(() => {
    if (fishbaseId) fetchFishDataFromFishBase();
  }, [fishbaseId]);

  useEffect(() => {
    if (fish3aCODE) fetchFishDataFrom3aCODE();
  }, [fish3aCODE]);

  const getUniqueAndOrderedFishingGears = (data) => {
    const gearCount = {};
    data.forEach((item) => {
      const gearName = item.fishing_gears?.fishing_gear_name;
      if (gearName) {
        gearCount[gearName] = (gearCount[gearName] || 0) + 1;
      }
    });

    const sortedGears = Object.keys(gearCount).sort(
      (a, b) => gearCount[b] - gearCount[a]
    );

    const top5Gears = sortedGears.slice(0, 5);
    const uniqueGearsSet = new Set();

    const top5UniqueGears = data.filter((item) => {
      const gearName = item.fishing_gears?.fishing_gear_name;
      if (gearName && top5Gears.includes(gearName) && !uniqueGearsSet.has(gearName)) {
        uniqueGearsSet.add(gearName);
        return true;
      }
      return false;
    });

    const remainingUniqueGears = data.filter((item) => {
      const gearName = item.fishing_gears?.fishing_gear_name;
      if (gearName && !uniqueGearsSet.has(gearName)) {
        uniqueGearsSet.add(gearName);
        return true;
      }
      return false;
    });

    return [...top5UniqueGears, ...remainingUniqueGears];
  };

  return (
    <div className="fish-details-container">
      <div className="tabs">
        <button 
          className={`tab-btn ${activeTab === 'fish' ? 'active' : ''}`} 
          onClick={() => setActiveTab('fish')}
        >
          Fish Information
        </button>
        <button 
          className={`tab-btn ${activeTab === 'recipes' ? 'active' : ''}`} 
          onClick={() => setActiveTab('recipes')}
        >
          Recipes
        </button>
      </div>

      {/* Conditionally render based on active tab */}
      {activeTab === 'fish' && (
        <div className="fish-info">
          {/* Displaying Fish Photos */}
          {fishData.fishBaseData?.photos && fishData.fishBaseData.photos.length > 0 && (
            <div className={`fish-photos ${xs ? "fish-photos-xs" : ""}`}>
              <Slider {...settings}>
                {fishData.fishBaseData.photos.map((photo, index) => (
                  <div key={index}>
                    <img
                      src={photo}
                      alt={`Fish ${index}`}
                      style={{ width: "100%", height: "300px" }}
                    />
                  </div>
                ))}
              </Slider>
            </div>
          )}

          {/* Displaying Fish Information (tags and text) */}
          {fishData.fishBaseData && (
            <div className="info_container">
              {/* Tags (Age, Depth, Length, etc.) */}
              <div className={`first_tags ${xs ? "first-tags-xs" : ""}`}>
                <Tag info={fishData.fishBaseData} type="max_age" />
                <Tag info={fishData.fishBaseData} type="max_depth" />
                <Tag info={fishData.fishBaseData} type="max_length" />
              </div>

              <div className="second_tags">
                <Tag info={fishData.fishBaseData} type="max_weight" />
                <Tag info={fishData.fishBaseData} type="average_length" />
                <Tag info={fishData.fishBaseData} type="status" />
              </div>

              {/* Environmental, Biological, Distribution and Threat Information */}
              <div className="text_container">
                <Text info={fishData.fishBaseData} type="environment" />
                <Text info={fishData.fishBaseData} type="biology" />
                <Text info={fishData.fishBaseData} type="distribution" />
                <Text info={fishData.fishBaseData} type="distribution_rng" />
                <Text info={fishData.fishBaseData} type="climate" />
                <Text info={fishData.fishBaseData} type="threat" />

                {/* Fishing Gear Data */}
                <div className="gears">
                  {loadingFish3aData ? (
                    <div className="loader"></div>
                  ) : (
                    <>
                      {fishData.fish3aData && fishData.fish3aData.length > 0 ? (
                        <table className="fishing-gear-table">
                          <thead>
                            <tr>
                              <th>Flag State</th>
                              <th>Fishing Gear</th>
                            </tr>
                          </thead>
                          <tbody>
                            {getUniqueAndOrderedFishingGears(fishData.fish3aData)
                              .slice(0, showMore ? undefined : 5)
                              .map((item, index) => (
                                <tr key={index}>
                                  <td>{item.flag_states?.flag_state_name || "N/A"}</td>
                                  <td>{item.fishing_gears?.fishing_gear_name || "N/A"}</td>
                                </tr>
                              ))}
                          </tbody>
                        </table>
                      ) : (
                        <p>No data available</p>
                      )}
                    </>
                  )}

                  {/* Show More/Show Less button */}
                  {!loadingFish3aData && fishData.fish3aData && fishData.fish3aData.length > 5 && (
                    <button
                      className="show-more-btn"
                      onClick={() => setShowMore(!showMore)}
                    >
                      {showMore ? "Show Less" : "Show More"}
                    </button>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Recipes Tab */}
      {activeTab === 'recipes' && (
        <div className="recipes">
          <p className="quest">Want some recipe ideas with your fish search?</p>
          <button
            className="view-recipes-button"
            onClick={() => {
              if (!recipes.length) {
                fetchFishDataFromRecipes(fishData.fishBaseData?.name); 
              }
              setShowRecipes((prevState) => !prevState); 
            }}
          >
            🍴 View Fish Recipes
          </button>

          {showRecipes && loadingFish3aData && <p>Loading recipes...</p>}

          {showRecipes && recipes.length > 0 && (
            <div className="recipes-list">
              <h2>Recipes for {fishData.fishBaseData?.name}</h2>
              <div>
                {recipes.map((recipe, index) => (
                  <div key={index} className="recipe-item">
                    <h3 className="title-recipe">{recipe.title}</h3>
                    <div className="image-table">
                      <div className="recipe-photo">
                        <img src={recipe.photo} alt={recipe.title} />
                      </div>
                      <table className="recipe-details-table">
                          <tbody>
                            <tr>
                              <td><strong>Preparation Time:</strong></td>
                              <td>{recipe.preparation_time_in_minutes} minutes</td>
                            </tr>
                            <tr>
                              <td><strong>Cooking Time:</strong></td>
                              <td>{recipe.cooking_time_in_minutes} minutes</td>
                            </tr>
                            <tr>
                              <td><strong>Serves:</strong></td>
                              <td>{recipe.serves_persons} persons</td>
                            </tr>
                          </tbody>
                        </table>
                        </div>
                <div className="txt">
                  <div className="ingredients">
                    <h4>Ingredients:</h4>
                        {recipe.ingredients && recipe.ingredients.length > 0 ? (
                          recipe.ingredients.map((ingredient, idx) => (
                            <li key={idx}>{ingredient.quantity} of {ingredient.name}</li>
                          ))
                        ) : (
                          <p>No ingredients available</p>
                        )}
                        </div>
                      <div className="method">
                      <h4>Cooking Method:</h4>
                      <p>{recipe.cooking_method}</p>
                      </div>
                  </div>
                 </div>
                ))}
              </div>
            </div>
          )}

          {showRecipes && recipes.length === 0 && !loadingFish3aData && (
            <p>No recipes available for this fish.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default FishDetails;