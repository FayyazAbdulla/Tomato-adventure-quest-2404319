import React from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import "./Style/logoutAnimation.css"

const Logout = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear user session data
    sessionStorage.removeItem("isLoggedIn");
    sessionStorage.removeItem("UserEmail");
    sessionStorage.removeItem("email");

    // Show logout confirmation message
    Swal.fire({
      icon: "success",
      title: "Logout Successful!",
      showConfirmButton: false,
      timer: 1500, // Close alert after 1.5 seconds
    });

    // Redirect user to login page
    navigate("/");
  };

  return (
    <button
      onClick={handleLogout}
      className="logout-button"
    >
      Logout
    </button>
  );
};

export default Logout;

