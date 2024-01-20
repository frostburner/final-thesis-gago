import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import Navbar from '../../Components/Navbar/Navbar';
import { AuthContext } from '../../Helpers/AuthContext';
import moment from 'moment';
import "./chat.css"

const Chat = () => {
  const { id } = useParams();
  const [conversation, setConversation] = useState({ messages: [] });
  const [newMessage, setNewMessage] = useState('');
  const navigate = useNavigate();
  const { authState } = useContext(AuthContext);

  useEffect(() => {
    fetchConversation();  
    const intervalId = setInterval(fetchConversation, 100);
    return () => clearInterval(intervalId);
  }, [id]);

  const fetchConversation = () => {
    axios
      .get(`http://localhost:8080/conversations/chat/${id}`)
      .then((response) => {
        setConversation(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleSendMessage = async () => {
    try {
      await axios.post(`http://localhost:8080/messages`, {
        content: newMessage,
        username: authState.username,
        ConversationId: id,
      });
      setNewMessage('');
      fetchConversation();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="chat-container">
        {conversation.messages.map((chat) => (
          <div className="chats" key={chat.id}>
            <h2>{chat.content}</h2>
            <p>Sent by {chat.username} at {moment(chat.timestamp).format(' HH:mm:ss')}</p>
          </div>
        ))}
      </div>
      <div className="message-input-form">
        <textarea placeholder="Say hi..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}></textarea>
        <button onClick={handleSendMessage}>Send</button>
      </div>
    </>
  );
};

export default Chat;