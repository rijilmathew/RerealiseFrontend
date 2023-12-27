import {
  Button,
  TextField,
  Grid,
  Typography,
  Container,
  Modal,
  Box,
  Card,
  CardContent,
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

import emailjs from '@emailjs/browser';
import Swal from 'sweetalert2';

const UserSideBooking = ({ professionalId, payment, open, handleClose }) => {
  const [selectedDate, setSelectedDate] = useState("");
  const [existingTimeSlots, setExistingTimeSlots] = useState([]);
  const [selectedTimeSlotId, setSelectedTimeSlotId] = useState(null);
  const user = useSelector((state) => state.user.user);
  const user_id = user.userId;
  const name=user.username;
  const email=user.email;
  const message='Your Booking is Conformed will connect you through video call on time be ready'
  console.log("fgdgdghd", user_id);
  console.log("timeslotid", selectedTimeSlotId);
  console.log("user", user);
  const fetchExistingTimeSlots = async () => {
    try {
      if (selectedDate) {
        const response = await axios.get(
          `http://127.0.0.1:8000/api/usersdashboard/time-slots/${professionalId.id}/${selectedDate}`
        );
        setExistingTimeSlots(response.data);
      }
    } catch (error) {
      console.error("Error fetching existing time slots:", error);
    }
  };

  useEffect(() => {
    // Fetch existing time slots when the selected date changes
    fetchExistingTimeSlots();
  }, [selectedDate]);
   
  const handleEmail = async () => {


    // Your EmailJS service ID, template ID, and Public Key
    const serviceId = 'service_oe30g7w';
    const templateId = 'template_ivow317';
    const publicKey = 'QLEv-cClkT_fN3jF9';
    try {
      const templateParams = {
        from_name: name,
        from_email: email,
        to_email: email,
        message: message,
      };
  
      const response = await emailjs.send(serviceId, templateId, templateParams, publicKey);
      
      console.log('Email sent successfully:', response);
    } catch (error) {
      console.error('Error sending email:', error);
    }

  }





  const showRazorpay = async () => {
    if (!selectedTimeSlotId) {
      toast.error("Please select a time slot before making a payment");
      return;
    }
    try {
      const bodyData = new FormData();
      bodyData.append("fee", payment);
      const response = await axios.post(
        `http://127.0.0.1:8000/api/usersdashboard/start_payment/${user_id}/`,
        
        bodyData,
      );
      console.log(response)
      const options = {
        key: "rzp_test_Fh0XmWHxDPIEAF", // Replace with your Razorpay API key
        amount: payment * 100,
        currency: "INR",
        name: "Professional Booking",
        description: "This is the payment for AppointmentHub pvtltd",
        image: "", // Add image URL
        handler: function (response) {
          handlePaymentSuccess(response);
         

        },
        prefill: {
          name: "User's name",
          contact: "User's phone",
        },
        notes: {
          address: "Razorpay Corporate Office",
        },
        theme: {
          color: "#3399cc",
        },
      };

      const rzp1 = new window.Razorpay(options);
      rzp1.open();
    } catch (error) {
      console.log(error);
    }
  };

  
  const handlePaymentSuccess = async (response) => {
    const order_id = response.razorpay_payment_id; // Use razorpay_payment_id as the order ID
    console.log(order_id, "-yyy");
    try {
      const bodyData = new FormData();
      bodyData.append("response", JSON.stringify(response));
      bodyData.append("professional_id", professionalId.id);
      bodyData.append("user_id", user_id);
      bodyData.append("date", selectedDate);
      bodyData.append("timeslot", selectedTimeSlotId.id);
      bodyData.append("payment_amount", payment)
      bodyData.append("status", 'confirmed')

      console.log('bodydata',bodyData)
      const firstResponse=await axios.post("http://127.0.0.1:8000/api/usersdashboard/handle_payment_success/", bodyData);
      if (firstResponse.status === 201) { // Check if the first call was successful
        handleClose()
        Swal.fire({
          icon: 'success',
          title: 'Success!',
          text: ' Booked successfully.',
        });
        handleEmail()
  
        const notifyData = new FormData();
        notifyData.append("professional ", professionalId.id)
        notifyData.append("user", user_id)
        notifyData.append("read_status", false)
        notifyData.append("provider", selectedTimeSlotId.provider)
  
        console.log('notifydata', notifyData)
  
        // Make the second Axios call
        const secondResponse = await axios.post("http://127.0.0.1:8000/api/providerdashboard/booking-notification/", notifyData);
  
        if (secondResponse.status === 201) { // Check if the second call was successful
          console.log('created ')
        } else {
          console.error('Error creating booking notification');
        }
      } else {
        console.error('Error handling payment success');
      }




      console.log('created ')
    } catch (error) {
      console.log(error);
    }
  };

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
            width: "300px",
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography variant="h5" gutterBottom>
            Select Your Date
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
          </Grid>

          <Typography variant="h6" gutterBottom>
            Available TomeSlot:
          </Typography>
          <Typography variant="h6" gutterBottom>
            {selectedDate}
          </Typography>
          {existingTimeSlots.length === 0 ? (
            <Typography variant="body1">No time slots available</Typography>
          ) : (
            existingTimeSlots.map((timeSlot) => (
              <Card
                key={timeSlot.id}
                onClick={() => setSelectedTimeSlotId(timeSlot)}
                sx={{
                  backgroundColor:
                    selectedTimeSlotId && selectedTimeSlotId.id === timeSlot.id
                      ? "lightblue"
                      : "white",
                }}
              >
                <CardContent>
                <Typography variant="h6" component="div">
                  {`${parseTimeToValidDate(timeSlot.start_time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true })}
                    - ${parseTimeToValidDate(timeSlot.end_time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true })}`}
                </Typography>
                </CardContent>
              </Card>
            ))
          )}

          <Box
            mt={2}
            display={"flex"}
            justifyContent={"center"}
            alignItems={"center"}
          >
            <Button
              variant="contained"
              color="primary"
              onClick={showRazorpay}
            >
               Payment
            </Button>
          </Box>
        </Box>
      </Container>
    </Modal>
  );
};

export default UserSideBooking;











