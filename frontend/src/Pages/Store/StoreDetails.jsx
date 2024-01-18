import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
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
      <div className="card" key={product.id}>
        {product.image && (<img src={`http://localhost:8080/uploads/${product.image}`} alt="" />)}
        <h2>{product.name}</h2>
        <h2>{product.description}</h2>
        <h2>{product.quantity}</h2>
        <h2>&#8369;{product.price}</h2>
        <h2>{user.username}</h2>
        <button onClick={(()=> navigate(`/storecheckout/${product.id}`))}>Checkout</button>
      </div>
    </>
  );
};

export default StoreDetails;