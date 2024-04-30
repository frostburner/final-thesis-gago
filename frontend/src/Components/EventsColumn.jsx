import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import moment from 'moment';
import "./component.css";

function EventsColumn () {
  const [listofEvents, setListofEvents] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("http://localhost:8080/events").then((response) => {
      setListofEvents(response.data);
    });
  }, []);

  // Sort the events based on createdAt in descending order
  const sortedEvents = [...listofEvents].sort((a, b) => {
    return moment(b.createdAt).valueOf() - moment(a.createdAt).valueOf();
  });

  // Get the first four events
  const latestEvents = sortedEvents.slice(0, 4);  

  return (
    <div className="bg-light vh-100">
      <div className="container">
        <div className="row pt-3">
          {latestEvents.map((event) => (
            <div key={event.id} className="col-md-12 px-3">
              <div className="card my-2">
                  <div className="row g-0">
                    <div className="col-md-4">
                    <div
                      className="card-img"
                      style={{
                        backgroundImage: `url(http://localhost:8080/uploads/${event.image})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        backgroundRepeat: 'no-repeat',
                        height: '100%',
                      }}
                    />
                    </div>
                    <div className="col-md-8">
                      <div className="card-body">
                      <h5 className="card-title fw-bold text-primary">{event.title}</h5>
                      <span className="card-text">
                        {moment(event.createdAt).format('dddd, MMMM Do YYYY')}
                      </span>
                      <button onClick={(()=> navigate(`/eventdetails/${event.id}`))} className="mt-3 button">View Details</button>
                      </div>
                    </div>
                </div>
              </div>
            </div>
          ))}
          <div className="px-3 mt-3">
            <button className="col-12 button" onClick={(()=> navigate('/eventslist'))}>See More Events</button>
          </div>
        </div>

      </div>
    </div>
  );
}

export default EventsColumn;