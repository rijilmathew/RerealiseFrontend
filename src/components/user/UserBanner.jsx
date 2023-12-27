import React from 'react';
import Carousel from 'react-material-ui-carousel'
import banner from '../../static/bannerimage/hdbanner.jpg'
import imagefour from '../../static/bannerimage/imagefour.jpg'
import { Box} from '@mui/material';

import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import SkipNextIcon from '@mui/icons-material/SkipNext';


function Example()
{
    const imageStyles = {
        width: '100%',
        height: '70vh',
        objectFit: 'cover', // This property ensures the image maintains its aspect ratio
    
      };

    
    return (
        <Box mt={5}>
        <Carousel
            NextIcon={<SkipNextIcon  color='red'/>}
            PrevIcon={<SkipPreviousIcon/>}
        >
             <img src={banner} alt="bannerimage" style={imageStyles} />
              <img src={imagefour} alt="bannerimage" style={imageStyles} />
              <img src={banner} alt="bannerimage" style={imageStyles} />
            
        </Carousel>
        </Box>
    )
}


export default Example