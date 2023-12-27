import React, { useState, useEffect } from "react";
import axios from "axios";
import useWebSocket from "react-use-websocket";
import {
  Box,
  Grid,
  List,
  ListItem,
  ListItemText,
  Typography,
  TextField,
  Button,
} from "@mui/material";
import { useSelector } from "react-redux";

const ChatApp = () => {
  const user = useSelector((state) => state.user.user);
  const providerId = user.userId;

  const [rooms, setRooms] = useState([]);
  const [unseenCounts, setUnseenCounts] = useState({});
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [messages, setMessages] = useState([]);
  const [messageInput, setMessageInput] = useState("");
  const { lastMessage, sendMessage } = useWebSocket(
    selectedRoom ? `ws://127.0.0.1:8000/ws/chat/${selectedRoom}/?userId=${providerId}` : null
  );

  useEffect(() => {
    // Fetch rooms
    axios
      .get(`http://127.0.0.1:8000/api/chat/provider-chat-rooms/${providerId}/`)
      .then((response) => {
        setRooms(response.data);
      })
      .catch((error) => {
        console.error("Error fetching rooms:", error);
      });
  }, [providerId]);

  const fetchMessages = (roomName) => {
    // Fetch messages for the selected room
    axios
      .get(`http://127.0.0.1:8000/api/chat/last-50-messages/${roomName}/`)
      .then((response) => {
        setMessages(response.data);
        console.log('50 msg:',response.data)
      })
      .catch((error) => {
        console.error("Error fetching messages:", error);
      });
  };

  useEffect(() => {
    if (lastMessage && lastMessage.data) {
      try {
        const data = JSON.parse(lastMessage.data);

        if (data.type === "chat.message") {
          const message = data.message;

          if (message.content && message.user) {
            setMessages((prevMessages) => [...prevMessages, message]);
          } else {
            console.error("Invalid message format:", message);
          }
        }
      } catch (error) {
        console.error("Error parsing message:", error);
      }
    }
  }, [lastMessage]);

  const handleRoomClick = async (roomName,roomId) => {
    try {
     
      // Fetch messages for the selected room
      setSelectedRoom(roomName);
      fetchMessages(roomName);
       // Mark messages as seen
       await axios.patch(`http://127.0.0.1:8000/api/chat/mark-messages-as-seen/${roomId}/`);
       fetchUnseenMessageCounts();
       
       
    } catch (error) {
      console.error("Error marking messages as seen:", error);
    }
  };

  const handleSendMessage = () => {
    if (messageInput.trim()) {
      const newMessage = {
        message: messageInput,
        sender: providerId, // Assuming the sender is the user for simplicity
      };
      sendMessage(JSON.stringify(newMessage));
      setMessageInput("");
    }
  };
   
  const fetchUnseenMessageCounts = async () => {
    const counts = {};
    for (const room of rooms) {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/api/chat/unseen-messages-count/${room.id}/`);
        counts[room.id] = response.data.unseen_count;
      } catch (error) {
        console.error(`Error fetching unseen count for room ${room.id}:`, error);
      }
    }
    setUnseenCounts(counts);
  };



  useEffect(() => {
    // Fetch unseen message counts for each room
   
    fetchUnseenMessageCounts();
  }, [rooms]);

  return (
    <Box p={2}style={{ backgroundColor: '#f0f0f0' }}>
      <Grid container spacing={2}>
        {/* Room List (Right Side) */}
        <Grid item xs={12} md={4}>
          <Typography variant="h6"  align="center"
             sx={{backgroundColor:'#E24871'}}
          >Your Chat Rooms</Typography>
          <List>
            {rooms.map((room, index) => (
              <ListItem
                key={index}
                button
                onClick={() => handleRoomClick(room.name,room.id)}
                selected={selectedRoom === room.name}
                style={{backgroundColor:'#F1F620'}}
              >
                <ListItemText 
                  primary={room.username} 
                  secondary={`Unseen Messages: ${unseenCounts[room.id] || 0}`}
                  style={{ backgroundColor: selectedRoom === room.name ? '#E24871' : 'transparent',
                  borderRadius: '10px',
                  padding:'5px',
                  }}
                
                />
                
              </ListItem>
            ))}
          </List>
        </Grid>

        {/* Chat Box (Left Side) */}
        <Grid item xs={12} md={8}>
          {selectedRoom ? (
            <Box>
              <Typography variant="h6" align='center'>Chat With User</Typography>
              <List style={{ maxHeight: "400px", overflowY: "scroll", backgroundColor: '#95C5F6' }}>
                {messages.map((msg, index) => (
                  <ListItem key={index}
                    style={{
                        textAlign: msg.user === providerId ? 'left' : 'right',
                    }}
                  >
                    <ListItemText
                      primary={msg.user === providerId ? "You" : "User"}
                      secondary={msg.content}
                    />
                  </ListItem>
                ))}
              </List>
              <TextField
                label="Type your message"
                variant="outlined"
                fullWidth
                value={messageInput}
                onChange={(e) => setMessageInput(e.target.value)}
              />
              <Button
                onClick={handleSendMessage}
                variant="contained"
                color="primary"
              >
                Send
              </Button>
            </Box>
          ) : (
            <Typography variant="h6">
              Select a User to start chatting
            </Typography>
          )}
        </Grid>
      </Grid>
    </Box>
  );
};

export default ChatApp;
