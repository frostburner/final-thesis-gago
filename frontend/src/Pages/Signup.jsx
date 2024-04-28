import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

const Signup = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    role: "",
  });

  const [alert, setAlert] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8080/users/",
        formData
      );
      setTimeout(() => {
        navigate("/");
      }, 2000);
    } catch (error) {
      console.log(error.response);
      console.log(error);

      
    }
  };

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const accountOptions = [
    { value: 0, label: "Admin" },
    { value: 1, label: "Artist" },
    { value: 2, label: "Organizer" },
  ];
  return (
    <>
      <form onSubmit={handleSubmit} autoComplete="off">
        <div className="d-flex align-items-center flex-column gap-2 justify-content-center vh-100">
          <div className="mb-3">
            <label className="form-label">Username</label>
            <input
              type="text"
              name="username"
              class="form-control"
              value={formData.username}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Password</label>
            <input
              type="text"
              name="password"
              class="form-control"
              value={formData.password}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">What's your role?</label>
            <select name="role" className="form-select" value={formData.role} onChange={handleChange}>
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
          <button type="submit">Submit</button>
          <Link path to="/">
            Login
          </Link>
        </div>
      </form>
    </>
  );
};

export default Signup;
