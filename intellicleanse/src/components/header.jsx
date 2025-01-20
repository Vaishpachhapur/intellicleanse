import React from "react";
import "./Header.css";

export const Header = (props) => {
  return (
    <header id="header">
      <div className="intro">
        <div className="overlay">
          <p>{props.data ? props.data.paragraph : ""}</p>
        </div>
        <h1 className="">WELCOME <br /> TO</h1>
      </div>
      <div className="data-cleanse-container">
        <div className="fact-box">
          <h3>Remove Duplicates</h3>
          <p>Ensure there are no duplicate records in the dataset.</p>
        </div>
        <div className="fact-box">
          <h3>Fix Inconsistent Formatting</h3>
          <p>Standardize formats for dates, names, etc.</p>
        </div>
        <div className="fact-box">
          <h3>Handle Missing Values</h3>
          <p>Identify and fill or remove missing data.</p>
        </div>
        <div className="fact-box">
          <h3>Validate Data Accuracy</h3>
          <p>Check if the data follows rules or constraints.</p>
        </div>
      </div>
      <a href="/login" className="redirect-button">Start Data Cleansing</a>
    </header>
  );
};
