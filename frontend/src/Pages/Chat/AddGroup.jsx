import axios from "axios";
import React, { useContext, useState } from "react";
import { AuthContext } from "../../Helpers/AuthContext";
import { useNavigate } from 'react-router-dom';
import Navbar from "../../Components/Navbar/Navbar";
import './chat.css';

const AddGroup = () => {
  const [formData, setFormData] = useState({
    groupname: "",
  });
  const { authState } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post("http://localhost:8080/conversations/", {
        ...formData,
        username: authState.username
      });
      console.log(response);  // Log the response here within the try block
      setTimeout(() => {
        navigate('/allgroup');
      }, 1000);
    } catch (error) {
      console.log(error.response);
      console.error(error);
    }
  };

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  return (
    <>
      <Navbar />
      <form onSubmit={handleSubmit} autoComplete="off" className="add-group-form">
        <div className="form-group">
          <label htmlFor="groupname">Group Name:</label>
          <input
            type="text"
            id="groupname"
            name="groupname"
            value={formData.groupname}
            onChange={handleChange}
            className="form-input"
          />
          <button type="submit" className="submit-button">Submit</button>
        </div>
      </form>
    </>
  );
};

export default AddGroup;