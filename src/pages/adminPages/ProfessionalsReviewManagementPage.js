import { Box } from '@mui/material'
import React from 'react'
import Navebar from '../../components/admin/Navebar'
import Sidenave from '../../components/admin/Sidenave'
import Footer from '../../components/footer/Footer'
import ProfessionalsReviewManagement from '../../components/admin/ProfessionalsReviewManagement'

const ProfessionalsReviewManagementPage = () => {
  return (
    <Box sx={{display:'flex',flexDirection:'column',minHeight:'100vh'}}>
    <Navebar/>
    <Box sx={{ display: 'flex', flexGrow: 1 }}>
    <Sidenave/>
   
    <Box mt={10} flex={1}>   
       <ProfessionalsReviewManagement/>
    </Box>
    </Box>
    <Footer />
    </Box>
  )
}

export default ProfessionalsReviewManagementPage