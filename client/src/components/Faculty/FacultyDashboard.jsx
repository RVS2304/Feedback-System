import { useState } from "react";
import Menubar from "./Menubar";
import seeFeedbacks from "./seeFeedbacks";
import "./FacultyDashboard.css";

const FacultyDashboard = () => {

  const [menuOptionsVisible, setMenuOptionsVisible] = useState(false);
  const [sidebarExpanded, setSidebarExpanded] = useState(false);

  const toggleMenuOptions = () => {
    setMenuOptionsVisible(!menuOptionsVisible);
    console.log("Menubar Clicked");
  };

  const toggleSidebar = () => {
    setSidebarExpanded(!sidebarExpanded);
  };

  return (
    <div className="faculty-dashboard">
      <header className={`faculty-navbar-parent ${sidebarExpanded ? 'sidebar-expanded' : ''}`}>
        <div className="faculty-dashboard-text">Faculty Name</div>
      </header>
      <Menubar toggleMenuOptions={toggleMenuOptions} toggleSidebar={toggleSidebar} />
      <seeFeedbacks />
    </div>
  );
};

export default FacultyDashboard;