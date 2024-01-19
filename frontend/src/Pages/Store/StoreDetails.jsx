import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams, Link } from "react-router-dom";
import Navbar from "../../Components/Navbar/Navbar";

const StoreDetails = () => {
  const [product, setProduct] = useState([]);
  const { id } = useParams();
  const navigate = useNavigate();

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

  // DISPLAY RELATED SHEESH
  const user = product.user || {};
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
        <h3>Product Details</h3>
      </div>
      <div className="col-8 mb-3">
        <div className="card" key={product.id}>
          <img
            src={`http://localhost:8080/uploads/${product.image}`}
            className="card-img-top display-img"
            alt=""
          />
          <div className="card-body">
            <p>{product.id}</p>
            <div className="d-flex justify-content-between align-items-center mb-2">
              <h2 className="card-title">{product.name}</h2>
              <h2 className="card-title">&#8369;{product.price}</h2>
            </div>
            <h5 className="card-subtitle">{product.quantity} left</h5>
            <p className="fst-italic">{product.description}</p>
            <p className="card-text">{user.username}</p>
            <button className="col-12 mt-3" onClick={(()=> navigate(`/storecheckout/${product.id}`))}>Checkout</button>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default StoreDetails;