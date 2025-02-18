import React, {useState} from 'react';
import {Container, Grid } from '@mui/material'

import Header from './page-structure/Header';
import NavTabs from './navigation/NavTabs';

import Footer from './page-structure/Footer';
import { Outlet } from 'react-router-dom';
import { useNavigate} from "react-router-dom";

function Main(props) {

  const { eventPanelData, oppsPanelData, aboutPanelData } = props


  // drawer settings when display gets too small
  const [mobileOpen, setMobileOpen] = useState(false);
  const handleDrawerToggle = () => {
      setMobileOpen((prevState) => !prevState);
  };
  
  
  return (
  
    <Container maxWidth='xl' disableGutters sx={{display: 'flex', flexDirection:'column', minHeight: '100vh', justifyContent: 'space-between'}}>
      <Grid container direction="column">
        <Grid item>
          <Header title={"Center for Spatial Studies and Data Science"} handleDrawerToggle={handleDrawerToggle} />
          <NavTabs 

            aboutPanelData={aboutPanelData}
            eventPanelData={eventPanelData}
            oppsPanelData={oppsPanelData}
            handleDrawerToggle={handleDrawerToggle}
            mobileOpen={mobileOpen} 
            />
        </Grid>
        <Grid item mb={3}>
          
          <Outlet />
          <Footer />
        </Grid>
      </Grid>
      

    </Container>

      
      

  );
}

// Main.propTypes = {
//   posts: PropTypes.arrayOf(PropTypes.string).isRequired,
//   title: PropTypes.string.isRequired,
// };

export default Main;