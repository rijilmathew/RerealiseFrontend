import React from 'react';
import {  Box,Typography, Button,} from '@mui/material';
import imagefour from '../../static/bannerimage/imagefour.jpg';
import professionone from '../../static/bannerimage/professionone.jpg';
import Example from './UserBanner';
import { useNavigate } from 'react-router-dom';
import { CustomHomeBox } from './userPageStyles/UserHomeStyle';

const UserHomePage = () => {
      const navigate = useNavigate()
      
      
      const handleViewCareHomes = ()=>{
           navigate("/user-carehomelist")
      }
      const handleViewPersons = ()=>{
        navigate("/user-personlist")
      }

      return (
        <Box mt={1}>
            <Example />
        <CustomHomeBox>
            <Box sx={{ flex: 1,  display: 'flex', flexDirection: 'column', alignItems: 'center', backgroundColor: '#FFFFFF', width: '50%' }}>
              <Box  mt={5}>
              <Typography
                variant="h2"
                sx={{
                  fontSize: '30px',
                  color: '#1C1C1D',
                  fontWeight: 700,
                  mb: 2,
                }}
              >
              Here You Have Your Place !
              </Typography>
              </Box>
           
              <Typography
                variant="h4"
                sx={{ width: '50%', wordWrap: 'break-word',marginLeft:'30%',fontSize:'15px' }}
              >
               Contact your shortlisted care homes and talk specifics. Speak with the care home's manager about how the home can meet your needs,
              </Typography>
           
              <div style={{ width: '100%', flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'flex-end' }}>
                <img src={imagefour} alt="bannerimage" style={{ width: '100%', height: '70%' }} />
              </div>
            </Box>

            <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', backgroundColor: '#FFFFFF', width: '50%' }}>
            <Typography
                variant="h2"
                mt={5}
                sx={{
                  fontSize: '30px',
                  color: '#1C1C1D',
                  fontWeight: 700,
                  mb: 2,
                }}
              >
              The Best CareHome In India!
              </Typography>
              <Typography
                variant="body1"
                mt={3}
                sx={{ width: '50%', wordWrap: 'break-word',marginLeft:'30%',fontSize:'15px' }}
              >
             Your care home should be a happy and comfortable place to live - in short, it should feel like home. Thinking about what you want and need from a care home is a good place to start.
              </Typography>
              <Box mt={30} sx={{marginLeft:'30%'}}>
               
                   <Button variant="contained" onClick={handleViewCareHomes} >Explore More</Button>
             
              
              </Box>
           </Box>
        </CustomHomeBox>
          <Box>
          <CustomHomeBox>
            <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', backgroundColor: '#FFFFF', width: '50%' }}>
              <Typography
                variant="h2"
                mt={5}
                sx={{
                  fontSize: '30px',
                  color: '#1C1C1D',
                  fontWeight: 700,
                  mb: 2,
                  
                }}
              >
              Here You Have Your Person!
              </Typography>
              <Typography
                variant="h3"
                sx={{ width: '50%', wordWrap: 'break-word',marginLeft:'30%',fontSize:'15px' }}
              >
              "Do you feel the need for guidance from professionals such as financial experts, psychologists, or motivational speakers and influencers?"
              </Typography>

              <div style={{ width: '100%', flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'flex-end' }}>
                <img src={professionone} alt="bannerimage" style={{ width: '100%', height: '70%' }} />
              </div>
            </Box>

            <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', backgroundColor: '#FFFFF', width: '50%' }}>
            <Typography
                variant="h2"
                mt={5}
                sx={{
                  fontSize: '30px',
                  color: '#1C1C1D',
                  fontWeight: 700,
                  mb: 2,
                }}
              >
              Connect Your Person..
              </Typography>
              <Typography
                variant="body1"
                mt={3}
                sx={{ width: '50%', wordWrap: 'break-word',marginLeft:'30%',fontSize:'15px' }}
              >
           "Whether you are in the early stages of retirement planning, on the verge of retirement, have already retired, or are currently facing mental health challenges, we offer comprehensive guides tailored to your needs."
              </Typography>
              <Box mt={15} sx={{marginLeft:'30%'}}>
                <Button variant="contained" onClick={handleViewPersons} >Explore More</Button>
              </Box>
            </Box>
          </CustomHomeBox>
          </Box>
       
        </Box>
      );
    };

export default UserHomePage;
