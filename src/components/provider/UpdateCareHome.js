import React, { useEffect, useRef, useState } from 'react'
import { Box, Button, Modal, TextField, Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import axios from 'axios'
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import Swal from 'sweetalert2';

mapboxgl.accessToken = 'pk.eyJ1IjoicmlqaWxtYXRoZXciLCJhIjoiY2xwN3l3anZ1MDFhdzJpbmhnc2Nkb2Z1byJ9.piSBAE09wbjiI9ikVACURw';
const UpdateCareHome = ({open,handleClose,careHomes,onUpdateSuccess }) => {
    console.log(careHomes)
    const user = useSelector((state) => state.user.user);
    const user_id = user.userId;
    
    const [careHomeData, setCareHomeData] = useState({
        provider:user_id ,
        carehomename: careHomes.carehomename,
        address_1:careHomes.address_1,
        address_2:careHomes.address_2,
        address_3: careHomes.address_3,
        type_of_service: careHomes.type_of_service,
        facilities: careHomes.facilities,
        phone_number:careHomes.phone_number,
        email: careHomes.email,
        website_link: careHomes.website_link,
        is_active: false,
        latitude: careHomes.latitude,
        longitude: careHomes.longitude,
        imageone:null, 
      });


      useEffect(() => {
        if (careHomes) {
          setCareHomeData({
            provider: user_id,
            carehomename: careHomes.carehomename,
            address_1: careHomes.address_1,
            address_2: careHomes.address_2,
            address_3: careHomes.address_3,
            type_of_service: careHomes.type_of_service,
            facilities: careHomes.facilities,
            phone_number: careHomes.phone_number,
            email: careHomes.email,
            website_link: careHomes.website_link,
            is_active: false,
            latitude: careHomes.latitude,
            longitude: careHomes.longitude,
            imageone: null,
          });
        }
      }, [careHomes, user_id]);
    
    const handleChange =(e)=>{
        const{name,value}=e.target;
        setCareHomeData({...careHomeData,[name]:value});
    }

    const handleImageChange = (e) => {
      const imageFile = e.target.files[0];
      if (imageFile) {
          setCareHomeData({ ...careHomeData, imageone: imageFile });
          console.log('New Image Selected:', imageFile);
      } else {
          // No new file selected, keep the existing image
          setCareHomeData({ ...careHomeData, imageone: null });
      }
  };
  

    const handleUpdate = (e) => {
        e.preventDefault();
        
       // Post request to the backend to create a new CareHome
        axios.put(`http://127.0.0.1:8000/api/providerdashboard/carehomes/${careHomes.id}`, careHomeData, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
           })
          .then(response => {
            console.log('CareHome updated:', response.data);
            handleClose(); // Close the modal after successful submission
          
            Swal.fire({
              icon: 'success',
              title: 'Success!',
              text: 'CareHome Updated  successfully.',
            });
            onUpdateSuccess();
          })
          .catch(error => {
            console.error('Error creating CareHome:', error);
            Swal.fire({
              icon: 'error',
              title: 'Error!',
              text: 'Failed to Delete . Please try again.',
            });
          });
      };


      const mapContainerRef = useRef(null); // Define mapContainerRef
      useEffect(() => {
        if (!open) {
          return; // Exit if the modal is closed
        }
    
        const mapContainer = mapContainerRef.current;
    
        if (!mapContainer) {
          return;
        }
    
        const map = new mapboxgl.Map({
          container: mapContainer, // Use mapContainer directly
          style: 'mapbox://styles/mapbox/streets-v11',
          center: [careHomeData.longitude, careHomeData.latitude], // Use careHomeData directly
          zoom: 6,
        });
    
        // Add a marker on the map
        const marker = new mapboxgl.Marker({ draggable: true })
          .setLngLat([careHomeData.longitude, careHomeData.latitude]) // Use careHomeData directly
          .addTo(map);
    
        // Update the careHomeData state when the marker is dragged
        marker.on('dragend', (event) => {
          const { lng, lat } = event.target.getLngLat();
          console.log('lonitude:',lat)
          setCareHomeData({
            ...careHomeData,
            longitude: lng,
            latitude: lat,
          });
        });
    
        // Cleanup the map when the component is unmounted
        return () => map.remove();
      }, [open, careHomeData, mapContainerRef]);
  return (
    <Modal open={open} onClose={handleClose}>
    <Box>
    <Box sx={{position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '400px',
       height:'80vh',overflowY:'scroll', bgcolor: 'background.paper', boxShadow: 24, p: 4}}>
          <Box sx={{ position: 'sticky', top: 0, zIndex: 1, bgcolor:'grey', p: 2 }}>
            <Typography variant="h5" align="center" fontWeight="bold">
              Update Your  Details
            </Typography>
          </Box>
        <Box> 
        <form onSubmit={handleUpdate}>
        <TextField
          required
          label="Care Home Name"
          variant="filled"
          fullWidth
          name="carehomename"
          value={careHomeData.carehomename}
          onChange={handleChange}
          margin="normal"
          inputProps={{ maxLength: 30 }} 
        />
        <TextField
          required
          label="Address 1"
          variant="filled"
          fullWidth
          name="address_1"
          value={careHomeData.address_1}
          onChange={handleChange}
          margin="normal"
          inputProps={{ maxLength: 30 }} 
        />
        <TextField
          required
          label="Address 2"
          variant="filled"
          fullWidth
          name="address_2"
          value={careHomeData.address_2}
          onChange={handleChange}
          margin="normal"
          inputProps={{ maxLength: 30 }} 
        />
        <TextField
          required
          label="Address 3"
          variant="filled"
          fullWidth
          name="address_3"
          value={careHomeData.address_3}
          onChange={handleChange}
        />
        <TextField
          id="outlined-multiline-static"
          required
          label="Type Of Service"
          variant="outlined"
          fullWidth
          name="type_of_service"
          value={careHomeData.type_of_service}
          onChange={handleChange}
          margin="normal"
          inputProps={{ maxLength: 200 }} 
          multiline
          maxRows={4}
        />
         <TextField
          id="outlined-multiline-static"
          required
          label="Facilities"
          variant="filled"
          fullWidth
          name="facilities"
          value={careHomeData.facilities}
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
            value={careHomeData.phone_number}
            onChange={handleChange}
            type="tel"
            margin="normal"
            inputProps={{ maxLength: 10 }} 
        />
        <TextField
            required
            label="Email"
            variant="filled"
            fullWidth
            name="email"
            value={careHomeData.email}
            onChange={handleChange}
            type="email" 
            margin="normal"
            
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
            value={careHomeData.website_link}
            onChange={handleChange}
            type="url" 
            margin="normal"
             
        />
         <Typography sx={{margin:'2'}}>Mark Your Location below</Typography>
        <div ref={mapContainerRef} style={{ height: '200px', marginBottom: '10px', border: '1px solid #ccc' }}></div>
        <Button variant="contained" onClick={handleUpdate}>Update Changes</Button>
        </form>
        </Box>
    </Box>
    </Box>
</Modal>
  )
}

export default UpdateCareHome