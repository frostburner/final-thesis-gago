import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../Components/Navbar/Navbar';

const Store = () => {
  const [allProducts, setAllProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("http://localhost:8080/products/")
      .then((response) => {
        const filteredProducts = response.data.filter(product => product.quantity > 0);
        setAllProducts(filteredProducts);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <>
    <Navbar />
      <div className="store-container">
        <div className="store-banner">
          <h1>Audio Hive Merch</h1>
          <p>Want to sell your merch?</p>
        <button onClick={(() => navigate('/productadd'))}>Sell Merch Now</button>
        </div>
      <div className="store-wrapper">
      {allProducts.map((product) => (
        <div className="store-card" key={product.id} >
          <div className="store-card-img">
          <img src={`http://localhost:8080/uploads/${product.image}`} alt="" />
          </div>
          <div className="store-text">
          <h2>{product.name}</h2>
          <h2>{product.user.username}</h2>
          <button onClick={(()=> navigate(`/storedetails/${product.id}`))}>View</button>
          </div>
        </div>
      ))}
      </div>
      </div>
    </>
  );
};

export default Store;