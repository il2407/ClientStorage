import React from "react";
import "./Navbar.css";
import Logo from "../../assets/images/logo.png";
const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg fixed-top proximeet-navbar">
      <div className="container-fluid">
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="offcanvas"
          data-bs-target="#sidebar"
          aria-controls="offcanvasExample"
        >
          <span className="navbar-toggler-icon" data-bs-target="#sidebar" />
        </button>

        <img
          className="navbar-brand me-auto proximeet-navbar-logo"
          src={Logo}
        />
      </div>
    </nav>
  );
};

export default Navbar;
