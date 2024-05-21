import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import "../index.css";

const Signup = () => {
  const [alert, setAlert] = useState(null);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    username: "",
    password: "",
    birthday: "",
    address: "",
    email: "",
    role: "",
  });

  const navigate = useNavigate();

  const closeAlert = () => {
    setAlert(null);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const emptyFields = Object.values(formData).some((field) => !field);
    if (emptyFields) {
      setAlert({
        type: "danger",
        message: "Please fill in all required fields.",
      });
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:8080/users/",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log("User created successfully");
      setAlert({ type: "success", message: "User created successfully!" });
      setTimeout(() => {
        navigate("/");
      }, 1500);
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

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const accountOptions = [
    // { value: 0, label: "Admin" },
    { value: 1, label: "Artist" },
    { value: 2, label: "Organizer" },
  ];

  return (
    <div className="d-flex signup-container">
      <div className="col-6 left px-3">
        <form onSubmit={handleSubmit} autoComplete="off" className="p-5">
        <h2 className="fw-bold mb-4" style={{ display: 'flex', alignItems: 'center', width: '35%', justifyContent: 'space-between' }}>
          <img src="../../src/assets/logo-small.png" alt="" style={{ width: '50px', height: '50px', marginRight: '10px' }} />
        AudioHive
      </h2>
      {alert && (
              <div className={`alert alert-${alert.type}`} role="alert">
                {alert.message}
                <button
                  type="button" 
                  className="btn-close"
                  onClick={closeAlert}
                />
              </div>
            )}
          <div className="d-flex gap-2 flex-direction-row mb-1">
            <div className="form-group col">
              <label className="form-label">First Name</label>
              <input
                type="text"
                name="firstName"
                className="form-control"
                value={formData.firstName}
                onChange={handleChange}
              />
            </div>
            <div className="form-group col">
              <label className="form-label">Last Name</label>
              <input
                type="text"
                name="lastName"
                className="form-control"
                value={formData.lastName}
                onChange={handleChange}
              
              />
            </div>
          </div>
          <div className="d-flex gap-2 flex-direction-row mb-1">
            <div className="form-group col">
              <label className="form-label">Birthday</label>
              <input
                type="date"
                name="birthday"
                className="form-control"
                value={formData.birthday}
                onChange={handleChange}
                
              />
            </div>
            <div className="form-group col">
              <label className="form-label">Email</label>
              <input
                type="email"
                name="email"
                className="form-control"
                value={formData.email}
                onChange={handleChange}
                
              />
            </div>
          </div>
          <div className="form-group col-12 mb-1">
            <label className="form-label">Address</label>
            <input
              type="text"
              name="address"
              className="form-control"
              value={formData.address}
              onChange={handleChange}
              
            />
          </div>
          <div className="form-group mb-1">
            <label className="form-label">Username</label>
            <input
              type="text"
              name="username"
              className="form-control"
              value={formData.username}
              onChange={handleChange}
              
            />
          </div>
          <div className="form-group mb-1">
            <label className="form-label">Password</label>
            <input
              type="password"
              name="password"
              className="form-control"
              value={formData.password}
              onChange={handleChange}
              
            />
          </div>
          <div className="form-group mb-3">
            <div className="column">
              <label className="form-label">What's your role?</label>
              <select
                name="role"
                className="form-select"
                value={formData.role}
                onChange={handleChange}
              >
                <option value="" hidden>
                  Account Type
                </option>
                {accountOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="form-group">
            {/* <label className="form-label">Profile Picture</label>
            <input
              type="file"
              accept="image/*"
              name="image"
              className="form-control"
              onChange={handleImageChange}
            /> */}
          </div>

          <div className="button-container mb-3">
            <button type="submit" className="w-100 button">
              Submit
            </button>
          </div>
          <div className="text-center link-container">
            Already have an account? <Link to="/">Login</Link>
          </div>
        </form>
      </div>
      <div className="col-6 right bg-secondary"></div>
    </div>
  );
};

export default Signup;
