import { createContext, useState} from "react";
import jwt_decode from "jwt-decode";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser, clearUSer } from "../slices/userSlice";
import { toast } from "react-toastify";

const AuthContext = createContext();

export default AuthContext;

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [error, setError] = useState('');

  const dispatch = useDispatch();

  const apiUrl = "http://127.0.0.1:8000";

  const registerUser = async (formData) => {
    try {
      const response = await axios.post(
        `${apiUrl}/api/authentification/user_registration/`,
        formData
      );
      console.log("User Registion success", response.data);
    
      if (response.data.is_staff === false && response.data.is_service_provider === false)
        navigate("/user-login");
       
      else
        navigate("/provider-login")
    } catch (error) {
      console.log('errorrrrrr:',error.response.data.email)
    
      if (error.response.data) {
        setError(error.response.data); // Set the error message from the response
      } else {
        setError("Registration Failed. Please check your input.");
      }
      navigate("/user-signup");
    };
  }
  
  const loginUser = async (formData) => {
    try {
      const response = await axios.post(
        `${apiUrl}/api/token/`,
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      localStorage.setItem("access_token", response.data.access);
      localStorage.setItem("refresh_token", response.data.refresh);
      axios.defaults.headers.common["Authorization"] = `Bearer ${response.data.access}`;

      const decodedToken = jwt_decode(response.data.access);
      const { is_staff, is_superuser,is_service_provider } = decodedToken.user;

      
      dispatch(setUser(jwt_decode(response.data.access).user));

     

      console.log('response:',response.data);
      toast.success('Login Success');
      if (is_staff === true && is_superuser === true)
      navigate("/admin-home");
      else if (is_service_provider === true)
      navigate("/provider-home")
      else
      navigate("/")

    } catch (error) {
      console.error("Login Failed");
      dispatch(clearUSer());
      toast.error('Login Failed');
      setError("Login Failed. Please check your credentials.");
      const currentRoute = window.location.pathname;
      if (currentRoute === '/admin-login') {
        navigate("/admin-login");
      } else if (currentRoute === '/provider-login') {
        navigate("/provider-login");
      } else {
        navigate("/user-login");
      }
      
    }
  };

  const storedAccessToken = localStorage.getItem("access_token");

  if (storedAccessToken) {
    axios.defaults.headers.common["Authorization"] = `Bearer ${storedAccessToken}`;
    const decodedToken = jwt_decode(storedAccessToken);
    dispatch(setUser(decodedToken.user));
  }

  const contextData = {
    registerUser,
    loginUser,
    error,

  };

  return (
    <AuthContext.Provider value={contextData}>{children}</AuthContext.Provider>
  );
};