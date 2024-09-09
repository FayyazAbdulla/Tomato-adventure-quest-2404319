import React from "react";
import { Link } from "react-router-dom";
import "./Style/GuestNavBar.css"

function GuestNavBar() {
  return (
    <>
      <div className="guestbtn-group" >
        <Link to="/">
          <button className="gstbutton">Home</button>
        </Link>{" "}
        &nbsp;&nbsp;
        <Link to="/Login">
          <button className="gstbutton">Login</button>
        </Link>{" "}
        &nbsp;&nbsp;
        <Link to="/Register">
          <button className="gstbutton">Register</button>
        </Link>{" "}
        &nbsp;&nbsp;
      </div>

      <div></div>
    </>
  );
}

export default GuestNavBar;
