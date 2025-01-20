import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import Sidebar from "./Sidebar";
import "./Sidebar.css"; 
import "./Dashboard.css";
import DataUpload from "./DataUpload";
import PreviewAndProfiling from "./PreviewAndProfiling";
import RedundancyCleaning from "./RedundancyCleaning";
import OutlierDetection from "./OutlierDetection";
import DataStandardization from "./DataStandardization";
import DataTransformation from "./DataTransformation";
import CollaborativeCleaning from "./CollaborativeCleaning";
import ExportOptions from "./ExportOptions";
import ProfilePage from "./ProfilePage";
import Logout from "./Logout";

const Dashboard = () => {
  const navigate = useNavigate(); // Use the navigate hook

  const functionalities = [
    "Data Upload",
    "Preview and Profiling",
    "Redundancy and Consistency Cleaning",
    "Outlier Detection",
    "Data Standardization",
    "Data Transformation",
    "Collaborative Cleaning",
    "Export Options",
    "Profile", 
    "Logout"
  ];

  const handleFunctionalityClick = (name) => {
    console.log("Selected functionality:", name); // Debug
    
    // Mapping functionalities to routes
    const routeMap = {
      "Data Upload": "/dataupload",
      "Preview and Profiling": "/previewandprofiling",
      "Redundancy and Consistency Cleaning": "/redundancy-cleaning",
      "Outlier Detection": "/outlier-detection",
      "Data Standardization": "/data-standardization",
      "Data Transformation": "/data-transformation",
      "Collaborative Cleaning": "/collaborative-cleaning",
      "Export Options": "/export-options",
      "Profile": "/profile",
      "Logout": "/logout"
    };

    // Navigate to the respective route
    if (routeMap[name]) {
      navigate(routeMap[name]);
    }
  };

  return (
    <div className="dashboard-container">
      <Sidebar
        functionalities={functionalities}
        onFunctionalityClick={handleFunctionalityClick}
      />
      <div className="main-content">
        <br/><br/><br/><br/>
        {/* The conditional rendering is no longer needed */}
      </div>
    </div>
  );
};

export default Dashboard;
