import React from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // Import Axios
import jwt_decode from 'jwt-decode';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';

const GoogleLoginPage = () => {
  const navigate = useNavigate();

  const handleGoogleLogin = async (decode) => {
    try {
      const convertTokenData = {
        grant_type: 'convert_token',
        client_id: '792751079870-qhvrc29qa9n41881o0opb8usflm4dhqv.apps.googleusercontent.com',
        client_secret: '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',
        backend: 'google-oauth2',
        token:  decode,
      };

      const response = await axios.post('http://127.0.0.1:8000/auth/convert-token', convertTokenData);

      if (response.status === 200) {
        const data = response.data;
        console.log('Access Token:', data.access_token);
        navigate('/dashboard');
      } else {
        console.error('Token exchange error');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <GoogleOAuthProvider clientId="792751079870-qhvrc29qa9n41881o0opb8usflm4dhqv.apps.googleusercontent.com">
      <GoogleLogin
        onSuccess={(credentialResponse) => {
          const decode = jwt_decode(credentialResponse.credential);
          console.log(decode)
          handleGoogleLogin(decode);
        }}
        onError={() => {
          console.log('Login Failed');
        }}
      />
    </GoogleOAuthProvider>
  );
};

export default GoogleLoginPage;
