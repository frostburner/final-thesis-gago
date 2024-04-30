import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../Helpers/AuthContext";
import Navbar from "./Navbar/Navbar";
import moment from "moment";

function Newsfeed() {
  const { authState, setAuthState } = useContext(AuthContext);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    message: "",
    media: null,
  });

  const id = authState.id;
  const handleSubmit = async (event) => {
    event.preventDefault();

    const newFormData = new FormData();
    newFormData.append("message", formData.message);
    newFormData.append("media", formData.media);
    newFormData.append("UserId", id);

    try {
      const response = await axios.post(
        "http://localhost:8080/posts",
        newFormData,
        {
          headers: {
            "Content-Type": "multipart/form-data", // Set Content-Type header for multipart data
          },
        }
      );
      console.log("response", response);
      // setTimeout(() => {
      //   navigate(0);
      // }, 500);
    } catch (error) {
      console.log(error.response);
      console.log(error);
    }
  };

  const handleFileChange = (event) => {
    setFormData({ ...formData, media: event.target.files[0] });
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
                <div className="">
                  <input
                    type="text"
                    name="message"
                    className="form-control mb-3"
                    placeholder="Write Post"
                    value={formData.message}
                    onChange={handleChange}
                  />
                  <input
                    type="file" // Add a file input for image selection
                    name="media"
                    id="media"
                    className="form-control mb-3"
                    onChange={handleFileChange}
                  />
                  {/* <label htmlFor="media" className="btn btn-primary mb-3">
                    Browse
                  </label> */}
                </div>
                <button type="submit" className="col-12">
                  Post
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Newsfeed;
