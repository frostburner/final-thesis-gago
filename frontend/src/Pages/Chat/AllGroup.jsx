import React, { useEffect, useState } from 'react';
import Navbar from '../../Components/Navbar/Navbar';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

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
      <button onClick={(()=> navigate('/addgroup'))}>Create Group Chat</button>
      {allGroup.map((group) => {
        return (
          <div key={group.id} onClick={(()=> navigate(`/chat/${group.id}`))}>
            <h1>{group.groupname}</h1>
            <p>by: {group.username}</p>
          </div>
        );
      })}
    </>
  );
};

export default AllGroup;
