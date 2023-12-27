import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../../context/AuthContext";
import { Box, Button, TextField, Typography } from "@mui/material";


const UserLogin = () => {
  const { loginUser, error } = useContext(AuthContext);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    loginUser(formData);
  };
  return (
   <Box mt={10}>
    <form  onSubmit={handleSubmit}>
      <Box 
      display="flex"
      flexDirection={"column"}
      maxWidth={400}
      alignItems={"center"}
      margin={"auto"}
      marginTop={5}
      padding={3}
      borderRadius={5}
        boxShadow={"5px 5px 10px #ccc"}

        sx={{":hover": {
          boxShadow:"15px 15px 25px #ccc"
        }}}
      
      >
        <Typography variant="h2" padding={3} textAlign={"center"}>Login</Typography>
        {error && ( 
          <Typography variant="body2" color="error" sx={{ marginTop: 2 }}>
            {error}
          </Typography>
        )}
        <TextField variant="outlined"
              margin="normal"
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}

        />
        <TextField variant="outlined"
             margin="normal"
             type="password"
             name="password"
             placeholder="Password"
             value={formData.password}
             onChange={handleChange}
 
        />
       <Button type="submit" variant="contained"
         color="warning"
         sx={{ marginTop: 3 , borderRadius: 3}}
       > Login</Button>


         <Box mt={3}>
          Don't have an account?{" "}
          <Link to="/user-signup">
            Register here
          </Link>
        </Box>

        <Box mt={3}>
          Service Provider?{" "}
          <Link to="/provider-login">
            Login here
          </Link>
        </Box>
        
        <Box mt={3}>
          Admin?{" "}
          <Link to="/admin-login">
            Login here
          </Link>
        </Box>

      </Box>
    </form>
   </Box>  
  );
};

export default UserLogin;