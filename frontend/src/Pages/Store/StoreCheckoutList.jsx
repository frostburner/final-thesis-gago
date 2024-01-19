import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../Components/Navbar/Navbar';

const StoreCheckoutList = () => {
  const [allCheckouts, setAllChekouts] = useState([]);
  const [checkoutData, setCheckoutData] = useState({ checkouts: [], totalSales: 0 });
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("http://localhost:8080/checkouts/")
      .then((response) => {
        setAllChekouts(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
      
      axios.get("http://localhost:8080/checkouts/sales")
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
      console.log('Checkout deleted successfully');
      navigate(0)
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  }

  return (
    <>
    <Navbar />
      <div className="store-container">
        <h1>TOTAL SALES:{checkoutData.totalSales}</h1>
      {allCheckouts.map((checkout) => (
        <div className="card" key={checkout.id} >
          {checkout.image && (
          <img src={`http://localhost:8080/uploads/${checkout.image}`} alt="" />
        )}
          <p>{checkout.firstName}</p>
          <p>{checkout.lastName}</p>
          <p>{checkout.street}</p>
          <p>{checkout.zipcode}</p>
          <p>{checkout.email}</p>
          <p>{checkout.total}</p>
          <p>{checkout.user.username}Halaman</p>
          <p>{checkout.product.name}</p>
          <p>{checkout.user.name}</p>
          <button onClick={(()=> handleDelete(checkout.id))}>Delete</button>
        </div>
      ))}
      </div>
    </>
  );
};

export default StoreCheckoutList;