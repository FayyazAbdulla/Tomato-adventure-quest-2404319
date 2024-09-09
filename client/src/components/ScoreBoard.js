import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import PlayNavBar from "./PlayNavBar";
import "./Style/Scoreboard.css";


const Scoreboard = () => {
  const [players, setPlayers] = useState([]);



  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:5000/scoreboardRoutes");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        const sortedData = data.sort((a, b) => b.score - a.score);
        setPlayers(sortedData);
      } catch (err) {
        console.error("Error fetching players:", err);
      }
    };

    fetchData(); 
  }, []);

  
  return (
    <>
      <div className="background-div">
        <div align="center">
          <PlayNavBar />
          <div>
            <h1 className="heading-text">Scoreboard</h1>
            <table className="scoreboard-table">
              <thead>
                <tr>
                  <th>Rank</th>
                  <th>Username</th>
                  <th>Score</th>
                </tr>
              </thead>
              <tbody>
                {players
                  .filter((player, index) => player.score > 0 || index <= 3) // Filter first 3 players with score > 0
                  .map((player, index) => (
                    <tr key={player._id} className="special">
                      {" "}
                      {/* Add special class to first three rows */}
                      <td>{index + 1}</td>
                      <td>{player.email}</td>
                      <td>{player.score}</td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
          <br />
          <Link to="/register-play" className="btn btn-primary">
            Back to Game
          </Link>
        </div>
      </div>
      
    </>
  );
};

export default Scoreboard;
