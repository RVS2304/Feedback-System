import { useState } from "react";
import Menubar from "./Menubar";
import "./HodDashboard.css";

const HodDashboard = () => {

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
    <div className="hod-dashboard">
      <header className={`hod-navbar-parent ${sidebarExpanded ? 'sidebar-expanded' : ''}`}>
        <div className="hod-dashboard-text">Hod Name</div>
      </header>
      <Menubar toggleMenuOptions={toggleMenuOptions} toggleSidebar={toggleSidebar} />
    </div>
  );
};

export default HodDashboard;