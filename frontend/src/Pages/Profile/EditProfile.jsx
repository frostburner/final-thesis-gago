import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, Link, useParams } from "react-router-dom";
import Navbar from "../../Components/Navbar/Navbar";
import "./profile-css.css";

const EditProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [alert, setAlert] = useState(null);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    username: "",
    birthday: "",
    address: "",
    email: "",
    image: null,
  });

  useEffect(() => {
    axios
    .get(`http://localhost:8080/users/edit/${id}` )
      .then((response) => {
        setFormData({
          firstName: response.data.firstName,
          lastName: response.data.lastName,
          username: response.data.username,
          birthday: response.data.birthday,
          address: response.data.address,
          email: response.data.email,
          image: response.data.image, // assuming image data is also returned
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setFormData({
      ...formData,
      image: file,
    });
  };

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
      const formDataToSend = new FormData();
      formDataToSend.append("firstName", formData.firstName);
      formDataToSend.append("lastName", formData.lastName);
      formDataToSend.append("username", formData.username);
      formDataToSend.append("birthday", formData.birthday);
      formDataToSend.append("address", formData.address);
      formDataToSend.append("email", formData.email);
      formDataToSend.append("image", formData.image);

      await axios.put(`http://localhost:8080/users/edit/${id}`, formDataToSend);

      // Optionally, you can redirect the user to the profile page after successful submission
      navigate(`/profile/${id}`);
    } catch (error) {
      console.log(error);
      setAlert({
        type: "danger",
        message: "An error occurred while updating the profile. Please try again later.",
      });
    }
  };

  // Add an event handler for the edit button
  const handleEditButtonClick = () => {
    // Trigger form submission when the edit button is clicked
    handleSubmit();
  };

  return (
    <>
      <Navbar />
      <div className="px-5 mt-5">
        <div className="mb-3">
          <Link to={`/profile/${id}`}>
            <span>Back</span>
          </Link>
        </div>
        <div className="mb-3">
          <h3>Edit Profile</h3>
        </div>
        <div className="border rounded p-3 mb-3">
          <form onSubmit={handleSubmit} className="p-4" autoComplete="off">
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
            <div className="mb-3">
              <label className="form-label">First Name</label>
              <input
                type="text"
                name="firstName"
                className="form-control"
                placeholder="Enter First Name"
                value={formData.firstName}
                onChange={handleChange}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Last Name</label>
              <input
                type="text"
                name="lastName"
                className="form-control"
                placeholder="Enter Last Name"
                value={formData.lastName}
                onChange={handleChange}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Username</label>
              <input
                type="text"
                name="username"
                className="form-control"
                placeholder="Enter Username"
                value={formData.username}
                onChange={handleChange}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Birthday</label>
              <input
                type="date"
                name="birthday"
                className="form-control"
                placeholder="Enter Birthday"
                value={formData.birthday}
                onChange={handleChange}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Address</label>
              <input
                type="text"
                name="address"
                className="form-control"
                placeholder="Enter Address"
                value={formData.address}
                onChange={handleChange}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Email</label>
              <input
                type="email"
                name="email"
                className="form-control"
                placeholder="Enter Email"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Image</label>
              <input
                type="file"
                name="image"
                className="form-control"
                onChange={handleFileChange}
              />
            </div>
            <button onClick={handleSubmit}>Submit</button>
          </form>
        </div>
      </div>
    </>
  );
};

export default EditProfile;
