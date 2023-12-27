import React, { useState } from "react";
import {
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
import { clearUSer } from '../slices/userSlice';



const HeaderDrawer = () => {
  const [openDrawer, setOpenDrawer] = useState(false);
  const dispatch = useDispatch();
    const user=useSelector((state)=>state.user.user
    ) 

    const handleLogout = () => {
      dispatch(clearUSer());
      window.location.href = "/";
    };

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
                <Link to="/">Home</Link>
              </ListItemText>
            </ListItemIcon>
          </ListItemButton>
        </List>
        <List>
          <ListItemButton>
            <ListItemIcon>
              <ListItemText><Link to="/user-profile">Profile</Link></ListItemText>
            </ListItemIcon>
          </ListItemButton>
        </List>
        <List>
          <ListItemButton>
            <ListItemIcon>
              <ListItemText><Link to="/">Service</Link></ListItemText>
            </ListItemIcon>
          </ListItemButton>
        </List>
        <List>
          <ListItemButton>
            <ListItemIcon>
              <ListItemText><Link>AboutUs</Link></ListItemText>
            </ListItemIcon>
          </ListItemButton>
        </List>
        {user ? (
                // Render the Logout button if the user is logged in
              <List>
                <ListItemButton>
                  <ListItemIcon>
                    <ListItemText>
                    <Link onClick={handleLogout}>Logout</Link>
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
                    <Link to="/user-login">Login</Link>
                    </ListItemText>
                  </ListItemIcon>
                </ListItemButton>
              </List>,
              
               
                
            <List>
              <ListItemButton>
                <ListItemIcon>
                  <ListItemText>
                  <Link to="/user-signup">SignUp</Link>
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

export default HeaderDrawer
