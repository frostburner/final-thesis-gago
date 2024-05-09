import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../Helpers/AuthContext";
import Navbar from "./Navbar/Navbar";
import moment from "moment";
import EventsColumn from "./EventsColumn";
import Newsfeed from "./Newsfeed";
import ProfilePicture from "../Pages/Profile/ProfilePicture";

function Homepage() {
  const { authState, setAuthState } = useContext(AuthContext);
  const navigate = useNavigate();
  const [listOfPosts, setListOfPosts] = useState([]);
  const id = authState.id;

  useEffect(() => {
    axios.get("http://localhost:8080/posts/").then((response) => {
      setListOfPosts(response.data);
    });
  }, []);

  return (
    <>
      <Navbar />
      <div className="d-flex">
        <div className="col-4">
          <EventsColumn />
        </div>
        <div className="d-flex flex-column w-100 px-5 my-3">
          <div className="justify-content-center px-5 mt-3 mb-3 col-12">
            <Newsfeed />
          </div>
          <div className="px-5">
            {listOfPosts.map((value, key) => {
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
                    <div className="d-flex align-items-center mb-2">
                      <ProfilePicture imageUrl={`http://localhost:8080/uploads/${user.image}`} />
                      <h4 className="card-title ms-2">{value.message}</h4>
                    </div>
                    <p className="card-text">@{user.username}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}

export default Homepage;
