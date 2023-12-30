import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  CardContent,
  Typography,
  Grid,
  Box,
  Stack,
  Button,
  Pagination,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import {
  CardRoot,
  Media,
  Search,
  SearchIconWrapper,
  StyledInputBase,
} from "./userPageStyles/CareHomeStyled";

const UserCareHomesList = () => {
  const navigate = useNavigate();
  const [careHomes, setCareHomes] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalNumberOfPages, setTotalNumberOfPages] = useState(1);
  useEffect(() => {
    const fetchCareHomes = async () => {
      try {
        const response = await axios.get(
          `usersdashboard/usercarehomeslist/?page=${currentPage}`
        );
        setCareHomes(response.data.results);
        setTotalNumberOfPages(Math.ceil(response.data.count / 2));
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchCareHomes();
  }, [currentPage]);

  const handleImageClick = (careHomeId) => {
    navigate(`/user-carehomesingleview/${careHomeId}`);
  };
  const filteredCareHomes = careHomes.filter((careHome) =>
    careHome.carehomename.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handlePageChange = (event, page) => {
    setCurrentPage(page);
  };

  return (
    <Box>
      <Stack
        direction={{ xs: "column", sm: "row" }}
        justifyContent="space-between"
        alignItems="center"
      >
        <Box>
          <Typography variant="h5" component="div" marginLeft={2}>
            Live Your Life Here...
          </Typography>
        </Box>
        <Box marginRight={10}>
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ "aria-label": "search" }}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </Search>
        </Box>
      </Stack>

      <Grid container spacing={2}>
        {filteredCareHomes.map((careHome) => (
          <Grid item key={careHome.id} xs={12} sm={6} md={6}>
            <CardRoot>
              <Media
                image={careHome.imageone}
                title={careHome.carehomename}
                onClick={() => handleImageClick(careHome.id)}
              />
              <CardContent>
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Typography variant="h6" component="div">
                    {careHome.carehomename}
                  </Typography>
                  <Typography variant="h6" style={{ cursor: "pointer" }}>
                    <Link> 253 Reviews</Link>
                  </Typography>
                </Stack>
                <Typography>
                  Address: {careHome.address_1}, {careHome.address_2},{" "}
                  {careHome.address_3}
                </Typography>

                <Button variant="contained">View More</Button>
              </CardContent>
            </CardRoot>
          </Grid>
        ))}
      </Grid>
      <Stack
        spacing={2}
        sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
      >
        <Pagination
          count={totalNumberOfPages}
          color="primary"
          page={currentPage}
          onChange={handlePageChange}
        />
      </Stack>
    </Box>
  );
};

export default UserCareHomesList;
