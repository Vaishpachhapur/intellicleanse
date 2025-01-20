import React from "react";
import { Link } from "react-router-dom";

/**
 * Footer component for the landing page.
 * Displays a fixed footer with links and copyright information.
 *
 * @component
 * @example
 * return (
 *   <Footer />
 * )
 */
const Footer = () => {
  const footerStyle = {
    backgroundColor: "rgba(255, 255, 255, 0.8)", // White background with transparency
    color: "#000", // Black text
    textAlign: "center",
    padding: "2px",
    position: "fixed",
    bottom: 0,
    width: "100%",
    fontFamily: "Arial, sans-serif",
    fontSize: "14px",
    // borderTop: "1px solid rgba(221, 221, 221, 0.8)", // Subtle border with transparency
    backdropFilter: "blur(10px)", // Adds a blur effect for better readability
    zIndex: 1000, // Ensures it stays on top of other content
  };

  const linkStyle = {
    color: "#007bff", // Blue for links
    textDecoration: "none",
    fontWeight: "bold",
    marginLeft: "10px",
    marginRight: "10px",
    transition: "color 0.3s ease",
  };

  const linkHoverStyle = {
    color: "#0056b3", // Darker blue on hover
  };

  return (
    <footer style={footerStyle}>
      <p>
        &copy; {new Date().getFullYear()} Intellicleanse. All rights reserved.
        <br />
        <Link
          to="/contact"
          style={linkStyle}
          onMouseEnter={(e) => (e.target.style.color = linkHoverStyle.color)}
          onMouseLeave={(e) => (e.target.style.color = linkStyle.color)}
        >
          Contact
        </Link>
      </p>
    </footer>
  );
};

export default Footer;
