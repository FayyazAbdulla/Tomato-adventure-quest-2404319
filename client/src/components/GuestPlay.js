import { useState, useEffect } from "react";
import Swal from "sweetalert2"; // Import SweetAlert2
import "sweetalert2/dist/sweetalert2.css"; // Import SweetAlert2 styles
import "./Style/GuestPlay.css";

import React from "react";
import GuestNavBar from "./GuestNavBar";

function GuestPlay() {
  const [question, setQuestion] = useState("");
  const [APIsolution, setAPIsolution] = useState("");
  const [userInput, setUserInput] = useState("");
  // const [error, setError] = useState(null);

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
      // setError(null); // Clear error if the API call succeeds
    } catch (error) {
      // setError(error);
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleUserInput = (e) => {
    setUserInput(e.target.value);
  };

  const handleSubmit = () => {
    fetchData();
    if (userInput == APIsolution) {
      Swal.fire({
        icon: "success",
        title: " 🍅 Correct answer 🍅!",
        showConfirmButton: false,
        timer: 1500, // Auto close the alert after 1.5 seconds
      });
    } else {
      Swal.fire({
        icon: "error",
        title: "Incorrect answer!",
        text: "Please try again. 💔",
      });
    }
  };

  return (
    <>
      <div align="center">
        <GuestNavBar />
        <br></br>

        {/* API Question */}
        <div>
          <div>
            <h1 class="questiontitle">Guest Play</h1>
          </div>
          <br />
          <div class="Quiz-image">
            <img src={question} alt="Question" />
          </div>
        </div>

        {/* ..................... */}

        {/* taking user answer */}
        <br />

        <div class="answerboxwithbutton">
          <div className="answerboxxx">
            <input
              className=""
              type="number"
              value={userInput}
              onChange={handleUserInput}
              placeholder="Enter your answer here"
            />
          </div>
          <br /> <br />
          <div className="sbt-btn">
            {" "}
            <button onClick={handleSubmit}>Submit</button>
          </div>
        </div>

        {/* .................... */}
        <br />
        <br />
        <br />
        <br />
        <br />
        {/* for testing : displaying correct answer */}
        <div>
          <h4>Solution ........ For Testing</h4>
          <p>{APIsolution}</p>
        </div>
      </div>
    </>
  );
}

export default GuestPlay;
