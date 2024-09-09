import React from "react";
import { Link } from "react-router-dom";
import "./Style/PlayNavBar.css"; // Import the button CSS file
import Logout from "./Logout";

function PlayNavBar() {
  return (
    <div className="PlayNavBar">
      <div className="PlayNavBar">
        <Link to="/">
          <button className="Playbarbtn">Home</button>
        </Link>
        <Link to="/ScoreBoard">
          <button className="Playbarbtn">ScoreBoard</button>
        </Link>
        <Link to="/UserProfile">
          <button className="Playbarbtn">Profile</button>
        </Link>
        <Link to="/about">
          <button className="Playbarbtn">Game Instructions</button>
        </Link>
        <Logout/>
      </div>
    </div>
  );
}

export default PlayNavBar;
