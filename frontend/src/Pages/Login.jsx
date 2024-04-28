import React, { useState, useContext } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../Helpers/AuthContext";

const Login = () => {
  const navigate = useNavigate();
  const { authState, setAuthState } = useContext(AuthContext);
  const [error, setError] = useState('');
  const [alert, setAlert] = useState(null);
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const closeAlert = () => {
    setAlert(null);
  };

 

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:8080/users/login",
        formData
      );

      if (response.data.error) {
        console.log(response.data.error)
        setAlert({ type: 'danger', message: response.data.error });
      } else {
        localStorage.setItem("accessToken", response.data.token);
        setAuthState({
          id: response.data.id,
          username: response.data.username,
          role: response.data.role,
          status: true,
        });

        // Log information after successful login
        console.log("Data stored in localStorage:", response.data);
        if (response.data.role === 0) {
          navigate("/adminDashboard");
        } else {
          navigate("/home");
        }
        
      }
    } catch (error) {
      if (
        error.response &&
        error.response.status >= 400 &&
        error.response.status <= 500
      ) {
        console.log(error.response.data.message)
        setAlert({ type: 'danger', message: error.response.data.error });
      } else {
        setAlert({ type: 'danger', message: "Error creating user." });
      }
    }
  };
  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };
  return (
    <>
 
      <form onSubmit={handleSubmit} autoComplete="off">
        <div className="d-flex align-items-center flex-column gap-2 justify-content-center vh-100">
          <div className="mb-3">
            <label className="form-label">Username</label>
            <input
              type="text"
              name="username"
              className="form-control"
              value={formData.username}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Password</label>
            <input
              type="password"
              name="password"
              className="form-control"
              value={formData.password}
              onChange={handleChange}
            />
          </div>
          <button type="submit">Submit</button>
          Don't have an account?{" "}
          <Link path to="/signup">
            Sign Up Here
          </Link>
        </div>
      </form>
    </>
  );
};

export default Login;
