import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Dialog, DialogTitle, DialogContent, DialogActions, Box, TextField, TablePagination } from '@mui/material';
import axios from 'axios';

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    axios.get('admindashboard/users-list/')
      .then(response => {
        setUsers(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

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
    setSelectedUserId(userId);
    setDialogOpen(true);
  };

  const handleUserUnblock = (userId) => {
    setSelectedUserId(userId);
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  const handleConfirmAction = () => {
    if (selectedUserId) {
      if (users.find(user => user.id === selectedUserId).is_active) {
        handleUserBlockAction(selectedUserId);
      } else {
        handleUserUnblockAction(selectedUserId);
      }
      setDialogOpen(false);
      setSelectedUserId(null);
    }
  };

  const handleUserBlockAction = (userId) => {
    axios.put(`admindashboard/user-block/${userId}/`)
      .then(response => {
        const updatedUsers = users.map(user => (
          user.id === userId ? { ...user, is_active: false } : user
        ));
        setUsers(updatedUsers);
      })
      .catch(error => {
        console.error("Error blocking user:", error);
      });
  };

  const handleUserUnblockAction = (userId) => {
    axios.put(`admindashboard/user-unblock/${userId}/`)
      .then(response => {
        const updatedUsers = users.map(user => (
          user.id === userId ? { ...user, is_active: true } : user
        ));
        setUsers(updatedUsers);
      })
      .catch(error => {
        console.error("Error unblocking user:", error);
      });
  };

  return (
    <Box  sx={{ textAlign: 'center' }}>
      <h2>User List</h2>
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
              <TableCell>ID</TableCell>
              <TableCell>Username</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Action</TableCell>
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
                    <Button onClick={() => handleUserBlock(user.id)}>Block</Button>
                  ) : (
                    <Button onClick={() => handleUserUnblock(user.id)}>Unblock</Button>
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

      <Dialog open={isDialogOpen} onClose={handleDialogClose}>
        <DialogTitle>Confirmation</DialogTitle>
        <DialogContent>
          Are you sure you want to {selectedUserId && users.find(user => user.id === selectedUserId).is_active ? 'block' : 'unblock'} this user?
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleConfirmAction} color="primary">
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default UserList;
