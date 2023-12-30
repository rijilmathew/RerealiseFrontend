import { Box, Button, Modal, Stack, TextField, Typography } from '@mui/material';
import React, { useState } from 'react'
import axios from 'axios'
import { useSelector } from 'react-redux';
import Swal from 'sweetalert2';


const AddPerson = ({open,handleClose}) => {
    const user = useSelector((state) => state.user.user);
    const user_id = user.userId;
    const [personData, setPersonData] = useState({
        name: '',
        profession: '',
        add_info: '',
        phone_number: '',
        email: '',
        website_link: '',
        is_active: false,
        profileimage: null, 
        payment:0,
        provider:user_id,
      });
    
    const handleChange =(e)=>{
        const{name,value}=e.target;
        setPersonData({...personData,[name]:value});
    }
    const handleImageChange = (e)=>{
        const imageFile = e.target.files[0];
        setPersonData({...personData,profileimage:imageFile})
        console.log('gfhg:',personData)
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        setPersonData({
          ...personData,
          provider: user_id,
        });
    
        // Post request to the backend to create a new CareHome
        axios.post('providerdashboard/persons/', personData, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
           })
          .then(response => {
            console.log('Person created:', response.data);
            handleClose(); // Close the modal after successful submission
            Swal.fire({
              icon: 'success',
              title: 'Success!',
              text: 'CareHome created successfully.',
            });
          })
          .catch(error => {
            console.error('Error creating CareHome:', error);
            Swal.fire({
              icon: 'error',
              title: 'Error!',
              text: 'Failed to create CareHome. Please try again.',
            });
          });
      };

  return (
    <Modal open={open} onClose={handleClose}>
        <Box sx={{position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '500px',
            height:'80vh',overflowY:'scroll', bgcolor: 'background.paper', boxShadow: 24, p: 4}}>
            <Box sx={{ position: 'sticky', top: 0, zIndex: 1, bgcolor:'grey', p: 2 }}>
            <Typography variant="h5" align="center" fontWeight="bold" marginTop="2">
              Enter Your Valid Details
            </Typography>
          </Box>
            <form onSubmit={handleSubmit}>
            <TextField
              required
              label="Person Name"
              variant="filled"
              fullWidth
              name="name"
              value={personData.name}
              onChange={handleChange}
              margin="normal"
              inputProps={{ maxLength: 100 }} 
            />
            <TextField
              required
              label="Add Profession"
              variant="filled"
              fullWidth
              name="profession"
              value={personData.profession}
              onChange={handleChange}
              margin="normal"
              inputProps={{ maxLength: 100 }} 
            />
            <TextField
              required
              label="More Info"
              variant="filled"
              fullWidth
              name="add_info"
              value={personData.add_info}
              onChange={handleChange}
              margin="normal"
              inputProps={{ maxLength: 100 }} 
              multiline
              maxRows={4}
            />
            <TextField
                required
                label="Phone Number"
                variant="filled"
                fullWidth
                name="phone_number"
                value={personData.phone_number}
                onChange={handleChange}
                type="tel" 
                margin="normal"
                inputProps={{ maxLength: 100 }} 
            />
            <TextField
                required
                label="Email"
                variant="filled"
                fullWidth
                name="email"
                value={personData.email}
                onChange={handleChange}
                type="email" 
                margin="normal"
                inputProps={{ maxLength: 100 }} 
            />
            <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            sx={{ marginTop: 4,backgroudColor:'black' }}
            />
            <TextField
                required
                label="Website Link"
                variant="filled"
                fullWidth
                name="website_link"
                value={personData.website_link}
                onChange={handleChange}
                type="url" 
                margin="normal"
                inputProps={{ maxLength: 100 }} 
            />
             <TextField
                required
                label="Enter Your Fees/hour"
                variant="filled"
                fullWidth
                name="payment"
                value={personData.payment}
                onChange={handleChange}
                type="tel" 
                margin="normal"
                inputProps={{ maxLength: 100 }} 
            />
            <Stack><Button variant='contained' type="submit">Submit</Button></Stack>
             
            </form>

        </Box>
    </Modal>
  )
}

export default AddPerson