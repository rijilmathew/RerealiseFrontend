import React from 'react'
import AdminHeader from '../../components/provider/AdminHeader'
import Footer from '../../components/footer/Footer'
import ProviderPersonList from '../../components/provider/ProviderPersonList'
import { Box } from '@mui/material'

const ProviderPersonListPage = () => {
  return (
  <>
    <AdminHeader/>
     <Box mt={8}>
     <ProviderPersonList/>
     </Box>
    <Footer/>
  
  </>
  )
}

export default ProviderPersonListPage