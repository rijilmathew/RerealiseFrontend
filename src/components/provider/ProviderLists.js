import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Typography, Card, CardContent, CardHeader, CardMedia, List, ListItem, ListItemText,Grid,} from '@mui/material';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const ProviderCareHomeList = () => {
    const navigate = useNavigate();
    const [careHomes, setCareHomes] = useState([]);
    const user = useSelector((state) => state.user.user);
    const providerId = user.userId;
    console.log('provider:',providerId)
    
    
    

    useEffect(() => {
        const fetchCareHomes = async () => {
        try {
            const response = await axios.get(`http://127.0.0.1:8000/api/providerdashboard/provider-carehomes/${providerId}`);
            setCareHomes(response.data);
            
        } catch (error) {
            console.error('Error fetching care homes:', error);
        }
        };

        fetchCareHomes();
    }, [providerId]);

    const handleImageClick = (careHomeId) => {
        navigate(`/provider-carehomesingleview/${careHomeId}`);
      };
      



     
    return (
        <Box>
            <Typography  padding={2} variant="h4" textAlign={'center'}>Your Carehomes</Typography>
            <Grid container  marginTop={2}  >
            {careHomes.length === 0 ? (
                <Box>
                    <Typography variant="body1" textAlign={'center'}>
                        Please add your care homes.
                    </Typography>
                    </Box>
                ) :(
                    careHomes.map(careHome => (
                    <Grid key={careHome.id} item xs={12} sm={6} sx={{ margin: '0 auto 20px auto',display:'flex',justifyContent:'space-around',alignItems:'center' }} >
                    <Card sx={{ width: '50%', height: '100%', display: 'flex', flexDirection: 'column' }}>
                    <CardHeader title={careHome.carehomename} />
                    <CardMedia
                        component="img"
                        height="200"
                        image={careHome.imageone}
                        alt="Care Home"
                        onClick={() => handleImageClick(careHome.id)}
                    />
                    <CardContent>
                        <List>
                        {/* <ListItem>
                            <ListItemText primary={`Address: ${careHome.address_1}, ${careHome.address_2}, ${careHome.address_3}`} />
                        </ListItem> */}
                        <ListItem>
                            <ListItemText primary={`Phone Number: ${careHome.phone_number}`} />
                        </ListItem>
                        <ListItem>
                            <ListItemText primary={`Email: ${careHome.email}`} />
                        </ListItem>
                        {/* <ListItem>
                            <ListItemText primary={`Website: ${careHome.website_link || 'Not available'}`} />
                        </ListItem>
                        <ListItem>
                            <ListItemText primary={`Type of Service: ${careHome.type_of_service}`} />
                        </ListItem> */}
                        </List>
                    </CardContent>
                    </Card>
                        
                    </Grid>
                    ))
                )}
            </Grid>
        </Box>
    );
    };

export default ProviderCareHomeList;
