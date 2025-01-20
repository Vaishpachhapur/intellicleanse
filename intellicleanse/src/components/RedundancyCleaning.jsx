import React, { useState, useEffect } from "react";
import "./RedundancyCleaning.css";

const RedundancyCleaning = () => {
  const [dataset, setDataset] = useState(null);
  const [cleanedData, setCleanedData] = useState(null);
  const [summary, setSummary] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // Fetch dataset from the backend
  useEffect(() => {
    setIsLoading(true);
    fetch(`${process.env.REACT_APP_API_URL}/api/get-dataset`)
      .then((response) => response.json())
      .then((data) => {
        setIsLoading(false);
        if (data.message) {
          alert(data.message);
        } else {
          setDataset(data);
        }
      })
      .catch((error) => {
        setIsLoading(false);
        console.error("Error fetching dataset:", error);
        alert("An error occurred while fetching the data. Please try again.");
      });
  }, []);

  // Handle data cleaning request
  const handleCleanData = () => {
    if (!dataset) return;

    setIsLoading(true);
    fetch(`${process.env.REACT_APP_API_URL}/api/clean-data`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ data: dataset.data }),
    })
      .then((response) => response.json())
      .then((data) => {
        setIsLoading(false);
        if (data.error) {
          alert(data.error);
        } else {
          setCleanedData(data.cleaned_data);
          setSummary(data.summary);
        }
      })
      .catch((error) => {
        setIsLoading(false);
        console.error("Error cleaning data:", error);
        alert("An error occurred while cleaning the data. Please try again.");
      });
  };

  return (
    <div className="redundancy-cleaning-container">
      <h2>Redundancy and Consistency Cleaning</h2>
      <p>Detect and clean redundant rows/columns and handle missing values.</p>

      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <>
          {dataset ? (
            <div>
              <h3>Original Dataset Preview</h3>
              <table>
                <thead>
                  <tr>
                    {dataset.columns.map((col) => (
                      <th key={col}>{col}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {dataset.data.map((row, index) => (
                    <tr key={index}>
                      {Object.entries(row).map(([key, val], i) => (
                        <td key={i}>{val}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
              <button onClick={handleCleanData} className="clean-btn">
                Clean Data
              </button>
            </div>
          ) : (
            <p>No dataset available. Please check your connection or restart the application.</p>
          )}

          {cleanedData && (
            <div>
              <h3>Cleaned Dataset Preview</h3>
              <table>
                <thead>
                  <tr>
                    {Object.keys(cleanedData[0]).map((col) => (
                      <th key={col}>{col}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {cleanedData.map((row, index) => (
                    <tr key={index}>
                      {Object.values(row).map((val, i) => (
                        <td key={i}>{val}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="summary">
                <h4>Cleaning Summary</h4>
                <p>Duplicates Removed: {summary.duplicates_removed}</p>
                <p>Missing Values Handled: {summary.missing_values_handled}</p>
                <p>Redundant Columns Removed: {summary.redundant_columns_removed}</p>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default RedundancyCleaning;