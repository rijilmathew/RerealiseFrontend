import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Box,
  Typography,
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  List,
  ListItem,
  ListItemText,
  Stack,
  IconButton,
  Rating,
} from "@mui/material";
import { Link, useParams } from "react-router-dom";
import ChatIcon from "@mui/icons-material/Chat";
import FavoriteIcon from "@mui/icons-material/Favorite";
import RoomIcon from "@mui/icons-material/Room";
import { CareHomeContainer } from "./userPageStyles/CareHomeStyled";
import { CustomCareHomeBox } from "./userPageStyles/UserHomeStyle";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import UserChat from "../chat/UserChat";
import { useSelector } from "react-redux";
import UserReview from "./UserReview";



mapboxgl.accessToken = "pk.eyJ1IjoicmlqaWxtYXRoZXciLCJhIjoiY2xwN3l3anZ1MDFhdzJpbmhnc2Nkb2Z1byJ9.piSBAE09wbjiI9ikVACURw";


const CareHomeSingleView = () => {
  const [careHome, setCareHomes] = useState([]);
  const [roomName, setRoomName] = useState(null);
  const { careHomeId } = useParams();
  const user = useSelector((state) => state.user.user);
  const UserId = user.userId;
  const username=user.username
  console.log(username)
  const [isChatModalOpen, setIsChatModalOpen] = useState(false);



  const handleChatIconClick = () => {
    setIsChatModalOpen(true);
  };

  const handleCloseChatModal = () => {
    setIsChatModalOpen(false);
  };




  useEffect(() => {
    const createRoom = async () => {
      try {
        // Check if careHome is available
        if (careHome) {
          const response = await axios.post('chat/rooms/', {
            care_home_id: careHomeId,
            user_id: UserId,
            provider_id: careHome.provider,
            username:username,
          });
  
          setRoomName(response.data.name);
          console.log(response.data);
        }
      } catch (error) {
        console.error('Error creating room:', error);
      }
    };
  
    createRoom();
  }, [careHomeId, UserId, careHome]); // Include careHome as a dependency


  
  useEffect(() => {
    const fetchCareHomes = async () => {
      try {
        const response = await axios.get(
          `usersdashboard/carehomesingleview/${careHomeId}`
        );
        setCareHomes(response.data);
        console.log('setCareHomes:',response.data)
      } catch (error) {
        console.error("Error fetching care homes:", error);
      }
    };

    fetchCareHomes();
  }, [careHomeId]);
  console.log("dfsdfdsd:", careHome);


  useEffect(() => {
    if (!careHome.longitude || !careHome.latitude) {
      return; // Don't proceed if longitude or latitude is not available
    }

    const map = new mapboxgl.Map({
      container: "map",
      style: "mapbox://styles/mapbox/streets-v11",
      center: [parseFloat(careHome.longitude), parseFloat(careHome.latitude)],
      zoom: 6,
    });

    new mapboxgl.Marker()
      .setLngLat([parseFloat(careHome.longitude), parseFloat(careHome.latitude)])
      .addTo(map);

    // Cleanup the map when the component is unmounted
    return () => {
      map.remove();
    };
  }, [careHome]);

  console.log('avg:',careHome.average_rating)

  return (
    <CareHomeContainer>
      <CustomCareHomeBox>
        <Box flex={1}>
          <Card style={{ height: "100%",backgroundColor:"#C4C4E1" }}>
            <CardHeader title={careHome.carehomename} />
            <CardMedia
              component="img"
              height="300"
              image={careHome.imageone}
              alt="Care Home"
            />
            <Stack
              direction="row"
              spacing={2}
              justifyContent={"space-between"}
              alignItems={"center"}
            >
              <Typography>
                {careHome.total_reviews} Reviews
              </Typography>
              <Rating
                name="five-star"
                precision={0.5}
                value = {parseFloat(careHome.average_rating)}
                readOnly
                sx={{ fontSize: 30 }}
              />
            </Stack>
            <CardContent>
              <List></List>

              <Stack
                direction="row"
                spacing={2}
                justifyContent={"space-between"}
                alignItems={"center"}
              >
                <IconButton
                  aria-label="Add to Wishlist"
                  style={{ color: "red" }}
                >
                  <FavoriteIcon />
                </IconButton>
                <IconButton style={{ color: "blue" }}>
                  <RoomIcon />
                </IconButton>
                <IconButton
                  aria-label="Chat"
                  style={{ color: "blue" }}
                  onClick={handleChatIconClick}
                >
                  <ChatIcon />
                </IconButton>
              </Stack>
            </CardContent>
          </Card>
        </Box>
        <Box flex={1}>
          <Card style={{ height: "100%",backgroundColor:"#C4C4E1" }}>
            <CardContent>
              <List>
                <ListItem>
                  <ListItemText
                    primary={`Address: ${careHome.address_1}, ${careHome.address_2}, ${careHome.address_3}`}
                  />
                </ListItem>

                <ListItem>
                  <ListItemText
                    primary={`Phone Number: ${careHome.phone_number}`}
                  />
                </ListItem>
                <ListItem>
                  <ListItemText primary={`Email: ${careHome.email}`} />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary={`Website: ${
                      careHome.website_link || "Not available"
                    }`}
                  />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary={`Type of Service: ${careHome.type_of_service}`}
                  />
                </ListItem>
              </List>
            </CardContent>
            <div id="map" style={{ height: "300px" }}></div>
          </Card>
        
        </Box>
        <UserChat
        room_name={roomName}
        userId={UserId}
        isOpen={isChatModalOpen}
        onClose={handleCloseChatModal}
      />       
      </CustomCareHomeBox>
      <UserReview careHomeid={careHome.id}/>
    </CareHomeContainer>
  );
};

export default CareHomeSingleView;

