import React, { useEffect, useState } from "react";
import "../../index.css";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import Sidebar from "../../Components/Sidebar/Sidebar.jsx";

function EditUser() {
  let { id } = useParams();
  const navigate = useNavigate();
  const [userObject, setUserObject] = useState([]);
  const [alert, setAlert] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:8080/users/byId/${id}`).then((response) => {
      setUserObject(response.data);
    });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserObject((prevUserObject) => ({
      ...prevUserObject,
      [name]: value,
    }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    if (!userObject.username || !userObject.password || !userObject.role) {
      setAlert({ type: "danger", message: "Please fill in all fields." });
      return;
    }
    try {
      await axios.put(`http://localhost:8080/users/update/${id}`, userObject);
      console.log("User updated successfully");
      setAlert({ type: "success", message: "User updated successfully!" });
      console.log(userObject);
      setTimeout(() => {
        navigate("/DisplayUser");
      }, 1500);
    } catch (error) {
      if (
        error.response &&
        error.response.status >= 400 &&
        error.response.status <= 500
      ) {
        setAlert({
          type: "danger",
          message: "Error updating user. Please try again later.",
        });
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
          <form>
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
            <div className="mb-3">
              <label htmlFor="username" className="form-label">
                Username
              </label>
              <input
                type="text"
                className="form-control"
                id="username"
                name="username"
                value={userObject.username}
                onChange={handleChange}
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
                value={userObject.password}
                onChange={handleChange}
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
                value={userObject.role}
                onChange={handleChange}
              >
                <option>Select a role</option>
                <option value="0">Admin</option>
                <option value="1">Artist</option>
                <option value="2">Event Organizer</option>
              </select>
            </div>
            <button type="submit" className="w-100 mt-3" onClick={handleClick}>
              Edit User
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default EditUser;
