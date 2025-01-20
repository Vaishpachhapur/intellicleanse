import React, { useState } from "react";
import { FaPaperPlane } from "react-icons/fa";  // Add an icon for the submit button

/**
 * Contact component for user inquiries.
 * Provides a form to collect user details and messages.
 *
 * @component
 * @example
 * return (
 *   <Contact />
 * )
 */
const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form Data being sent:", formData); // Log form data to the console
    setIsSubmitting(true);
  
    try {
      // Send form data to the backend API
      const response = await fetch("http://localhost:3000/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),  // Make sure you're sending data as JSON
      });
      
      const responseData = await response.json();  // Get the response data
  
      if (response.ok) {
        setSubmitMessage(responseData.message || "Thank you for contacting us! We will get back to you soon.");
        setFormData({ name: "", email: "", message: "" });
      } else {
        setSubmitMessage(responseData.message || "There was an issue submitting your message. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting contact form:", error);
      setSubmitMessage("An error occurred. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };
  

  const formStyle = {
    maxWidth: "600px",
    margin: "0 auto",
    padding: "30px",
    border: "1px solid #ddd",
    borderRadius: "10px",
    boxShadow: "0 10px 20px rgba(0, 0, 0, 0.1)",
    backgroundColor: "#ffffff",
    backgroundImage: "linear-gradient(145deg, #f6f9fc, #e3e9f1)",
  };

  const inputStyle = {
    width: "100%",
    padding: "12px",
    margin: "12px 0",
    border: "1px solid #ccc",
    borderRadius: "8px",
    fontSize: "16px",
    transition: "all 0.3s ease-in-out",
  };

  const buttonStyle = {
    backgroundColor: "#007bff",
    color: "#fff",
    padding: "12px 20px",
    border: "none",
    borderRadius: "50px",
    cursor: "pointer",
    fontSize: "16px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    transition: "transform 0.3s ease-in-out",
  };

  const buttonHoverStyle = {
    backgroundColor: "#0056b3",
    transform: "scale(1.1)",
  };

  return (
  <div>
    <br/>
    <br/><br/>
    <div style={{ padding: "50px 20px", fontFamily: "Arial, sans-serif", backgroundColor: "#f4f7fc" }}>
      <h2 style={{ textAlign: "center", fontSize: "2.5rem", marginBottom: "20px", color: "#003366" }}>Contact Us</h2>
      
      <form style={formStyle} onSubmit={handleSubmit}>
        <label style={{ fontWeight: "bold" }}>Name:</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          style={inputStyle}
          required
        />
        
        <label style={{ fontWeight: "bold" }}>Email:</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          style={inputStyle}
          required
        />
        
        <label style={{ fontWeight: "bold" }}>Message:</label>
        <textarea
          name="message"
          value={formData.message}
          onChange={handleChange}
          style={{ ...inputStyle, height: "120px" }}
          required
        ></textarea>
        
        <button
          type="submit"
          style={buttonStyle}
          onMouseEnter={(e) => (e.target.style.backgroundColor = buttonHoverStyle.backgroundColor)}
          onMouseLeave={(e) => (e.target.style.backgroundColor = buttonStyle.backgroundColor)}
          disabled={isSubmitting}
        >
          {isSubmitting ? "Submitting..." : (
            <>
              <FaPaperPlane style={{ marginRight: "8px" }} />
              Submit
            </>
          )}
        </button>
      </form>

      {submitMessage && (
        <p
          style={{
            textAlign: "center",
            marginTop: "20px",
            fontSize: "1.1rem",
            color: isSubmitting ? "orange" : "green",
            fontWeight: "bold",
          }}
        >
          {submitMessage}
        </p>
      )}
    </div>
    </div>
  );
};

export default Contact;
