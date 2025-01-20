import React from "react";
import { Link, useLocation } from "react-router-dom"; // Import useLocation for current route

export const Navigation = (props) => {
  const location = useLocation();  // Get the current location (path)

  // Define an array of paths where you don't want to show the navigation links
  const pathsWithoutNav = ["/dashboard", "/sidebar", "/dataupload", "/previewandprofiling",
                           "/redundancy-cleaning", "/collaborative-cleaning", "/data-transformation", 
                           "/export-options", "/outlier-detection", "/profile"];

  return (
    <nav id="menu" className="navbar navbar-default navbar-fixed-top">
      <div className="container">
        <div className="navbar-header">
          <button
            type="button"
            className="navbar-toggle collapsed"
            data-toggle="collapse"
            data-target="#bs-example-navbar-collapse-1"
          >
            <span className="sr-only"></span>
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>
          </button>
          <Link className="navbar-brand page-scroll" to="/">
            INTELLICLEANSE
          </Link>
        </div>

        <div
          className="collapse navbar-collapse"
          id="bs-example-navbar-collapse-1"
        >
          {/* Conditionally render the menu links based on the current path */}
          {!pathsWithoutNav.includes(location.pathname) && (
            <ul className="nav navbar-nav navbar-right">
              <li>
                <Link to="/" className="page-scroll">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="page-scroll">
                  About
                </Link>
              </li>
              <li>
                <Link to="/login" className="page-scroll">
                  Login
                </Link>
              </li>
              <li>
                <Link to="/signup" className="page-scroll">
                  Signup
                </Link>
              </li>
            </ul>
          )}
        </div>
      </div>
    </nav>
  );
};
