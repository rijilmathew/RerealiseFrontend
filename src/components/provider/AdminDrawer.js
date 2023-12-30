import React, { useEffect, useState } from "react";
import {
  Badge,
  Drawer,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { clearUSer } from '../../slices/userSlice';
import axios from "axios";
import MailIcon from '@mui/icons-material/Mail';
import ChatIcon from '@mui/icons-material/Chat';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import { useNavigate } from "react-router-dom";



const AdminDrawer = () => {
  const [openDrawer, setOpenDrawer] = useState(false);
  const [bookingNotifications, setBookingNotifications] = useState([]);
  const [totalMessageCount, setTotalMessageCount] = useState(0);
  const dispatch = useDispatch();
  const navigate=useNavigate();
  const user=useSelector((state)=>state.user.user
    ) 

    const handleLogout = () => {
      // Reset local state related to user
      // setBookingNotifications([]);
      // setTotalMessageCount(0);

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
  
      fetchTotalMessageCount();
    }, [user.userId]);


  return (
    <React.Fragment>
      <Drawer
        anchor="left"
        open={openDrawer}
        onClose={() => setOpenDrawer(false)}
      >
        <List>
          <ListItemButton>
            <ListItemIcon>
              <ListItemText>
                <Link to="/provider-home">Home</Link>
              </ListItemText>
            </ListItemIcon>
          </ListItemButton>
        </List>
        <List>
          <ListItemButton>
            <ListItemIcon>
              <ListItemText><Link to="/provider-carehomelist">CareHomeList</Link></ListItemText>
            </ListItemIcon>
          </ListItemButton>
        </List>
        <List>
          <ListItemButton>
            <ListItemIcon>
              <ListItemText><Link to="/provider-personlist">PersonList</Link></ListItemText>
            </ListItemIcon>
          </ListItemButton>
        </List>
        <List>
          <ListItemButton>
            <ListItemIcon>
              <ListItemText>
              <Link to="/provider-booklist" >
                    <Badge badgeContent={bookingNotifications.length} color="success">
                     <MailIcon color="action" />
                   </Badge>
              </Link>
              </ListItemText>
            </ListItemIcon>
          </ListItemButton>
        </List>
        <List>
          <ListItemButton>
            <ListItemIcon>
              <ListItemText>
              <Link to="/provider-chatapp" >
                      <Badge badgeContent={totalMessageCount} color="success">
                      <ChatIcon color="action" />
                    </Badge>
              </Link>
              </ListItemText>
            </ListItemIcon>
          </ListItemButton>
        </List>
        {user ? (
                // Render the Logout button if the user is logged in
              <List>
                <ListItemButton>
                  <ListItemIcon>
                    <ListItemText>
                    <Link to="/provider-login" onClick={handleLogout}>Logout</Link>
                    </ListItemText>
                  </ListItemIcon>
                </ListItemButton>
              </List>
               
               
              ) : ([
                // Render the Login button if the user is not logged in
                <List>
                <ListItemButton>
                  <ListItemIcon>
                    <ListItemText>
                    <Link to="/provider-login">Login</Link>
                    </ListItemText>
                  </ListItemIcon>
                </ListItemButton>
              </List>,
              
               
                
            <List>
              <ListItemButton>
                <ListItemIcon>
                  <ListItemText>
                  <Link to="/provider-signup">SignUp</Link>
                  </ListItemText>
                </ListItemIcon>
              </ListItemButton>
            </List>
             ])}
      </Drawer>
      <IconButton
        sx={{ color: "white", marginLeft: "auto" }}
        onClick={() => setOpenDrawer(!openDrawer)}
      >
        <MenuIcon color="white" />
      </IconButton>
    </React.Fragment>
  )
}

export default AdminDrawer