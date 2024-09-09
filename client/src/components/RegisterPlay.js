import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.css";
import "./Style/RegisterPlay.css";
import PlayNavBar from "./PlayNavBar";
import LifeBar from "./LifeBar";
import { useNavigate } from "react-router-dom";

function RegisterPlay() {
  const [question, setQuestion] = useState("");
  const [APIsolution, setAPIsolution] = useState("");
  const [userInput, setUserInput] = useState("");
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);
  const [timer, setTimer] = useState(35);
  const [gameEnded, setGameEnded] = useState(false);
  const navigate = useNavigate();

  console.log("RegisterPlay component rendered"); // Log render frequency

  // Function to handle timer countdown
  const startTimer = () => {
    console.log("Timer started");
    const startTime = Date.now();
    console.log("startTime : ", startTime);
    const interval = setInterval(() => {
      const timeElapsed = Date.now() - startTime;
      const secondsElapsed = Math.floor(timeElapsed / 1000);

      setTimer((prevTimer) => {
        console.log(
          "Timer tick:",
          prevTimer,
          "Seconds Elapsed:",
          secondsElapsed
        ); 
        if (prevTimer > 0) {
          if (lives <= 0) {
            // Check if lives are zero
            clearInterval(interval);
            console.log("Timer force-stopped: Lives reached 0");
          } else {
            return prevTimer - 1;
          }
        } else {
          // Deduct a life if timer runs out and game is not ended
          if (!gameEnded) {
            setLives((prevLives) => prevLives - 1);
            console.log("Life deducted due to timer timeout");
          }
          return 30; // reset timer 
        }
      });
    }, 1000); 

    return interval;
  };

  // Function to reset timer
  const resetTimer = () => {
    setTimer(30);
  };

  useEffect(() => {
    if (!sessionStorage.getItem("isLoggedIn")) {
      navigate("/login");
    }
  }, [navigate]);

  // Fetch data function
  const fetchData = async () => {
    try {
      const response = await fetch("https://marcconrad.com/uob/tomato/api.php");
      if (!response.ok) {
        throw new Error("Failed to fetch data");   
      }
      const data = await response.json();
      console.log("API - Question = " + data.question);
      console.log("API - Solution = " + data.solution);
      setQuestion(data.question);
      setAPIsolution(data.solution);

      const currentloginEmail = sessionStorage.getItem("email");
      console.log("Current - Login - User = " + currentloginEmail);
    } catch (error) {
      console.error("Error:", error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Failed to fetch question. Please try again later.",
      });
    }
  };

  useEffect(() => {
    console.log("RegisterPlay useEffect triggered"); // Log for debugging

    fetchData();
    const timerInterval = startTimer();
    return () => clearInterval(timerInterval);
  }, []);

  // Handle user input change
  const handleUserInput = (e) => {
    setUserInput(e.target.value);
  };

  // Handle form submission......................................................
  const handleSubmit = () => {

    if (!userInput) {
      Swal.fire({
        icon: "warning",
        title: "Oops...",
        text: "Please enter a value!",
      });
      return;
    }

    fetchData(); // fetch new question after warning alert

    if (userInput == APIsolution) {
      // Increment score
      const updatedScore = score + 1;
      setScore(updatedScore);

      // Show success message and handle other actions
      Swal.fire({
        icon: "success",
        title: `Your score is: ${updatedScore}`,
        text: `correct answer`,
        showConfirmButton: false,
        timer: 1500,
      });
    } else {
      // Reduce lives if answer is incorrect
      setLives((prevLives) => prevLives - 1);
      Swal.fire({
        icon: "error",
        title: `You lose one life. Remaining lives: ${lives - 1}`,
        text: `Wrong Answer`,
      });
    }

    resetTimer(); // Reset timer after submitting
    fetchData(); // Fetch new question after submitting
  };

  // ------------------------------------------------------------------------------------------------

  // Function to save score to MongoDB
  const saveScoreToDB = async () => {
    const userEmail = sessionStorage.getItem("email");

    // Log email and score
    console.log("Email:", userEmail);
    console.log("Score:", score);

    try {
      const response = await fetch("http://localhost:5000/score", {
        // Corrected endpoint
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: userEmail, score }),
      });

      if (!response.ok) {
        throw new Error("Failed to save score");
      }

      const data = await response.json();
      console.log(data.message); // Log success message
      Swal.fire({
        icon: "success",
        title: "Score saved!",
        showConfirmButton: false,
        timer: 1500,
      });
    } catch (error) {
      console.error("Error saving score:", error);
      console.log("Failed to save score. Please try again later.");
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Failed to save score. Please try again later.",
      });
    }
  };

  //--------------------------------------------------------------------------------------

  useEffect(() => {
    if (lives === 0 && !gameEnded) {
      setGameEnded(true);
      saveScoreToDB();
      Swal.fire({
        title: "Game Over",
        text: `Your final score is: ${score}`,
        icon: "info",
        showDenyButton: true,
        confirmButtonText: "Play Again",
        denyButtonText: "User Profile",
      }).then((choice) => {
        if (choice.isConfirmed) {
          // Restart the game
          setLives(3);
          setGameEnded(false);
          setScore(0);
          setTimer(30);
          fetchData(); // Reset with a new question
        } else {
          navigate("/register-play");
        }
      });
    }
  }, [lives, gameEnded, navigate, score,]);

  const restartGame = () => {
    setLives(3); // Reset lives
    setScore(0); // Reset score
    setTimer(30); // Reset timer
    fetchData(); // Fetch a new question
    setGameEnded(false); // Allow the game to run again
  };

  return (
    <div className="background-div">
      <div align="center">
        <PlayNavBar />
        <div>
          <br />
          <br />
          <br />
          {!gameEnded ? (
            // Gameplay elements while the game is active
            <>
              <div>
                <h1 className="heading-textt">🍅 Tomato Adventure Quest 🍅</h1>
                <div>
                  <LifeBar lives={lives} />
                </div>
                <div className="timerslot">
                  <p>{timer}</p>
                </div>{" "}
                <br />
                <br />
                <div className="game-image-container">
                  <img src={question} alt="Question" className="game-image" />
                </div>
                <br />
                <br />
                <br />
              </div>
              <input
                type="number"
                value={userInput}
                onChange={handleUserInput}
                placeholder="                            🍅              Enter your answer here                  🍅 "
                className="tomato-input"
                required
              />
              <br />
              <br />
              <button onClick={handleSubmit} className="tomato-button">
                🍅 Submit 🍅
              </button>
            </>
          ) : (
            // Indicate that the timer is frozen
            <>
              <h1
                style={{
                  fontFamily: "'Press Start 2P', cursive",
                  fontSize: "100px",
                  background: "linear-gradient(to right, red, orange, yellow, green, blue, indigo, violet)", // Rainbow colors
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
                
              >
                G🍅me ended - Out of lives...!
              </h1>
              <button
                onClick={restartGame}
                style={{
                  fontFamily: "'Press Start 2P', cursive",
                  fontSize: "60px",
                  background: "linear-gradient(to right, red, orange, yellow, green, blue, indigo, violet)", // Rainbow colors
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  padding: "10px 20px",
                  border: "none",
                  borderRadius: "5px",
                  cursor: "pointer",
                  animation: "heartbeat 1s infinite",
                }}
              >
                🍅 Restart Game 🍅
              </button>
            </>
          )}
        </div>
        <br />
        <br />
        <div>
          <h4>Solution</h4>
          <p>{APIsolution}</p>
        </div>
      </div>
    </div>
  );
}

export default RegisterPlay;
