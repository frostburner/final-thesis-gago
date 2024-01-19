import React,{useState, useContext} from 'react'
import { AuthContext } from '../../Helpers/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import './Navbar.css'

const Navbar = () => {
    const navigate = useNavigate();
    const { authState, setAuthState } = useContext(AuthContext);
    const id = authState.id;
  
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
    <nav className="navbar navbar-expand-lg">
      <div className="container-fluid px-5">
        <Link path to="/store" className="navbar-brand text-white fw-bold">AudioHive</Link>
        <div>
          <div className="d-flex flex-row gap-4">
            <ul className="navbar-nav ms-auto mb-2 text-white gap-3">
            <li className="nav-item" onClick={(()=> navigate('/eventslist'))}>Events</li>
              <li className="nav-item" onClick={(()=> navigate('/store'))}>Store</li>
              {/* <li className="nav-item" onClick={(()=> navigate('/productslist'))}>Product List</li> */}
              <li className="nav-item" onClick={(()=> navigate('/productbyuser'))}>My Products</li>
              <li className="nav-item" onClick={(()=> navigate('/eventbyuser'))}>My Events</li>
              <li className="nav-item" onClick={(()=> navigate(`/storecheckoutlist/${id}`))}>Purchase History</li>
            </ul>
            <ul className="navbar-nav mb-2 text-white gap-2">
            {authState.username && (
                <li>
                  <span className="fw-bold">Hi! {authState.username}</span>
                </li>
              )}
              <li className="nav-item" onClick={(()=> handleLogout())}>Logout</li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar