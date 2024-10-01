import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import "./FishDetails.css";
import axios from "axios";
import Slider from "react-slick";  
import "slick-carousel/slick/slick.css";  
import "slick-carousel/slick/slick-theme.css";  


const FishDetails = () => {
  const location = useLocation();
  const fishbaseId = location.state?.fishbaseId;
  const fish3aCODE = location.state?.fish3aCODE;
  const [fishData, setFishData] = useState({});
  const [loading, setLoading] = useState(true);
  const [hasData, setHasData] = useState(false);

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
      .get(`https://isl.ics.forth.gr/grsf/grsf-api/resources/fishbase_info?id=${fishbaseId}`)
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
      .get(` https://isl.ics.forth.gr/grsf/grsf-api/resources/getfisheriesbasic?species_code=${fish3aCODE}`)
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
                {/* Wrap the photo map inside the Slider component */}
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
            <div>
              <p className="environment">
                <strong>Environment: </strong>
                {fishData.fishBaseData.environment
                  ? fishData.fishBaseData.environment.join(", ")
                  : "N/A"}
              </p>
              <p className="distribution">
                <strong>Distribution:</strong>
                {fishData.fishBaseData.distribution}
              </p>
              <p className="distrbution_range">
                <strong>Distribution Range:</strong>
                {fishData.fishBaseData.dimensions?.distribution_range}
              </p>
              <p className="climate">
                <strong>Climate Zone:</strong>
                {fishData.fishBaseData.climate_zone}
              </p>
              <p className="age">
                <strong>Max Age:</strong>
                {fishData.fishBaseData.dimensions?.max_age} years
              </p>
              <p className="depth">
                <strong>Max Depth:</strong>
                {fishData.fishBaseData.dimensions?.max_depth} m
              </p>
              <p className="length">
                <strong>Max Length:</strong>
                {fishData.fishBaseData.dimensions?.max_length} cm
              </p>
              <p className="weight">
                <strong>Max Weight:</strong>
                {fishData.fishBaseData.dimensions?.max_weight} kg
              </p>
              <p className="av_length">
                <strong>Average Length:</strong>
                {fishData.fishBaseData.dimensions?.average_length} cm
              </p>
              <p className="status">
                <strong>IUCN Status:</strong>
                {fishData.fishBaseData.iucn_status}
              </p>
              <p className="biology">
                <strong>Biology:</strong> {fishData.fishBaseData.biology}
              </p>
              <p className="threat">
                <strong>Threat to Humans:</strong>
                {fishData.fishBaseData.threat_to_humans}
              </p>
            </div>
          )}

        {fishData.fish3aData?.[0] && (
          <div>
            <p><strong>Flag State:</strong> {fishData.fish3aData[0].flag_states.flag_state_name}</p>
            <p><strong>Fishing Gear:</strong> {fishData.fish3aData[0].fishing_gears.fishing_gear_name}</p>
          </div>
        )}
      </div>
    )}
  </div>
);
};

export default FishDetails;





