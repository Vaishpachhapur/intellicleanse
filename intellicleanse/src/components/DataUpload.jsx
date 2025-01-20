import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar"; // Import Sidebar component
import axios from "axios";
import "./DataUpload.css";

const DataUpload = () => {
  const [file, setFile] = useState(null);
  const navigate = useNavigate();

  // Define the functionalities you want to display in the sidebar
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

  // Handle functionality click and navigate to the respective route
  const handleFunctionalityClick = (name) => {
    console.log("Selected functionality:", name);

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
      "Logout": "/logout",
    };

    // Navigate to the respective route
    if (routeMap[name]) {
      navigate(routeMap[name]);
    }
  };

  // Handle file change
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  // Handle file upload
  const handleUpload = async () => {
    if (!file) return alert("Please select a file.");

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post("http://localhost:3000/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.status === 200) {
        alert("File uploaded successfully!");
        navigate("/previewandprofiling"); // Navigate to preview and profiling page after upload
      }
    } catch (error) {
      console.error("Error uploading file:", error);
      alert("There was an error uploading the file.");
    }
  };

  return (
    <div className="dashboard-container">
      {/* Sidebar for navigation */}
      <Sidebar
        functionalities={functionalities}
        onFunctionalityClick={handleFunctionalityClick} // Pass click handler
      />

      {/* Main content area */}
      <div className="data-upload-container">
        <div className="data-upload">
          <h2>Upload Dataset</h2>
          <div className="file-upload">
            <input type="file" accept=".csv, .xlsx" onChange={handleFileChange} />
          </div>
          <button onClick={handleUpload}>Upload</button>
        </div>
      </div>
    </div>
  );
};

export default DataUpload;


// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import Sidebar from "./Sidebar"; // Import Sidebar component
// import axios from "axios";
// import "./DataUpload.css";

// const DataUpload = () => {
//   const [file, setFile] = useState(null);
//   const [previewData, setPreviewData] = useState(null); // State to store preview and profiling data
//   const navigate = useNavigate();

//   // Define the functionalities you want to display in the sidebar
//   const functionalities = [
//     "Data Upload",
//     "Preview and Profiling",
//     "Redundancy and Consistency Cleaning",
//     "Outlier Detection",
//     "Data Standardization",
//     "Data Transformation",
//     "Collaborative Cleaning",
//     "Export Options",
//     "Profile",
//     "Logout",
//   ];

//   // Handle functionality click and navigate to the respective route
//   const handleFunctionalityClick = (name) => {
//     console.log("Selected functionality:", name);

//     // Mapping functionalities to routes
//     const routeMap = {
//       "Data Upload": "/dataupload",
//       "Preview and Profiling": "/previewandprofiling",
//       "Redundancy and Consistency Cleaning": "/redundancy-cleaning",
//       "Outlier Detection": "/outlier-detection",
//       "Data Standardization": "/data-standardization",
//       "Data Transformation": "/data-transformation",
//       "Collaborative Cleaning": "/collaborative-cleaning",
//       "Export Options": "/export-options",
//       "Profile": "/profile",
//       "Logout": "/logout",
//     };

//     // Navigate to the respective route
//     if (routeMap[name]) {
//       navigate(routeMap[name]);
//     }
//   };

//   // Handle file change
//   const handleFileChange = (e) => {
//     setFile(e.target.files[0]);
//   };

//   // Handle file upload and preview
//   const handleUpload = async () => {
//     if (!file) return alert("Please select a file.");

//     const formData = new FormData();
//     formData.append("file", file);

//     try {
//       // Upload the file
//       const uploadResponse = await axios.post("http://localhost:3000/upload", formData, {
//         headers: {
//           "Content-Type": "multipart/form-data",
//         },
//       });

//       if (uploadResponse.status === 200) {
//         alert("File uploaded successfully!");

//         // Fetch the preview and profiling data
//         const tableName = file.name.split(".")[0]; // Assuming the table name is derived from the file name
//         const previewResponse = await axios.get("http://localhost:5001/previewandprofiling", {
//           params: { table_name: tableName },
//         });

//         if (previewResponse.status === 200) {
//           setPreviewData(previewResponse.data); // Store the preview data in state
//         }
//       }
//     } catch (error) {
//       console.error("Error:", error);
//       alert("There was an error processing the file.");
//     }
//   };

//   return (
//     <div className="dashboard-container">
//       {/* Sidebar for navigation */}
//       <Sidebar
//         functionalities={functionalities}
//         onFunctionalityClick={handleFunctionalityClick} // Pass click handler
//       />

//       {/* Main content area */}
//       <div className="data-upload-container">
//         <div className="data-upload">
//           <h2>Upload Dataset</h2>
//           <div className="file-upload">
//             <input type="file" accept=".csv, .xlsx" onChange={handleFileChange} />
//           </div>
//           <button onClick={handleUpload}>Upload and Preview</button>
//         </div>

//         {/* Display preview and profiling data */}
//         {previewData && (
//           <div className="preview-profiling">
//             <h2>Dataset Preview and Profiling</h2>
//             <div>
//               <h3>Column Names:</h3>
//               <ul>
//                 {previewData.column_names.map((col, index) => (
//                   <li key={index}>{col}</li>
//                 ))}
//               </ul>
//             </div>
//             <div>
//               <h3>Data Types:</h3>
//               <ul>
//                 {previewData.data_types.map((type, index) => (
//                   <li key={index}>{type}</li>
//                 ))}
//               </ul>
//             </div>
//             <div>
//               <h3>Missing Values:</h3>
//               <ul>
//                 {previewData.missing_values.map((value, index) => (
//                   <li key={index}>{value}</li>
//                 ))}
//               </ul>
//             </div>
//             <div>
//               <h3>Number of Duplicates:</h3>
//               <p>{previewData.duplicates}</p>
//             </div>
//             <div>
//               <h3>Key Statistics:</h3>
//               <pre>{JSON.stringify(previewData.key_statistics, null, 2)}</pre>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default DataUpload;
