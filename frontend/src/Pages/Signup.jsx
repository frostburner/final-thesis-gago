User
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import "./Signup.css";

const Signup = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    username: "",
    password: "",
    birthday: "",
    address: "",
    email: "",
    role: "",
    image: null,
  });

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formDataWithImage = new FormData();
    for (const key in formData) {
      formDataWithImage.append(key, formData[key]);
    }
    formDataWithImage.append("profilepic", formData.profilepic);

    try {
      const response = await axios.post(
        "http://localhost:8080/users/",
        formDataWithImage,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setTimeout(() => {
        navigate("/");
      }, 2000);
    } catch (error) {
      console.error(error.response);
      console.error(error);
    }
  };

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleImageChange = (event) => {
    setFormData({
      ...formData,
      image: event.target.files[0],
    });
  };

  const accountOptions = [
    { value: 0, label: "Admin" },
    { value: 1, label: "Artist" },
    { value: 2, label: "Organizer" },
  ];


  return (
    <div className="signup-container">
      <div className="box-container">
        <form onSubmit={handleSubmit} autoComplete="off">
          <div className="form-group">
            <label className="form-label">First Name</label>
            <input
              type="text"
              name="firstName"
              className="form-control"
              value={formData.firstName}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label className="form-label">Last Name</label>
            <input
              type="text"
              name="lastName"
              className="form-control"
              value={formData.lastName}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label className="form-label">Username</label>
            <input
              type="text"
              name="username"
              className="form-control"
              value={formData.username}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label className="form-label">Password</label>
            <input
              type="password"
              name="password"
              className="form-control"
              value={formData.password}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label className="form-label">Birthday</label>
            <input
              type="date"
              name="birthday"
              className="form-control"
              value={formData.birthday}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label className="form-label">Address</label>
            <input
              type="text"
              name="address"
              className="form-control"
              value={formData.address}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label className="form-label">Email</label>
            <input
              type="email"
              name="email"
              className="form-control"
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label className="form-label">What's your role?</label>
            <select
              name="role"
              className="select-control"
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

          <div className="button-container">
            <button type="submit" className="btn-primary">
              Submit
            </button>
          </div>
          <div className="link-container">
            <Link to="/">Login</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;