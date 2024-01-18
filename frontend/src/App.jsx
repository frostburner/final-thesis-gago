import { Route, Routes } from "react-router-dom";
import { AuthContext } from "./Helpers/AuthContext";
import React, { useState, useEffect } from "react";
import axios from "axios";

import Login from './Pages/Login'
import Signup from './Pages/Signup'
import Store from './Pages/Store/Store'
import StoreCheckout from './Pages/Store/StoreCheckout'
import StoreCheckoutList from './Pages/Store/StoreCheckoutList'
import StoreDetails from './Pages/Store/StoreDetails'
import ProductsAdd from './Pages/Store/ProductsAdd'
import ProductsByUser from './Pages/Store/ProductsByUser'
import ProductsUpdate from './Pages/Store/ProductsUpdate'
import ProductsList from './Pages/Store/ProductsList'


function App() {
  const [authState, setAuthState] = useState({
    username: "",
    id: 0,
    role: "",
    status: false,
  });

  useEffect(() => {
    // Check if there is an access token in local storage
    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) {
      // No access token, set authState accordingly
      setAuthState({
        ...authState,
        status: false,
      });
      return;
    }

    // Fetch user information from the server
    axios
      .get("http://localhost:8080/users/auth", {
        headers: {
          accessToken: accessToken,
        },
      })
      .then((response) => {
        if (response.data.error) {
          // If there is an error, set authState accordingly
          setAuthState({
            ...authState,
            status: false,
          });
        } else {
          // If successful, update authState with user information
          setAuthState({
            id: response.data.id,
            username: response.data.username,
            role: response.data.role,
            status: true,
          });
        }
      })
      .catch((error) => {
        console.error("An unexpected error occurred:", error);
        // Handle other types of errors (network issues, server down, etc.)
      });
  }, []);
  return (
    <>
    <AuthContext.Provider value={{authState, setAuthState}}>
      <Routes>
        <Route path="/" exact element={<Login />} />
        <Route path="/signup" exact element={<Signup />} />

        {/* STORE */}
        <Route path="/store" exact element={<Store />} />
        <Route path="/storecheckout/:id" exact element={<StoreCheckout />} />
        <Route path="/storecheckoutlist" exact element={<StoreCheckoutList />} />
        <Route path="/storedetails/:id" exact element={<StoreDetails />} />
        {/* STORE PRODUCTS ADD, UPDATE, DISPLAYBY USERID */}
        <Route path="/productadd" exact element={<ProductsAdd />} />
        <Route path="/productupdate/:id" exact element={<ProductsUpdate />} />
        <Route path="/productbyuser" exact element={<ProductsByUser />} />
        <Route path="/productlist" exact element={<ProductsList />} />
        
      </Routes>
    </AuthContext.Provider>
    </>
  )
}

export default App