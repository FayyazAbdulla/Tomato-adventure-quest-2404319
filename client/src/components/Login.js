import React, { useState, useEffect } from "react";
import "./Style/Login.css";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import emailjs from "emailjs-com";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const loginTimestamp = new Date().toLocaleString();

  useEffect(() => {
    const isLoggedIn = sessionStorage.getItem("isLoggedIn");
    if (isLoggedIn) {
      navigate("/about");
    }
  }, [navigate]);

  const sendLoginEmail = (email) => {
    emailjs
      .send(
        "service_3qi0fpu",
        "template_dm3n40w",
        {
          to_email: email,
          from_name: "Tomato API",
          message: "Your login to Tomato Adventure Quest was successful!",
          login_timestamp: loginTimestamp,
        },
        "JFnzmAYKGs6LYf-Jb"
      )
      .then(
        (result) => {
          console.log("Login email sent successfully:", result.text);
        },
        (error) => {
          console.error("Error sending login email:", error.text);
          // Show error message to the user
          Swal.fire({
            icon: "error",
            title: "Error",
            text: "An error occurred while sending the login email. Please try again later.",
          });
        }
      );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!email || !password) {
      Swal.fire({
        icon: "warning",
        title: "Oops...",
        text: "Please fill in all required fields.",
      });
      return; // Exit the function if fields are empty
    }

    try {
      const response = await fetch("http://localhost:5000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Login failed");
      } else {
        console.log("Login successful");
        // Show SweetAlert on successful login
        Swal.fire({
          icon: "success",
          title: "Login Successful!",
          showConfirmButton: false,
          text: "Welcome to Tomato Adventure Quest !",
        });

        // Send login email with login timestamp
        sendLoginEmail(email, loginTimestamp);

        navigate("/About");

        // Retrieve user details from the response
        const userData = await response.json();

        // Store user details and login status in sessionStorage
        sessionStorage.setItem("isLoggedIn", true);
        sessionStorage.setItem("UserEmail", JSON.stringify(userData));
        sessionStorage.setItem("email", email);
      }
    } catch (error) {
      console.error("Login failed:", error);

      if (error.response) {
        console.error("Status Code:", error.response.status);
        console.error("Response Data:", error.response.data);
      }

      // setErrorMessage("Login failed: Incorrect username or password.");

      // Show SweetAlert on incorrect login
      Swal.fire({
        icon: "error",
        title: "Login Failed",
        text: "Incorrect username or password.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="login-box">
        <form className="login-form" onSubmit={handleSubmit}>
          <h1 className="login-title">🍅 Login 🍅 </h1> <br />
          <br />
          <div>
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Username@gmail.com"
              className="login-input"
            />
          </div>
          <br />
          <br />
          <div>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="login-input"
            />
          </div>
          <br />
          <div align="center" style={{ color: "red" }}>
            <Link to="/Register">Don't you have an Account? Click here</Link>
          </div>
          <br />
          <button type="submit" className="login-button1">
            Login
          </button>
          <Link to="/">
            <button type="submit" className="login-button">
              Home
            </button>
          </Link>
          {errorMessage && <div className="error-message">{errorMessage}</div>}
        </form>
      </div>
    </div>
  );
}

export default Login;
