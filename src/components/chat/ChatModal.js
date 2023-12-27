// ChatModal.js
import React from 'react';
import { Dialog, DialogTitle, DialogContent } from '@mui/material';
import ProviderChat from './ProviderChat';

const ChatModal = ({ open, onClose, roomName, userId }) => {
  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
      <DialogTitle>{`Chat Room: ${roomName}`}</DialogTitle>
      <DialogContent>
        <ProviderChat room_name={roomName} userId={userId} />
      </DialogContent>
    </Dialog>
  );
};

export default ChatModal;
