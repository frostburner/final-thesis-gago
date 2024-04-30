import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Navbar from "../../Components/Navbar/Navbar";
import "./store-css.css";

const Store = () => {
  const [allProducts, setAllProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:8080/products/")
      .then((response) => {
        const filteredProducts = response.data.filter(
          (product) => product.quantity > 0
        );
        setAllProducts(filteredProducts);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <>
      <Navbar />
      <div className="px-5 mt-3">
        <button className="mb-3" onClick={() => navigate("/productadd")}>
          Sell Merch
        </button>
      </div>
      <div className="d-flex flex-wrap px-5 align-items-center">
        {allProducts.map((product) => (
          <div className="col-md-4 mb-3 px-2" key={product.id}>
            <div className="card">
              <img
                src={`http://localhost:8080/uploads/${product.image}`}
                className="card-img-top card-img"
                alt=""
              />
              <div className="card-body">
                <h2 className="card-title">{product.name}</h2>
                <p className="card-text">{product.user.username}</p>
                <button
                  onClick={() => navigate(`/storedetails/${product.id}`)}
                  className="bg-primary"
                >
                  View
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* <div>
      
      {allProducts.map((product) => (
        <div className="card" key={product.id} >
          <img src={`http://localhost:8080/uploads/${product.image}`} className="card-img-top" alt="" />
          <h2>{product.name}</h2>
          <span>{product.user.username}</span><br/>
          <button onClick={(()=> navigate(`/storedetails/${product.id}`))}>View</button>
        </div>
      ))}
    </div> */}
    </>
  );
};

export default Store;
