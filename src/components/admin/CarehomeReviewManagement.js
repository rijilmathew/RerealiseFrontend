import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Dialog, DialogTitle, DialogContent, DialogActions, Box, TextField, TablePagination } from '@mui/material';
import axios from 'axios';

const CarehomeReviewManagement = () => {
  const [reviews, setReview] = useState([]);
  const [selectedReviewId, setSelectedReviewId] = useState(null);
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');


  const fetchReviews = ()=>{
    axios.get('providerdashboard/carehome-review/')
      .then(response => {
        setReview(response.data);
      })
      .catch(error => {
        console.log(error);
      });

  }

  useEffect(() => {
    fetchReviews()
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

  const filteredUsers = reviews.filter((review) =>
   review.review.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleReviewBlock = (reviewId) => {
    setSelectedReviewId(reviewId);
    console.log('reviewId:',reviewId)
    setDialogOpen(true);
  };

  const handleReviewUnblock = (reviewId) => {
    setSelectedReviewId(reviewId);
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  const handleConfirmAction = () => {
    if (selectedReviewId) {
      if (reviews.find(review => review.id === selectedReviewId).is_block) {
        
        handleReviewUnblockAction(selectedReviewId);
      } else {
        handleReviewBlockAction(selectedReviewId);
      }
      setDialogOpen(false);
      setSelectedReviewId(null);
    }
  };

  const handleReviewBlockAction = (reviewId) => {
    axios.put(`providerdashboard/carehomereview-block/${reviewId}/`)
      .then(response => {
        fetchReviews()
      })
      .catch(error => {
        console.error("Error blocking user:", error);
      });
  };

  const handleReviewUnblockAction = (reviewId) => {
    axios.put(`providerdashboard/carehomereview-unblock/${reviewId}/`)
      .then(response => {
        fetchReviews()
      })
      .catch(error => {
        console.error("Error unblocking user:", error);
      });
  };

  return (
    <Box  sx={{ textAlign: 'center' }}>
      <h2>CareHome Reviews</h2>
      <TextField
        label="Search by review"
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
              <TableCell>Rating</TableCell>
              <TableCell>Review</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredUsers
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map(review => (
              <TableRow key={review.id}>
                <TableCell>{review.id}</TableCell>
                <TableCell>{review.rating}</TableCell>
                <TableCell>{review.review}</TableCell>
                <TableCell>
                  {review.is_block ? (
                    <Button onClick={() => handleReviewUnblock(review.id)}>Unblock</Button>
                  ) : (
                    <Button onClick={() => handleReviewBlock(review.id)}>Block</Button>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[5,10,15]}
          component="div"
          count={reviews.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </TableContainer>

      <Dialog open={isDialogOpen} onClose={handleDialogClose}>
        <DialogTitle>Confirmation</DialogTitle>
        <DialogContent>
          Are you sure you want to {selectedReviewId && reviews.find(review => review.id === selectedReviewId).is_block ? 'unblock' : 'block'} this review?
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

export default CarehomeReviewManagement;