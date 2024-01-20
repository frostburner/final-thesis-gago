import React, { useEffect, useState } from 'react';
import Navbar from '../../Components/Navbar/Navbar';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './chat.css';

const AllGroup = () => {
  const [allGroup, setAllGroup] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    try {
      axios.get(`http://localhost:8080/conversations/`).then((response) => {
        setAllGroup(response.data);
      });
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <>
      <Navbar />
      <button className="create-group-btn" onClick={() => navigate('/addgroup')}>
        Create Group Chat
      </button>
      <div className="group-list">
        {allGroup.map((group) => {
          return (
            <div className="group-item" key={group.id} onClick={() => navigate(`/chat/${group.id}`)}>
              <h1 className="group-name">{group.groupname}</h1>
              <p className="group-info">by: {group.username}</p>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default AllGroup;  