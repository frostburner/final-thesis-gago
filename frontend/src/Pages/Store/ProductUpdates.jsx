import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
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
    <>
    <Navbar />
      <form onSubmit={handleSubmit} autoComplete="off">
        {product.image && (
          <img src={`http://localhost:8080/uploads/${product.image}`} alt="" />
        )}
        <div>
          <label>Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Description</label>
          <input
            type="text"
            name="description"
            value={formData.description}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Quantity</label>
          <input
            type="number"
            name="quantity"
            value={formData.quantity}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Price</label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </>
  );
};

export default ProductsUpdate;