import React from 'react'
import Navebar from '../../components/admin/Navebar'
import Sidenave from '../../components/admin/Sidenave'
import Footer from '../../components/footer/Footer'
import { Box } from '@mui/material'
import { PersonApprove } from '../../components/admin/PersonApprove'

const PersonApprovePage = () => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
    <Navebar />
    <Box sx={{ display: 'flex', flexGrow: 1 }}>
      <Sidenave />
      <Box mt={10}  flex={1}>
       <PersonApprove/>
      </Box>
    </Box>
    <Footer />
  </Box>
  )
}

export default PersonApprovePage