
import React, { useState,useEffect } from 'react';
import { Button, TextField, Grid, Typography, Container, Modal, Box,Card, CardContent, Stack } from '@mui/material';
import axios from 'axios';
import  {toast} from 'react-toastify'
import UpdateTimeSlotModal from './UpdateTimeSlotModal';
import { useSelector } from 'react-redux';

const AddTimeSlotComponent = ({ onAddTimeSlot ,open, handleClose,professional_id}) => {
  const [selectedDate, setSelectedDate] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [existingTimeSlots, setExistingTimeSlots] = useState([]);
  const [openUpdateModal, setOpenUpdateModal] = useState(false);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState(null);
  const user = useSelector((state) => state.user.user);
  const providerId = user.userId;
  console.log('professionalId:',professional_id)
  const handleUpdateModalOpen = (timeSlot) => {
    setSelectedTimeSlot(timeSlot)
    setOpenUpdateModal(true);
  };

  const handleUpdateModalClose = () => {
    setSelectedTimeSlot(null);
    setOpenUpdateModal(false);
   
  };
  
  const fetchExistingTimeSlots = async () => {
    try {
      if (selectedDate&&professional_id) {

        const response = await axios.get(`providerdashboard/time-slots/${selectedDate}/${professional_id}`);
        setExistingTimeSlots(response.data);
         console.log('dated time',response.data)
         if (response.data && response.data.length ===0) {toast.error(' Add Your Time  ')}
         else{
          toast.success('Alredy Registered time Slot  ')
         }
      }
    } catch (error) {
      console.error('Error fetching existing time slots:', error);
     
    }
  };

  useEffect(() => {
    // Fetch existing time slots when the selected date changes
    fetchExistingTimeSlots();
  }, [selectedDate]);



  const handleAddTimeSlot = () => {
    const newTimeSlot = {
      date: selectedDate,
      start_time: startTime,
      end_time: endTime,
      provider:providerId,
    };

    // Call the callback function to send the time slot to the parent component
    onAddTimeSlot(newTimeSlot);

    // Reset input fields after adding the time slot
    setSelectedDate('')
    setStartTime('');
    setEndTime('');
    fetchExistingTimeSlots();
  };

  const handleDeleteTimeSlot= async (timeslot_id)=>{
    console.log('delet id ',timeslot_id)
    try{
         await axios.delete(`providerdashboard/time-slots/${timeslot_id}`);
         setExistingTimeSlots(existingTimeSlots.filter(timeSlot => timeSlot.id !== timeslot_id ));
         toast.success('Deleted Successfully')
         
       }
    catch (error){
       console.error('facing error for delete time slot')
    }
  }
   


  const parseTimeToValidDate = (time) => {
    const [hours, minutes] = time.split(':');
    const date = new Date();
    date.setHours(parseInt(hours, 10));
    date.setMinutes(parseInt(minutes, 10));
    return date;
  };

  const getCurrentDate = () => {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0');
    const day = String(currentDate.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };
  return (
    <Modal open={open} onClose={handleClose}>
      <Container>
      <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "500px",
            bgcolor: "#87CEFA",
            boxShadow: 24,
            p: 4,
          }}
        >
      <Typography variant="h5" gutterBottom>
        Add Time Slot
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            label="Date"
            type="date"
            fullWidth
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            inputProps={{ min: getCurrentDate() }}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            label="Start Time"
            type="time"
            fullWidth
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            label="End Time"
            type="time"
            fullWidth
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
          />
        </Grid>
      </Grid>
      <Button variant="contained" color="primary" onClick={handleAddTimeSlot}>
        Add Time Slot
      </Button>

      <Typography variant="h6" gutterBottom>
        Existing Time Slots for {selectedDate}:
      </Typography>
      {existingTimeSlots.length === 0 ? (
            <Typography variant="body1">No time slots available</Typography>
          ) : (
            existingTimeSlots.map((timeSlot) => (
              <Card key={timeSlot.id}>
                <CardContent>
                <Typography variant="h6" component="div">
                  {`${parseTimeToValidDate(timeSlot.start_time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true })}
                    - ${parseTimeToValidDate(timeSlot.end_time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true })}`}
                </Typography>
                  <Stack display={'flex'} flexDirection={'row'} justifyContent={'space-between'} alignContent={'center'}>
                    <UpdateTimeSlotModal open={openUpdateModal} handleClose={handleUpdateModalClose} timeSlot={selectedTimeSlot} />
                    <Button variant='contained'onClick={()=>handleUpdateModalOpen(timeSlot)}>Update</Button>
                    <Button variant='contained'onClick={()=>handleDeleteTimeSlot(timeSlot.id)}>Delete</Button>
                  </Stack>
                </CardContent>
              </Card>
            ))
          )}

      </Box>
      </Container>
    </Modal>

  );
};

export default AddTimeSlotComponent;
