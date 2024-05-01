import React, { useContext, useState } from "react";
import { AuthContext } from "../../Helpers/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import Navbar from "../../Components/Navbar/Navbar";
import axios from "axios";

const ProductsAdd = () => {
  const navigate = useNavigate();
  const [alert, setAlert] = useState(null);
  const { authState, setAuthState } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    quantity: "",
    price: "",
    image: null,
  });

  const closeAlert = () => {
    setAlert(null);
  };

  const id = authState.id;

  const handleSubmit = async (event) => {
    event.preventDefault();

    const emptyFields = Object.values(formData).some((field) => !field);
    if (emptyFields) {
      setAlert({
        type: "danger",
        message: "Please fill in all required fields.",
      });
      return;
    }

    const newFormData = new FormData();
    newFormData.append("name", formData.name);
    newFormData.append("description", formData.description);
    newFormData.append("quantity", formData.quantity);
    newFormData.append("price", formData.price);
    newFormData.append("UserId", id);
    newFormData.append("image", formData.image);

    try {
      const response = await axios.post(
        "http://localhost:8080/products/",
        newFormData
      );
      console.log(response.data);
      setAlert({ type: "success", message: "Product created successfully!" });
      setTimeout(() => {
        navigate("/store");
      }, 1500);
    } catch (error) {
      console.log(error);
    }
  };

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
          <Link path to="/productbyuser">
            <span>Back</span>
          </Link>
        </div>
        <div className="mb-3">
          <h3>Create Product</h3>
        </div>
        <div className="border rounded p-3 mb-3">
          <form onSubmit={handleSubmit} className="p-4" autoComplete="off">
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
            <div className="mb-3">
              <label className="form-label">Name</label>
              <input
                type="text"
                name="name"
                className="form-control"
                placeholder="Enter Name"
                value={formData.name}
                onChange={handleChange}
              />
            </div>
            <div className="mb-3">
              <label>Description</label>
              <input
                type="text"
                name="description"
                className="form-control"
                placeholder="Enter Description"
                value={formData.description}
                onChange={handleChange}
              />
            </div>
            <div className="mb-3">
              <label>Quantity</label>
              <input
                type="number"
                name="quantity"
                className="form-control"
                placeholder="Enter Quuantity"
                value={formData.quantity}
                onChange={handleChange}
              />
            </div>
            <div className="mb-3">
              <label>Price</label>
              <input
                type="number"
                name="price"
                className="form-control"
                placeholder="Enter Price"
                value={formData.price}
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
                onChange={handleFileChange}
              />
            </div>
            <button type="submit">Submit</button>
          </form>
        </div>
      </div>
    </>
  );
};

export default ProductsAdd;
