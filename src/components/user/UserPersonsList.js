import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { CardContent, Typography, Grid, Stack,Box, Button, Pagination, } from '@mui/material';
import {CardRoot,Media} from './userPageStyles/CareHomeStyled';
import { Link, useNavigate } from 'react-router-dom';
import { Search,SearchIconWrapper,StyledInputBase } from './userPageStyles/CareHomeStyled';
import SearchIcon from '@mui/icons-material/Search';

const UserPersonsList = () => {
  const [personLists, setPersonsLists] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalNumberOfPages, setTotalNumberOfPages] = useState(1);



  const navigate = useNavigate()

  useEffect(() => {
    const fetchPersons = async () => {
      try {
        const response = await axios.get(`usersdashboard/userpersonslist/?page=${currentPage}`);
        setPersonsLists(response.data.results);
        setTotalNumberOfPages(Math.ceil(response.data.count / 2));
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchPersons();
  }, [currentPage]);
  const handleImageClick = (personId)=>{
    navigate(`/user-personsingleview/${personId}`);
  }
   

  const filteredPersonLists = personLists.filter(personList =>
    personList.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    personList.profession.toLowerCase().includes(searchQuery.toLowerCase())
    
  );
  const handlePageChange = (event, page) => {
    setCurrentPage(page);
  };

  return (
    <Box>
      <Stack direction={{ xs: 'column', sm: 'row' }} justifyContent="space-between" alignItems="center">
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
              inputProps={{ 'aria-label': 'search' }}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </Search>
        </Box>
      </Stack>
    <Grid container spacing={2}>
      {filteredPersonLists.map(person => (
        <Grid item key={person.id} xs={12} sm={6} md={6}>
          <CardRoot>
            <Media
              image={person.profileimage}
              title={person.name}
              onClick={() => handleImageClick(person.id)}
            />
            <CardContent>
            <Stack direction="row" justifyContent="space-between" alignItems="center" >
              <Typography variant="h6" component="div">
                {person.name}
              </Typography>
              <Typography variant='h6'style={{ cursor: 'pointer' }}>
               <Link> 253 Reviews</Link>
               
              </Typography>
              </Stack>
              <Typography variant="h6" component="div">
                {person.profession}
              </Typography>
             
            </CardContent>
            <Box sx={{display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: 2  }} >
              <Button variant="contained">View More</Button>
            </Box>
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

export default UserPersonsList;
