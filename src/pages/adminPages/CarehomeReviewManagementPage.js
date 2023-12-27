import { Box } from '@mui/material'
import React from 'react'
import Navebar from '../../components/admin/Navebar'
import Sidenave from '../../components/admin/Sidenave'
import CarehomeReviewManagement from '../../components/admin/CarehomeReviewManagement'
import Footer from '../../components/footer/Footer'

const CarehomeReviewManagementPage = () => {
  return (
    <Box sx={{display:'flex',flexDirection:'column',minHeight:'100vh'}}>
    <Navebar/>
    <Box sx={{ display: 'flex', flexGrow: 1 }}>
    <Sidenave/>
   
    <Box mt={10} flex={1}>   
       <CarehomeReviewManagement/>
    </Box>
    </Box>
    <Footer />
    </Box>
  )
}

export default CarehomeReviewManagementPage