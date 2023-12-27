import React, { useContext, useState } from "react";
import AuthContext from "../../context/AuthContext";
import { Box, Button, TextField, Typography } from "@mui/material";
import { Link } from "react-router-dom";


const UserRegistration = () => {
  const { registerUser,error } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    mobile_number: "",
    is_active: true,
    is_staff: false,
    is_superuser: false,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    registerUser(formData);
  };

  console.log(formData.username)
  return (
    <Box mt={8}>
        <form  onSubmit={handleSubmit}>
          <Box 
          display="flex"
          flexDirection={"column"}
          maxWidth={400}
          maxHeight={600}
          alignItems={"center"}
          margin={"auto"}
          marginTop={5}
          padding={3}
          borderRadius={5}
            boxShadow={"5px 5px 10px #ccc"}

            sx={{":hover": {
              boxShadow:"15px 15px 25px #ccc",
       
            }}}
          
          >
            <Typography variant="h4" padding={2} textAlign={"center"}>SignUp</Typography>
             

            <TextField variant="outlined"
                  size="small"
                  margin="normal"
                  type="text"
                  name="username"
                  placeholder="UserName"
                  value={formData.username}
                  onChange={handleChange}

            />
             {error && <p>{error.username}</p>}
            <TextField variant="outlined"
                  size="small"
                  margin="normal"
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleChange}

            />
             {error && <p>{error.email}</p>}
              <TextField variant="outlined"
                  size="small"
                  margin="normal"
                  type="text"
                  name="mobile_number"
                  placeholder="Mobile Number"
                  value={formData.mobile_number}
                  onChange={handleChange}

            />
             {error && <p>{error.mobile_number}</p>}
            <TextField variant="outlined"
                size="small"
                margin="normal"
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
    
            />
            {error && <p>{error.password}</p>}
          <Button type="submit" variant="contained"
            color="warning"
            sx={{ marginTop: 3 , borderRadius: 3}}
          > SignUp</Button>


            <Box mt={3}>
              Already have an account?{" "}
              <Link to="/user-login">
                Login here
              </Link>
            </Box>

            <Box mt={3}>
              Service Provider?{" "}
              <Link to="/provider-signup">
                Register here
              </Link>
            </Box>


          </Box>
        </form>
      </Box>  
  );
};

export default UserRegistration;