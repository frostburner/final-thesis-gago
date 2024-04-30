import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../Helpers/AuthContext";
import Navbar from "./Navbar/Navbar";
import moment from "moment";

function Newsfeed() {
  const navigate = useNavigate();
  const { authState, setAuthState } = useContext(AuthContext);
  const id = authState.id;
  const [formData, setFormData] = useState({
    message: "",
    media: null,
    UserId: id,
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8080/posts/",
        formData
      );
      console.log("success");
      setTimeout(() => {
        navigate(0);
      }, 500);
    } catch (error) {
      console.log(error.response);
      console.log(error);
    }
  };

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  return (
    <>
      <div className="">
        <div className="bg-light border-success card p-3">
          <div className="p-3">
            {/* <h5 className="mb-5">Write Post</h5> */}
            <div className="mb-3">
              <form onSubmit={handleSubmit} autoComplete="off">
                <input
                  type="text"
                  name="message"
                  className="form-control mb-3"
                  placeholder="Write Post"
                  value={formData.message}
                  onChange={handleChange}
                />
                 <button type="submit" className="col-12 button">Post</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Newsfeed;
