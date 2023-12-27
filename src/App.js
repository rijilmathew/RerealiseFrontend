import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import AdminDashboard from "./pages/adminPages/AdminDashboard";
import UserDashboard from "./pages/userPages/UserDashboard";
import UserLoginPage from "./pages/userPages/UserLoginPage";
import UserSignUpPage from "./pages/userPages/UserSignUpPage";
import ProviderDashboard from "./pages/providerPages/ProviderDashboard";
import ProviderLoginPage from "./pages/providerPages/ProviderLoginPage";
import ProviderSignupPage from "./pages/providerPages/ProviderSignupPage";
import AdminLoginPage from "./pages/adminPages/AdminLoginPage";
import GoogleLoginPage from "./components/googlelogin/googleLoginPage";
import UserCareHomeListPage from "./pages/userPages/UserCareHomeListPage";
import { createTheme,ThemeProvider } from "@mui/material";
import UserPersonListPage from "./pages/userPages/UserPersonListPage";
import ProviderCareHomeListPage from "./pages/providerPages/ProviderCareHomeListPage";
import ProviderPersonListPage from "./pages/providerPages/ProviderPersonListPage";
import UsersListPage from "./pages/adminPages/UsersListPage";
import AdminProviderListPage from "./pages/adminPages/AdminProviderListPage";
import UserPrivateRoute from "./components/user/UserPrivateRoute";
import UserBookings from "./components/user/UserBookings";
import UserChat from "./components/chat/UserChat";
import ProviderChatRooms from "./components/chat/ProviderChatRooms";
import VideoCallRoom from "./components/chat/VideoCallRoom";
import UserProfilePage from "./pages/userPages/UserProfilePage";
import ProviderChatPage from "./pages/providerPages/ProviderChatPage";
import ProviderCareHomeSinglePage from "./pages/providerPages/ProviderCareHomeSinglePage";
import UserCareHomeSinglePage from "./pages/userPages/UserCareHomeSinglePage";
import UserPersonSinglePage from "./pages/userPages/UserPersonSinglePage";
import UserReview from "./components/user/UserReview";
import AdminChart from "./components/admin/AdminChart";
import CareHomeApprovePage from "./pages/adminPages/CareHomeApprovePage";
import PersonApprovePage from "./pages/adminPages/PersonApprovePage";
import ProviderPersonSingleViewPage from "./pages/providerPages/ProviderPersonSingleViewPage";
import ProviderBookingListPage from "./pages/providerPages/ProviderBookingListPage";
import ProfessionalsReviewManagementPage from "./pages/adminPages/ProfessionalsReviewManagementPage";
import CarehomeReviewManagementPage from "./pages/adminPages/CarehomeReviewManagementPage";
// Create your MUI theme
const theme = createTheme({
  // Define your theme configurations here
  // For example:
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
    // Other palette configurations
  },
  // Other theme configurations
});



const App = () => {
  return (
    <ThemeProvider theme={theme}>
    <Router>
     <AuthProvider>
    
        <Routes>
         <Route path="/" element={<UserDashboard/>}/>
         <Route path="/user-login" element={<UserLoginPage/>}/>
         <Route path="/user-signup" element={<UserSignUpPage/>}/>
         <Route path="/user-profile" element={<UserPrivateRoute><UserProfilePage/></UserPrivateRoute>}/>
         <Route path="/user-carehomelist" element={<UserCareHomeListPage/>}/>
         <Route path="/user-personlist" element={<UserPersonListPage/>}/>
         <Route path="/user-carehomesingleview/:careHomeId" element={<UserPrivateRoute><UserCareHomeSinglePage/></UserPrivateRoute>}/>
         <Route path="/user-personsingleview/:personId" element={<UserPrivateRoute><UserPersonSinglePage/></UserPrivateRoute>}/>
         <Route path="/user-booklist" element={<UserBookings/>}/>
         <Route path="/user-review" element={<UserReview/>}/>





         <Route path="/provider-home" element={<ProviderDashboard/>}/>
         <Route path="/provider-login" element={<ProviderLoginPage/>}/>
         <Route path="/provider-signup" element={<ProviderSignupPage/>}/>
         <Route path="/provider-carehomelist" element={<ProviderCareHomeListPage/>}/>
         <Route path="/provider-carehomesingleview/:careHomeId" element={<ProviderCareHomeSinglePage/>}/>
         <Route path="/provider-personlist" element={<ProviderPersonListPage/>}/>
         <Route path="/provider-personsingleview/:personId" element={<ProviderPersonSingleViewPage/>}/>
         <Route path="/provider-booklist" element={<ProviderBookingListPage/>}/>
         <Route path="/provider-chatrooms" element={<ProviderChatRooms/>}/>
         <Route path="/provider-chatapp" element={<ProviderChatPage/>}/>
         <Route path="/provider-videocall/:roomId" element={<VideoCallRoom/>}/>




         <Route path="/admin-home" element={<AdminDashboard/>}/>
         <Route path="/admin-login" element={<AdminLoginPage  />}/>
         <Route path="/admin-userList" element={<UsersListPage/>}/>
         <Route path="/admin-providerList" element={<AdminProviderListPage/>}/>
         <Route path="/admin-carehomeList" element={<CareHomeApprovePage/>}/>
         <Route path="/admin-personList" element={<PersonApprovePage/>}/>
         <Route path="/admin-chart" element={<AdminChart/>}/>
         <Route path="/admin-carehomeReviewList" element={<CarehomeReviewManagementPage/>}/>
         <Route path="/admin-professionalsReviewList" element={<ProfessionalsReviewManagementPage/>}/>


         <Route path="/googlelogin" element={<GoogleLoginPage/>}/>

         <Route pathe="/user-chat" element={<UserChat/>}/>
        </Routes>
      </AuthProvider>
    </Router>
    </ThemeProvider>
  );
};

export default App;
