import React, { useEffect, useState } from "react";
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
  const [hasData, setHasData] = useState(false);
  const [showMore, setShowMore] = useState(false); // State for toggling 'Show More'

  // Custom Next Arrow Component
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

  // Custom Previous Arrow Component
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

  // Settings for react-slick carousel
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3, // Number of images to show at once
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
    axios
      .get(
        `https://isl.ics.forth.gr/grsf/grsf-api/resources/getfisheriesbasic?species_code=${fish3aCODE}`
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
        setLoading(false);
      });
  };

  useEffect(() => {
    if (fishbaseId) fetchFishDataFromFishBase();
  }, [fishbaseId]);

  useEffect(() => {
    if (fish3aCODE) fetchFishDataFrom3aCODE();
  }, [fish3aCODE]);

  console.log("Updated fish3aData:", fishData.fish3aData);

  // Function to filter out unique fishing gears and display the top 5 most popular first
  const getUniqueAndOrderedFishingGears = (data) => {
    const gearCount = {}; 

    // Count the occurrences of each fishing gear
    data.forEach((item) => {
      const gearName = item.fishing_gears?.fishing_gear_name;
      if (gearName) {
        gearCount[gearName] = (gearCount[gearName] || 0) + 1;
      }
    });

    // Sort the gears by frequency (most popular first)
    const sortedGears = Object.keys(gearCount).sort(
      (a, b) => gearCount[b] - gearCount[a]
    );

    // Separate the top 5 most popular gears
    const top5Gears = sortedGears.slice(0, 5);

    // Create a Set to store unique gears
    const uniqueGearsSet = new Set();

    // Store the first 5 popular unique gears
    const top5UniqueGears = data.filter((item) => {
      const gearName = item.fishing_gears?.fishing_gear_name;
      if (gearName && top5Gears.includes(gearName) && !uniqueGearsSet.has(gearName)) {
        uniqueGearsSet.add(gearName);
        return true;
      }
      return false;
    });

    // Add the remaining unique gears that are not in the top 5
    const remainingUniqueGears = data.filter((item) => {
      const gearName = item.fishing_gears?.fishing_gear_name;
      if (gearName && !uniqueGearsSet.has(gearName)) {
        uniqueGearsSet.add(gearName);
        return true;
      }
      return false;
    });

    // Return top 5 first, followed by the remaining unique gears
    return [...top5UniqueGears, ...remainingUniqueGears];
  };

  return (
    <div>
      <h1 className="fish-name">
        {fishData.fishBaseData?.name || fishData.fish3aData?.name}
      </h1>
  
      {fishData && (
        <div className="fish-info">
          {fishData.fishBaseData?.photos &&
            fishData.fishBaseData.photos.length > 0 && (
              <div className="fish-photos">
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
  
          {fishData.fishBaseData && (
            <div className="info_container">
              <div className="first_tags">
                <Tag info={fishData.fishBaseData} type="max_age" />
                <Tag info={fishData.fishBaseData} type="max_depth" />
                <Tag info={fishData.fishBaseData} type="max_length" />
              </div>
  
              <div className="second_tags">
                <Tag info={fishData.fishBaseData} type="max_weight" />
                <Tag info={fishData.fishBaseData} type="average_length" />
                <Tag info={fishData.fishBaseData} type="status" />
              </div>
  
              {/* text_container where the table will be added */}
              <div className="text_container">
                <Text info={fishData.fishBaseData} type="environment" />
                <Text info={fishData.fishBaseData} type="biology" />
                <Text info={fishData.fishBaseData} type="distribution" />
                <Text info={fishData.fishBaseData} type="climate" />
                <Text info={fishData.fishBaseData} type="threat" />
  
                {fishData.fish3aData && fishData.fish3aData.length > 0 && (
                  <div className="gears">
                    <table className="fishing-gear-table">
                      <thead>
                        <tr>
                          <th>Flag State</th>
                          <th>Fishing Gear</th>
                        </tr>
                      </thead>
                      <tbody>
                        {getUniqueAndOrderedFishingGears(fishData.fish3aData)
                          .slice(0, showMore ? undefined : 5) // Limit to 5 if showMore is false
                          .map((item, index) => (
                            <tr key={index}>
                              <td>{item.flag_states?.flag_state_name || "N/A"}</td>
                              <td>{item.fishing_gears?.fishing_gear_name || "N/A"}</td>
                            </tr>
                          ))}
                      </tbody>
                    </table>
                    {/* Show More/Show Less button */}
                    {fishData.fish3aData.length > 5 && (
                      <button
                        className="show-more-btn"
                        onClick={() => setShowMore(!showMore)}
                      >
                        {showMore ? "Show Less" : "Show More"}
                      </button>
                    )}
                  </div>
                )}
              </div>
  
              <p className="distrbution_range">
                <strong>Distribution Range:</strong>
                {fishData.fishBaseData.dimensions?.distribution_range}
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default FishDetails;






