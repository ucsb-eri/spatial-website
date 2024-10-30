import {React, useState} from 'react'
import { Toolbar, Tab, Tabs, MenuItem, Popover, Box, Typography, Drawer, Divider, List, ListItem, ListItemButton, ListItemText } from '@mui/material'
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";


export default function NavTabs(props) {

    const { value, setValue, handleChange, handlePageChange, setAboutLocation, aboutPanelData, setEventLocation, eventPanelData, setOppsLocation, oppsPanelData, handleDrawerToggle, mobileOpen } = props
    const [ripple, setRipple] = useState(true)
    const [anchorEl, setAnchorEl] = useState(null)
    const [openAboutMenu, setOpenAboutMenu] = useState(false)
    const [openEventsMenu, setOpenEventsMenu] = useState(false)
    const [openOppsMenu, setOpenOppsMenu] = useState(false)
    const handlePopoverOpen = (event) => {
        setRipple(true)
        event.stopPropagation()
        setAnchorEl(event.currentTarget)
        const button = event.currentTarget.parentNode.innerText.toLowerCase()
        console.log(button)
        if (button === "about") {
          setOpenAboutMenu(true)
        } else if (button === "events") {
          setOpenEventsMenu(true)
        } else if (button === "opportunities") {
          setOpenOppsMenu(true)
        }
        
      }
    const handlePopoverClose = () => {
      setOpenAboutMenu(false)
      setOpenEventsMenu(false)
      setOpenOppsMenu(false)
      setRipple(false)
    }
    
    const handleAboutMenu = (location) => {
      setAboutLocation(location)
      handlePopoverClose()
      setValue("two")
      handlePageChange("About")
    }

    const handleEventsMenu = (location) => {
      setEventLocation(location)
      handlePopoverClose()
      setValue("five")
      handlePageChange("Events")
    }

    const handleOppsMenu = (location) => {
      setOppsLocation(location)
      handlePopoverClose()
      setValue("six")
      handlePageChange("Opportunities")
    }

    const drawerWidth = 240;
    const navItems = ['Home', 'About', 'People', 'Research', 'Events', 'Opportunities', 'Give'] //, 'Request GIS Services']
    const drawer = (
        <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
          <Typography variant="h6" sx={{ my: 2 }}>
            Spatial Center
          </Typography>
          <Divider />
          <List>
            {navItems.map((item) => (
              <ListItem key={item}>
                <ListItemButton sx={{ textAlign: 'center' }} onClick = {() => handlePageChange(item)} >
                  <ListItemText primary={item} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
      );

    const fontSize = '0.8rem'  

    return (
        <div>
            <Toolbar
            component="nav"
            variant="dense"
            sx = {{display: { xs: 'none', md: 'block'}}}
            disableGutters
            >

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
                  sx={{ fontSize: fontSize }}
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
                  sx={{ fontSize: fontSize }}
                >
                </Tab>
                <Tab
                  onClick={() => handlePageChange('People')}
                  value={'three'}
                  label={'People'}
                  key={'People'}
                  sx={{ fontSize: fontSize }}
                />
                <Tab
                  onClick={() => handlePageChange('Research')}
                  value={'four'}
                  label={'Research'}
                  key={'Projects'}
                  sx={{ fontSize: fontSize }}
                />
                <Tab
                  onClick={() => {
                    setEventLocation(0)
                    handlePageChange('Events')
                  }}
                  disableRipple={ripple}
                  value={'five'}
                  label={'Events'}
                  key={'Events'}
                  icon= {<ArrowDropDownIcon onClick={handlePopoverOpen} />}
                  iconPosition='end'
                  sx={{ fontSize: fontSize }}
                />
                <Tab
                  onClick={() => {
                    setOppsLocation(0)
                    handlePageChange('Opportunities')
                  }}
                  disableRipple={ripple}
                  icon= {<ArrowDropDownIcon onClick={handlePopoverOpen} />}
                  iconPosition='end'
                  value={'six'}
                  label={'Opportunities'}
                  key={'Opportunities'}
                  sx={{ fontSize: fontSize }}
                />
                <Tab
                  onClick={() => handlePageChange('Give')}
                  value={'seven'}
                  label={'Give'}
                  key={'Give'}
                  sx={{ fontSize: fontSize }}
                />
                
                {/* <Button
                  variant='contained'
                  sx= {{
                    minWidth: '100px',
                    maxWidth: '120px',
                    whiteSpace: 'normal', // Allow text to wrap
                    textTransform: 'none',
                    marginY: '15px',
                    fontSize: fontSize
                   
                  }}
                  // onClick={() => handlePageChange('GIS Services')}
                  >
                    GIS Services
                  </Button>                               */}

              </Tabs>
              {/* About popover menu */}
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
                {aboutPanelData && aboutPanelData.map((panel, id) => (
                  <MenuItem key={panel.tabname} onClick={() => handleAboutMenu(id)}>
                  {panel.tabname}
                </MenuItem>
                ))}
                
              </Popover> 
              {/* Events popover menu */}
              <Popover
                open={openEventsMenu}
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
                {eventPanelData && eventPanelData.map((panel, id) => (
                  <MenuItem key={panel.tabname} onClick={() => handleEventsMenu(id)}>
                  {panel.tabname}
                </MenuItem>
                ))}
                
              </Popover>
              {/* Opportunities popover menu */}
              <Popover
                open={openOppsMenu}
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
                {oppsPanelData && oppsPanelData.map((panel, id) => (
                  <MenuItem key={panel.tabname} onClick={() => handleOppsMenu(id)}>
                  {panel.tabname}
                </MenuItem>
                ))}
                
              </Popover>

            </Box>
            </Toolbar>
            <Drawer  
                variant="temporary"
                open={mobileOpen}
                onClose={handleDrawerToggle}
                ModalProps={{
                keepMounted: true, // Better open performance on mobile.
                }}
                sx={{
                display: { xs: 'block', md: 'none' },
                '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                }}
            >
                {drawer}
            </Drawer>
        </div>
        
    )

}