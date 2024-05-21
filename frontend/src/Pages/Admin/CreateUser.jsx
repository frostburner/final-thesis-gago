import React, { useEffect, useState } from "react";
import "../../index.css";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Sidebar from "../../Components/Sidebar/Sidebar.jsx";

function CreateUser() {
  const [alert, setAlert] = useState(null);
  const navigate = useNavigate();
  const [data, setData] = useState({
    username: "",
    password: "",
    role: "",
  });
  const [formError, setFormError] = useState("");

  const handleInputChange = (event) => {
    setData({
      ...data,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!data.username || !data.password || !data.role) {
      setFormError("Please complete all fields.");
      setTimeout(() => {
        setFormError("");
      }, 1500);
      return;
    }

    try {
      await axios.post("http://localhost:8080/users", data).then((response) => {
        console.log("User created successfully");
        setAlert({ type: "success", message: "User created successfully!" });
        setTimeout(() => {
          navigate("/DisplayUser");
        }, 1500);
      });
    } catch (error) {
      if (
        error.response &&
        error.response.status >= 400 &&
        error.response.status <= 500
      ) {
        setAlert({ type: "danger", message: "Error creating user." });
      }
    }
  };

  return (
    <>
      <div className="d-flex w-100">
        <Sidebar />
        <div className="p-3 col-9">
          <div className="d-flex justify-content-end">
            <button
              className="mb-3 bg-secondary"
              onClick={() => navigate("/displayUser")}
            >
              Go Back
            </button>
          </div>
          <div>
            <form onSubmit={handleSubmit}>
              {alert && (
                <div
                  className={`alert alert-${alert.type} alert-dismissible fade show`}
                  role="alert"
                >
                  {alert.message}
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="alert"
                    aria-label="Close"
                  ></button>
                </div>
              )}
              {formError && (
                <div className="alert alert-danger" role="alert">
                  {formError}
                </div>
              )}
              <div className="mb-3">
                <label htmlFor="username" className="form-label">
                  Username
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="username"
                  name="username"
                  value={data.username}
                  onChange={handleInputChange}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="password" className="form-label">
                  Password
                </label>
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  name="password"
                  value={data.password}
                  onChange={handleInputChange}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="role" className="form-label">
                  Role
                </label>
                <select
                  className="form-select"
                  id="role"
                  name="role"
                  value={data.role}
                  onChange={handleInputChange}
                >
                  <option>Select a role</option>
                  <option value="0">Admin</option>
                  <option value="1">Artist</option>
                  <option value="2">Event Organizer</option>
                </select>
              </div>
              <button type="submit" className="w-100 mt-3">
                Create User
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default CreateUser;
