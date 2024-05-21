import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../../Helpers/AuthContext";
import Navbar from "../../Components/Navbar/Navbar";
import moment from "moment";

const ProductsByUser = () => {
  const [allProducts, setAllProducts] = useState([]);
  const [totalEarnings, setTotalEarnings] = useState(0);
  const { authState, setAuthState } = useContext(AuthContext);
  const navigate = useNavigate();
  const id = authState.id;

  useEffect(() => {
    axios
      .get(`http://localhost:8080/products/viewBy/${id}`)
      .then((response) => {
        setAllProducts(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);

  useEffect(() => {
    const calculateTotalEarnings = async () => {
      let earnings = 0;
      for (const product of allProducts) {
        try {
          const response = await axios.get(
            `http://localhost:8080/checkouts/earnings/${product.id}`
          );
          earnings += response.data.totalEarnings;
        } catch (error) {
          console.log(error);
        }
      }
      setTotalEarnings(earnings);
    };

    calculateTotalEarnings();
  }, [allProducts]);

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
      <div className="px-5 mt-5">
        <div className="d-flex justify-content-between align-items-end mb-2">
          <div>
            <Link path to="/home">
              <span>Back</span>
            </Link>
          </div>
          <div>
            <button onClick={() => navigate("/productadd")}>Sell Merch</button>
          </div>
        </div>
        <div className="card mb-3 p-3">
          <div className="card-title pb-0">
            <h4>Total Earnings</h4>
          </div>
          <p className="card-subtitle">
            Total Sales as of {moment().format("dddd, MMMM Do YYYY, h:mm:ss a")}
          </p>
          <p className="card-title fs-2">&#8369; {totalEarnings} </p>
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
                      className="bg-primary"
                      onClick={() => navigate(`/storedetails/${product.id}`)}
                    >
                      View
                    </button>
                    <button
                      className="bg-secondary"
                      onClick={() => navigate(`/productupdate/${product.id}`)}
                    >
                      Update
                    </button>
                    <button
                      className="bg-danger"
                      onClick={() => handleDelete(product.id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default ProductsByUser;
