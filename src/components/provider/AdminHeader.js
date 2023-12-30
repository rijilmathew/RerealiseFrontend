import React,{useEffect, useState} from 'react';
import { Link } from "react-router-dom";
import {
    AppBar,
    Button,
    Tab,
    Tabs,
    Toolbar,
    Typography,
    useMediaQuery,
    useTheme,
    Box,
    Badge,
  } from "@mui/material";
import AccessibilityNewIcon from '@mui/icons-material/AccessibilityNew';
import { useDispatch, useSelector } from "react-redux";
import MailIcon from '@mui/icons-material/Mail';
import ChatIcon from '@mui/icons-material/Chat';


import { clearUSer } from '../../slices/userSlice';
import AdminDrawer from './AdminDrawer';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';




const AdminHeader = () => {
    const [value, setValue] = useState();
    const dispatch = useDispatch();
    const navigate=useNavigate();
    const [bookingNotifications, setBookingNotifications] = useState([]);
    const [totalMessageCount, setTotalMessageCount] = useState(0);
    const user=useSelector((state)=>state.user.user) 
    const theme = useTheme();
    console.log('user:',user);
    const isMatch = useMediaQuery(theme.breakpoints.down("md"));
    console.log(isMatch);
   const handleLogout = () => {
      // Reset local state related to user
      setBookingNotifications([]);
      setTotalMessageCount(0);

      // Clear user state in Redux store
      dispatch(clearUSer());

      // Redirect to the login page
      navigate("/provider-login");
    };

    useEffect(() => {
      const fetchBookingNotifications = async () => {
        try {
          if(user && user.userId){
            const response = await axios.get(`providerdashboard/booking-notifications/${user.userId}/`);
            setBookingNotifications(response.data);
          }
        } catch (error) {
          console.error('Error fetching booking notifications:', error);
        }
      };
  
      if (user) {
        fetchBookingNotifications();
      }
    }, [user]);

    useEffect(() => {
      const fetchTotalMessageCount = async () => {
        try {
          if(user && user.userId){
            const response = await axios.get(`chat/total-message-count/${user.userId}/`);
            setTotalMessageCount(response.data[0].total_message_count);
            console.log('count:',response.data[0].total_message_count)
          }
        } catch (error) {
          console.error("Error fetching total message count:", error);
        }
      };
  
      if (user && user.userId) {
        fetchTotalMessageCount();
      }
    }, [user,user.userId]);
  return (
    <Box>
        <AppBar sx={{ background: "#4b04ff91"}}>
            <Toolbar>
            <AccessibilityNewIcon sx={{ transform: "scale(2)",marginLeft:"10px" }} />
           
           
            {isMatch ? (
                <>
                  <AdminDrawer/>
                </>
            ) : (
                <>
                 <Typography sx={{ fontSize: "2rem", paddingLeft: "10%" ,color: "white"}}>
                  <Link  to="/provider-home" color="inherit"> ReRealise-ProviderHome</Link> 
                </Typography>
                <Tabs
                    sx={{ marginLeft: "auto" }}
                    indicatorColor="secondary"
                    textColor="White"
                    value={value}
                    onChange={(e, value) => setValue(value)}
                >
                   <Tab
                      label={
                        <Typography color="textPrimary">
                          <Link to="/provider-carehomelist" style={{ color: 'white', textDecoration: 'none' }}>
                            CreHomeList
                          </Link>
                        </Typography>
                      }
                    />
                      <Tab
                      label={
                        <Typography color="textPrimary">
                          <Link to="/provider-personlist" style={{ color: 'white', textDecoration: 'none' }}>
                            PersonList
                          </Link>
                        </Typography>
                      }
                    />
                    <Tab
                      label={
                      <Link to="/provider-chatapp" >
                      <Badge badgeContent={totalMessageCount} color="success">
                      <ChatIcon color="action" />
                    </Badge>
                    </Link>
                      }
                    />
                    {/* <Tab 
                     label ={
                      <Typography color="textPrimary">
                        <Link to="user_profile" style={{color:'white', textDecoration: 'none'}}>
                        <AccountBoxIcon color="action"/>
                        </Link>
                      </Typography>
                    }
                    
                    /> */}
                    <Tab
                    label={
                    <Link to="/provider-booklist" >
                    <Badge badgeContent={bookingNotifications.length} color="success">
                     <MailIcon color="action" />
                   </Badge>
                   </Link>
                    }
                    />
                    
                </Tabs>
                {user ? (
                // Render the Logout button if the user is logged in
                <Button
                  sx={{ marginLeft: "auto" }}
                  variant="contained"
                  onClick={handleLogout}
                >
                  <Link  to="/provider-login" style = {{ color:'White'}}>Logout</Link>
                </Button>
              ) : ([
                // Render the Login button if the user is not logged in
                <Button
                  sx={{ marginLeft: "auto" }}
                  variant="contained"
                >
                <Link to="/provider-login" style={{ color: 'White' }}>Login</Link>
                </Button>,
                 <Button
                 sx={{ marginLeft: "10px" }}
                 variant="contained"
               >
                 <Link to="/provider-signup" style = {{ color:'White'}}>SignUp</Link>
               </Button>
              ])}
              
                </>
            )}
            </Toolbar>
        </AppBar>
    </Box>
        )
}

export default AdminHeader