import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from 'axios'

const Signup = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    role: "",
  });
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8080/users/",
        formData
      );
      setTimeout(() => {
        navigate("/")
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
            <div >
              <label>Username</label>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
              />
            </div>
            <div >
              <label>Password</label>
              <input
                type="text"
                name="password"
                value={formData.password}
                onChange={handleChange}
              />
            </div>
            <div >
              <label>What's your role?</label>
              <select name="role" value={formData.role} onChange={handleChange}>
                <option value="" hidden>
                  Account Type
                </option>
                {accountOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              <button type="submit">Submit</button>
            </div>
          </form>
    </>
  )
}

export default Signup