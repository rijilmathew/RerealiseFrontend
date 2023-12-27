import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Typography,
  Paper,
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
import VideoCallIcon from '@mui/icons-material/VideoCall';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';


const BookingListComponent = () => {
  const [bookings, setBookings] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [searchTerm, setSearchTerm] = useState('');
  const user = useSelector((state) => state.user.user);
  const providerId = user.userId;
  const navigate=useNavigate()
  useEffect(() => {
    const markNotificationsAsRead = async () => {
      try {
        // Fetch BookingNotifications for the current provider with read_status=false
        await axios.put(`http://127.0.0.1:8000/api/providerdashboard/mark-notifications-as-read/${providerId}/`);
      } catch (error) {
        console.error('Error updating read status:', error);
      }
    };
    markNotificationsAsRead();
  },[providerId])
    


  useEffect(() => {
    const apiUrl = 'http://127.0.0.1:8000/api/providerdashboard/provider-bookings/';

    axios
      .get(apiUrl, { params: { provider_id: providerId } })
      .then((response) => {
        setBookings(response.data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
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


  const parseTimeToValidDate = (time) => {
    const [hours, minutes] = time.split(':');
    const date = new Date();
    date.setHours(parseInt(hours, 10));
    date.setMinutes(parseInt(minutes, 10));
    return date;
  };
  const createRoom = async () => {
    const { value: roomId } = await Swal.fire({
      title: "Create a Room",
      text: "Enter a Room ID",
      input: "text",
      showCancelButton: true,
      confirmButtonText: "Create",
    });
    if (roomId) {
      navigate(`/provider-videocall/${roomId}`);
      console.log('roomid:', roomId);
    }
    
  }; 

  return (
    <div>
      <Box display="flex" justifyContent="center" alignItems="center">
      <Typography variant="h5" gutterBottom>
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
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>User Name</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Start Time</TableCell>
              <TableCell>End Time</TableCell>
              <TableCell>Paid Amount</TableCell>
              <TableCell>VideoCall</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredBookings
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((booking) => (
                <TableRow key={booking.id}>
                  <TableCell>{booking.user.username}</TableCell>
                  <TableCell>{booking.date}</TableCell>
                  <TableCell>
                    {booking.timeslot.start_time
                      ? `${parseTimeToValidDate(booking.timeslot.start_time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true })}`
                      : ''}
                  </TableCell>
                  <TableCell>
                    {booking.timeslot.end_time
                      ? `${parseTimeToValidDate(booking.timeslot.end_time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true })}`
                      : ''}
                  </TableCell>
                  <TableCell>{booking.payment_amount}</TableCell>
                  <TableCell>
                  <Button
                    variant='contained'
                    disabled={new Date(booking.date) < new Date()} // Disable if booking date is not greater than current date
                    onClick={() => createRoom()}
                  >
                    <VideoCallIcon/>
                  </Button>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>

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
    </div>
  );
};

export default BookingListComponent;

