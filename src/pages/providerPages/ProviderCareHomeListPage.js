import React from 'react'
import AdminHeader from '../../components/provider/AdminHeader'
import ProviderCareHomeList from '../../components/provider/ProviderLists'
import Footer from '../../components/footer/Footer'
import { Box } from '@mui/material'

const ProviderCareHomeListPage = () => {
  return (
    <>
    <AdminHeader/>
     <Box mt={8}>
     <ProviderCareHomeList/>
     </Box>
    <Footer/>
    </>
  )
}

export default ProviderCareHomeListPage