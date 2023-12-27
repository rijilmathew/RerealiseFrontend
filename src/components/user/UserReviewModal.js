import { Backdrop, Box, Button, Fade, Modal, Rating, TextField, Typography } from '@mui/material';
import axios from 'axios';
import React, { useState } from 'react'
import { useSelector } from 'react-redux';

const UserReviewModal = ({open,handleClose,careHomeId,fetchReviews}) => {
    const user = useSelector((state) => state.user.user);
    const UserId = user.userId;
    console.log('userid',UserId)
    console.log('careHomeId:',careHomeId)
    const [rating, setRating] = useState(0);
    const [review, setReview] = useState('');
    const handleRatingChange = (event, newValue) => {
        setRating(newValue);
      };
    
      const handleReviewChange = (event) => {
        setReview(event.target.value);
      };

      const handleSubmit = async () => {
        try {
          const response = await axios.post('http://127.0.0.1:8000/api/providerdashboard/carehome-review/', {
            user: UserId,
            CareHome: careHomeId,
            rating: rating,
            review: review,
          });
            fetchReviews(careHomeId)
          // Handle success (e.g., close modal, show a success message, etc.)
          console.log('Review submitted successfully', response.data);
    
          // Close the modal
          handleClose();
        } catch (error) {
          // Handle error (e.g., show an error message)
          console.error('Error submitting review', error);
        }
      };

  return (
    <Modal
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
        timeout: 500,
        }}
    >
        <Fade in={open}>
        <Box sx={{ bgcolor: 'background.paper', width:'50%',position:'absolute',top:'50%', left: '50%', transform: 'translate(-50%, -50%)',}}>
            <Typography variant="h6" gutterBottom align='center'>
            Write Your Review
            </Typography>
            <Box sx={{display:'flex',flexDirection:'row' ,alignItems:'center',justifyContent:'space-between'}}>
              <Typography style={{marginLeft:5}} variant='h5'>Give Your Rating:</Typography>
            <Rating
              sx={{fontSize:'20px' , marginRight:5}}
              name="rating"
              value={rating}
              onChange={handleRatingChange}
              />
            </Box>
            <TextField
            multiline
            rows={6}
            label="Your Review"
            variant="outlined"
            fullWidth
            value={review}
            onChange={handleReviewChange}
            />
            <Box sx={{display:'flex',justifyContent:'flex-end', marginTop: '1rem', marginRight:'1rem',marginBottom:'1rem'}}>
              <Button variant="contained" color="primary" onClick={handleSubmit}>
                 Submit Review
              </Button>
            </Box>
        </Box>
        </Fade>
    </Modal>
   
  )
}

export default UserReviewModal