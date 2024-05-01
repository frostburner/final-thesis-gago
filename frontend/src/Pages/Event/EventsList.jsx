import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Navbar from "../../Components/Navbar/Navbar";
import "./event-css.css";
import moment from "moment";

function EventsList() {
  const [allEvents, setAllEvents] = useState([]);
  const [alert, setAlert] = useState(null);
  const navigate = useNavigate();

  const closeAlert = () => {
    setAlert(null);
  };

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
      <div className="mt-3 px-5">
        <div className="mb-3">
          <h3 className="fw-bold">Upcoming Events</h3>
          <hr />
        </div>
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
                  <p className="card-text">
                    {moment(event.eventdate).format("MMMM Do YYYY")}
                  </p>
                  <p className="card-text">{event.eventuser.username}</p>
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
