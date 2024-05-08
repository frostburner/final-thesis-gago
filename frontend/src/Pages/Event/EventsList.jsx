import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Navbar from "../../Components/Navbar/Navbar";
import { AuthContext } from "../../Helpers/AuthContext";
import "./event-css.css";

function EventsList() {
  const navigate = useNavigate();
  const { authState } = useContext(AuthContext);
  const [allEvents, setAllEvents] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8080/events")
      .then((response) => {
        setAllEvents(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <>
      <Navbar />
      <div className="mt-5 mb-3 px-5">
        {authState.role === 2 && ( // Show create event button only for event organizers
          <div className="">
            <button className="mb-3" onClick={() => navigate("/eventadd")}>
              Create Event
            </button>
          </div>
        )}
        <div className="row">
          {allEvents.map((event) => (
            <div className="col-sm-4" key={event.id}>
              <div className="card mb-3">
                <img
                  src={`http://localhost:8080/uploads/${event.image}`}
                  className="card-img-top card-img"
                  alt=""
                />
                <div className="card-body">
                  <h2 className="card-title">{event.title}</h2>
                  <p className="card-text">{event.eventuser?.username}</p>
                  <button
                    onClick={() => navigate(`/eventdetails/${event.id}`)}
                    className="bg-primary"
                  >
                    View
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default EventsList;