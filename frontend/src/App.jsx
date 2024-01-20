import { AuthContext } from "./Helpers/AuthContext";
import React, { useState, useEffect } from "react";
import { Router, Route, Routes } from "react-router-dom";
import axios from "axios";

import Login from './Pages/Login'
import Signup from './Pages/Signup'
import Chat from './Pages/Chat/Chat'
import AddGroup from "./Pages/Chat/AddGroup";
import AllGroup from './Pages/Chat/AllGroup';
import ChatBody from './Pages/Chat/ChatBody';

// import Homepage from "./Components/Homepage";




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
        <Route path="/chat/:id" exact element={<Chat />} />
        <Route path="/addgroup" exact element={<AddGroup />} />
        <Route path="/allgroup" exact element={<AllGroup />} />
        <Route path="/chatbody" exact element={<ChatBody />} />
        
      </Routes>
    </AuthContext.Provider>
    </>
  )
}

export default App