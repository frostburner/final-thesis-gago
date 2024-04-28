import React, { useEffect, useState, useContext } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
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
    <div className="px-5 mt-5">
      <div className="mb-3">
        <Link path to="/store">
        <span>Back</span>
        </Link>
      </div>
      <div className="mb-3">
          <h4>Order Details</h4>
      </div>      
      <div className="row">
        <div className="col-6">
          <div className="row">
            <div className="col-12 mb-3">
              {product.image && (
                <img src={`http://localhost:8080/uploads/${product.image}`} className="col-12" alt="" />
              )}
            </div>
            <div className="col-12">
              <h2>{product.name}</h2>
              <h4>&#8369;{product.price}</h4>
              <p className="fst-italic">{product.description}</p>
            </div>
          </div>
        </div>
        <div className="col-6">
          <div className="mb-3">
            <h4>Form Details</h4>
          </div>
          <form onSubmit={handleSubmit} autoComplete="off">
            <div className="form-floating mb-3">
              <input type="text" name="firstName" id="floatingInput" placeholder="First Name" className="form-control" value={formData.firstName} onChange={handleChange} />
              <label for="floatingInput">First Name</label>
            </div>
            <div className="form-floating mb-3">
              <input type="text" name="lastName" id="floatingInput" placeholder="Last Name" className="form-control" value={formData.lastName} onChange={handleChange} />
              <label for="floatingInput">Last Name</label>
            </div>
            <div className="form-floating mb-3">
              <input type="text" name="street" id="floatingInput" placeholder="Street" className="form-control" value={formData.street} onChange={handleChange} />
              <label for="floatingInput">Street</label>
            </div>
            <div className="form-floating mb-3">
              <input type="text" name="zipcode" id="floatingInput" placeholder="Zip Code" className="form-control" value={formData.zipcode} onChange={handleChange} />
              <label for="floatingInput">Zip Code</label>
            </div>
            <div className="form-floating mb-3">
              <input type="text" name="email" id="floatingInput" placeholder="Zip Code" className="form-control" value={formData.email} onChange={handleChange} />
              <label for="floatingInput">Email</label>
            </div>
            <button type="submit">Submit</button>
          </form>
        </div>
      </div> 
    </div>
    </>
  );
};

export default StoreCheckout;