import React, { useEffect, useState, useContext } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../../Helpers/AuthContext";
import { alphanumericReference } from "../../Helpers/ReferenceGenerator";
import Navbar from "../../Components/Navbar/Navbar";

const StoreCheckout = () => {
  const navigate = useNavigate();
  const [alert, setAlert] = useState(null);
  const { id } = useParams();
  const [product, setProduct] = useState([]);
  const { authState, setAuthState } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    street: "",
    zipcode: "",
    email: "",
  });

  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    axios
      .get(`http://localhost:8080/products/view/${id}`)
      .then((response) => {
        setProduct(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);

  const UserId = authState.id;

  const closeAlert = () => {
    setAlert(null);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post("http://localhost:8080/checkouts/", {
        ...formData,
        orderQuantity: quantity,
        total: product.price * quantity,
        image: product.image,
        refno: alphanumericReference,
        UserId,
        ProductId: product.id,
      });
      console.log(response.data);
      setAlert({ type: "success", message: "Checkout success!" });
      setTimeout(() => {
        navigate("/store");
      }, 1500);
    } catch (error) {
      console.log("Error submitting form:", error);
    }
  };

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleIncrement = () => {
    setQuantity(quantity + 1);
  };

  return (
    <>
      <Navbar />
      <div className="px-5 mt-5">
        <div className="mb-3">
          <Link path to="/store">
            <span>Back</span>
          </Link>
        </div>
        <div className="mb-3">
          <h4>Order Details</h4>
        </div>
        <div className="row">
          <div className="col-6">
            <div className="row">
              <div className="col-12 mb-3">
                {product.image && (
                  <img
                    src={`http://localhost:8080/uploads/${product.image}`}
                    className="col-12"
                    alt=""
                  />
                )}
              </div>
              <div className="col-12">
                <div className="mb-3">
                  <h2>{product.name}</h2>
                  <h4>&#8369;{product.price}</h4>
                  <span>{product.quantity} left</span>
                </div>
                <p className="fst-italic">{product.description}</p>
              </div>
            </div>
          </div>
          <div className="col-6">
            <div className="mb-3">
              {alert && (
                <div className={`alert alert-${alert.type}`} role="alert">
                  {alert.message}
                  <button
                    type="button"
                    className="btn-close"
                    onClick={closeAlert}
                  />
                </div>
              )}
              <h4>Form Details</h4>
            </div>
            <form onSubmit={handleSubmit} autoComplete="off">
              <div className="form-floating mb-3">
                <input
                  type="text"
                  name="firstName"
                  id="firstName"
                  placeholder="First Name"
                  className="form-control"
                  value={formData.firstName}
                  onChange={handleChange}
                />
                <label htmlFor="firstName">First Name</label>
              </div>
              <div className="form-floating mb-3">
                <input
                  type="text"
                  name="lastName"
                  id="lastName"
                  placeholder="Last Name"
                  className="form-control"
                  value={formData.lastName}
                  onChange={handleChange}
                />
                <label htmlFor="lastName">Last Name</label>
              </div>
              <div className="form-floating mb-3">
                <input
                  type="text"
                  name="street"
                  id="street"
                  placeholder="Street"
                  className="form-control"
                  value={formData.street}
                  onChange={handleChange}
                />
                <label htmlFor="street">Street</label>
              </div>
              <div className="form-floating mb-3">
                <input
                  type="text"
                  name="zipcode"
                  id="zipcode"
                  placeholder="Zip Code"
                  className="form-control"
                  value={formData.zipcode}
                  onChange={handleChange}
                />
                <label htmlFor="zipcode">Zip Code</label>
              </div>
              <div className="form-floating mb-3">
                <input
                  type="text"
                  name="email"
                  id="email"
                  placeholder="Email"
                  className="form-control"
                  value={formData.email}
                  onChange={handleChange}
                />
                <label htmlFor="email">Email</label>
              </div>
              <div className="mb-3">
                <label htmlFor="quantity" className="me-2">Quantity:</label>
                <div className="input-group">
                  <button
                    className="btn btn-outline-secondary"
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
                    value={quantity}
                    className="form-control text-center"
                    style={{ maxWidth: '50px' }} // Adjust the maximum width here
                  />
                  <button
                    className="btn btn-outline-secondary"
                    type="button"
                    onClick={handleIncrement}
                  >
                    +
                  </button>
                </div>
              </div>
              <button type="submit" className="btn btn-primary">Submit</button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default StoreCheckout;
