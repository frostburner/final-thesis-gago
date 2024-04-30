import React, { useState, useContext } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../Helpers/AuthContext";
import "./login.css";

const Login = () => {
  const navigate = useNavigate();
  const { authState, setAuthState } = useContext(AuthContext);
  const [error, setError] = useState("");
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

    // Check if username or password is empty
    if (!formData.username || !formData.password) {
      setAlert({
        type: "danger",
        message: "Please enter both username and password.",
      });
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:8080/users/login",
        formData
      );

      if (response.data.error) {
        console.log(response.data.error);
        setAlert({ type: "danger", message: response.data.error });
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
        console.log(error.response.data.message);
        setAlert({ type: "danger", message: error.response.data.error });
      } else {
        setAlert({ type: "danger", message: "Error creating user." });
      }
    }
  };
  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };
  return (
    <>
      <form onSubmit={handleSubmit} autoComplete="off">
        <div className="p-3 d-flex justify-content-start align-items-end vh-100">
          <div className="p-4 col-5 d-flex flex-column login-container shadow">
            {alert && (
              <div className={`alert alert-${alert.type}`} role="alert">
                {alert.message}
                <button
                  type="button" 
                  className="btn-close"
                  onClick={closeAlert}
                />
              </div>
            )}
            <div className="mb-3">
              
              <h2 className="fw-bold mb-0 logo-text">
                <img src="../../src/assets/logo-small.png" alt="" className="logo"/>
                AudioHive
                </h2>
              <span>Login to continue</span>
              <hr></hr>
            </div>
            <div className="d-flex gap-2 flex-row mb-3">
              <div className="flex-grow-1">
                <label className="form-label">Username</label>
                <input
                  type="text"
                  name="username"
                  className="form-control"
                  value={formData.username}
                  onChange={handleChange}
                />
              </div>
              <div className="flex-grow-1">
                <label className="form-label">Password</label>
                <input
                  type="password"
                  name="password"
                  className="form-control"
                  value={formData.password}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="d-flex flex-column">
              <div className="">
                <button className="col-12 mb-2" type="submit">
                  Login
                </button>
                <span>
                  Don't have an account?{" "}
                  <Link className="text-decoration-none" path to="/signup">
                    Sign Up Here
                  </Link>
                </span>
              </div>
            </div>
          </div>
        </div>
      </form>
      <div className="login-bg"></div>
    </>
  );
};

export default Login;
