import React from "react";
import "./NavBar.css";
import fishIcon from './fish.png'

const Navbar = () => {
    return (
      <nav className="navbar">
        <div className="app-name">
          <h1>VeriFish</h1>
          <img src={fishIcon} alt="Fish Icon" className="icon" />
        </div>
      </nav>
    );
  };

  export default Navbar;