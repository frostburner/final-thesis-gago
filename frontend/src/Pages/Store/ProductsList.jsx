import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Navbar from "../../Components/Navbar/Navbar";

const ProductsList = () => {
  const [allProducts, setAllProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:8080/products/")
      .then((response) => {
        setAllProducts(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/products/${id}`);
      console.log("Product deleted successfully");
      navigate(0);
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };
  return (
    <>
      <Navbar />
      <div className="mt-5 mb-3">
        <h4>Product List</h4>
      </div>
      <div className="row">
        {allProducts.map((product) => (
          <div className="col-sm-4" key={product.id}>
            <div className="card">
              <img
                src={`http://localhost:8080/uploads/${product.image}`}
                className="card-img-top card-img"
                alt=""
              />
              <div className="card-body">
                <h2 className="card-title">{product.name}</h2>
                <p className="card-subtitle">{product.user.username}</p>
                <div className="pt-3 d-flex flex-row gap-2">
                  <button
                    onClick={() => navigate(`/productupdate/${product.id}`)}
                    className="bg-primary"
                  >
                    Update
                  </button>
                  <button
                    onClick={() => handleDelete(product.id)}
                    className="bg-danger"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* <div className="store-container">
      {allProducts.map((product) => (
        <div className="card" key={product.id} >
          <img src={`http://localhost:8080/uploads/${product.image}`} alt="" />
          <h2>{product.name}</h2>
          <h2>{product.user.username}</h2>
          <button onClick={(()=> navigate(`/productupdate/${product.id}`))}>update</button>
          <button onClick={(()=> handleDelete(product.id))}>Delete</button>
        </div>
      ))}
      </div> */}
    </>
  );
};

export default ProductsList;
