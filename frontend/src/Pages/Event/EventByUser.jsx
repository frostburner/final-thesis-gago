import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../../Helpers/AuthContext";
import Navbar from "../../Components/Navbar/Navbar";
import moment from 'moment';

function EventByUser() {
    const [allEvents, setAllEvents] = useState([]);
    const [totalEarnings, setTotalEarnings] = useState(0);
    const { authState, setAuthState } = useContext(AuthContext);
    const navigate = useNavigate();
    const id = authState.id;

    useEffect(() => {
        axios
          .get(`http://localhost:8080/events/viewBy/${id}`)
          .then((response) => {
            setAllEvents(response.data);
            console.log(response.data);
          })
          .catch((error) => {
            console.log(error);
          });
      }, [id]);

      useEffect(() => {
        const calculateTotalEarnings = async () => {
          let earnings = 0;
          for (const event of allEvents) {
            try {
              const response = await axios.get(`http://localhost:8080/eventCheckouts/earnings/${event.id}`);
              earnings += response.data.totalEarnings;
            } catch (error) {
              console.log(error);
            }
          }
          setTotalEarnings(earnings);
        };
    
        calculateTotalEarnings();
      }, [allEvents]);

      const handleDelete = async (id) => {
        try {
          await axios.delete(`http://localhost:8080/events/${id}`);
          console.log("Event deleted successfully");
          navigate(0);
        } catch (error) {
          console.error("Error deleting event:", error);
        }
      };

  return (
    <>
      <Navbar />
      <div className="px-5 mt-5">
        <div className="mb-3">
          <Link path to="/eventslist">
          <span>Back</span>
          </Link>
        </div>        
        <div className="card mb-3 p-3">
          <div className="card-title pb-0">
            <h4>Total Earnings</h4>
          </div>
          <p className="card-subtitle">Total Sales as of {moment().format("dddd, MMMM Do YYYY, h:mm:ss a")}</p>
          <p className="card-title fs-2">&#8369; {totalEarnings} </p>
        </div>
        <div className="row">
          {allEvents.map((events) => (
            <div className="col-sm-4" key={events.id}>
              <div className="card">
                <img
                  src={`http://localhost:8080/uploads/${events.image}`}
                  className="card-img-top card-img"
                  alt=""
                />
                <div className="card-body">
                  <h2 className="card-title">{events.title}</h2>
                  <p className="card-subtitle">{events.eventuser.username}</p>
                  <div className="pt-3 d-flex flex-row gap-2">
                    <button className="bg-primary" onClick={() => navigate(`/eventdetails/${events.id}`)}>
                      View
                    </button>
                    <button className="bg-secondary" 
                      onClick={() => navigate(`/eventupdate/${events.id}`)}
                    >
                      Update
                    </button>
                    <button className="bg-danger" onClick={() => handleDelete(events.id)}>
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

export default EventByUser