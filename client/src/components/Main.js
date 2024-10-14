import React, {useState, useContext, useEffect} from 'react';
import {Container, Grid, Toolbar, Box, Tabs, Tab, Popover, MenuItem} from '@mui/material'

import { useQuery, useMutation } from '@apollo/client';
import { GET_INFOPANELS } from '../utils/queries';
import { useProjectContext } from '../context/ProjectContext'

import Header from './Header';
import NavTabs from './NavTabs';
import Home from '../pages/Home';
import About from '../pages/About';
import Footer from './Footer';
import People from '../pages/People';
import Projects from '../pages/Projects';
import Give from '../pages/Give';
import Products from '../pages/Products';
import Events from '../pages/Events';
import Opportunities from '../pages/Opportunities';


function Main(props) {
  const [currentPage, setCurrentPage] = useState('Home');
  const [value, setValue] = useState('one');
  const [aboutLocation, setAboutLocation] = useState(0)
  const [eventLocation, setEventLocation] = useState(0)
  const [oppsLocation, setOppsLocation] = useState(0)

  const handleChange = (event, newValue) => {
    setValue(newValue)
    };
    // depending on what value currentPage has, render a different page
  const renderPage = () => {
    if (currentPage === 'Home') {
      return <Home />;
    }

    if (currentPage === 'About') {
      return (
        <About value={aboutLocation} setValue={setAboutLocation} />
      )
    }

    if (currentPage === 'Research') {
      return <Projects />;
    }

    if (currentPage === 'People') {
      return <People />;
    }

    if (currentPage === 'Give') {
      return <Give />
    }

    if (currentPage === 'Products'){
      return <Products />
    }

    if (currentPage === 'Events') {
      return <Events value={eventLocation} setValue={setEventLocation} />
    }

    if (currentPage === 'Opportunities') {
      return <Opportunities value={oppsLocation} setValue={setOppsLocation} />
    }

    if (currentPage === 'Request GIS Services') {
      return <Events />
    }
  };
  
  const handlePageChange = (page) => {
    setCurrentPage(page)
  }

  // drawer settings when display gets too small
  const [mobileOpen, setMobileOpen] = useState(false);
  const handleDrawerToggle = () => {
      setMobileOpen((prevState) => !prevState);
      console.log("pressed")
      console.log(mobileOpen)
  };
  
  // get database queries

  const {loading, data, error} = useQuery(GET_INFOPANELS)
  const { setInfoPanelData, infoPanelData } = useProjectContext()
  
  let aboutPanelData
  if (infoPanelData) {
      aboutPanelData = infoPanelData.filter(panel => panel.location === "about")
  }

  let eventPanelData
  if (infoPanelData) {
      eventPanelData = infoPanelData.filter(panel => panel.location === "events")
  }

  let oppsPanelData
  if (infoPanelData) {
      oppsPanelData = infoPanelData.filter(panel => panel.location === "opportunities")
  }

  useEffect(() => {
    if (!error && !loading && data) {
      const panels = data.infoPanels;
      const mutablePanels = [...panels]; // Create a shallow copy
      mutablePanels.sort((a, b) => parseInt(a.taborder) - parseInt(b.taborder));
      setInfoPanelData(mutablePanels);
    }
  }, [data, error, loading, setInfoPanelData]);

  
  return (
  
    <Container maxWidth='xl' disableGutters sx={{display: 'flex', flexDirection:'column', minHeight: '100vh', justifyContent: 'space-between'}}>
      <Grid container direction="column">
        <Grid item>
          <Header title={"Center for Spatial Studies and Data Science"} handleDrawerToggle={handleDrawerToggle} />
          <NavTabs 
            handlePageChange={handlePageChange} 
            handleChange={handleChange} 
            value={value} 
            setValue={setValue} 
            setAboutLocation={setAboutLocation} 
            aboutPanelData={aboutPanelData}
            setEventLocation={setEventLocation} 
            eventPanelData={eventPanelData}
            setOppsLocation={setOppsLocation}
            oppsPanelData={oppsPanelData}
            handleDrawerToggle={handleDrawerToggle}
            mobileOpen={mobileOpen} 
            />
        </Grid>
        <Grid item mb={3}>
          {renderPage()}
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