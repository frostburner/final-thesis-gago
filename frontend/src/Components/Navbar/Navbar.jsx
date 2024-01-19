import React,{useState, useContext} from 'react'
import { AuthContext } from '../../Helpers/AuthContext';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
    const navigate = useNavigate();
    const { authState, setAuthState } = useContext(AuthContext);
  
    const handleLogout = () => {
      localStorage.removeItem("accessToken");
      setAuthState({
        username: "",
        id: 0,
        role: "",
        status: false,
      });
      localStorage.clear();
      navigate("/");
    };
  return (
    <div>
        <button onClick={(()=> handleLogout())}>LOGOUT</button>
        <button onClick={(()=> navigate('/productlist'))}>Product List </button>
        <button onClick={(()=> navigate('/productbyuser'))}>Product By Current User </button>
        <button onClick={(()=> navigate('/storecheckoutlist'))}>Checkout List </button>
        <button onClick={(()=> navigate('/allgroup'))}>All Gorup </button>
    </div>
  )
}

export default Navbar