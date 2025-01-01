import React from "react";
import { Link } from "react-router-dom"; // Import Link for navigation

export const Navigation = (props) => {
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
            <span className="sr-only">Toggle navigation</span>
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
        </div>
      </div>
    </nav>
  );
};
