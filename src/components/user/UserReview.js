import React, { useEffect, useState } from 'react';
import Carousel from 'react-material-ui-carousel'
import { Box,Button,Rating,Typography} from '@mui/material';

import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import UserReviewModal from './UserReviewModal';
import axios from 'axios';


function UserReview(careHomeid){
    console.log('carehome:',careHomeid)
    const[reviewModalOpen,setReviewModalOpen]=useState(false);
    const [reviews, setReviews] = useState([]);
    const careHomeId = careHomeid.careHomeid


    const handleModalOpen = ()=>{
        setReviewModalOpen(true);
    }
    
    const handleModalClose=()=>{
        setReviewModalOpen(false);
    }
    const fetchReviews = (careHomeId)=>{
         axios.get(`http://127.0.0.1:8000/api/providerdashboard/carehome-review/${careHomeId}/`)
           .then(response=>{
              setReviews(response.data);
              console.log('reviewrate:',response.data)
           })
           .catch(error=>{
            console.error('Error fetching reviews:', error);
           })
    }

    useEffect(()=>{
        fetchReviews(careHomeId)
    },[careHomeId])


    return (
        <Box mt={5} sx={{backgroundColor: 'black'}}>
            <Box sx={{display:'flex',justifyContent:'space-between',alignItems:'center',height:'10vh'}}>
            <Typography  sx={{ color: 'white',marginLeft:'1rem'}}>
                Review 
            </Typography>

               <Button onClick={handleModalOpen}
               sx={{marginRight:'1rem'}}
               >Write Your Review</Button>
            </Box>

            <UserReviewModal
            open={reviewModalOpen}
            handleClose={handleModalClose}
            careHomeId={careHomeId}
            fetchReviews={fetchReviews}

            />
       <Carousel 
       NextIcon={<SkipNextIcon color='red' />} PrevIcon={<SkipPreviousIcon />} sx={{ backgroundColor: 'white' }}>
            {reviews.map((review, index) => (
                <Box key={index} sx={{ height: '20vh', marginBottom: '20px', display: 'flex', alignItems: 'center',flexDirection:'column' ,justifyContent:'center' }}>
                    <Typography sx={{ display: 'flex', justifyContent: 'center',color:'blue',width: '10px' }}>
                        {review.review}
                    </Typography>
                    <Rating
                        sx={{fontSize:'20px'  }}
                        name="read-only"
                        value={review.rating}
                        readOnly
                        
                    />
                </Box>
            ))}
        </Carousel>
    </Box>
    )
}


export default UserReview