import React from 'react'
import '../footer/FooterStyle.css';
import {Typography} from "@mui/material";
import {styled,Box,Container} from '@mui/system';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';

const Footer = () => {
    const CustomContainer = styled(Container)(({theme}) => ({
          display:'flex',
          justifyContent:"space-between",
          alignItems:'center',
          gap:theme.spacing(5),
          [theme.breakpoints.down("sm")]:{
            flexDirection:"column",
            textAlign:"center",
          }
    }));
    const FooterLink = styled("span")(({ theme }) => ({
        fontSize:"20px",
        color:"#000066",
        fontWeight:"300",
        cursor:"pointer",
        "&:hover": {
            color:"#66B2FF",
        },

    }));

    const ContentfootbarBox = styled(Box)(({ theme }) => ({
        display: 'flex',
        alignItems: 'center', // Center the content vertically
        justifyContent: 'center', // Center the content horizontally
        gap: '1rem',
        [theme.breakpoints.down('md')]: {
          justifyContent: 'center',
          flexDirection:"colum",
          textAlign:"center",
        },
        [theme.breakpoints.down('sm')]: {
            justifyContent: 'center',
            flexDirection:"column",
            textAlign:"center",
            marginLeft:"1%"
          },
      }));

  return (
    <Box>
    <ContentfootbarBox  className="myMainFooterClass" sx={{ py: 2, backgroundColor: '#0484ff',display: 'flex',}} >
      
        <Box flex={1}>
          <Typography 
            variant='h2'
            sx={{
              width:'40%',
              color: '#1C1C1D',
              fontWeight: 'bold',
              marginLeft:'25%',
             
            }}
          >
             Plan it, Live it
          </Typography>
         <Typography>
          
         </Typography>
        </Box>
        <Box flex={1}  sx={{textAlign:"center",justifyContent:"center" }}>
        <Typography sx={{ width: '50%', wordWrap: 'break-word',marginLeft:'30%' }}>
        Designed to take care of your post-retirement days and help you lead a stress-free life.
         </Typography>
          
        </Box>
  
    </ContentfootbarBox>
      
        <Box sx={{ py: 2, backgroundColor:"#fff6b2"}}>
            <CustomContainer>
                <Box>
                    <Typography 
                    sx={{
                        fontSize:"20px",
                        color:"#1C1C1D",
                        fontWeight:"700",
                        mb:2,
                    }}
                    >
                    Featured
                    </Typography>
                    <FooterLink>Guides</FooterLink> 
                    <br />  
                    <FooterLink>Services</FooterLink>
                    <br />
                    <FooterLink>Contact Us</FooterLink>
                </Box>

                <Box>
                <Typography 
                    sx={{
                        fontSize:"20px",
                        color:"#1C1C1D",
                        fontWeight:"700",
                        mb:2,
                    }}
                    >
                    OverView
                    </Typography>
                    <FooterLink>Guides</FooterLink> 
                    <br />  
                    <FooterLink>Services</FooterLink>
                    <br />
                    <FooterLink>Contact Us</FooterLink>
                </Box>

                <Box>
                <Typography 
                    sx={{
                        fontSize:"20px",
                        color:"#1C1C1D",
                        fontWeight:"700",
                        mb:2,
                    }}
                    >
                    Follow Us
                    </Typography>
                    <FooterLink>Keep in Touch With Our Social Media Page</FooterLink>
                    <br />
                    <FacebookIcon color='secondary' sx={{ marginRight:"1px"}}/>
                    <br />
                    <InstagramIcon color='warning'/>
                </Box>
            
            </CustomContainer>

        </Box>
    </Box> 
  )
}

export default Footer



