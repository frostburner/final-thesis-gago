import React, { useState, useContext } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../Helpers/AuthContext";

const Login = () => {
  const navigate = useNavigate();
  const { authState, setAuthState } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:8080/users/login",
        formData
      );

      if (response.data.error) {
        console.log(response.data.error);
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
        navigate("/home");
      }
    } catch (error) {
      if (
        error.response &&
        error.response.status >= 400 &&
        error.response.status <= 500
      ) {
        console.log(error.response.data.message);
      } else {
        console.error("An unexpected error occurred:", error);
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
              type="text"
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
