import React from "react";
import "../../index.css";
import { Link, useNavigate } from "react-router-dom";
import Sidebar from "../../Components/Sidebar/Sidebar.jsx";

function DisplayUser() {
  const navigate = useNavigate();

  const logout = () => {
    // localStorage.removeItem("accessToken");
    navigate("/");
  };

  return (
    <div className="d-flex w-100">
      <Sidebar />
      <div className="p-3 col-9 bg-success">Display User</div>
    </div>
  );
}

export default DisplayUser;
