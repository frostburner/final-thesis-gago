import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { useNavigate, Link, useParams } from "react-router-dom";
import { AuthContext } from "../../Helpers/AuthContext";
import Navbar from "../../Components/Navbar/Navbar";
import moment from "moment";
import "./profile-css.css";
import testpfp from "../../assets/testpfp.jpg";

function Profile() {
  let { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState({});
  const [posts, setPosts] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);


  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    setSelectedImage(URL.createObjectURL(file));
  };

  useEffect(() => {
    axios.get(`http://localhost:8080/users/byId/${id}`).then((response) => {
      setUser(response.data);
    });
    axios.get(`http://localhost:8080/posts/byId/${id}`).then((response) => {
      setPosts([response.data]); // Wrap the response data in an array
    });
  }, [id]);

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

  const handleEditProfile = () => {
    navigate(`/profile/edit/${id}`);
  };

  

  return (
    <>
      <Navbar />
      <div className="d-flex p-5 w-10">
      <img
  src={`http://localhost:8080/uploads/${selectedImage || user.image || 'default-profile-image.jpg'}`}
  alt="Profile"
  className="profile col-3"
  style={{ width: '300px', height: '300px', objectFit: 'cover' }}
/>
        <div className="profile-title col-9 border border-1">
          <div className="name-title p-3">
            <h1 className="fw-bold">
              {user.firstName} {user.lastName}
            </h1><span>@{user.username}</span>
            <h4>{getRoleText(user.role)}</h4>
            
            <span>Email: {user.email}</span>
            
            <hr className="mb-0" />
          </div>
          <div className="name-description p-3">
            <span>Address: {user.address}</span>
            <span>Birthday: {formatBirthday(user.birthday)}</span>
          </div>
        </div>
      </div>

<div className="d-flex mx-5 ">
        <button className="button" onClick={handleEditProfile}>
          Edit Profile
        </button>
      </div>
   
   
       <div className="d-flex p-5 w-100">
        <h2>Posts by: {user?.username || 'User'}</h2>
        <div className="px-5">
          {posts.map((value) => {
            const user = value.postuser || {};
            return (
              <div
                className="card p-2 mb-3"
                key={value.id}
                onClick={() => {
                  navigate(`/postdetails/${value.id}`);
                }}
              >
                <div className="card-body">
                  <h4 className="card-title">{value.message}</h4>
                  <p className="card-text">@{user.username}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      
    </>
  );
}

export default Profile;
