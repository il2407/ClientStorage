import React from "react";
import { AiOutlineUserAdd, AiOutlineCloudUpload } from "react-icons/ai";
import { FaListAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import "./Sidebar.css";

const Sidebar = () => {
  return (
    <div
      className="offcanvas offcanvas-start sidebar-nav proximeet-sidebar"
      tabIndex={-1}
      id="sidebar"
    >
      {/*change to the following*/}
      {/*const NavLinkItem = ({ to, icon, text }) => {
  return (
    <li>
      <Link to={to} className="nav-link px-3">
        <span className="me-2">{icon}</span>
        <span>{text}</span>
      </Link>
    </li>
  );
};

// Usage
<NavLinkItem to="/" icon={<AiOutlineUserAdd />} text="Add Client" />
<NavLinkItem to="/all-users" icon={<FaListAlt />} text="All Clients" />
<NavLinkItem to="/file-upload" icon={<AiOutlineCloudUpload />} text="Import File" */}
      <div className="offcanvas-body p-0">
        <nav className="navbar-dark">
          <ul className="navbar-nav">
            <li>
              <Link to="/" className="nav-link px-3">
                <span className="me-2">
                  <AiOutlineUserAdd />
                </span>
                <span>Add Client</span>
              </Link>
            </li>
            <li>
              <Link to="/all-users" className="nav-link px-3">
                <span className="me-2">
                  <FaListAlt />
                </span>
                <span>All Clients</span>
              </Link>
            </li>
            <li>
              <Link to="/file-upload" className="nav-link px-3">
                <span className="me-2">
                  <AiOutlineCloudUpload />
                </span>
                <span>Import File</span>
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;
