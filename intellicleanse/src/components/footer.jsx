import React from "react";

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
    backgroundColor: "#fff", // White background
    color: "#000", // Black text
    textAlign: "center",
    padding: "20px",
    position: "fixed",
    bottom: 0,
    width: "100%",
    fontFamily: "Arial, sans-serif",
    fontSize: "14px",
    borderTop: "1px solid #ddd", // Subtle border for separation
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
        {/* <a
          href="#about"
          style={linkStyle}
          onMouseEnter={(e) => (e.target.style.color = linkHoverStyle.color)}
          onMouseLeave={(e) => (e.target.style.color = linkStyle.color)}
        >
          About
        </a> */}
        <br/>
        
        <a
          href="#contact"
          style={linkStyle}
          onMouseEnter={(e) => (e.target.style.color = linkHoverStyle.color)}
          onMouseLeave={(e) => (e.target.style.color = linkStyle.color)}
        >
          Contact
        </a>
      </p>
    </footer>
  );
};

export default Footer;
