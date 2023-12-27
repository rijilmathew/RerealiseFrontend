import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box,Card, CardContent, CardHeader, CardMedia, List, ListItem, ListItemText, Typography, } from '@mui/material';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const ProviderPersonList = () => {
    const navigate = useNavigate()
    const [personLists, setPersonLists] = useState([]);
    const user = useSelector((state) => state.user.user);
    const providerId = user.userId;
    


    useEffect(() => {
        const fetchProviderList = async () => {
        try {
            const response = await axios.get(`http://127.0.0.1:8000/api/providerdashboard/provider-persons/${providerId}`);
            setPersonLists(response.data);
        } catch (error) {
            console.error('Error fetching care homes:', error);
        }
        };

        fetchProviderList();
    }, [providerId]);
    console.log('ghjkjjh:',providerId)

    
    const handleImageClick = (personId)=>{
        navigate(`/provider-personsingleview/${personId}`);
      }
    return (
        <>
        <Typography  padding={2} variant="h4" textAlign={'center'}>Your List</Typography>
        <Box display="flex"  flexDirection={{ xs: 'column', md: 'row' }} justifyContent="space-around" flexWrap="wrap" gap={2}>
      
        {personLists.length === 0 ? (
               
                    <Typography variant="body1" textAlign={'center'}>
                        Please add your Details.
                    </Typography>
                    
                ) :(
        personLists.map(personList => (
            <Card key={personList.id} sx={{ maxWidth: 345, marginBottom: 2, flex: '1 0 30%' }}>
            <CardHeader title={personList.name} />
            <CardMedia
                component="img"
                height="200"
                image={personList.profileimage}
                alt="Person"
                onClick={() => handleImageClick(personList.id)}
            />
            <CardContent>
                <List>
                <ListItem>
                    <ListItemText primary={`Profession: ${personList.profession}`} />
                </ListItem>
                <ListItem>
                    <ListItemText primary={`Phone Number: ${personList.phone_number}`} />
                </ListItem>
                </List>
            </CardContent>
          
            </Card>
        )
        ))}
        
        
        </Box>
        </>
    );
    };

export default ProviderPersonList;
