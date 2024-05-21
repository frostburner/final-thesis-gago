import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import Navbar from '../../Components/Navbar/Navbar';
import { AuthContext } from '../../Helpers/AuthContext';
import './chat.css';

const ChatUser = () => {
  const { id } = useParams();
  const [conversation, setConversation] = useState({ messages: [] });
  const [newMessage, setNewMessage] = useState('');
  const navigate = useNavigate();
  const { authState } = useContext(AuthContext);

  useEffect(() => {
    fetchConversation();
    const intervalId = setInterval(fetchConversation, 10000);
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

  // Function to fetch messages between two users
  const fetchMessagesBetweenUsers = async (userId, otherUserId) => {
    try {
      const response = await axios.get(`http://localhost:8080/messages/user/${userId}/${otherUserId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching messages between users:', error);
      return [];
    }
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
      <Navbar />
      <div className="chatBody">
        <div className="chat-container">
          {conversation.messages.map((chat) => (
            <div className="chats" key={chat.id}>
              <h2>{chat.content}</h2>
              <p>{chat.username}</p>
              <hr />
            </div>
          ))}
        </div>
        
        <div className="message-input-form">
          <textarea className="chat-area" placeholder="Type your message..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  handleSendMessage();
              }}}>

              
            </textarea>
  
          <button onClick={handleSendMessage}>Send</button>
        </div>
      </div>
    </>
  );
};

export default ChatUser;