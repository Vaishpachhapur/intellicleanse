import React from "react";
import "./about.css";

/**
 * About page component for the web application.
 * Displays information about the application's purpose, features, and team.
 *
 * @component
 * @example
 * return (
 *   <About />
 * )
 */
const About = () => {
  return (
    <div>
      <br/><br/>
    <div className="about-container">
      <br/>
      <h1>About Intellicleanse</h1>

      {/* Image Section */}
      {/* <div className="about-image">
        <img src="/img/testimonials/about.jpg" alt="Intellicleanse" />
      </div> */}

      <p>
        Welcome to <strong>Intellicleanse</strong>, your ultimate solution for efficient and intelligent data cleansing.
        Our platform is designed to streamline the process of preparing raw datasets for analysis by addressing
        common data quality issues such as missing values, duplicate entries, and inconsistencies.
      </p>

      <h2>Our Mission</h2>
      <p>
        At Intellicleanse, our mission is to empower data analysts, researchers, and businesses with tools that simplify 
        data preparation and enhance the accuracy of insights. We aim to make data-driven decision-making accessible to everyone.
      </p>

      <h2>Key Features</h2>
      <ul className="features-list">
        <li>Effortless data upload and profiling</li>
        <li>Advanced duplicate removal and missing value imputation</li>
        <li>Outlier detection with interactive visualizations</li>
        <li>Customizable cleaning rules for consistency</li>
        <li>Collaborative cleaning with version control</li>
        <li>Export options with detailed cleaning logs</li>
        <li>AI-assisted data insights</li>
      </ul>

      <h2>Get in Touch</h2>
      <p>
        Have questions or want to learn more? Reach out to us through our <a href="/contact">Contact</a> page. We'd love to hear from you!
      </p>
      </div>
    </div>
  );
};

export default About;
