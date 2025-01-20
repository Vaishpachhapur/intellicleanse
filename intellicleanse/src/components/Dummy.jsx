import React, { useState, useEffect } from "react";
import axios from "axios";

const Dummy = () => {
  const [message, setMessage] = useState("");

  useEffect(() => {
    // Fetch data from Flask backend
    axios
      .get("http://localhost:5001/test_db")
      .then((response) => {
        setMessage(response.data.message); // Set the message from the response
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setMessage("Failed to connect to the database.");
      });
  }, []);

  return (
    <div>
      <h1>{message}</h1>
    </div>
  );
};

export default Dummy;
