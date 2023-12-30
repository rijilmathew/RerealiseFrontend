import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Box, Button, Card, CardContent,CardMedia, Grid, Typography } from '@mui/material';
import Swal from 'sweetalert2';
export const PersonApprove = () => {
        const [ personList,setPersonList] = useState([]);

        const fetchData= async()=>{
            try{
                const response=await axios.get('admindashboard/personlist/');
                setPersonList(response.data);
            } catch (error){
                console.error('Error fetching data:', error);
            }
        };

        useEffect(()=>{
            fetchData();
           
        },[])

        const handleApprove = async (personId)=>{
            try{
                await axios.patch(`admindashboard/personlist/${personId}/`,{
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
        <Typography variant='h4' textAlign={'center'}>Professional Persons</Typography>
        {personList.length === 0 ? (
                 <Box>
                    <Typography variant="body1" textAlign={'center'}>
                        No entry for approve.
                    </Typography>
                    </Box>
                ) :(
                personList.map(person => (
                    <Grid  key={person.id} item xs={12} sm={6} sx={{ margin: '0 auto 20px auto',display:'flex',justifyContent:'space-around',alignItems:'center' }}>
                    <Card key={person.id} sx={{ width: '40%', height: '100%', display: 'flex', flexDirection: 'column' }}>
                        <CardMedia
                            component="img"
                            height="300"
                            image={person.profileimage} // Assuming 'imageone' contains the image URL
                            alt={person.name}
                        />
                        <CardContent>
                            <Typography variant="h5" component="div">
                                {person.name}
                            </Typography>
                            <Typography>
                                Profession: {person.profession}
                            </Typography>
                            <Typography>
                                More Information: {person.add_info ? person.add_info : 'N/A'}
                            </Typography>
                            <Typography>
                                Phone Number: {person.phone_number}
                            </Typography>
                            <Typography>
                                Email: {person.email}
                            </Typography>
                            <Typography>
                                Website: {person.website_link ? person.website_link : 'N/A'}
                            </Typography>
                            <Typography>
                                Approved: {person.is_active ? 'Yes' : 'No'}
                            </Typography>
                            <Box sx={{display:'flex',justifyContent:'flex-end'}}>
                            {!person.is_active && (
                                <Button variant="contained" color="primary" onClick={() => handleApprove(person.id)} sx={{marginTop:'5'}}>
                                    Approve
                                </Button>
                            )}
                            </Box>
                        </CardContent>
                    </Card>
                     </Grid>
                ))
            )}
            
        </div>
  )
}
