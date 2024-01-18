import React, { useContext, useState } from 'react'
import { AuthContext } from '../../Helpers/AuthContext'
import {useNavigate } from 'react-router-dom';
import Navbar from '../../Components/Navbar/Navbar';
import axios from 'axios';

const ProductsAdd = () => {
    const navigate = useNavigate();
    const {authState, setAuthState} = useContext(AuthContext);
    const [formData, setFormData] = useState({
        name:"",
        description:"",
        quantity:"",
        price:"",
        image: null,
    });

    const id = authState.id;

    const handleSubmit = async (event) => {
        event.preventDefault();
    
        const newFormData = new FormData();
        newFormData.append("name", formData.name);
        newFormData.append("description", formData.description);
        newFormData.append("quantity", formData.quantity);
        newFormData.append("price", formData.price);
        newFormData.append("UserId", id);
        newFormData.append("image", formData.image);
      
        try {
          const response = await axios.post("http://localhost:8080/products/", newFormData);
          console.log(response.data);
          navigate(0)
        } catch (error) {
          console.log(error)
      };
    }

    const handleFileChange = (event) => {
        setFormData({ ...formData, image: event.target.files[0] });
      };
    
      const handleChange = (event) => {
        setFormData({ ...formData, [event.target.name]: event.target.value });
      };

  return (
    <>
    <Navbar />
    <div className="container">
    <form onSubmit={handleSubmit} autoComplete="off">
            <div >
              <label>Name</label>
              <input type="text" name="name" value={formData.name} onChange={handleChange}
              />
            </div>
            <div >
              <label>Description</label>
              <input type="text" name="description" value={formData.description} onChange={handleChange}/>
            </div>
            <div >
              <label>Quantity</label>
              <input type="number" name="quantity" value={formData.quantity} onChange={handleChange}/>
            </div>
            <div >
              <label>Price</label>
              <input type="number" name="price" value={formData.price} onChange={handleChange}/>
            </div>
            <div >
              <label>Image</label>
              <input type="file" name="image" onChange={handleFileChange}/>
            </div>
            <button type='submit'>Submit</button>
          </form>
    </div>
    </>
    
  )
}

export default ProductsAdd