import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Box, Button, Card, CardContent,CardMedia, Grid, Typography } from '@mui/material';
import Swal from 'sweetalert2';


export const CareHomeApprove = () => {
        const [ careHomes,setCareHomes] = useState([]);

        const fetchData= async()=>{
            try{
                const response=await axios.get('admindashboard/carehomelist/');
                setCareHomes(response.data);
            } catch (error){
                console.error('Error fetching data:', error);
            }
        };
        useEffect(()=>{
            fetchData();
           
        },[])

        const handleApprove = async (careHomeId)=>{
            try{
                await axios.patch(`admindashboard/carehomelist/${careHomeId}/`,{
                    is_active: true

                }).then(response =>{
                    fetchData()
                    Swal.fire({
                        icon: 'success',
                        title: 'Success!',
                        text: 'created successfully.',
                      });
          
                })
            }catch(error){
                console.error('Error approving care home:', error);
            }
             
        }

  return (
        <div>
        <Typography variant='h4' textAlign={'center'}>CareHomes For Approval</Typography>
        {careHomes.length === 0 ? (
                <Box>
                    <Typography variant="body1" textAlign={'center'}>
                        No entry for approve.
                    </Typography>
                    </Box>
                ) :(
                careHomes.map(careHome => (
                    <Grid key={careHome.id} item xs={12} sm={6} sx={{ margin: '0 auto 20px auto',display:'flex',justifyContent:'space-around',alignItems:'center' }} >
                    <Card key={careHome.id} sx={{ width: '50%', height: '100%', display: 'flex', flexDirection: 'column' }}>
                        <CardMedia
                            component="img"
                            height="300"
                            image={careHome.imageone} // Assuming 'imageone' contains the image URL
                            alt={careHome.carehomename}
                        />
                        <CardContent>
                            <Typography variant="h5" component="div">
                                {careHome.carehomename}
                            </Typography>
                            <Typography>
                                Address: {careHome.address_1}, {careHome.address_2}, {careHome.address_3}
                            </Typography>
                            <Typography>
                                Type of Service: {careHome.type_of_service}
                            </Typography>
                            <Typography>
                                Facilities: {careHome.facilities ? careHome.facilities : 'N/A'}
                            </Typography>
                            <Typography>
                                Phone Number: {careHome.phone_number}
                            </Typography>
                            <Typography>
                                Email: {careHome.email}
                            </Typography>
                            <Typography>
                                Website: {careHome.website_link ? careHome.website_link : 'N/A'}
                            </Typography>
                            <Typography>
                                Approved: {careHome.is_active ? 'Yes' : 'No'}
                            </Typography>
                            <Box sx={{  display: 'flex', justifyContent: 'flex-end' }}>
                                {!careHome.is_active && (
                                    <Button variant="contained" color="primary" onClick={() => handleApprove(careHome.id)}>
                                        Approve
                                    </Button>
                                )}
                            </Box>
                            <Box/>
                        </CardContent>
                    </Card>
                    </Grid>
                ))
            )}
        </div>
  )
}
