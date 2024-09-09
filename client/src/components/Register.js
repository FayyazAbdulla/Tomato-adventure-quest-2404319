//   ./client/src/component/Register.js
import React, { Component } from "react";
import "./Style/Register.css";
import Swal from "sweetalert2";
import { Link  } from "react-router-dom";
import emailjs from "emailjs-com";
import { generateVerificationCode } from './utils';

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      confirmPassword: "",
      errorMessage: "",
      verificationCode: "",
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  // Add a function to update state when input changes
  handleInputChange(event) {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  handleSubmit(e) {
    e.preventDefault();
    const { email, password, confirmPassword } = this.state;
    console.log("Request payload:", JSON.stringify({ email, password }));
    console.log(email, password);

    // Validate that required fields are not empty
    if (!email || !password || !confirmPassword) {
      Swal.fire({
        icon: "warning",
        title: "Oops...",
        text: "Please fill in all required fields.",
      });
      return; // Exit the function if fields are empty
    }

    // Check if email meets the criteria
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      Swal.fire({
        icon: "warning",
        title: "Oops...",
        text: "Please enter a valid email address.",
      });
      return; // Exit the function if email doesn't meet criteria
    }

    // Check if password meets the criteria
    const passwordRegex = /(?=.*[A-Za-z]{2})(?=.*\d{2}).{4,}/;
    if (!passwordRegex.test(password)) {
      Swal.fire({
        icon: "warning",
        title: "Oops...",
        text: "Password should contain at least 2 letters and 2 numbers.",
      });
      return; // Exit the function if password doesn't meet criteria
    }

    if (password !== this.state.confirmPassword) {
      // Display SweetAlert for password mismatch error
      Swal.fire({
        icon: "warning",
        title: "Oops...",
        text: "Passwords do not match.",
      });
    } else {
      fetch("http://localhost:5000/register", {
        method: "POST",
        crossDomain: true,
        headers: {
          "Content-Type": "application/json", // Specify content type
        },
        body: JSON.stringify({
          email,
          password,
        }),
      })
        .then((response) => {
          console.log("Response status:", response.status);

          if (response.status === 404) {
            throw new Error("User not found");
          } else if (response.status === 500) {
            throw new Error("Internal server error");
          } else if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
          return response.json();
        }) 

        .then((data) => {
          // Check if the response is in JSON format
          if (data && data.status === "User created") {
            Swal.fire({
              icon: "success",
              title: "Registration Successful!",
              showConfirmButton: false,
              timer: 1500,
            });
            // Generate and store verification code
            const verificationCode = generateVerificationCode();
            this.setState({ verificationCode });
            // Send welcome email to the user
            this.sendEmail(email, verificationCode); // Pass email and verificationCode

          } else {
            // Handle non-JSON response here
            console.error("Unexpected response format:", data);
            Swal.fire({
              icon: "error",
              title: "Unexpected Response",
              text: "An unexpected response was received from the server.",
            });
            console.log(
              "Request payload:",
              JSON.stringify({ email, password })
            );
          }
        })

        .catch((err) => {
          console.error("Error:", err.message);
          // Handle network errors or other exceptions here
          // Log additional information about the error
          if (err.response) {
            // If the error is a response error, log the status and data
            console.error("Response Error Status:", err.response.status);
            console.error("Response Error Data:", err.response.data);
          } else if (err.request) {
            // If the error is a request error, log the request
            console.error("Request Error:", err.request);
          } else {
            // Otherwise, log the general error
            console.error("General Error:", err.message);
            console.error("Detailed Error Object:", err);
          }
          Swal.fire({
            icon: "error",
            title: "Error",
            text: "An error occurred during registration. please check your email address",
          });
        });
    }
  }

 // Function to send registration email
sendEmail(email, verificationCode) {
  emailjs
    .send(
      "service_3qi0fpu",
      "template_8fhqija",
      {
        to_email: email,
        from_name: "Tomato API",
        verification_code: verificationCode,
      },
      "JFnzmAYKGs6LYf-Jb"
    )
    .then(
      (result) => {
        console.log("Email sent successfully:", result.text);
        // Redirect to Login after email is sent
        window.location.href = "/Login";
      },
      (error) => {
        console.error("Error sending email:", error.text);
        // Show error message to the user
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "An error occurred while sending the registration email. Please try again later.",
        });
      }
    )
    .catch((error) => {
      console.error("Error sending email:", error);
      // Show error message to the user
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "An error occurred while sending the registration email. Please try again later.",
      });
    });
}


  render() {
    const { email, password, confirmPassword, errorMessage } = this.state;

    return (
      <>
        <div className="Register-container">
          <div className="login-form">
            <h1>🍅 Register 🍅</h1>
            <form onSubmit={this.handleSubmit}>
              <div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => this.setState({ email: e.target.value })}
                  placeholder="user@gmail.com"
                  required
                />
              </div>
              <br />
              <br />
              <div>
                <input
                  type="password"
                  pattern="(?=.*[A-Za-z]{2})(?=.*\d{2}).{4,}"
                  value={password}
                  onChange={(e) => this.setState({ password: e.target.value })}
                  placeholder="Password"
                  required
                />
              </div>
              <br />
              <br />
              <div>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) =>
                    this.setState({ confirmPassword: e.target.value })
                  }
                  placeholder="Confirm Password"
                  required
                />
              </div>
              <br />
              <div align="center" style={{ color: "red" }}>
                <Link to="/Login">Already have an Account? Click here</Link>
              </div>
              <button type="submit" className="Register-button">
                Register
              </button>
              <div className="home-container">
                <button
                  className="home-button"
                  onClick={() => (window.location.href = "/")}
                >
                  Home
                </button>
              </div>
              {errorMessage && (
                <div style={{ color: "red" }}>{errorMessage}</div>
              )}
            </form>
          </div>
        </div>
      </>
    );
  }
}

export default Register;
