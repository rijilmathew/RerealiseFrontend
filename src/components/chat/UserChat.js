import React, { useState, useEffect } from "react";
import useWebSocket from "react-use-websocket";
import axios from "axios";
import {
  Box,
  Typography,
  TextField,
  Button,
  List,
  ListItem,
  ListItemText,
  IconButton,
} from "@mui/material";
import Modal from "@mui/material/Modal";
import Paper from "@mui/material/Paper";
import CloseIcon from "@mui/icons-material/Close";



const UserChat = ({ room_name, userId, isOpen, onClose }) => {
  const [messages, setMessages] = useState([]);
  const [messageInput, setMessageInput] = useState("");
  const { lastMessage, sendMessage } = useWebSocket(
    room_name ? `ws://127.0.0.1:8000/ws/chat/${room_name}/?userId=${userId}` : null
  );

  useEffect(() => {
    if (room_name) {
      // Fetch last 50 messages using Axios
      axios.get(`http://127.0.0.1:8000/api/chat/last-50-messages/${room_name}/`)
        .then(response => {
          setMessages(response.data);
        })
        .catch(error => {
          console.error('Error fetching messages:', error);
        });
    }
  }, [room_name]);

  useEffect(() => {
    if (lastMessage && lastMessage.data) {
      try {
        const data = JSON.parse(lastMessage.data);

        if (data.type === 'chat.message') {
          const message = data.message;

          if (message.content && message.user) {
            setMessages((prevMessages) => [...prevMessages, message]);
          } else {
            console.error('Invalid message format:', message);
          }
        }
      } catch (error) {
        console.error('Error parsing message:', error);
      }
    }
  }, [lastMessage]);

  const handleSendMessage = () => {
    if (messageInput.trim()) {
      const newMessage = {
        message: messageInput,
        sender: userId,
      };
      sendMessage(JSON.stringify(newMessage));
      setMessageInput("");
    }
  };

  // if (!room_name) {
  //   return <Typography variant="h5">Loading...</Typography>;
  // }

  return (
    <Modal open={isOpen} onClose={onClose} style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
      <Paper elevation={3} style={{ width: "80%", maxWidth: "600px", maxHeight: "70vh", overflowY: "auto" }}>
        <Box>
          <Box
          display={"flex"}
          justifyContent={"space-between"}
          alignItems={"center"}
         
          >
             <Typography variant="h5">Chat</Typography>
             <IconButton onClick={onClose} sx={{color:"red"}}>
                <CloseIcon/>
             </IconButton>

          </Box>
          <List  style={{ maxHeight: "300px", overflowY: "scroll" }}>
            {messages.map((msg, index) => (
              <ListItem key={index}
              style={{
                textAlign: msg.user === userId ? 'left' : 'right',
            }}
              >
                <ListItemText
                  primary={msg.user === userId ? "You" : "Provider"}
                  secondary={msg.content}
                  style={{
                    color: msg.user === userId ? 'blue' : 'green', // Set colors based on user
                  }}
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
          <Box 
          display={"flex"}
          justifyContent={"space-between"}
          alignItems={"center"}
          sx={{mt:2,mb:2}}
          
          >
            <Button onClick={handleSendMessage} variant="contained" color="primary"  style={{ marginLeft: 'auto' }}>
              Send
            </Button>
          </Box>
        </Box>
     </Paper>
    </Modal>
  );
};

export default UserChat;
