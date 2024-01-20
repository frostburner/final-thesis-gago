import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../Helpers/AuthContext';
import Navbar from '../../Components/Navbar/Navbar';

const ProductsByUser = () => {
  const [allProducts, setAllProducts] = useState([]);
  const {authState, setAuthState} = useContext(AuthContext);
  const navigate = useNavigate();
  const id = authState.id;

  useEffect(() => {
    axios.get(`http://localhost:8080/products/viewBy/${id}`).then((response) => {
        setAllProducts(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/products/${id}`);
      console.log('Product deleted successfully');
      navigate(0)
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  }
  return (
    <>
    <Navbar />
      <div className="store-container">
        <p>{authState.username}</p>
      {allProducts.map((product) => (
        <div className="card" key={product.id} >
          <img src={`http://localhost:8080/uploads/${product.image}`} alt="" />
          <h2>{product.name}</h2>
          <h2>{product.user.username}</h2>
          <button onClick={(()=> navigate(`/store/${product.id}`))}>View</button>
          <button onClick={(()=> navigate(`/productupdate/${product.id}`))}>update</button>
          <button onClick={(()=> handleDelete(product.id))}>Delete</button>
        </div>
      ))}
      </div>
    </>
  );
};

export default ProductsByUser;