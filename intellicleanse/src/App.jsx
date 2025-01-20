import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"; // React Router v6 components
import { Navigation } from "./components/navigation";
import { Header } from "./components/header";
import About from "./components/about";
import Footer from "./components/footer";
import Login from "./components/Login";
import Sidebar from "./components/Sidebar";
import Signup from "./components/Signup";
import Dashboard from "./components/Dashboard";
import DataUpload from "./components/DataUpload";
import RedundancyCleaning from "./components/RedundancyCleaning";
import CollaborativeCleaning from "./components/CollaborativeCleaning";
import DataTransformation from "./components/DataTransformation";
import ExportOptions from "./components/ExportOptions";
import Logout from "./components/Logout";
import OutlierDetection from "./components/OutlierDetection";
import ProfilePage from "./components/ProfilePage";
import PreviewAndProfile from "./components/PreviewAndProfiling";
import SmoothScroll from "smooth-scroll";
import "./App.css";
import Contact from "./components/Contact";
import Dummy from "./components/Dummy";
// Initialize smooth scrolling for navigation links
export const scroll = new SmoothScroll('a[href*="#"]', {
  speed: 1000,
  speedAsDuration: true,
});

const App = () => {
  // const [landingPageData] = useState({});
  // const [showFloatingContent, setShowFloatingContent] = useState(true);

  // useEffect(() => {
    // Set landing page data if required
    // setLandingPageData(JsonData);
  // }, []);

  return (
    <Router>
      
      <Routes>
        {/* Route for Home */}
        {/* <Route path="/" element={<Header data={landingPageData.Header} />} /> */}
        <Route path="/" element= {< Header />} />

        {/* Route for About */}
        <Route path="/about" element={<About />} />

        {/* Route for Login */}
        <Route path="/login" element={<Login />} />

        {/* Route for Signup */}
        <Route path="/signup" element={<Signup />} />

        {/* Route for Dashboard */}
        <Route path="/dashboard" element={<Dashboard />} />

        {/* Optional Sidebar for Dashboard */}
        <Route path="/sidebar" element={<Sidebar />} />

        {/* Route for Contact */}
        <Route path="/contact" element={<Contact />} />
        {/* Route for Data Upload */}
        <Route path="/dataupload" element={<DataUpload />} />
        {/* Route for Preview and profiling*/}
        <Route path="/previewandprofiling" element={<PreviewAndProfile/>} />
        
        {/* Route for Redundancy Cleaning */}
        <Route path="/redundancy-cleaning" element={<RedundancyCleaning />} />
        {/* Route for Collaborative Cleaning */}
        <Route path="/collaborative-cleaning" element={<CollaborativeCleaning />} />
        {/* Route for Data Transformation */}
        <Route path="/data-transformation" element={<DataTransformation />} />
        {/* Route for Export Options */}
        <Route path="/export-options" element={<ExportOptions />} />
        {/* Route for Outlier Detection */}
        <Route path="/outlier-detection" element={<OutlierDetection />} />
        {/* Route for Profile Page */}
        <Route path="/profile" element={<ProfilePage />} />
        {/* Route for Logout */}
        <Route path="/logout" element={<Logout />} />

        <Route path="/dummy" element={<Dummy />} />
      </Routes>
      
      <Navigation />
      <Footer />
    </Router>
  );
};

export default App;
