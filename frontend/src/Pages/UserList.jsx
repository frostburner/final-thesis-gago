import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Navbar from "../Components/Navbar/Navbar";

const UserList = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("http://localhost:8080/users");
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
        // Handle error (e.g., show error message)
      }
    };

    fetchUsers();
  }, []);

  return (
    <>
      <Navbar />
      <div className="container mt-4">
        <h2>User List</h2>
        <ul className="list-group">
          {users.map((user) => (
            <li key={user.id} className="list-group-item">
              <div className="d-flex align-items-center">
                <img
                  src={`http://localhost:8080/uploads/${user.image}`} // Assuming user image URL is stored in 'image' field
                  alt={`Profile of ${user.firstName} ${user.lastName}`}
                  className="me-3 rounded-circle" // Add rounded-circle class for circular profile pictures
                  style={{ width: "50px", height: "50px" , objectFit: 'cover'}} // Set width and height of the profile picture
                />
                <Link
                  to={`/profile/${user.id}`}
                  className="text-decoration-none text-dark"
                >
                  {user.firstName} {user.lastName}
                </Link>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default UserList;
