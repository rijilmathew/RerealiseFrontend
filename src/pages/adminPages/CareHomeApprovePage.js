import { Box } from '@mui/material'
import React from 'react'
import Navebar from '../../components/admin/Navebar'
import Sidenave from '../../components/admin/Sidenave'
import { CareHomeApprove } from '../../components/admin/CareHomeApprove'
import Footer from '../../components/footer/Footer'

const CareHomeApprovePage = () => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
    <Navebar />
    <Box sx={{ display: 'flex', flexGrow: 1 }}>
      <Sidenave />
      <Box mt={10}  flex={1}>
       <CareHomeApprove/>
      </Box>
    </Box>
    <Footer />
  </Box>
  )
}

export default CareHomeApprovePage