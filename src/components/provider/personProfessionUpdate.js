import React, {  useEffect, useMemo, useState } from 'react'
import { Box, Button, Modal, Stack, TextField, Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import axios from 'axios'
import Swal from 'sweetalert2';
const PersonProfessionUpdate = ({open,handleClose,personLists,onUpdateSuccess}) => {
   console.log('personListUpdate:',personLists)
    const user = useSelector((state) => state.user.user);
    const user_id = user.userId;
    const [personData, setPersonData] = useState({
        name: personLists.name,
        profession:  personLists.profession,
        add_info: personLists.add_info,
        phone_number: personLists.phone_number,
        email:personLists.email,
        website_link: personLists.website_link,
        is_active: false,
        profileimage: null, 
        payment:personLists.payment,
        provider:user_id,
      });

    
      useEffect(() => {
        if (personLists) {
          setPersonData({
            name: personLists.name,
            profession:  personLists.profession,
            add_info: personLists.add_info,
            phone_number: personLists.phone_number,
            email:personLists.email,
            website_link: personLists.website_link,
            is_active: false,
            profileimage: null, 
            payment:personLists.payment,
            provider:user_id,
          });
        }
      }, [personLists, user_id]);

    console.log('personData:',personData)
    const handleChange = useMemo(() => (e) => {
      const { name, value } = e.target;
      setPersonData({ ...personData, [name]: value });
    }, [personData]);

    const handleImageChange = (e)=>{
        const imageFile = e.target.files[0];
        if (imageFile){
            setPersonData({...personData,profileimage:imageFile});
            console.log('gfhg:',personData)
        }
       
    };

    const handleUpdate = (e) => {
        e.preventDefault();
        
       // Post request to the backend to create a new CareHome
        axios.put(`providerdashboard/persons/${personLists.id}`, personData, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
           })
          .then(response => {
            console.log('CareHome updated:', response.data);
            handleClose(); 
            Swal.fire({
              icon: 'success',
              title: 'Success!',
              text: ' Updated successfully.',
            });
            onUpdateSuccess()

          })
          .catch(error => {
            console.error('Error creating CareHome:', error);
            Swal.fire({
              icon: 'error',
              title: 'Error!',
              text: 'Failed to Update. Please try again.',
            });
          });
      };
  return (
    <Modal open={open} onClose={handleClose}>
    <Box sx={{position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width:'500px',
       height:'80vh',overflowY:'scroll', bgcolor: 'background.paper', boxShadow: 24, p: 4}}>
        <Box sx={{ position: 'sticky', top: 0, zIndex: 1, bgcolor:'grey', p: 2 }}>
            <Typography variant="h5" align="center" fontWeight="bold" marginTop="2">
              Enter Your Valid Details
            </Typography>
          </Box>
    <form onSubmit={handleUpdate}>
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
            type="tel" // Use 'tel' type for phone number field
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
            type="email" // Use 'email' type for email field
            margin="normal"
            inputProps={{ maxLength: 100 }} 
        />
        <input
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        sx={{ marginTop: 2,backgroudColor:'black' }}
        />
        <TextField
            required
            label="Website Link"
            variant="filled"
            fullWidth
            name="website_link"
            value={personData.website_link}
            onChange={handleChange}
            type="url" // Use 'url' type for website link field
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
            type="tel" // Use 'tel' type for phone number field
            margin="normal"
            inputProps={{ maxLength: 100 }} 
        />
        <Stack> <Button variant='contained' type="submit">Submit</Button></Stack>
        
        </form>

    </Box>
</Modal>
  )
}

export default PersonProfessionUpdate