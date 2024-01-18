import React, { useEffect, useState, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { AuthContext } from '../../Helpers/AuthContext';
import {alphanumericReference} from "../../Helpers/ReferenceGenerator";
import Navbar from "../../Components/Navbar/Navbar";

const StoreCheckout = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [product, setProduct] = useState([]);
  const {authState, setAuthState} = useContext(AuthContext);
  const [formData, setFormData] = useState({
    firstName:"",
    lastName:"",
    street:"",
    zipcode:"",
    email:"",
});

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

  const UserId = authState.id;
  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post("http://localhost:8080/checkouts/", {
        ...formData,
        total: product.price,
        image: product.image,
        refno: alphanumericReference,
        UserId: UserId,
        ProductId: product.id
      });
      console.log(response.data);
      navigate(0);
    } catch (error) {
      console.log("Error submitting form:", error);
    }
}

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };
  return (
    <>
    <Navbar />
      <form onSubmit={handleSubmit}>
      <div>
      {product.image && (
          <img src={`http://localhost:8080/uploads/${product.image}`} alt="" />
        )}
        {product.name}
        &#8369;{product.price}
      </div>
        <div>
          <label>First Name</label>
          <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} />
        </div>
        <div>
          <label>Last Name</label>
          <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} />
        </div>
        <div>
          <label>Street</label>
          <input type="text" name="street" value={formData.street} onChange={handleChange} />
        </div>
        <div>
          <label>Zip Code</label>
          <input type="text" name="zipcode" value={formData.zipcode} onChange={handleChange} />
        </div>
        <div>
          <label>Email</label>
          <input type="text" name="email" value={formData.email} onChange={handleChange} />
        </div>
        <button type="submit">Submit</button>
      </form>
    </>
  );
};

export default StoreCheckout;