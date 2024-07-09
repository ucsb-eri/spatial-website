import React, {useState} from 'react';
import {Container, Toolbar, Box, Tabs, Tab, Popover, MenuItem} from '@mui/material'

import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import Header from './Header';
import Home from '../pages/Home';
import About from '../pages/About';
import Footer from './Footer';
import People from '../pages/People';
import Research from '../pages/Research';


function Main(props) {
  const [currentPage, setCurrentPage] = useState('Home');
  const [value, setValue] = useState('one');
  const handleChange = (event, newValue) => {
    console.log(newValue)
    setValue(newValue)
    };
    // depending on what value currentPage has, render a different page
  const renderPage = () => {
    if (currentPage === 'Home') {
      return <Home />;
    }

    if (currentPage === 'About') {
      console.log("changed")
      console.log(aboutLocation)
      return <About value={aboutLocation} setValue={setAboutLocation} />;
    }

    if (currentPage === 'Research') {
      return <Research />;
    }

    if (currentPage === 'People') {
      return <People />;
    }

    // if (currentPage === 'History') {
    //   return <About />;
    // }

  };

  
  
  const handlePageChange = (page) => {
    setCurrentPage(page)
    if (page == "About") {
      setAboutLocation(0)
    }
  }
  
  const [aboutLocation, setAboutLocation] = useState(0)
  const [anchorEl, setAnchorEl] = useState(null)
  const [openAboutMenu, setOpenAboutMenu] = useState(false)
  const [ripple, setRipple] = useState(true)

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
  
    <Container sx={{display: 'flex', flexDirection:'column', minHeight: '100vh', justifyContent: 'space-between'}}>
      <Container maxWidth={100}>
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
                onClick={() => handlePageChange('About')}
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
                onClick={() => handlePageChange('Research')}
                value={'four'}
                label={'Research'}
                key={'Research'}
              />
              <Tab
                onClick={() => handlePageChange('Recharge Center')}
                value={'five'}
                label={'Recharge Center'}
                key={'Recharge Center'}
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
        {/* <NavPages sections = {sections} handlePageChange={handlePageChange} /> */}
      </Container>
      
      {renderPage()}
      <Footer
          title="Footer"
          description="Something here to give the footer a purpose!"
        />

    </Container>

      
      

  );
}

// Main.propTypes = {
//   posts: PropTypes.arrayOf(PropTypes.string).isRequired,
//   title: PropTypes.string.isRequired,
// };

export default Main;