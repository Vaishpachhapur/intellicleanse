import React, { useState } from "react";
import "./login.css"; // Create a login.css file to style the login page

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

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle login logic here (e.g., API call for authentication)
    console.log("Logging in with:", email, password);
  };

  return (
    <div className="login-container">
      <h1>Login to Intellicleanse</h1>
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
        <p>Don't have an account? <a href="/signup">Sign Up</a></p>
      </form>
    </div>
  );
};

export default Login;
