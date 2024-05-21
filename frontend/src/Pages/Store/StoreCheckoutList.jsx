import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, Link, useParams } from "react-router-dom";
import Navbar from "../../Components/Navbar/Navbar";
import moment from "moment";

const StoreCheckoutList = () => {
  const [allCheckouts, setAllChekouts] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const [checkoutData, setCheckoutData] = useState({
    checkouts: [],
    totalSales: 0,
  });
  const navigate = useNavigate();

  const { id } = useParams();

  useEffect(() => {
    // axios.get('`http://localhost:8080/products')
    // .then((response) => {
    //   setAllProducts(response.data);
    // })
    // .catch((error) => {
    //   console.log(error);
    // });

    axios
      .get(`http://localhost:8080/checkouts/byUserId/${id}`)
      .then((response) => {
        setAllChekouts(response.data);
      })
      .catch((error) => {
        console.log(error);
        ``;
      });

    axios
      .get(`http://localhost:8080/checkouts/salesByUser/${id}`)
      .then((response) => {
        setCheckoutData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/checkouts/${id}`);
      console.log("Checkout deleted successfully");
      navigate(0);
    } catch (error) {
      console.error("Error deleting user:", error);
    }
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
          <div className="card p-3">
            <div className="card-title pb-0">
              <h4>Purchase History</h4>
            </div>
            <p className="card-subtitle">
              Total Purchase as of{" "}
              {moment().format("dddd, MMMM Do YYYY, h:mm:ss a")}
            </p>
            <p className="card-title fs-2">&#8369; {checkoutData.totalSales}</p>
          </div>
        </div>
        <div>
          <div className="row">
            {allCheckouts.map((checkout) => (
              <div className="col-sm-4 mb-3" key={checkout.id}>
                <div className="card">
                  <img
                    src={`http://localhost:8080/uploads/${checkout.image}`}
                    className="card-img-top card-img"
                    alt=""
                  />
                  <div className="card-body">
                    <h5 className="card-title">
                      {checkout.firstName}, {checkout.lastName}
                    </h5>
                    <p className="card-subtitle mb-3">
                      {checkout.product.name}
                    </p>
                    <p className="card-subtitle">
                      {moment(checkout.createdAt).format(
                        "MMMM Do YYYY, h:mm a"
                      )}
                    </p>
                    <p className="card-subtitle">
                      {checkout.street}, {checkout.zipcode}
                    </p>
                    <p className="card-subtitle">{checkout.email}</p>
                    <p className="card-subtitle">
                      {checkout.checkoutuser.username}
                    </p>
                    <p className="fs-4 card-title">&#8369; {checkout.total}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default StoreCheckoutList;
