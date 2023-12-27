import React, { useState } from 'react';
import { Box, TextField, Button, Typography } from '@mui/material';

const AddUserProfile = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    dob: '',
    address_lane_1: '',
    address_lane_2: '',
    pincode: '',
    profilePhoto: null, // You can use this to store the selected profile photo file
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData({
      ...formData,
      profilePhoto: file,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
   
  };

  return (
    <Box mt={4}>
      <Typography variant="h5">Add User Profile</Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          name="name"
          label="Name"
          variant="outlined"
          fullWidth
          value={formData.name}
          onChange={handleChange}
        />
        <TextField
          name="email"
          label="Email"
          variant="outlined"
          fullWidth
          value={formData.email}
          onChange={handleChange}
        />
        <TextField
          name="dob"
          label="Date of Birth"
          variant="outlined"
          fullWidth
          value={formData.dob}
          onChange={handleChange}
        />
        <TextField
          name="address_lane_1"
          label="Address Line 1"
          variant="outlined"
          fullWidth
          value={formData.address_lane_1}
          onChange={handleChange}
        />
        <TextField
          name="address_lane_2"
          label="Address Line 2"
          variant="outlined"
          fullWidth
          value={formData.address_lane_2}
          onChange={handleChange}
        />
        <TextField
          name="pincode"
          label="Pincode"
          variant="outlined"
          fullWidth
          value={formData.pincode}
          onChange={handleChange}
        />
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
        >
          Save Profile
        </Button>
      </form>
    </Box>
  );
}

export default AddUserProfile;



