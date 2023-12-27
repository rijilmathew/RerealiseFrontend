import { Box, styled } from "@mui/material";




export const CustomHomeBox = styled(Box)(({ theme }) => ({
    display: 'flex',
    justifyContent: 'flex-start',
 
    paddingLeft: 0,
    paddingRight: 0,
    marginLeft: 0,
    marginRight: 0,
    width:'100%',
    
   
    [theme.breakpoints.down('md')]: {
      justifyContent: 'center',
      flexDirection:"colum",
      textAlign:"center",
     
    },
    [theme.breakpoints.down('sm')]: {
        justifyContent: 'center',
        flexDirection:"column",
        textAlign:"center",
        marginLeft:"1%",
     
      },
  }));

  export const CustomCareHomeBox = styled(Box)(({ theme }) => ({
    display: 'flex',
    justifyContent: 'space-around',
    
    paddingLeft: 0,
    paddingRight: 0,
    marginLeft: 0,
    marginRight: 0,
    width:'100%',
    gap: theme.spacing(2),
    
   
    [theme.breakpoints.down('md')]: {
      justifyContent: 'center',
      flexDirection:"colum",
      textAlign:"center",
      gap: theme.spacing(2),
     
    },
    [theme.breakpoints.down('sm')]: {
        justifyContent: 'center',
        flexDirection:"column",
        textAlign:"center",
        marginLeft:"1%",
        gap: theme.spacing(2),
     
      },
  }));