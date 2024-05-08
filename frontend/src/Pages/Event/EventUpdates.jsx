import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams, Link } from "react-router-dom";
import Navbar from "../../Components/Navbar/Navbar";

function EventUpdates() {
  const navigate = useNavigate();
  const [eventObject, setEventObject] = useState({});
  const [alert, setAlert] = useState(null);
  // const [events, setEvents] = useState([]);
  const { id } = useParams();
  // const [formData, setFormData] = useState({});

  useEffect(() => {
    axios
      .get(`http://localhost:8080/events/byId/${id}`)
      .then((response) => {
        setEventObject(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);

  // UPDAWETE FUNCTIONS ARA SA DALOM LODS

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setEventObject((prevEventObject) => ({
        ...prevEventObject,
        [name]: files[0],
      }));
    } else {
      setEventObject((prevEventObject) => ({
        ...prevEventObject,
        [name]: value,
      }));
    }
  };

  const handleUpdate = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", eventObject.title);
    formData.append("description", eventObject.description);
    formData.append("quantity", eventObject.quantity);
    formData.append("eventdate", eventObject.eventdate);
    formData.append("image", eventObject.image);
    formData.append("price", eventObject.price);

    axios
      .put(`http://localhost:8080/events/update/${id}`, formData)
      .then((response) => {
        setAlert({
          type: "success",
          message: "Event updated successfully",
        });
        setTimeout(() => {
          navigate("/eventbyuser");
        }, 2000);
      })
      .catch((error) => {
        if (
          error.response &&
          error.response.status >= 400 &&
          error.response.status <= 500
        ) {
          setAlert({
            type: "danger",
            message: "Error updating event. Please try again later.",
          });
        }
      });
  };

  return (
    <>
      <Navbar />
      <div className="px-5 mt-5">
        <div className="mb-3">
          <Link path to="/eventbyuser">
            <span>Back</span>
          </Link>
        </div>
        <div className="mb-3">
          <h3>Update Event</h3>
        </div>
        <div className="col-8 mb-3">
          <form onSubmit={handleUpdate} autoComplete="off">
            {alert && (
              <div
                className={`alert alert-${alert.type} alert-dismissible fade show`}
                role="alert"
              >
                {alert.message}
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="alert"
                  aria-label="Close"
                ></button>
              </div>
            )}
            {/* {events.image && (
              <img
                src={`http://localhost:8080/uploads/${events.image}`}
                className="mb-3 display-img"
                alt=""
              />
            )} */}
            <div className="mb-3">
              <label className="form-label">Title</label>
              <input
                type="text"
                name="title"
                className="form-control"
                value={eventObject.title || ""}
                onChange={handleChange}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Description</label>
              <input
                type="text"
                name="description"
                className="form-control"
                value={eventObject.description || ""}
                onChange={handleChange}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Quantity</label>
              <input
                type="number"
                name="quantity"
                className="form-control"
                value={eventObject.quantity || ""}
                onChange={handleChange}
              />
            </div>
            <div className="col mb-3">
              <label className="form-label">Event Date</label>
              <input
                type="date"
                name="eventdate"
                className="form-control"
                value={eventObject.eventdate || ""}
                onChange={handleChange}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Price</label>
              <input
                type="number"
                name="price"
                className="form-control"
                value={eventObject.price || ""}
                onChange={handleChange}
              />
            </div>
            <div className="mb-3">
              <label>Image</label>
              <input
                type="file"
                name="image"
                className="form-control"
                placeholder="Upload Image"
                onChange={handleChange}
              />
            </div>
            <button type="submit">Submit Changes</button>
          </form>
        </div>
      </div>
    </>
  );
}

export default EventUpdates;
