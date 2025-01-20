import React from "react";
import "./Logout.css";

const Logout = () => {
  return (
    <div className="logout">
      <h2>Logout</h2>
      <p>Click the button below to log out.</p>
      <button className="logout-btn"><a href="/">Logout</a></button>
    </div>
  );
};

export default Logout;
