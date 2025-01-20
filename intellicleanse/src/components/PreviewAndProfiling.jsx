// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { Bar } from "react-chartjs-2";
// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   Tooltip,
//   Legend,
// } from "chart.js";
// import "./PreviewAndProfiling.css";

// // Register chart.js components
// ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

// const PreviewAndProfile = () => {
//   const [data, setData] = useState([]);
//   const [summary, setSummary] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     axios
//       .get("http://localhost:3000/data")
//       .then((response) => {
//         const fetchedData = response.data;
//         if (fetchedData.length > 0) {
//           setData(fetchedData);
//           generateSummary(fetchedData);
//         } else {
//           setError("No data available");
//         }
//       })
//       .catch((err) => {
//         console.error("Error fetching data:", err);
//         setError("Failed to fetch data");
//       })
//       .finally(() => {
//         setLoading(false);
//       });
//   }, []);

//   const generateSummary = (data) => {
//     const headers = data[0];
//     const summary = headers.map((columnName, index) => {
//       const columnData = data
//         .slice(1)
//         .map((row) => row[index]?.trim() || ""); // Handle undefined/null values
//       const isNumeric = columnData.every((value) => value && !isNaN(value));
//       const missingValues = columnData.filter((value) => value === "").length;
//       const uniqueValues = new Set(columnData).size;
//       const duplicates = columnData.length > uniqueValues;
//       const statistics = isNumeric ? calculateStatistics(columnData) : {};

//       return {
//         columnName,
//         dataType: isNumeric ? "Number" : "String",
//         missingValues,
//         duplicates,
//         ...statistics,
//       };
//     });

//     setSummary(summary);
//   };

//   const calculateStatistics = (data) => {
//     const numbers = data.filter((value) => !isNaN(value)).map(Number);
//     if (numbers.length === 0) return {};
//     const mean = numbers.reduce((sum, num) => sum + num, 0) / numbers.length;
//     const min = Math.min(...numbers);
//     const max = Math.max(...numbers);
//     return { mean, min, max };
//   };

//   if (loading) {
//     return <div>Loading data...</div>;
//   }

//   if (error) {
//     return <div>Error: {error}</div>;
//   }

//   const renderVisuals = () => {
//     const numericColumns = summary.filter((col) => col.dataType === "Number");
//     if (numericColumns.length === 0) {
//       return <p>No numeric data available for visualization.</p>;
//     }

//     return (
//       <div className="visual-statistics">
//         <h3>Visual Statistics</h3>
//         {numericColumns.map((col, index) => (
//           <div key={index} className="chart-container">
//             <h4>{col.columnName}</h4>
//             <Bar
//               data={{
//                 labels: ["Mean", "Min", "Max"],
//                 datasets: [
//                   {
//                     label: col.columnName,
//                     data: [col.mean, col.min, col.max],
//                     backgroundColor: ["#4caf50", "#2196f3", "#ff5722"],
//                   },
//                 ],
//               }}
//               options={{
//                 responsive: true,
//                 plugins: {
//                   legend: { display: false },
//                 },
//               }}
//             />
//           </div>
//         ))}
//       </div>
//     );
//   };

//   return (
//     <div className="preview-and-profiling">
//       <h2>Preview and Profiling</h2>

//       <div className="data-preview">
//         <h3>Data Preview</h3>
//         {data.length > 1 ? (
//           <table>
//             <thead>
//               <tr>
//                 {data[0]?.map((header, index) => (
//                   <th key={index}>{header}</th>
//                 ))}
//               </tr>
//             </thead>
//             <tbody>
//               {data.slice(1).map((row, rowIndex) => (
//                 <tr key={rowIndex}>
//                   {row.map((cell, cellIndex) => (
//                     <td key={cellIndex}>{cell || "-"}</td>
//                   ))}
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         ) : (
//           <p>No data to display</p>
//         )}
//       </div>

//       {summary && (
//         <div className="data-summary">
//           <h3>Summary Report</h3>
//           <table>
//             <thead>
//               <tr>
//                 <th>Column Name</th>
//                 <th>Data Type</th>
//                 <th>Missing Values</th>
//                 <th>Duplicates</th>
//                 <th>Mean</th>
//                 <th>Min</th>
//                 <th>Max</th>
//               </tr>
//             </thead>
//             <tbody>
//               {summary.map((col, index) => (
//                 <tr key={index}>
//                   <td>{col.columnName}</td>
//                   <td>{col.dataType}</td>
//                   <td>{col.missingValues}</td>
//                   <td>{col.duplicates ? "Yes" : "No"}</td>
//                   <td>{col.mean !== undefined ? col.mean.toFixed(2) : "-"}</td>
//                   <td>{col.min !== undefined ? col.min : "-"}</td>
//                   <td>{col.max !== undefined ? col.max : "-"}</td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       )}

//       {summary && renderVisuals()}
//     </div>
//   );
// };

// export default PreviewAndProfile;


import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";

const PreviewAndProfiling = () => {
  const [summary, setSummary] = useState(null);
  const [error, setError] = useState("");

  // Access the table name from the URL query parameters (we will assume the uploaded file creates a table with the name of the file)
  const location = useLocation();
  const tableName = new URLSearchParams(location.search).get("data");

  // Fetch summary when component mounts (or when tableName changes)
  useEffect(() => {
    if (tableName) {
      fetchSummary();
    }
  }, [tableName]);

  const fetchSummary = async () => {
    try {
      const response = await axios.get("http://localhost:5001/preview_summary", {
        params: { table_name: tableName },
      });
      setSummary(response.data);
      setError("");
    } catch (err) {
      setError(err.response?.data?.error || "An error occurred");
      setSummary(null);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Preview and Profiling</h2>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {summary && (
        <div style={{ marginTop: "20px" }}>
          <h3>Summary Report for Table: {tableName}</h3>
          <p><strong>Column Names:</strong> {summary.column_names.join(", ")}</p>
          <p><strong>Data Types:</strong> {summary.data_types.join(", ")}</p>
          <p><strong>Missing Values:</strong> {summary.missing_values.join(", ")}</p>
          <p><strong>Duplicates:</strong> {summary.duplicates}</p>
          <h4>Key Statistics:</h4>
          <pre style={{ background: "#f0f0f0", padding: "10px" }}>
            {JSON.stringify(summary.key_statistics, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
};

export default PreviewAndProfiling;
