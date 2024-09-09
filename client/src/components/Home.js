import React from "react";
import { Link } from "react-router-dom";
import PreLoader from "./PreLoader";
import "./Style/Home.css";
import BackgroundParticles from "./react-particles/BackgroundParticles";

function Home() {
  return (
    <>
      <BackgroundParticles />
      <div>
        <PreLoader />
      </div>
      <div>
        <h1 className="HomeHeadign">🍅 Tomato Adventure Quest. 🍅</h1>
      </div>
      <div align="center">
        <Link to="/Login">
          <button className="Homeplay-game-button">🍅 Login</button>
        </Link>
        &nbsp; &nbsp; &nbsp; &nbsp;
        <Link to="/Register">
          <button className="Homeplay-game-button">🍅Register</button>
        </Link>
        &nbsp; &nbsp; &nbsp; &nbsp;
        <Link to="/guest-play">
          <button className="Homeplay-game-button">🍅 Play as Guest</button>
        </Link>{" "}
        &nbsp; &nbsp; &nbsp; &nbsp;
        {/* <Link to="/AboutGame">
          <button className="Homeplay-game-button">🍅 About</button>
        </Link> */}
        <br />
      </div>
    </>
  );
}

export default Home;
