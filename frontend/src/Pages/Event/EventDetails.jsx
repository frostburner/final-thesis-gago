import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams, Link } from "react-router-dom";
import Navbar from "../../Components/Navbar/Navbar";
import "./event-css.css";
import moment from "moment";

function EventDetails() {
  const [event, setEvent] = useState([]);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://localhost:8080/events/byId/${id}`)
      .then((response) => {
        setEvent(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);

  // DISPLAY RELATED SHEESH
  const user = event.eventuser || {};

  return (
    <>
      <Navbar />
      <div className="px-5 mt-5">
        <div className="mb-3">
          <Link path to="/home">
            <span>Back</span>
          </Link>
        </div>
        <div className="mb-3">
          <h3>Event Details</h3>
        </div>
        <div className="d-flex justify-content-center"> {/* Centering container */}
          <div className="col-8 mb-3">
            <div className="card" key={event.id}>
            <img
                src={`http://localhost:8080/uploads/${event.image}`}
                className="card-img-top display-img"
                alt=""
                style={{ maxWidth: "300px", maxHeight: "200px", objectFit: "contain",  }} // Adjust image size here
              />
              <div className="card-body">
                <p>{event.id}</p>
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <h2 className="card-title">{event.title}</h2>
                  <h2 className="card-title">&#8369;{event.price}</h2>
                </div>
                <h5 className="card-text">
                  {moment(event.eventdate).format("MMMM Do YYYY")}
                </h5>
                <span className="card-text">{event.quantity} tickets left</span>
                <hr />
                <div className="mt-2">
                  <p className="fst-italic">{event.description}</p>
                  <p className="card-text">{user.username}</p>
                </div>

                <button
                  className="col-12 mt-3"
                  onClick={() => navigate(`/eventcheckout/${event.id}`)}
                >
                  Buy Ticket
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default EventDetails;
