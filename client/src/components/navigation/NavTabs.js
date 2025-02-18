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
    const handlePopoverMenu = (panel, location, type, value, setLocation) => {
      setLocation(location)
      handlePopoverClose()
      setValue(value)
      const routeStr = `/${type}/${panel.tabname.replace(/[^a-zA-Z0-9\s]/g, '').toLowerCase().replaceAll(' ', '-')}`
      handlePageChange(routeStr)
      }
    const drawerWidth = 240;
    
    const homeRoute = '/home'
    const aboutRoute = `/about`
    const peopleRoute = '/people'
    const researchRoute = '/research'
    const eventsRoute = `/events`
    const opportunitiesRoute = `/opportunities`
    const giveRoute = '/give'

    const navItems = {
      "Home": homeRoute, 
      "About": aboutRoute, 
      "People": peopleRoute, 
      "Research": researchRoute, 
      "Events": eventsRoute,
      "Opportunities": opportunitiesRoute,
      "Give": giveRoute
    }
    const navTitles = Object.keys(navItems)
    const drawer = (
        <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
          <Typography variant="h6" sx={{ my: 2 }}>
            Spatial Center
          </Typography>
          <Divider />
          <List>
            {navTitles.map((item) => (
              <ListItem key={item}>
                <ListItemButton sx={{ textAlign: 'center' }} onClick = {() => handlePageChange(navItems[item])} >
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
                    onClick={() => handlePageChange(homeRoute)}
                    value={'one'}
                    label={'Home'}
                    key={'Home'}
                    sx={{ fontSize: fontSize }}
                  />
              
                  <Tab
                    onClick={() => {
                      handlePageChange(aboutRoute)
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
                    onClick={() => handlePageChange(peopleRoute)}
                    value={'three'}
                    label={'People'}
                    key={'People'}
                    sx={{ fontSize: fontSize }}
                  />
                  <Tab
                      onClick={() => handlePageChange(researchRoute)}
                      value={'four'}
                      label={'Research'}
                      key={'Projects'}
                      sx={{ fontSize: fontSize }}
                    />

                  <Tab
                    onClick={() => {
                      handlePageChange(eventsRoute)
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
                      handlePageChange(opportunitiesRoute)
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
                    onClick={() => handlePageChange(giveRoute)}
                    value={'seven'}
                    label={'Give'}
                    key={'Give'}
                    sx={{ fontSize: fontSize }}
                  />
                

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
                  <MenuItem 
                    key={panel.tabname} 
                    onClick = {() => handlePopoverMenu(panel, id, "about", "two", setAboutLocation)}>
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
                  <MenuItem 
                    key={panel.tabname} 
                    onClick={() => handlePopoverMenu(panel, id, "events", "five", setEventLocation)}>
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
                  <MenuItem 
                    key={panel.tabname} 
                    onClick={() => handlePopoverMenu(panel, id, "opportunities", "six", setOppsLocation)}>
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