import React, {useState} from 'react';
import {Container, Grid, Toolbar, Box, Tabs, Tab, Popover, MenuItem} from '@mui/material'

import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import Header from './Header';
import Home from '../pages/Home';
import About from '../pages/About';
import Footer from './Footer';
import People from '../pages/People';
import Projects from '../pages/Projects';
import Give from '../pages/Give';


function Main(props) {
  const [currentPage, setCurrentPage] = useState('Home');
  const [value, setValue] = useState('one');
  const [aboutLocation, setAboutLocation] = useState(0)
  const [ripple, setRipple] = useState(true)
  const [anchorEl, setAnchorEl] = useState(null)
  const [openAboutMenu, setOpenAboutMenu] = useState(false)

  const handleChange = (event, newValue) => {
    setValue(newValue)
    };
    // depending on what value currentPage has, render a different page
  const renderPage = () => {
    if (currentPage === 'Home') {
      return <Home />;
    }

    if (currentPage === 'About') {
      console.log("changed about location")
      console.log(aboutLocation)
      return <About value={aboutLocation} setValue={setAboutLocation} />;
    }

    if (currentPage === 'Projects') {
      return <Projects />;
    }

    if (currentPage === 'People') {
      return <People />;
    }

    if (currentPage === 'Give') {
      return <Give />
    }
  };
  
  const handlePageChange = (page) => {
    setCurrentPage(page)
  }
  
  const handlePopoverOpen = (event) => {
    setRipple(true)
    event.stopPropagation()
    setAnchorEl(event.currentTarget)
    setOpenAboutMenu(true)
  }
  const handlePopoverClose = () => {
    setOpenAboutMenu(false)
    setRipple(false)
  }

  const handleAboutMenu = (location) => {
    setAboutLocation(location)
    handlePopoverClose()
    setValue("two")
    handlePageChange("About")
    
  }

  
  return (
  
    <Container maxWidth='xl' disableGutters sx={{display: 'flex', flexDirection:'column', minHeight: '100vh', justifyContent: 'space-between'}}>
      <Grid container direction="column" justifyContent="space-between">
        <Grid item>
          <Header title={"Center for Spatial Studies and Data Science"} />
          <Toolbar
            component="nav"
            variant="dense">

            <Box sx={{ width: '100%' }}>
              <Tabs
                value={value}
                onChange={handleChange}
                textColor="secondary"
                indicatorColor="secondary"
                aria-label="secondary tabs example"
                variant="fullWidth">

                <Tab
                  onClick={() => handlePageChange('Home')}
                  value={'one'}
                  label={'Home'}
                  key={'Home'}
                />
                <Tab
                  onClick={() => {
                    setAboutLocation(0)
                    handlePageChange('About')
                  }}
                  disableRipple={ripple}
                  value={'two'}
                  label={'About'}
                  key={'About'}
                  icon= {<ArrowDropDownIcon onClick={handlePopoverOpen} />}
                  iconPosition='end'
                >
                </Tab>
                <Tab
                  onClick={() => handlePageChange('People')}
                  value={'three'}
                  label={'People'}
                  key={'People'}
                />
                <Tab
                  onClick={() => handlePageChange('Projects')}
                  value={'four'}
                  label={'Projects'}
                  key={'Projects'}
                />
                <Tab
                  onClick={() => handlePageChange('Recharge Center')}
                  value={'five'}
                  label={'Recharge Center'}
                  key={'Recharge Center'}
                />
                <Tab
                  onClick={() => handlePageChange('Give')}
                  value={'six'}
                  label={'Give'}
                  key={'Give'}
                />

              </Tabs>
              <Popover
                open={openAboutMenu}
                anchorEl={anchorEl}
                onClose={handlePopoverClose}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "center"
                }}
                transformOrigin={{
                  vertical: "top",
                  horizontal: "center"
                }}
              >
                <MenuItem onClick={() => handleAboutMenu(0)}>
                  Overview
                </MenuItem>
                <MenuItem onClick={() => handleAboutMenu(1)}>
                  History
                </MenuItem>
                <MenuItem onClick={() => handleAboutMenu(2)}>
                  eScholarship
                </MenuItem>
              </Popover>
                    
                    
            </Box>
            </Toolbar>
        </Grid>
        
        {renderPage()}
        <Grid item>
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