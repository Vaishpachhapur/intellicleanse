import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const [image, setImage] = useState(null);
  const [newName, setNewName] = useState('');

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get("http://localhost:3000/profile", {
          params: { email: "user@example.com" }  // replace with dynamic user email if needed
        });
        setUser(response.data);
        setImage(response.data.image);  // Set the image from the database (if exists)
        setNewName(response.data.username);  // Set the existing name
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);

  const handleImageChange = (e) => {
    setImage(URL.createObjectURL(e.target.files[0]));  // Preview the image before uploading
  };

  const handleUpdateProfile = async () => {
    const formData = new FormData();
    formData.append('email', "user@example.com");  // replace with dynamic user email
    formData.append('username', newName);
    if (image) {
      formData.append('image', image);  // Append image file
    }

    try {
      const response = await axios.post("http://localhost:3000/update-profile", formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      alert(response.data.message);
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  return (
    <div>
      {user && (
        <div>
          <h2>Profile</h2>
          <p>Name: <input type="text" value={newName} onChange={(e) => setNewName(e.target.value)} /></p>
          <p>Email: {user.email}</p>
          <p>
            <img src={image} alt="Profile" width="100" />
            <input type="file" onChange={handleImageChange} />
          </p>
          <button onClick={handleUpdateProfile}>Update Profile</button>
        </div>
      )}
    </div>
  );
};

export default ProfilePage;
