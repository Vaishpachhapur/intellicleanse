import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"; // React Router v6 components
import { Navigation } from "./components/navigation";
import { Header } from "./components/header";
import About from "./components/about";
import Footer from "./components/footer";
import Login from "./components/Login";
import Signup from "./components/Signup";
import SmoothScroll from "smooth-scroll";
import "./App.css";

// Initialize smooth scrolling for navigation links
export const scroll = new SmoothScroll('a[href*="#"]', {
  speed: 1000,
  speedAsDuration: true,
});

const App = () => {
  const [landingPageData] = useState({});

  useEffect(() => {
    // Set landing page data if required
    // setLandingPageData(JsonData);
  }, []);

  return (
    <Router>
      <Navigation />
      <Routes>
        <Route
          path="/"
          element={<Header data={landingPageData.Header} />}
        />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        {/* Add additional routes for Login, Signup, etc., here */}
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;
