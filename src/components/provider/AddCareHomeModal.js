import { Box, Button, Modal, TextField, Typography } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react'
import axios from 'axios'
import { useSelector } from 'react-redux';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import Swal from 'sweetalert2';

const mapboxglaccessToken  = process.env.REACT_APP_MAPBOXGL_ACCESSSTOKEN
mapboxgl.accessToken = mapboxglaccessToken

const AddCareHomeModal = ({open,handleClose}) => {
    const user = useSelector((state) => state.user.user);
    const user_id = user.userId;
    const [careHomeData, setCareHomeData] = useState({
        provider:user_id,
        carehomename: '',
        address_1: '',
        address_2: '',
        address_3: '',
        type_of_service: '',
        facilities: '',
        phone_number: '',
        email: '',
        website_link: '',
        is_active: false,
        latitude:10.1632,
        longitude:76.6413,
        imageone: null, 
      });
    
    const handleChange =(e)=>{
        const{name,value}=e.target;
        setCareHomeData({...careHomeData,[name]:value});
    }
    const handleImageChange = (e)=>{
        const imageFile = e.target.files[0];
        setCareHomeData({...careHomeData,imageone:imageFile})
        console.log('gfhg:',careHomeData)
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        // Post request to the backend to create a new CareHome
        axios.post('http://127.0.0.1:8000/api/providerdashboard/carehomes/', careHomeData, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          
           })
          .then(response => {
            console.log('CareHome created:', response.data);
            handleClose(); // Close the modal after successful submission
            Swal.fire({
              icon: 'success',
              title: 'Success!',
              text: 'created successfully.',
            });

          })
          .catch(error => {
            console.error('Error creating CareHome:', error);
            Swal.fire({
              icon: 'error',
              title: 'Error!',
              text: 'Failed to create . Please try again.',
            });
          });
      };

      // Map Initialization
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
      }, [open,careHomeData,mapContainerRef]);

  return (
    <Modal open={open} onClose={handleClose}>
      <Box>
        <Box sx={{position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
         width: '500px',height:'80vh',overflowY:'scroll',bgcolor:'background.paper', boxShadow: 24, p: 4}}>
          <Box sx={{ position: 'sticky', top: 0, zIndex: 1, bgcolor:'grey', p: 2 }}>
            <Typography variant="h5" align="center" fontWeight="bold" marginTop="2">
              Enter Your Valid Details
            </Typography>
          </Box>
          <Box sx={{ paddingTop: '25px' }}> 
            <form onSubmit={handleSubmit}>
            <TextField
              required
              label="Care Home Name"
              variant="filled"
              fullWidth
              name="carehomename"
              value={careHomeData.carehomename}
              onChange={handleChange}
              margin="normal"
              inputProps={{ maxLength: 100 }} 
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
            />
            <TextField
              required
              label="Address 3"
              variant="filled"
              fullWidth
              name="address_3"
              value={careHomeData.address_3}
              onChange={handleChange}
              margin="normal"
            />
            <TextField
              id="outlined-multiline-static"
              required
              label="Type Of Service"
              variant="filled"
              fullWidth
              name="type_of_service"
              value={careHomeData.type_of_service}
              onChange={handleChange}
              margin="normal"
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
              multiline
              maxRows={4}
              inputProps={{ maxLength: 200 }}
            />
            <TextField
                id="outlined-multiline-static"
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
            <div ref={mapContainerRef} style={{ height: '200px', marginBottom: '10px',marginTop:'10px', border: '1px solid #ccc' }}>
            
            </div>
             <Button variant='contained' type="submit">Submit</Button>
            </form>
            </Box>

        </Box>
        </Box>
    </Modal>
  )
}

export default AddCareHomeModal