import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../../Helpers/AuthContext";
import Navbar from "../../Components/Navbar/Navbar";
import moment from "moment";
import "./profile-css.css";

function Profile() {
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    setSelectedImage(URL.createObjectURL(file));
  };

  return (
    <>
      <Navbar />
      <div className="d-flex p-5 w-100">
        <div className="col-3 profile-photo bg-danger">
          {/* <input type="file" onChange={handleImageUpload} />
          {selectedImage && (
            <img src={selectedImage} alt="Profile" className="uploaded-image" />
          )} */}
        </div>
        <div className="profile-title col-9 bg-success">
          <div className="name-title"></div>
          <div className="name-description"></div>
        </div>
      </div>
    </>
  );
}

export default Profile;
