import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.bundle";
import { Routes, Route, Navigate } from "react-router-dom";
import AddUser from "../pages/AddUser";
import AllUsers from "../pages/AllUsers";
import Navbar from "../components/Navbar/Navbar";
import Sidebar from "../components/Sidebar/Sidebar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ImportFile from "../pages/ImportFile";
const AppRoutes: React.FC = () => {
  return (
    <>
      <ToastContainer />
      <Navbar />
      <Sidebar />
      <Routes>
        <Route path="/" element={<Navigate to="/add-user" />} />
        <Route path="/add-user" element={<AddUser />} />
        <Route path="/all-users" element={<AllUsers />} />
        <Route path="/file-upload" element={<ImportFile />} />
      </Routes>
    </>
  );
};

export default AppRoutes;
