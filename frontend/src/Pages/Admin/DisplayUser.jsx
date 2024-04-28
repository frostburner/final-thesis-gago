import React from 'react'
import "../../index.css";
import { Link, useNavigate} from 'react-router-dom';

function DisplayUser() {
  return (
    <div className="d-flex w-100">
      <div className="p-3 col-3 bg-secondary">
        Dashboard
        <div className="mt-3">
          <div className="sidebar">
            <ul>
              <li className="nav-item" onClick={() => navigate("/displayUser")}>Users</li>
              <li className="nav-item">Events</li>
              <li className="nav-item">Products</li>
            </ul>
          </div>
          <button onClick={logout} className="mt-3 w-100 bg-danger">Logout</button>
        </div>

      </div>
      <div className="p-3 col-9 bg-success">Something</div>
    </div>
  )
}

export default DisplayUser;