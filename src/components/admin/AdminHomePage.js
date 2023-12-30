import { Box, Card, CardActionArea, CardContent, Grid, Stack, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import AdminChart from './AdminChart'
import ServiceCountChart from './ServiceCountChart'
import axios from 'axios'

const AdminHomePage = () => {
  const [userCount,setUserCount]=useState();
  const [servicesCount,setServicesCount]=useState();

  const fetchUserCount= async ()=>{
    try{
      const response = await axios.get('admindashboard/user-provider-count/');
      const data = response.data;
      console.log('homepage:',data)
      setUserCount(data)
    }catch(error) {
      console.error('Error fetching data:', error);
    }

  }


  const fetchServiceCount= async ()=>{
    try{
      const response = await axios.get('admindashboard/services-count/');
      const data = response.data;
      console.log('homepagecount:',data)
      setServicesCount(data)
    }catch(error) {
      console.error('Error fetching data:', error);
    }

  }

  useEffect(()=>{
    fetchUserCount()
    fetchServiceCount()
  },[])


  return (
    <Box mt={5}>
      <Grid  container spacing={2}>
        <Grid item  xs={12} sm={6} md={3} lg={3} xl={3}>
        <Card sx={{ maxWidth: 345, height:120,backgroundColor: '#cccfff' }}>
        <CardActionArea>
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              Total Users
            </Typography>
            <Typography variant="body2" color="text.secondary">
               {userCount?.user_count || 'N/A'}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
        </Grid>
        <Grid item  xs={12} sm={6} md={3} lg={3} xl={3}>
        <Card sx={{ maxWidth: 345, height:120,backgroundColor: '#cccfff' }}>
          <CardActionArea>
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                 Total Providers 
              </Typography>
              <Typography variant="body2" color="text.secondary">
              {userCount?.provider_count || 'N/A'}
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
        </Grid>
        <Grid item  xs={12} sm={6} md={3} lg={3} xl={3}>
        <Card sx={{ maxWidth: 345, height:120,backgroundColor: '#cccfff' }}>
          <CardActionArea>
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                Total Registerd CareHomes
              </Typography>
              <Typography variant="body2" color="text.secondary">
              {servicesCount?.carehome_count || 'N/A'}
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
        </Grid>
        <Grid item  xs={12} sm={6} md={3} lg={3} xl={3}>
        <Card sx={{ maxWidth: 345, height:120,backgroundColor: '#cccfff' }}>
          <CardActionArea>
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                Total Registerd Professionals
              </Typography>
              <Typography variant="body2" color="text.secondary">
                 {servicesCount?.person_count || 'N/A'}
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
        </Grid>
      </Grid>
      <Box mt={2}>
        <Stack direction={{xs:'column',sm:'row'}} spacing={2}  justifyContent="space-around"  alignItems="center" >
            <Box>
              <AdminChart/>
            </Box>
           <Box>
           <ServiceCountChart/>
           </Box>
      
        </Stack>
      </Box>
    </Box>
   
  )
}

export default AdminHomePage



