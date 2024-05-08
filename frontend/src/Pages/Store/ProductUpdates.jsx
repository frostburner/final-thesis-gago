import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams, Link } from "react-router-dom";
import Navbar from "../../Components/Navbar/Navbar";

const ProductsUpdate = () => {
  const navigate = useNavigate();
  const [productObject, setProductObject] = useState([]);
  const [alert, setAlert] = useState(null);
  const { id } = useParams();
  // const [formData, setFormData] = useState({});

  useEffect(() => {
    axios
      .get(`http://localhost:8080/products/view/${id}`)
      .then((response) => {
        setProductObject(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setProductObject((prevProductObject) => ({
        ...prevProductObject,
        [name]: files[0],
      }));
    } else {
      setProductObject((prevProductObject) => ({
        ...prevProductObject,
        [name]: value,
      }));
    }
  };

  const handleUpdate = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", productObject.name);
    formData.append("description", productObject.description);
    formData.append("quantity", productObject.quantity);
    formData.append("image", productObject.image);
    formData.append("price", productObject.price);

    axios
      .put(`http://localhost:8080/products/update/${id}`, formData)
      .then((response) => {
        setAlert({
          type: "success",
          message: "Product updated successfully",
        });
        setTimeout(() => {
          navigate("/productbyuser");
        }, 2000);
      })
      .catch((error) => {
        if (
          error.response &&
          error.response.status >= 400 &&
          error.response.status <= 500
        ) {
          setAlert({
            type: "danger",
            message: "Error updating product. Please try again later.",
          });
        }
      });
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
          <h3>Update Product</h3>
        </div>
        <div className="col-8 mb-3">
          <form onSubmit={handleUpdate} autoComplete="off">
            {alert && (
              <div
                className={`alert alert-${alert.type} alert-dismissible fade show`}
                role="alert"
              >
                {alert.message}
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="alert"
                  aria-label="Close"
                ></button>
              </div>
            )}
            {/* {product.image && (
              <img
                src={`http://localhost:8080/uploads/${product.image}`}
                className="mb-3 display-img"
                alt=""
              />
            )} */}
            <div className="mb-3">
              <label className="form-label">Name</label>
              <input
                type="text"
                name="name"
                className="form-control"
                value={productObject.name}
                onChange={handleChange}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Description</label>
              <input
                type="text"
                name="description"
                className="form-control"
                value={productObject.description}
                onChange={handleChange}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Quantity</label>
              <input
                type="number"
                name="quantity"
                className="form-control"
                value={productObject.quantity}
                onChange={handleChange}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Price</label>
              <input
                type="number"
                name="price"
                className="form-control"
                value={productObject.price}
                onChange={handleChange}
              />
            </div>
            <div className="mb-3">
              <label>Image</label>
              <input
                type="file"
                name="image"
                className="form-control"
                placeholder="Upload Image"
                onChange={handleChange}
              />
            </div>
            <button type="submit">Submit Changes</button>
          </form>
        </div>
      </div>
    </>
  );
};

export default ProductsUpdate;
