import React, { useState, useEffect } from "react";
import axios from "axios";
import UserSideBooking from "./UserSideBooking";
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemText,
  Button,
  Stack,
  IconButton,
  Rating,
} from "@mui/material";
import { Link, useParams } from "react-router-dom";
import ChatIcon from "@mui/icons-material/Chat";
import FavoriteIcon from "@mui/icons-material/Favorite";
import RoomIcon from "@mui/icons-material/Room";
import { CustomCareHomeBox } from "./userPageStyles/UserHomeStyle";
import ProfessionalPersonReview from "./ProfessionalPersonReview";

const UserPersonSingleView = () => {
  const [openBookingModal,setOpenBookingModal]=useState(false);
  const [person, setPerson] = useState([]);
  const { personId } = useParams();
  // const user = useSelector((state) => state.user.user);
  // const providerId = user.userId;
  const handleBookingModalOpen = () => {
    setOpenBookingModal(true);
  };

  const handleBookingModalClose = () => {
    setOpenBookingModal(false);
  };
  useEffect(() => {
    const fetchCareHomes = async () => {
      try {
        const response = await axios.get(
          `http://127.0.0.1:8000/api/usersdashboard/personsingleview/${personId}`
        );
        setPerson(response.data);
        console.log('setPerson:',response.data)
      } catch (error) {
        console.error("Error fetching care homes:", error.response.statusText);
      }
    };

    fetchCareHomes();
  }, [personId]);
  console.log("dfsdfdsd:", person);
  return (
    <>
      <CustomCareHomeBox>
        <Box>
          <img
            src={person.profileimage}
            alt="Care Home"
            style={{ height: "300px", width: "100%", objectFit: "cover" }}
          />
          <Stack
            direction="row"
            spacing={2}
            justifyContent={"space-between"}
            alignItems={"center"}
          >
            <Typography>
              {person.total_reviews} Reviews
            </Typography>
            <Rating 
            name="five-star"
            value={parseFloat(person.average_rating)}
            readOnly 
            sx={{ fontSize: 16 }} />{" "}
          </Stack>
          <Typography>
            {person.name}
            <span fontSize="20px">({person.profession})</span>
          </Typography>
          <Box display={'flex'} justifyContent={'center'} alignItems={'center'}>
            <Button variant="contained" onClick={handleBookingModalOpen}>Book Your Time</Button>
          </Box>
        </Box>
        <Box>
          <List>
            <ListItem>
              <ListItemText primary={`More: ${person.add_info}`} />
            </ListItem>
            <ListItem>
              <ListItemText primary={`Professional Fee: ${person.payment}`} />
            </ListItem>
            <ListItem>
              <ListItemText primary={`PhoneNumber: ${person.phone_number}`} />
            </ListItem>
            <ListItem>
              <ListItemText primary={`Email: ${person.email}`} />
            </ListItem>
            <ListItem>
              <ListItemText primary={`WebsiteLink: ${person.website_link}`} />
            </ListItem>
          </List>

          <Stack
            direction="row"
            spacing={2}
            justifyContent={"space-between"}
            alignItems={"center"}
          >
            <IconButton aria-label="Add to Wishlist" style={{ color: "red" }}>
              <FavoriteIcon />
            </IconButton>
            <IconButton style={{ color: "blue" }}>
              <RoomIcon />
            </IconButton>
            <IconButton aria-label="Chat" style={{ color: "blue" }}>
              <ChatIcon />
              <Typography variant="body2">Chat with us</Typography>
            </IconButton>
          </Stack>
        </Box>
      </CustomCareHomeBox>
      <ProfessionalPersonReview ProfessionalPersonid={person.id}/>
     
      <UserSideBooking  open={openBookingModal} handleClose={handleBookingModalClose}  professionalId={person} payment={person.payment}/>
    </>
  );
};

export default UserPersonSingleView;


