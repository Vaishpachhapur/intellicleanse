// import React, { useState, useEffect } from "react";
// import { useLocation } from "react-router-dom"; // Import useLocation for current path
// import "./Sidebar.css"; // Import the CSS file for styling

// const Sidebar = ({ functionalities, onFunctionalityClick }) => {
//   const [collapsed, setCollapsed] = useState(false);
//   const location = useLocation(); // Get the current route path

//   // Define the paths where the sidebar should NOT be visible
//   const pathsWithoutNav = ["/","/login","/signup", "/contact", ""];

//   // Toggle collapse state
//   const toggleSidebar = () => {
//     setCollapsed(!collapsed);
//   };

//   // Check if the current path is one of the paths without navigation
//   const isSidebarVisible = !pathsWithoutNav.includes(location.pathname);

//   return (
//     <>
//       <br />
//       <br />
//       <br />
//       <br />

//       {/* Conditionally render Sidebar based on current path */}
//       {isSidebarVisible && (
//         <div className={`sidebar ${collapsed ? "collapsed" : ""}`}>
//           <button className="collapse-btn" onClick={toggleSidebar}>
//             {collapsed ? ">" : "<"} {/* Icon indicating collapse/expand */}
//           </button>
//           <ul>
//             {functionalities.map((func, index) => (
//               <li key={index} onClick={() => onFunctionalityClick(func)}>
//                 {func}
//               </li>
//             ))}
//           </ul>
//         </div>
//       )}
//     </>
//   );
// };

// export default Sidebar;

import React, { useState } from "react";
import "./Sidebar.css";

const Sidebar = ({ functionalities, onFunctionalityClick }) => {
  // State to track whether the sidebar is collapsed or not
  const [collapsed, setCollapsed] = useState(false);

  // Toggle the collapsed state
  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  return (
    <div className={`sidebar ${collapsed ? "collapsed" : ""}`}>
      <div className="sidebar-toggle" onClick={toggleSidebar}>
        {/* Icon or text to indicate toggle */}
        {collapsed ? "→" : "←"}
      </div>
      <ul className={`sidebar-list ${collapsed ? "collapsed" : ""}`}>
        {functionalities.map((func, index) => (
          <li key={index} onClick={() => onFunctionalityClick(func)}>
            {func}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
