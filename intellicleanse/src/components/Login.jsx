import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./login.css";

/**
 * Login page component for the web application.
 * Allows users to log in with their email and password.
 *
 * @component
 * @example
 * return (
 *   <Login />
 * )
 */
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate(); // Initialize useNavigate to programmatically navigate to another page
  const [errorMessage, setErrorMessage] = useState(""); // For handling error messages

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Send the email and password to the backend
      const response = await axios.post("http://localhost:3000/api/login", {
        email,
        password,
      });

      // Handle the response from the server
      if (response.data.message === "Login successful") {
        alert("Login successful!");
        navigate("/dashboard"); // Redirect to the dashboard page
      }
    } catch (error) {
      // Check if there's a response from the server
      if (error.response) {
        console.error("Error response:", error.response);
        setErrorMessage(error.response.data.message || "Something went wrong. Please try again.");
      } else if (error.request) {
        console.error("Error request:", error.request);
        setErrorMessage("No response from server. Please check your connection.");
      } else {
        console.error("General error:", error.message);
        setErrorMessage("Something went wrong. Please try again.");
      }
    }
  };

  return (
    <div className="login-container">
      <h1>Login to Intellicleanse</h1><br />
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <label>Email</label>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="input-group">
          <label>Password</label>
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="login-btn">Login</button>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        <p>Don't have an account? <a href="/signup">Sign Up</a></p>
      </form>
    </div>
  );
};

export default Login;
