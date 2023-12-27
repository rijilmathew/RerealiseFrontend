import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Button,
  Avatar,
  Paper,
  Box,
  FormControl,
  InputLabel,
  Input,
} from "@mui/material";
import { useSelector } from "react-redux";
import UserBookings from "./UserBookings";
import { toast } from "react-toastify";

const UserProfile = () => {
  const [userProfile, setUserProfile] = useState({});
  const [isNewProfile, setIsNewProfile] = useState(false);
  const [profileImage, setProfileImage] = useState(null);
  const [profileImageURL, setProfileImageURL] = useState("");
  

  const user = useSelector((state) => state.user.user);
  const user_id = user.userId;
  console.log(profileImage);
  console.log(user);

  const getuserprofile = (user_id) => {
    axios
      .get(`http://127.0.0.1:8000/api/authentification/user-profile/${user_id}`)
      .then((response) => {
        setUserProfile(response.data);
        console.log("userprofile:", response.data);
        // Set the profile image
        setProfileImageURL(
          `http://127.0.0.1:8000${response.data.profile_photo}`
        );
      })
      .catch((error) => {
        setIsNewProfile(true); // If profile doesn't exist, show the button to add a new profile
        console.error("Error fetching user profile:", error);
      });
  };

  useEffect(() => {
    getuserprofile(user_id);
  }, [user_id]);

  // ... (handleUpdate, handleChange functions remain the same)
  const handleUpdate = () => {
    const formData = new FormData();
    formData.append("dob", userProfile.dob);
    formData.append("address_lane_1", userProfile.address_lane_1);
    formData.append("address_lane_2", userProfile.address_lane_2);
    formData.append("pincode", userProfile.pincode);
    if (profileImage) {
      formData.append("profile_photo", profileImage);
    }
    console.log("hgjgj:", profileImage);
    if (isNewProfile) {
      // If it's a new profile, perform a POST request
      axios
        .post(
          `http://127.0.0.1:8000/api/authentification/user-profile/`,
          formData
        )
        .then((response) => {
          setUserProfile(response.data);
          setIsNewProfile(false);
          getuserprofile(user_id);
          toast.success("Created  Successfully");
        })
        .catch((error) => {
          console.error("Error creating user profile:", error);
        });
    } else {
      // If the profile exists, perform a PUT request for update
      axios
        .put(
          `http://127.0.0.1:8000/api/authentification/user-profile/${user_id}/`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        )
        .then((response) => {
          setUserProfile(response.data);
          console.log(response.data);
          getuserprofile(user_id);
          toast.success("Updated Successfully");
        })
        .catch((error) => {
          console.error("Error updating user profile:", error);
        });
    }
  };

  const handleChange = (e) => {
    setUserProfile({ ...userProfile, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setProfileImage(file);
    console.log(file);
  };

  return (
    <div>
      <Box
        display="flex"
        flexDirection={{ xs: "column", md: "row" }}
        alignItems="stretch"
        justifyContent={"space-around"}
        style={{ backgroundColor: "#79ABF7" }}
      >
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          style={{ flex: 1.5 }}
        >
          <h2>User Profile Details</h2>
          <Avatar
            alt="Profile Image"
            src={profileImageURL}
            style={{ width: "150px", height: "150px" }}
          />
          <div>
            <p>Username: {user.username}</p>
            <p>Email: {user.email}</p>
          </div>
        </Box>
        <Box style={{ flex: 1 }}>
          <form>
            <Paper style={{ margin: "auto", backgroundColor: "#79ABF7" }}>
              <Avatar alt="User Image" src={profileImage} />
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
              />

              <FormControl fullWidth style={{ marginTop: "10px" }}>
                <InputLabel shrink htmlFor="dob">
                  Date of Birth
                </InputLabel>
                <Input
                  id="dob"
                  name="dob"
                  value={userProfile.dob}
                  onChange={handleChange}
                />
              </FormControl>

              <FormControl fullWidth style={{ marginTop: "10px" }}>
                <InputLabel shrink htmlFor="address_lane_1">
                  Address 1
                </InputLabel>
                <Input
                  id="address_lane_1"
                  name="address_lane_1"
                  value={userProfile.address_lane_1}
                  onChange={handleChange}
                />
              </FormControl>

              <FormControl fullWidth style={{ marginTop: "10px" }}>
                <InputLabel shrink htmlFor="address_lane_2">
                  Address 2
                </InputLabel>
                <Input
                  id="address_lane_2"
                  name="address_lane_2"
                  value={userProfile.address_lane_2}
                  onChange={handleChange}
                />
              </FormControl>

              <FormControl fullWidth style={{ marginTop: "10px" }}>
                <InputLabel shrink htmlFor="pincode">
                  Pincode
                </InputLabel>
                <Input
                  id="pincode"
                  name="pincode"
                  value={userProfile.pincode}
                  onChange={handleChange}
                />
              </FormControl>
              <Box display="flex" justifyContent="flex-end">
                <Button variant="contained" onClick={handleUpdate}>
                  Save Changes
                </Button>
              </Box>
            </Paper>
          </form>
        </Box>
      </Box>
      <UserBookings />
    </div>
  );
};

export default UserProfile;
