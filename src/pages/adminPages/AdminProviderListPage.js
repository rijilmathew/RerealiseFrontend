import React from 'react'
import ProvidersList from '../../components/admin/ProvidersList'
import Navebar from '../../components/admin/Navebar'
import Sidenave from '../../components/admin/Sidenave'
import { Box } from '@mui/material'
import Footer from '../../components/footer/Footer'

const AdminProviderListPage = () => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
    <Navebar />
    <Box sx={{ display: 'flex', flexGrow: 1 }}>
      <Sidenave />
      <Box mt={10}  flex={1}>
        <ProvidersList />
      </Box>
    </Box>
    <Footer />
  </Box>
  )
}

export default AdminProviderListPage