import React from 'react'
import Sidenave from '../../components/admin/Sidenave'
import { Box, } from '@mui/material'
import Navebar from '../../components/admin/Navebar'
import AdminHomePage from '../../components/admin/AdminHomePage'
import Footer from '../../components/footer/Footer'

const AdminDashboard = () => {
  return (
    <>
    <Navebar/>
    <Box height={30}/>
    <Box sx={{display: "flex"}}>
    <Sidenave/>
   
    <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
       <AdminHomePage/>
       </Box>
    </Box>
    <Footer/>
    </>
    
  )
}

export default AdminDashboard