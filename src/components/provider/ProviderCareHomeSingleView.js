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
  Button,
} from "@mui/material";

import {   useNavigate,  useParams } from "react-router-dom";
import ChatIcon from "@mui/icons-material/Chat";
import FavoriteIcon from "@mui/icons-material/Favorite";
import RoomIcon from "@mui/icons-material/Room";
import { CareHomeContainer } from "../user/userPageStyles/CareHomeStyled";
import { CustomCareHomeBox } from "../user/userPageStyles/UserHomeStyle";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import UpdateCareHome from "./UpdateCareHome";
import { toast } from "react-toastify";
import ConfirmBox from "./ProviderConfirmBox";
import ProviderCarehomeReview from "./ProviderCarehomeReview";

const mapboxglaccessToken  = process.env.REACT_APP_MAPBOXGL_ACCESSSTOKEN

mapboxgl.accessToken = mapboxglaccessToken


const ProviderCareHomeSingleView = () => {
  const [careHome, setCareHomes] = useState([]);
  const { careHomeId } = useParams();
  const [openUpdateModal, setOpenUpdateModal] = useState(false);
  const [open, setOpen] = useState(false);
  const [deleteData, setDeleteData] = useState({});
  const navigate = useNavigate()

  // const user = useSelector((state) => state.user.user);
  // const providerId = user.userId;

  const handleUpdateModalOpen = () => {
    setOpenUpdateModal(true);
  };

  const handleUpdateModalClose = () => {
    setOpenUpdateModal(false);
  };
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
  
  useEffect(() => {
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

  const handleUpdateSuccess = () => {
    // Fetch care homes again after the update is successful
    fetchCareHomes();
  };


  const handleDelete = async (careHomeId) => {
    try {
        await axios.delete(`providerdashboard/carehomes/${deleteData?.id}`);
        // Filter out the deleted care home from the careHomes state
         toast.success('deleted ')
         setOpen(false);
         navigate('/provider-carehomelist') 
         
    } catch (error) {
        console.error('Error deleting care home:', error);
    }
};


function openDelete(data) {
  setOpen(true);
  setDeleteData(data);
}
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
                value = {parseFloat(careHome.average_rating)}
                readOnly
                sx={{ fontSize: 16 }}
              />
            </Stack>
            <CardContent>
              <List>
              <ListItem>
                            
               
             </ListItem>
              </List>

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
                <IconButton aria-label="Chat" style={{ color: "blue" }}>
                  <ChatIcon />
                  <Typography variant="body2">Chat with us</Typography>
                </IconButton>
              </Stack>
              <Stack
               direction="row"
               spacing={2}
               justifyContent={"space-between"}
               alignItems={"center"}
               
               >
              <Button variant="contained" onClick={handleUpdateModalOpen}>Update</Button>
                <UpdateCareHome open={openUpdateModal} handleClose={handleUpdateModalClose} careHomes={careHome} onUpdateSuccess={handleUpdateSuccess}  />
                <Button onClick={() => openDelete(careHome)}>Delete</Button>
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
       
      </CustomCareHomeBox>
      <ConfirmBox
        open={open}
        closeDialog={() => setOpen(false)}
        title={careHome?.carehomename}
        deleteFunction={handleDelete}
      />
       <ProviderCarehomeReview careHomeid={careHome.id}/>
    </CareHomeContainer>
  );
};

export default ProviderCareHomeSingleView;

