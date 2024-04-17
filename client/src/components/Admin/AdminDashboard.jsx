import { useState } from "react";
import Menubar from "./Menubar";
import "./AdminDashboard.css";
import AddDataComponent from "./AddDataComponent";

const AdminDashboard = () => {

  const [menuOptionsVisible, setMenuOptionsVisible] = useState(false);
  const [sidebarExpanded, setSidebarExpanded] = useState(false);
  const [showAddData, setShowAddData] = useState(false);

  const toggleMenuOptions = () => {
    setMenuOptionsVisible(!menuOptionsVisible);
    console.log("Menubar Clicked");
  };

  const toggleSidebar = () => {
    setSidebarExpanded(!sidebarExpanded);
  };

  const handleAddDataClick = () => {
    setShowAddData(!showAddData);
  };

  return (
    <div className="admin-dashboard">
      <header className={`admin-navbar-parent ${sidebarExpanded ? 'sidebar-expanded' : ''}`}>
        <div className="admin-dashboard-text">Admin</div>
      </header>
      <Menubar toggleMenuOptions={toggleMenuOptions} toggleSidebar={toggleSidebar} handleAddDataClick={handleAddDataClick} />
      <div className="dashboard-content">
      {showAddData && <AddDataComponent /> }
      </div>
    </div>
  );
};

export default AdminDashboard;