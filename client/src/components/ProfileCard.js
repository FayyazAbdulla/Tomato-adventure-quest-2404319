import React, { useState, useEffect } from "react";
import "./Style/ProfileCard.css"; // External CSS file
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import emailjs from "emailjs-com";

const ProfileCard = () => {
  // State variables for username, score, and loading status
  const [username, setUsername] = useState("");
  const [score, setScore] = useState(null); // Initialize score with null
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Check login status and retrieve username from session storage
  useEffect(() => {
    const isLoggedIn = sessionStorage.getItem("isLoggedIn");
    const email = sessionStorage.getItem("email");

    // for testing purpose
    console.log("isLoggedIn", isLoggedIn);
    console.log("email", email);

    if (!isLoggedIn) {
      // If not logged in, redirect to login page
      navigate("/Login");
    } else {
      // Retrieve username from session storage
      const storedUsername = sessionStorage.getItem("email");
      setUsername(storedUsername);
      console.log("Current - Login - User : " + storedUsername); // Log after setting state

      // Fetch user's score from the backend based on the username
      const fetchScore = async () => {
        try {
          const response = await fetch(
            `http://localhost:5000/profile-score?username=${storedUsername}`
          );

          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }

          const data = await response.json();

          if (data.score !== undefined) {
            setScore(data.score.toString()); // Convert score to string
            console.log("Score retrieved successfully:", data.score);
          } else {
            console.log("User not found or score not available");
          }
        } catch (err) {
          console.error("Error fetching score:", err);
          setScore("Error"); // Set score to 'Error' in case of an error
        } finally {
          setLoading(false); // Set loading status to false after fetching data
        }
      };

      if (storedUsername) {
        fetchScore();
      }
    }
  }, [navigate]);

  // Log score whenever it changes
  useEffect(() => {
    // console.log("Current - Login - User Score : " + score);
  }, [score]);

  // Function to send email with profile card details
  const sendEmail = () => {
    const templateParams = {
      to_email: sessionStorage.getItem("email"),
      from_name: "Tomato API",
      username: username,
      score: score || "No score available",
    };

    emailjs
      .send(
        "service_3qi0fpu",
        "YOUR_TEMPLATE_ID",
        templateParams,
        "JFnzmAYKGs6LYf-Jb"
      )
      .then(
        (result) => {
          console.log("Email sent successfully:", result.text);
          alert("Email sent successfully!");
        },
        (error) => {
          console.error("Error sending email:", error.text);
          alert("Failed to send email. Please try again later.");
        }
      );
  };

  return (
    <div className="profile-card">
      <h2> Profile Card </h2>
      <form>
        <div className="form-group">
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={username || ""} // Ensure value is not null
            readOnly
          />
        </div>
        <div className="form-group">
          <label htmlFor="score">Score:</label>
          <input
            type="text"
            id="score"
            value={loading ? "Loading..." : score || "No score available"} // Display placeholder or error
            readOnly
          />
        </div>
        <br />
        <button onClick={sendEmail}>Send Profile Details</button>{" "}
        {/* Button to send email */}
        <br />
        <br />
        <button align="center">
          <Link to="/register-play">Return</Link>
        </button>{" "}
        <br />
        <br />
        <button align="center">
          <Link to="/">Home</Link>
        </button>
      </form>
    </div>
  );
};

export default ProfileCard;
