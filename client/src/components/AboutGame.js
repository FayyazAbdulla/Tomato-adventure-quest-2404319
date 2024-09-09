import React from "react";
import { Link } from "react-router-dom";
import './Style/aboutgame.css';

function AboutGame() {
  return (
    <div className="about-game-container">
      <div className="heading-container" align="center">
        <h1 className="game-instruction-heading">Tomato Adventure Quest Challenge Instructions</h1>
      </div>
      <br />
      <div className="instruction-list-container" align="center">
        <ul className="instruction-list">
          <li className="instruction-item">
            🍅 Hidden Equations: You'll be presented with mathematical equations, and some numbers will be cleverly hidden within tomatoes.
          </li>
          <br />
          <li className="instruction-item">
            🍅 Find the Numbers: Your task is to identify the hidden numbers within the tomatoes. You have 35 seconds to solve each equation and find the elusive numbers for the first round. From the second round onwards, you'll have 30 seconds.
          </li>
          <br />
          <li className="instruction-item">
            🍅 Hearts System: You start with 3 hearts. You'll lose a heart if you fail to answer within the time limit or provide an incorrect answer.
          </li>
          <br />
          <li className="instruction-item">
            🍅 Losing Hearts 💔: Losing all hearts ends the challenge. Accuracy and speed are crucial to maintaining your hearts.
          </li>
          <br />
          <li className="instruction-item">
            🍅 Leaderboard 🏆: Successfully complete challenges to earn a spot on the leaderboard. Compete with others and showcase your tomato-solving skills.
          </li>
          <br />
          <li className="instruction-item">
            🍅🔍 The Challenge: Can you locate the hidden numbers within the given time? Sharpen your mathematical skills and embrace the Tomato Adventure Quest!
          </li>
          <br />
          <li className="instruction-item">
            🚪 Logout: You can logout anytime using the "Logout" option in the navigation menu.
          </li>
          <br />
          <li className="instruction-item">
            🕹️ Play the Game: Click "Play the Game" to begin your Tomato Adventure Quest.
          </li>
        </ul>
      </div>
      <br />
      <div className="button-container" align="center">
        <Link to="/register-play">
          <button className="play-game-button">Play Game</button>
        </Link>
        <br/><br/><br/><br/>
        <Link to="/">
          <button className="home-button">Return to Home</button>
        </Link>
      </div>
    </div>
  );
}

export default AboutGame;
