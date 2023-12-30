import React, { useEffect, useState } from 'react';
import Carousel from 'react-material-ui-carousel'
import { Box,Button,Rating,Typography} from '@mui/material';

import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import axios from 'axios';
import ProfessionalPersonReviewModal from './ProfessionalPersonReviewModal';


function ProfessionalPersonReview(ProfessionalPersonid){
    console.log('ProfessionalPersonid:',ProfessionalPersonid)
    const[reviewModalOpen,setReviewModalOpen]=useState(false);
    const [reviews, setReviews] = useState([]);
    const ProfessionalPersonId = ProfessionalPersonid.ProfessionalPersonid


    const handleModalOpen = ()=>{
        setReviewModalOpen(true);
    }
    
    const handleModalClose=()=>{
        setReviewModalOpen(false);
    }
    const fetchReviews = (ProfessionalPersonId)=>{
         axios.get(`providerdashboard/persons-review/${ProfessionalPersonId}/`)
           .then(response=>{
              setReviews(response.data);
              console.log('reviewrate:',response.data)
           })
           .catch(error=>{
            console.error('Error fetching reviews:', error);
           })
    }

    useEffect(()=>{
        fetchReviews(ProfessionalPersonId)
    },[ProfessionalPersonId])


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

            <ProfessionalPersonReviewModal
            open={reviewModalOpen}
            handleClose={handleModalClose}
            ProfessionalPersonId={ProfessionalPersonId}
            fetchReviews={fetchReviews}

            />
       <Carousel 
       NextIcon={<SkipNextIcon color='red' />} PrevIcon={<SkipPreviousIcon />} sx={{ backgroundColor: 'white' }}>
            {reviews.map((review, index) => (
                <Box key={index} sx={{ height: '20vh', marginBottom: '20px', display: 'flex', alignItems: 'center',flexDirection:'column' ,justifyContent:'center' }}>
                    <Typography sx={{ display: 'flex', justifyContent: 'center',color:'blue',width: '50px' }}>
                        {review.review}
                    </Typography>
                    <Rating
                        sx={{fontSize:'30px'  }}
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


export default ProfessionalPersonReview