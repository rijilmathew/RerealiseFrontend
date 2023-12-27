import React from 'react'
import UserList from '../../components/admin/UsersList'
import Sidenave from '../../components/admin/Sidenave'
import Navebar from '../../components/admin/Navebar'
import { Box } from '@mui/material'
import Footer from '../../components/footer/Footer'

const UsersListPage = () => {
  return (
    <Box sx={{display:'flex',flexDirection:'column',minHeight:'100vh'}}>
    <Navebar/>
    <Box sx={{ display: 'flex', flexGrow: 1 }}>
    <Sidenave/>
   
    <Box mt={10} flex={1}>   
       <UserList/>
    </Box>
    </Box>
    <Footer />
    </Box>
  )
}

export default UsersListPage