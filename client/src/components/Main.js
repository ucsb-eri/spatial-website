import React, {useState, useContext, useEffect} from 'react';
import {Container, Grid, Toolbar, Box, Tabs, Tab, Popover, MenuItem} from '@mui/material'

import { useQuery, useMutation } from '@apollo/client';
import { GET_ABOUTPANELS } from '../utils/queries';
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
import Education from '../pages/Education';


function Main(props) {
  const [currentPage, setCurrentPage] = useState('Home');
  const [value, setValue] = useState('one');
  const [aboutLocation, setAboutLocation] = useState(0)

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
      return <Education />
    }

    if (currentPage === 'Opportunities') {
      return <Education />
    }

    if (currentPage === 'Request GIS Services') {
      return <Education />
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

  const {loading, data, error} = useQuery(GET_ABOUTPANELS)
  const { setAboutPanelData, aboutPanelData } = useProjectContext()
  useEffect(() => {
    if (!error && !loading && data) {
      const panels = data.aboutPanels;
      const mutablePanels = [...panels]; // Create a shallow copy
      mutablePanels.sort((a, b) => parseInt(a.taborder) - parseInt(b.taborder));
      setAboutPanelData(mutablePanels);
    }
  }, [data, error, loading, setAboutPanelData]);

  
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