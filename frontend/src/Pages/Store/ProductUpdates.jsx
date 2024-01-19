import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams, Link } from "react-router-dom";
import Navbar from "../../Components/Navbar/Navbar";

const ProductsUpdate = () => {
  const navigate = useNavigate();
  const [product, setProduct] = useState([]);
  const { id } = useParams();
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    quantity: "",
    price: "",
  });
  useEffect(() => {
    axios
      .get(`http://localhost:8080/products/view/${id}`)
      .then((response) => {
        setProduct(response.data);
        setFormData({
            name: response.data.name,
            description: response.data.description,
            quantity: response.data.quantity.toString(),
            price: response.data.price.toString(),
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);

  // UPDAWETE FUNCTIONS ARA SA DALOM LODS
  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.put(`http://localhost:8080/products/update/${id}`, formData);
      setTimeout(() => {
        setTimeout(() => {
          navigate(-1);
        }, 1000);
      }, 1000);
    } catch (error) {
      setTimeout(() => {
        alert("TEST ALERT ERROR UPDATING")
      }, 2000);
    }
  };
  return (
    // 
    <>
    <Navbar />
    <div className="px-5 mt-5">
      <div className="mb-3">
        <Link path to="/store">
        <span>Back</span>
        </Link>
      </div>   
      <div className="mb-3">
        <h3>Update Product</h3>
      </div>
      <div className="col-8 mb-3">
        <form onSubmit={handleSubmit} autoComplete="off">
          {product.image && (
            <img src={`http://localhost:8080/uploads/${product.image}`} className="mb-3 display-img" alt="" />
          )}
          <div className="mb-3">
            <label className="form-label">Name</label>
            <input
              type="text"
              name="name"
              className="form-control"
              value={formData.name}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Description</label>
            <input
              type="text"
              name="description"
              className="form-control"
              value={formData.description}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Quantity</label>
            <input
              type="number"
              name="quantity"
              className="form-control"
              value={formData.quantity}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3" >
            <label className="form-label">Price</label>
            <input
              type="number"
              name="price"
              className="form-control"
              value={formData.price}
              onChange={handleChange}
            />
          </div>
          <button type="submit">Submit Changes</button>
        </form>
      </div>

    </div>

    </>
  );
};

export default ProductsUpdate;