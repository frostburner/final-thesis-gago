import React, { useEffect, useState, useContext } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import axios from "axios";
import { AuthContext } from '../../Helpers/AuthContext';
import {alphanumericReference} from "../../Helpers/ReferenceGenerator";
import Navbar from "../../Components/Navbar/Navbar";
import "./event-css.css"

function EventCheckout() {
    const navigate = useNavigate();
    const { id } = useParams();
    const [events, setEvents] = useState([]);
    const {authState, setAuthState} = useContext(AuthContext);

    const [formData, setFormData] = useState({
        firstName:"",
        lastName:"",
        street:"",
        zipcode:"",
        email:"",
        orderQuantity: 1,
    });

    const [quantity, setQuantity] = useState(formData.orderQuantity);

    
  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
      setFormData({ ...formData, orderQuantity: quantity - 1 }); // Update form data
    }
  };

  const handleIncrement = () => {
    setQuantity(quantity + 1);
    setFormData({ ...formData, orderQuantity: quantity + 1 }); // Update form data
  };

  useEffect(() => {
    axios
      .get(`http://localhost:8080/events/byId/${id}`)
      .then((response) => {
        setEvents(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);

    const UserId = authState.id;
    const handleSubmit = async (e) => {
      e.preventDefault();
  
      try {
        const response = await axios.post("http://localhost:8080/eventCheckouts/", {
          ...formData,
          total: events.price * formData.orderQuantity,
          image: events.image,
          refno: alphanumericReference,
          UserId: UserId,
          EventId: events.id
        });
        console.log(response.data);
        navigate(0);
      } catch (error) {
        console.log("Error submitting form:", error);
      }
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
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
          <h4>Event Details</h4>
      </div>      
      <div className="row">
        <div className="col-6">
          <div className="row"> 
            <div className="col-12 mb-3">
              {events.image && (
                <img src={`http://localhost:8080/uploads/${events.image}`} className="col-12" alt="" />
              )}
            </div>
            <div className="col-12">
              <h2>{events.title}</h2>
              <h4>&#8369;{events.price}</h4>
              <p className="fst-italic">{events.description}</p>
            </div>
          </div>
        </div>
        <div className="col-6">
          <div className="mb-3">
            <h4>Event Checkout</h4>
          </div>
          <form onSubmit={handleSubmit} autoComplete="off">
            <div className="form-floating mb-3">
              <input type="text" name="firstName" id="floatingInput" placeholder="First Name" className="form-control" value={formData.firstName} onChange={handleChange} />
              <label for="floatingInput">First Name</label>
            </div>
            <div className="form-floating mb-3">
              <input type="text" name="lastName" id="floatingInput" placeholder="Last Name" className="form-control" value={formData.lastName} onChange={handleChange} />
              <label for="floatingInput">Last Name</label>
            </div>
            <div className="form-floating mb-3">
              <input type="text" name="street" id="floatingInput" placeholder="Street" className="form-control" value={formData.street} onChange={handleChange} />
              <label for="floatingInput">Street</label>
            </div>
            <div className="form-floating mb-3">
              <input type="text" name="zipcode" id="floatingInput" placeholder="Zip Code" className="form-control" value={formData.zipcode} onChange={handleChange} />
              <label for="floatingInput">Zip Code</label>
            </div>
            <div className="form-floating mb-3">
              <input type="text" name="email" id="floatingInput" placeholder="Zip Code" className="form-control" value={formData.email} onChange={handleChange} />
              <label for="floatingInput">Email</label>
            </div>
            <span>{events.quantity} left</span>
            <div class="col-2">
                    <div class="input-group mb-3">
                      <button
                        class="btn btn-outline-secondary btn-sm minus"
                        type="button"
                        onClick={handleDecrement}
                      >
                        -
                      </button>
                      <input
                        type="text"
                        readOnly
                        name="orderQuantity"
                        id="orderQuantity"
                        min="1"
                        value={quantity}
                        className="form-control text-center"
                        onChange={(e) => {
                          // Update state and formData on change
                          const newQuantity = parseInt(e.target.value);
                          setQuantity(newQuantity);
                          setFormData({
                            ...formData,
                            orderQuantity: newQuantity,
                          });
                        }}
                      />
                      <button
                        class="btn btn-outline-secondary btn-sm plus"
                        type="button"
                        onClick={handleIncrement}
                      >
                        +
                      </button>
                    </div>
                  </div>
            <button type="submit">Submit</button>
          </form>
        </div>
      </div> 
    </div>
    </>
  )
}

export default EventCheckout