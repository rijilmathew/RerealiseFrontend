import React, { useEffect, useState } from 'react';
import { Button, Modal, Box, Typography, TextField, Grid } from '@mui/material';
import axios from 'axios';

const UpdateTimeSlotModal = ({ open, handleClose, timeSlot }) => {
  const [newStartTime, setNewStartTime] = useState('');
  const [newEndTime, setNewEndTime] = useState('');
  console.log('timeslot:',timeSlot)
  useEffect(() => {
    // Update state when timeSlot changes
    if (timeSlot && timeSlot.start_time) {
      setNewStartTime(timeSlot.start_time);
    }
    if (timeSlot && timeSlot.end_time) {
      setNewEndTime(timeSlot.end_time);
    }
  }, [timeSlot]);
  
  
  
  
  const handleUpdate = async () => {
    try {
      const updatedTimeSlot = {
        professional: timeSlot.professional,
        date: timeSlot.date,
        start_time: newStartTime,
        end_time: newEndTime,
        is_booked:timeSlot.is_booked,
        provider:timeSlot.provider,


      };

      await axios.put(`http://127.0.0.1:8000/api/providerdashboard/time-slots/${timeSlot.id}`, updatedTimeSlot);
      handleClose(); // Close the modal after updating
    } catch (error) {
      console.error('Error updating time slot:', error);
    }
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '500px',
          bgcolor: 'background.paper',
          boxShadow: 24,
          p: 4,
        }}
      >
        <Typography variant="h5" gutterBottom>
          Update Time Slot
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <TextField
              label="Start Time"
              type="time"
              fullWidth
              value={newStartTime}
              onChange={(e) => setNewStartTime(e.target.value)}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="End Time"
              type="time"
              fullWidth
              value={newEndTime}
              onChange={(e) => setNewEndTime(e.target.value)}
            />
          </Grid>
        </Grid>
        <Button variant="contained" color="primary" onClick={handleUpdate}>
          Update
        </Button>
      </Box>
    </Modal>
  );
};

export default UpdateTimeSlotModal;
