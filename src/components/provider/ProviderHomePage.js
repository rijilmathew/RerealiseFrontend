import React, { useState } from 'react';
import { styled, Box,Typography, Button } from '@mui/material';
import imagefour from '../../static/bannerimage/imagefour.jpg';
import professionone from '../../static/bannerimage/professionone.jpg';
import Example from '../user/UserBanner';
import AddCareHomeModal from './AddCareHomeModal';
import AddPerson from './AddPerson';

const ProviderHomePage = () => {
  const [openAddModal, setOpenAddModal] = useState(false);
  const [openPersonModal,setOpenPersonModal]=useState(false);

  const handleAddModalOpen = () => {
    setOpenAddModal(true);
  };

  const handleAddModalClose = () => {
    setOpenAddModal(false);
  };

  const handlePersonModalOpen = () => {
    setOpenPersonModal(true);
  };

  const handlePersonModalClose = () => {
    setOpenPersonModal(false);
  };


  const CustomHomeBox = styled(Box)(({ theme }) => ({
    display: 'flex',
    justifyContent: 'flex-start',
 
    paddingLeft: 0,
    paddingRight: 0,
    marginLeft: 0,
    marginRight: 0,
    width:'100%',
    
   
    [theme.breakpoints.down('md')]: {
      justifyContent: 'center',
      flexDirection:"colum",
      textAlign:"center",
     
    },
    [theme.breakpoints.down('sm')]: {
        justifyContent: 'center',
        flexDirection:"column",
        textAlign:"center",
        marginLeft:"1%",
     
      },
  }));

  return (
    <Box mt={8}>
        <Example/>
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
          Add Your Care Home
          </Typography>
          </Box>
       
          <Typography
            variant="h3"
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
            variant="h3"
            mt={3}
            sx={{ width: '50%', wordWrap: 'break-word',marginLeft:'30%',fontSize:'15px' }}
          >
         Your care home should be a happy and comfortable place to live - in short, it should feel like home. Thinking about what you want and need from a care home is a good place to start.
          </Typography>
          <Box mt={30} sx={{marginLeft:'30%'}}>
          <Button variant="contained" onClick={handleAddModalOpen}>Add Care Home</Button>
          <AddCareHomeModal open={openAddModal} handleClose={handleAddModalClose} />
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
          People are waiting for you !
          </Typography>
          <Typography
            variant="h3"
            sx={{ width: '50%', wordWrap: 'break-word',marginLeft:'30%',fontSize:'15px' }}
          >
          "Add your profile if you are a inancial experts, psychologists, or motivational speakers and influencers etc.."
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
          Prove Your Talent..
          </Typography>
          <Typography
            variant="body1"
            mt={3}
            sx={{ width: '50%', wordWrap: 'break-word',marginLeft:'30%',fontSize:'15px' }}
          >
       "Whether you are in the early stages of retirement planning, on the verge of retirement, have already retired, or are currently facing mental health challenges, we offer comprehensive guides tailored to your needs."
          </Typography>
          <Box mt={15} sx={{marginLeft:'30%'}}>
            <Button variant="contained" onClick={handlePersonModalOpen}>Add Your Profession</Button>
            <AddPerson  open={openPersonModal} handleClose={handlePersonModalClose}/>
          </Box>
        </Box>
      </CustomHomeBox>
      </Box>
   
    </Box>
  );
};

export default ProviderHomePage;