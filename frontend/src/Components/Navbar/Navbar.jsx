import React, { useState, useContext } from "react";
import { AuthContext } from "../../Helpers/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import {
  // FaSearch,
  FaHome,
  FaUser,
  FaCalendarAlt,
  FaUsers,
  FaStore,
  FaShoppingBag,
  FaShoppingCart,
  FaSignOutAlt,
  FaRegAddressBook
} from "react-icons/fa"; // Import icons
import "./Navbar.css";

const Navbar = () => {
  const navigate = useNavigate();
  const { authState, setAuthState } = useContext(AuthContext);
  const [searchQuery, setSearchQuery] = useState("");

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

  const handleSearch = () => {
    if (searchQuery.trim() !== "") {
      // Redirect to search page with the search query
      navigate(`/search?query=${searchQuery}`);
    }
  };

  return (
    <nav className="navbar navbar-expand-lg">
      <div className="container-fluid px-5">
        <Link to="/home" className="navbar-brand text-white fw-bold">
          AudioHive
        </Link>
  
        {/* <div className="navbar-nav text-white gap-2">
          <input
            type="text"
            className="form-control me-2"
            placeholder="Search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSearch();
              }
            }}
          />
          <button
            className="btn btn-outline-light"
            type="button"
            onClick={handleSearch}
          >
            <FaSearch className="icon" /> 
          </button>
        </div> */}
  
        <div>
          <div className="d-flex flex-row gap-4">
            <ul className="navbar-nav ms-auto mb-2 text-white gap-3">
              <li className="nav-item" onClick={() => navigate("/home")}>
                <FaHome className="icon" /> {/* Icon for home */}
              </li>
              <li
                className="nav-item"
                onClick={() => navigate("/userlist")}
              >
                 <FaUser className="icon" /> {/* Icon for profile */}
              </li>
              <li className="nav-item" onClick={() => navigate("/eventslist")}>
                <FaCalendarAlt className="icon" /> {/* Icon for events */}
              </li>
              <li className="nav-item" onClick={() => navigate("/allgroup")}>
                <FaUsers className="icon" /> {/* Icon for community */}
              </li>
              <li className="nav-item" onClick={() => navigate("/store")}>
                <FaStore className="icon" /> {/* Icon for store */}
              </li>
              {authState.role !== 2 && (
                <li
                  className="nav-item"
                  onClick={() => navigate("/productbyuser")}
                >
                  <FaShoppingBag className="icon" /> {/* Icon for my merch */}
                </li>
              )}
              {authState.role !== 1 && (
                <li
                  className="nav-item"
                  onClick={() => navigate("/eventbyuser")}
                >
                  <FaCalendarAlt className="icon" /> {/* Icon for my events */}
                </li>
              )}
              <li
                className="nav-item"
                onClick={() => navigate(`/storecheckoutlist/${authState.id}`)}
              >
                <FaShoppingCart className="icon" /> {/* Icon for purchase history */}
              </li>
            </ul>
          </div>
        </div>
        <ul className="navbar-nav mb-2 text-white gap-2">
          {authState.username && (
            <li>
              <Link to={`/profile/${authState.id}`} className="profile-link ">
              <span className="fw-bold text-white ">Hi! {authState.username}</span>
              </Link>
            </li>
          )}
          <li className="nav-item" onClick={() => handleLogout()}>
            <FaSignOutAlt className="icon" /> {/* Icon for logout */}
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
