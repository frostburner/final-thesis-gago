import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { useNavigate, Link, useParams } from "react-router-dom";
import { AuthContext } from "../../Helpers/AuthContext";
import Navbar from "../../Components/Navbar/Navbar";
import moment from "moment";
import "./profile-css.css";

function Profile() {
  let { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState({});
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    setSelectedImage(URL.createObjectURL(file));
  };

  useEffect(() => {
    axios.get(`http://localhost:8080/users/byId/${id}`).then((response) => {
      setUser(response.data);
      console.log(listofUsers);
    });
  }, []);

  const getRoleText = (role) => {
    switch (role) {
      case 0:
        return "Admin";
      case 1:
        return "Artist";
      case 2:
        return "Event Organizer";
      default:
        return "";
    }
  };

  const formatBirthday = (dateString) => {
    const formattedDate = moment(dateString);
    const month = formattedDate.format("MMMM"); // Get full month name
    const day = formattedDate.format("DD"); // get day
    const year = formattedDate.format("YYYY"); // Get year
    return `${month} ${day} ${year}`; // Combine all with a space
  };
  return (
    <>
      <Navbar />
      <div className="d-flex p-5 w-10">
        <div className="col-3 profile-photo bg-danger">
          {/* <input type="file" onChange={handleImageUpload} />
          {selectedImage && (
            <img src={selectedImage} alt="Profile" className="uploaded-image" />
          )} */}
        </div>
        <div className="profile-title col-9 border border-1">
          <div className="name-title p-3">
            <h4 className="fw-bold">
              {user.firstName} {user.lastName}
            </h4>
            <span>{getRoleText(user.role)}</span>
            <span>{user.email}</span>
            <hr className="mb-0" />
          </div>
          <div className="name-description p-3">
            <span>{user.address}</span>
            <span>{formatBirthday(user.birthday)}</span>
          </div>
        </div>
      </div>
    </>
  );
}

export default Profile;
