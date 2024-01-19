import { AuthContext } from "./Helpers/AuthContext";
import React, { useState, useEffect } from "react";
import { Router, Route, Routes } from "react-router-dom";
import axios from "axios";

import Login from './Pages/Login'
import Signup from './Pages/Signup'
import Store from "./Pages/Store/Store";
import StoreCheckout from './Pages/Store/StoreCheckout'
import StoreCheckoutList from './Pages/Store/StoreCheckoutList'
import StoreDetails from './Pages/Store/StoreDetails'
import ProductsList from "./Pages/Store/ProductsList";
import ProductsAdd from "./Pages/Store/ProductsAdd";
import ProductsByUser from "./Pages/Store/ProductByUser";
import ProductsUpdate from "./Pages/Store/ProductUpdates";
import EventsList from "./Pages/Event/EventsList";
import EventsAdd from "./Pages/Event/EventsAdd";
import EventDetails from "./Pages/Event/EventDetails";
import EventCheckout from "./Pages/Event/EventCheckout";
import EventByUser from "./Pages/Event/EventByUser";
import EventUpdates from "./Pages/Event/EventUpdates";
import Homepage from "./Components/Homepage";


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
        <Route path="/home" exact element={<Homepage />} />
        <Route path="/signup" exact element={<Signup />} />

        {/* STORE */}
        <Route path="/store" exact element={<Store />} />
        <Route path="/storecheckout/:id" exact element={<StoreCheckout />} />
        <Route path="/storecheckoutlist/:id" exact element={<StoreCheckoutList />} />
        <Route path="/storedetails/:id" exact element={<StoreDetails />} />
        

        {/* STORE PRODUCTS ADD, UPDATE, DISPLAYBY USERID */}
         <Route path="/productslist" exact element={<ProductsList />} />
         <Route path="/productadd" exact element={<ProductsAdd />} />
         <Route path="/productbyuser" exact element={<ProductsByUser />} />
         <Route path="/productupdate/:id" exact element={<ProductsUpdate />} />

         {/* EVENT ADD, UPDATE, DISPLAY BY USERID */}
         <Route path="/eventslist" exact element={<EventsList />} />
         <Route path="/eventadd" exact element={<EventsAdd />} />
         <Route path="/eventdetails/:id" exact element={<EventDetails />} />

         <Route path="/eventcheckout/:id" exact element={<EventCheckout />} />
         <Route path="/eventbyuser" exact element={<EventByUser />} />
         <Route path="/eventupdate/:id" exact element={<EventUpdates />} />
        
      </Routes>
    </AuthContext.Provider>
    </>
  )
}

export default App