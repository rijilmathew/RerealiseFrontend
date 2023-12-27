import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box,List, ListItem, ListItemText, Button, Stack, Typography, Rating, IconButton} from '@mui/material';
// import { useSelector } from 'react-redux';
import PersonProfessionUpdate from './personProfessionUpdate';
import AddTimeSlotComponent from './AddTimeSlot';
import { Link, useParams } from 'react-router-dom';
import {toast} from 'react-toastify';
import { CustomCareHomeBox } from '../user/userPageStyles/UserHomeStyle';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import ProfessionalPersonReview from '../user/ProfessionalPersonReview';
import ProviderPersonReview from './ProviderPersonReview';

const ProviderPersonSingleView = () => {
    const [personList, setPerson] = useState([]);

    const { personId } = useParams();
    console.log(personId ,'personId')
    const [personLists, setPersonLists] = useState([]);
    const navigate = useNavigate()
    
    const [openUpdateModal, setOpenUpdateModal] = useState(false);
    const [openBookingModal,setOpenBookingModal]=useState(false);

    const handleUpdateModalOpen = () => {
      setOpenUpdateModal(true);
    };
  
    const handleUpdateModalClose = () => {
      setOpenUpdateModal(false);
    };
    const handleBookingModalOpen = () => {
        setOpenBookingModal(true);
      };
    
    const handleBookingModalClose = () => {
        setOpenBookingModal(false);
      };
    const fetchProviderList = async () => {
        try {
            const response = await axios.get(`http://127.0.0.1:8000/api/providerdashboard/persons/${personId}`);
            setPerson(response.data);
            console.log('setPerson:',response.data)
        } catch (error) {
            console.error('Error fetching care homes:', error);
        }
        };

    useEffect(() => {
       fetchProviderList();
    }, [personId]);

    const handleDelete = async (personId) => {
        try {
            await axios.delete(`http://127.0.0.1:8000/api/providerdashboard/persons/${personId}`);
            // Filter out the deleted care home from the careHomes state
            setPersonLists(personLists.filter(personList => personList.id !== personId ));
            Swal.fire({
                icon: 'success',
                title: 'Success!',
                text: 'Deleted successfully.',
              });
            navigate('/provider-personlist')

        } catch (error) {
            console.error('Error deleting care home:', error);
        }
    };
    console.log('dfsdfdsd:',personLists)


    const onAddTimeSlot = async (personId,newTimeSlot) => {
        try {
          const timeSlotData = { professional: personId, ...newTimeSlot };
          const response = await axios.post('http://127.0.0.1:8000/api/providerdashboard/addtimeslot/', timeSlotData);
          console.log('Time slot added successfully:', response.data);
          toast.success('Time slot added successfully')
          
    
          // You can update the state or perform any other actions after a successful API call
        } catch (error) {
          console.error('Error adding time slot:', error);
          toast.error('Error adding time slot')
          // Handle errors as needed
        }
      };
    const handleUpdateSuccess = ()=>{
        fetchProviderList()
    }


    return (
        <>
        <CustomCareHomeBox>
          <Box>
            <img
              src={personList.profileimage}
              alt="Care Home"
              style={{ height: "300px", width: "100%", objectFit: "cover" }}
            />
            <Stack
              direction="row"
              spacing={2}
              justifyContent={"space-between"}
              alignItems={"center"}
            >
              <Typography>
                {personList.total_reviews} Reviews
              </Typography>
              <Rating 
              name="five-star" 
              value={parseFloat(personList.average_rating)}
              readOnly 
              sx={{ fontSize: 16 }} />{" "}
            </Stack>
            <Typography>
              {personList.name}
              <span fontSize="20px">({personList.profession})</span>
            </Typography>
            <Box display={'flex'} justifyContent={'center'} alignItems={'center'} mb={3} mt={2}>
               <Button variant="contained" onClick={handleBookingModalOpen}>Add Your Time</Button>
               <AddTimeSlotComponent  open={openBookingModal} handleClose={handleBookingModalClose} professional_id={personId} onAddTimeSlot={(newTimeSlot) => onAddTimeSlot(personId, newTimeSlot)} />  
                   
            </Box>
          </Box>
          <Box>
            <List>
              <ListItem>
                <ListItemText primary={`More: ${personList.add_info}`} />
              </ListItem>
              <ListItem>
                <ListItemText primary={`Professional Fee: ${personList.payment}`} />
              </ListItem>
              <ListItem>
                <ListItemText primary={`PhoneNumber: ${personList.phone_number}`} />
              </ListItem>
              <ListItem>
                <ListItemText primary={`Email: ${personList.email}`} />
              </ListItem>
              <ListItem>
                <ListItemText primary={`WebsiteLink: ${personList.website_link}`} />
              </ListItem>
             
                <Stack flexDirection='row' justifyContent="space-around" marginTop={5}>
                  <Button variant="contained" onClick={handleUpdateModalOpen}>Update</Button>
                     <PersonProfessionUpdate open={openUpdateModal} handleClose={handleUpdateModalClose} personLists={personList} onUpdateSuccess={handleUpdateSuccess}  />
                    
                    <Button onClick={() => handleDelete(personList.id)}>Delete</Button>
                </Stack>
                
            </List>
  
            
          </Box>
      
        </CustomCareHomeBox>
        <ProviderPersonReview ProfessionalPersonid={personList.id}/>
       
        
      </>
        
    );
    };

export default ProviderPersonSingleView;


