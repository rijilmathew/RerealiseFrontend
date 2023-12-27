import React, { useEffect, useState } from 'react';
import Carousel from 'react-material-ui-carousel'
import { Box,Rating,Typography} from '@mui/material';

import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import SkipNextIcon from '@mui/icons-material/SkipNext';

import axios from 'axios';


function ProviderCarehomeReview(careHomeid){
    console.log('carehome:',careHomeid)
    const [reviews, setReviews] = useState([]);
    const careHomeId = careHomeid.careHomeid

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
            <Box sx={{display:'flex',justifyContent:'center',alignItems:'center',height:'10vh'}}>
            <Typography  sx={{ color: 'white' }}>
                Review 
            </Typography>
            </Box>
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


export default ProviderCarehomeReview