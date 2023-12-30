// ProviderChatRooms.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import ChatModal from './ChatModal';

const ProviderChatRooms = () => {
  const [rooms, setRooms] = useState([]);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const user = useSelector((state) => state.user.user);
  const providerId = user.userId;

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const response = await axios.get(`chat/provider-chat-rooms/${providerId}/`);
        setRooms(response.data);
      } catch (error) {
        console.error('Error fetching rooms:', error);
      }
    };

    fetchRooms();
  }, [providerId]);

  const handleRoomClick = (roomName) => {
    setSelectedRoom(roomName);
  };

  const handleCloseModal = () => {
    setSelectedRoom(null);
  };

  return (
    <div>
      <h2>Your Chat Rooms</h2>
      <ul>
        {rooms.map((room, index) => (
          <li key={index} onClick={() => handleRoomClick(room.name)}>
            {room.username}
          </li>
        ))}
      </ul>
      <ChatModal open={!!selectedRoom} onClose={handleCloseModal} roomName={selectedRoom} userId={providerId} />
    </div>
  );
};

export default ProviderChatRooms;
