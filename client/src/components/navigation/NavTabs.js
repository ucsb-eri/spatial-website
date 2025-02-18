import {React, useState} from 'react'
import { useLocation, useNavigate } from "react-router-dom";
import { Toolbar, Tab, Tabs, MenuItem, Popover, Box, Typography, Drawer, Divider, List, ListItem, ListItemButton, ListItemText } from '@mui/material'
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

export default function NavTabs(props) {

  const [ value, setValue ] = useState('one')

    const {setAboutLocation, aboutPanelData, setEventLocation, eventPanelData, setOppsLocation, oppsPanelData, handleDrawerToggle, mobileOpen } = props
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

    const location = useLocation()
    const navigate = useNavigate()

    const handlePageChange = (newRoute) => {
      navigate(`/${newRoute}`)
    }
    const handleChange = (event, newRoute) => {
      
      handlePageChange(newRoute)
    }

    const pathSegments = location.pathname.split("/").filter(Boolean); // Remove empty segments
    let currentRoute = pathSegments[0]; // Get the last part
    if ( !currentRoute){
      currentRoute = 'home'
    } 
  
    const handlePopoverMenu = (panel, type) => {
      handlePopoverClose()
      const routeStr = `${type}/${panel.tabname.replace(/[^a-zA-Z0-9\s]/g, '').toLowerCase().replaceAll(' ', '-')}`
      console.log(routeStr)
      handlePageChange(routeStr)
      }
    const drawerWidth = 240;
    
    const navItems = [
      "Home", 
      "About", 
      "People", 
      "Research", 
      "Events", 
      "Opportunities", 
      "Give"
    ]
    const drawer = (
        <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
          <Typography variant="h6" sx={{ my: 2 }}>
            Spatial Center
          </Typography>
          <Divider />
          <List>
            {navItems.map((item) => (
              <ListItem key={item}>
                <ListItemButton sx={{ textAlign: 'center' }} onClick = {() => handlePageChange(item.toLowerCase())} >
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
                value={currentRoute}
                onChange={handleChange}
                textColor="secondary"
                indicatorColor="secondary"
                aria-label="secondary tabs example"
                variant="fullWidth">
            
                  <Tab
                    value={"home"}
                    label={'Home'}
                    key={'Home'}
                    sx={{ fontSize: fontSize }}
                  />
              
                  <Tab
                    disableRipple={ripple}
                    value={"about"}
                    label={'About'}
                    key={'About'}
                    icon= {<ArrowDropDownIcon onClick={handlePopoverOpen} />}
                    iconPosition='end'
                    sx={{ fontSize: fontSize }}
                  >
                  </Tab>
     
                  <Tab
                    value={"people"}
                    label={'People'}
                    key={'People'}
                    sx={{ fontSize: fontSize }}
                  />
                  <Tab
                      value={"research"}
                      label={'Research'}
                      key={'Projects'}
                      sx={{ fontSize: fontSize }}
                    />

                  <Tab
                    disableRipple={ripple}
                    value={"events"}
                    label={'Events'}
                    key={'Events'}
                    icon= {<ArrowDropDownIcon onClick={handlePopoverOpen} />}
                    iconPosition='end'
                    sx={{ fontSize: fontSize }}
                    />

                  <Tab
                    disableRipple={ripple}
                    icon= {<ArrowDropDownIcon onClick={handlePopoverOpen} />}
                    iconPosition='end'
                    value={"opportunities"}
                    label={'Opportunities'}
                    key={'Opportunities'}
                    sx={{ fontSize: fontSize }}
                  />
                  
                  <Tab
                    value={"give"}
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
                    onClick = {() => handlePopoverMenu(panel, "about")}>
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
                    onClick={() => handlePopoverMenu(panel, "events")}>
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
                    onClick={() => handlePopoverMenu(panel, "opportunities")}>
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