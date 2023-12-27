import React,{useState} from 'react';
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
  } from "@mui/material";
import AccessibilityNewIcon from '@mui/icons-material/AccessibilityNew';
import HeaderDrawer from './HeaderDrawer';
import { useDispatch, useSelector } from "react-redux";
import { clearUSer } from '../slices/userSlice';




const Header = () => {
    const [value, setValue] = useState();
    const dispatch = useDispatch();
    const user=useSelector((state)=>state.user.user
    ) 
    const theme = useTheme();
    console.log(theme);
    const isMatch = useMediaQuery(theme.breakpoints.down("md"));
    console.log(isMatch);
    const handleLogout = () => {
      dispatch(clearUSer());
      window.location.href = "/";
    };
  return (
    <Box>
        <AppBar sx={{ background: "#0484ff"}}>
            <Toolbar position="sticky">
            <AccessibilityNewIcon sx={{ transform: "scale(2)",marginLeft:"10px" }} />
            <Typography sx={{ fontSize: "2rem", paddingLeft: "10%" }}>
                    ReRealise
                </Typography>
           
            {isMatch ? (
                <>
                  <HeaderDrawer/>
                </>
            ) : (
                <>
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
                          <Link to="/" style={{ color: 'white', textDecoration: 'none' }}>
                            Home
                          </Link>
                        </Typography>
                      }
                    />
                    <Tab 
                     label ={
                      <Typography color="textPrimary">
                        <Link to="/user-profile" style={{color:'white', textDecoration: 'none'}}>
                        Profile
                        </Link>
                      </Typography>
                    }
                    
                    />
                    <Tab label="About Us" />
                </Tabs>
                {user ? (
                // Render the Logout button if the user is logged in
                <Button
                  sx={{ marginLeft: "auto" }}
                  variant="contained"
                  onClick={() => {
                    // Handle the logout action here
                  }}
                >
                  <Link onClick={handleLogout} style = {{ color:'White'}}>Logout</Link>
                </Button>
              ) : ([
                // Render the Login button if the user is not logged in
                <Button
                  sx={{ marginLeft: "auto" }}
                  variant="contained"
                >
                <Link to="/user-login" style={{ color: 'White' }}>Login</Link>
                </Button>,
                 <Button
                 sx={{ marginLeft: "10px" }}
                 variant="contained"
               >
                 <Link to="/user-signup" style = {{ color:'White'}}>SignUp</Link>
               </Button>
              ])}
              
                </>
            )}
            </Toolbar>
        </AppBar>
    </Box>
        )
}

export default Header