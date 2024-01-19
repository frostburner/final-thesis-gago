import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../Helpers/AuthContext";
import Navbar from "./Navbar/Navbar";
import moment from 'moment';
import EventsColumn from "./EventsColumn";


function Homepage() {
    const { authState, setAuthState } = useContext(AuthContext);
    const navigate = useNavigate();
    const id = authState.id;

  return (
    <>
    <Navbar />
    <div className="d-flex">
        <div className="col-4">
            <EventsColumn />
        </div>
        <div></div>

    </div>


    </>
  )
}

export default Homepage