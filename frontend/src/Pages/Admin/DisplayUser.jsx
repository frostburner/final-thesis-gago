import React, { useEffect, useState } from "react";
import "../../index.css";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Sidebar from "../../Components/Sidebar/Sidebar.jsx";

function DisplayUser() {
  const navigate = useNavigate();
  const [listofUsers, setListofUsers] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:8080/users").then((response) => {
      setListofUsers(response.data);
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

  return (
    <div className="d-flex w-100">
      <Sidebar />
      <div className="p-3 col-9">
        <div className="d-flex justify-content-end">
          <button className="mb-3" onClick={() => navigate("/createUser")}>
            Create New User
          </button>
        </div>
        <div>
          <table>
            <thead>
              <tr>
                <th className="col-2">ID</th>
                <th className="col-4">Username</th>
                <th className="col-4">Role</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {listofUsers.map((user) => (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.username}</td>
                  <td>{getRoleText(user.role)}</td>
                  <td className="d-flex gap-2">
                    <button
                      className="mb-3 bg-success"
                      onClick={() => {
                        navigate(`/editUser/${user.id}`);
                      }}
                    >
                      Edit
                    </button>
                    <button className="mb-3 bg-danger">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default DisplayUser;
