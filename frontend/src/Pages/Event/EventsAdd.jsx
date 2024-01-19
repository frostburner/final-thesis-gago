import React, { useContext, useState } from 'react'
import { AuthContext } from '../../Helpers/AuthContext'
import {useNavigate, Link } from 'react-router-dom';
import Navbar from '../../Components/Navbar/Navbar';
import axios from 'axios';

function EventsAdd() {
  const navigate = useNavigate();
  const {authState, setAuthState} = useContext(AuthContext);
  const [formData, setFormData] = useState({
    title:"",
    description:"",
    image: null,
    quantity: "",
    price: "",
  });

  const id = authState.id;

  const handleSubmit = async (event) => {
    event.preventDefault();

    const newFormData = new FormData();
    newFormData.append("title", formData.title);
    newFormData.append("description", formData.description);
    newFormData.append("UserId", id);
    newFormData.append("image", formData.image);
    newFormData.append("quantity", formData.quantity);
    newFormData.append("price", formData.price);

      try {
        const response = await axios.post("http://localhost:8080/events/", newFormData);
        console.log(response.data);
        navigate(0)
      } catch (error) {
        console.log(error)
    };
  }

  const handleFileChange = (event) => {
    setFormData({ ...formData, image: event.target.files[0] });
  };

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
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
      <div className="mb-3">
        <h3>Create New Event</h3>
      </div>
      <div className="border rounded p-3 mb-3">
        <form onSubmit={handleSubmit} className="p-4" autoComplete="off">
          <div className="mb-3">
            <label className="form-label">Name</label>
            <input type="text" name="title" className="form-control" placeholder="Enter Title" value={formData.title} onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label>Description</label>
            <input type="text" name="description" className="form-control" placeholder="Enter Description" value={formData.description} onChange={handleChange}/>
          </div>
          <div className="mb-3">
            <label>Ticket Quantity</label>
            <input type="number" name="quantity" className="form-control" placeholder="Enter Ticket Quantity" value={formData.quantity} onChange={handleChange}/>
          </div>
          <div className="mb-3">
            <label>Price</label>
            <input type="number" name="price" className="form-control" placeholder="Price" value={formData.price} onChange={handleChange}/>
          </div>
          <div className="mb-3">
            <label>Image</label>
            <input type="file" name="image" className="form-control" placeholder="Upload Image" onChange={handleFileChange}/>
          </div>
          <button type='submit'>Submit</button>
        </form>
      </div>
    </div>
    </>
  )
}

export default EventsAdd