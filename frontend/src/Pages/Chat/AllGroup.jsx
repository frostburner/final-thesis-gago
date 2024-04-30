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
      <button className="mt-5 mb-5 add-btn" onClick={(()=> navigate('/addgroup'))}>Create Community Chat</button>

      <h2 className='mb-5'>All Community chats: </h2>
      {allGroup.map((group) => {
        return (
          <div key={group.id} onClick={(()=> navigate(`/chat/${group.id}`))}>
            <h1>{group.groupname}</h1>
            <p>by: {group.username}</p>
            <hr></hr>
          </div>
          
        );
      })}
    </>
  );
};

export default AllGroup;