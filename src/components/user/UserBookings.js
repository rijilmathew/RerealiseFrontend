import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  TextField,
  Box,
  Button,
} from '@mui/material';
import { useSelector } from 'react-redux';
import SearchIcon from '@mui/icons-material/Search';
import { toast } from "react-toastify";


const UserBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [searchTerm, setSearchTerm] = useState('');
  const user = useSelector((state) => state.user.user);
  const providerId = user.userId;
  const todayDate = new Date().toISOString().split('T')[0];

  const fetchBookings = () => {
    const apiUrl = 'usersdashboard/user-bookings/';

    axios
      .get(apiUrl, { params: { user_id: providerId } })
      .then((response) => {
        setBookings(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  };

  useEffect(() => {
    fetchBookings(); // Initial fetch
  }, [providerId]); // Include providerId as a dependency

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  // Apply search filter to bookings
  const filteredBookings = bookings.filter((booking) =>
    booking.date.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCancelBooking = (bookingId, timeSlotId) => {
    console.log('bookingid:',bookingId)
    console.log('bookingid:',timeSlotId)
    // Define your API endpoint for cancelling a booking and updating the TimeSlot
    const apiUrl = `usersdashboard/userbookingdistroy/${bookingId}/`;
  
    // Send a DELETE request to cancel the booking
    axios.delete(apiUrl)
      .then(response => {
        console.log(response.data);
        toast.success("Cancelled Successfully");
        fetchBookings();
        // After successful cancellation, update the TimeSlot's is_booked field
        const timeSlotUpdateUrl = `providerdashboard/updatetimeSlot/${timeSlotId}/`;
        
        axios.patch(timeSlotUpdateUrl, { is_booked: false })
          .then(response => {
            console.log(response.data);
            // Add any additional logic you need after updating the TimeSlot
          })
          .catch(error => {
            console.error('Error updating TimeSlot:', error);
            toast.error("Error updating TimeSlot");
          });
      })
      .catch(error => {
        console.error('Error cancelling booking:', error);
        toast.error("Error updating TimeSlot");
      });
  };
  return (
    <Box>
      <Box display="flex" justifyContent="center" alignItems="center">
      <Typography variant="h5" gutterBottom sx={{mt:4,fontWeight:'bold'}}>
        Booking Information
      </Typography>
      </Box>

      {/* Search Input */}
      <Box display="flex" justifyContent="flex-end" alignItems="center">
        <SearchIcon />
        <TextField
          label="Search by  Date"
          variant="outlined"
          margin="normal"
          size="small"  
         
          value={searchTerm}
          onChange={handleSearch}
        />
      </Box>

      {/* Table */}
      <Box display={{ xs: "block", sm: "block", md: "block", lg: "block" }}
      >
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell style={{ fontSize: 16, fontWeight: "bold" }}>Name</TableCell>
              <TableCell style={{ fontSize: 16, fontWeight: "bold" }}>Profession</TableCell>
              <TableCell style={{ fontSize: 16, fontWeight: "bold" }}>Date</TableCell>
              <TableCell style={{ fontSize: 16, fontWeight: "bold" }}>Start Time</TableCell>
              <TableCell style={{ fontSize: 16, fontWeight: "bold" }}>End Time</TableCell>
              <TableCell style={{ fontSize: 16, fontWeight: "bold" }}>Payment</TableCell>
              <TableCell style={{ fontSize: 16, fontWeight: "bold" }}>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredBookings
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((booking) => (
                <TableRow key={booking.id}>
                  <TableCell>{booking.professional.name}</TableCell>
                  <TableCell>{booking.professional.profession}</TableCell>
                  <TableCell>{booking.date}</TableCell>
                  <TableCell>{booking.timeslot.start_time}</TableCell>
                  <TableCell>{booking.timeslot.end_time}</TableCell>
                  <TableCell>{booking.payment_amount}</TableCell>
                  <TableCell>
                    {booking.date > todayDate ? (
                      <Button variant='contained' onClick={() => handleCancelBooking(booking.id,booking.timeslot.id)}>
                        Cancel
                      </Button>
                    ) : (
                      <Button disabled>Cancel</Button>
                    )}
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      </Box>

      {/* Pagination */}
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={filteredBookings.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Box>
  );
};

export default UserBookings;

