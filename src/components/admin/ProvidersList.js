import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Box, TablePagination, TextField } from '@mui/material';
import axios from 'axios';

const ProvidersList = () => {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');

  console.log(users)

  useEffect(()=>{
    axios.get('http://127.0.0.1:8000/api/admindashboard/provider-list/')
    .then(response =>{
        setUsers(response.data);
    })
    .catch(error =>{
        console.log(error)
    })
  },[])
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    setPage(0); // Reset page when searching
  };

  const filteredUsers = users.filter((user) =>
    user.username.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const handleUserBlock = (userId) => {
    axios.put(`http://127.0.0.1:8000/api/admindashboard/user-block/${userId}/`)
      .then(response => {
        // Assuming the response indicates the user was successfully blocked
        // You may want to update the UI accordingly, here we're updating the state
        const updatedUsers = users.map(user => {
          if (user.id === userId) {
            return { ...user, is_active: false }; // Assuming you have an is_blocked field in the user data
          }
          return user;
        });
        setUsers(updatedUsers);
      })
      .catch(error => {
        console.error("Error blocking user:", error);
      });
  }

  const handleUserUnblock = (userId) => {
    axios.put(`http://127.0.0.1:8000/api/admindashboard/user-unblock/${userId}/`)
      .then(response => {
        // Assuming the response indicates the user was successfully blocked
        // You may want to update the UI accordingly, here we're updating the state
        const updatedUsers = users.map(user => {
          if (user.id === userId) {
            return { ...user, is_active: true }; // Assuming you have an is_blocked field in the user data
          }
          return user;
        });
        setUsers(updatedUsers);
      })
      .catch(error => {
        console.error("Error blocking user:", error);
      });
  }


  return (
    <Box sx={{ textAlign: 'center' }}>
      <h2>Provider List</h2>
      <TextField
        label="Search by username"
        variant="outlined"
        value={searchTerm}
        onChange={handleSearch}
        sx={{ marginBottom: 2 }}
      />
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{fontSize:'16px', fontWeight: 'bold' }}>ID</TableCell>
              <TableCell sx={{fontSize:'16px', fontWeight: 'bold' }}>Username</TableCell>
              <TableCell sx={{fontSize:'16px', fontWeight: 'bold' }}>Email</TableCell>
              <TableCell sx={{fontSize:'16px', fontWeight: 'bold' }}>Action</TableCell>
              
              {/* Add more table cells for other user properties */}
            </TableRow>
          </TableHead>
          <TableBody>
          {filteredUsers
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map(user => (
              <TableRow key={user.id}>
                <TableCell>{user.id}</TableCell>
                <TableCell>{user.username}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>
                {user.is_active ? (
                    <Button variant="contained" onClick={() => handleUserBlock(user.id)}>Block</Button>
                  ) : (
                    <Button variant="contained" color="success" onClick={() => handleUserUnblock(user.id)}>UnBlock</Button>
                  )}
                </TableCell>
             
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={users.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </TableContainer>
    </Box>
  );
};

export default ProvidersList;
