import {React, useState} from 'react'
import { Toolbar, Tab, Tabs, MenuItem, Popover, Button, Box, Grid, Typography, Drawer, Divider, List, ListItem, ListItemButton, ListItemText } from '@mui/material'
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";


export default function NavTabs(props) {

    const { value, setValue, handleChange, handlePageChange, setAboutLocation, aboutPanelData, handleDrawerToggle, mobileOpen } = props
    const [ripple, setRipple] = useState(true)
    const [anchorEl, setAnchorEl] = useState(null)
    const [openAboutMenu, setOpenAboutMenu] = useState(false)
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

    const drawerWidth = 240;
    const navItems = ['Home', 'About', 'People', 'Projects', 'Products', 'Education', 'Recharge Center', 'Give']
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



    return (
        <div>
            <Toolbar
            component="nav"
            variant="dense"
            sx = {{display: { xs: 'none', md: 'block'}}}
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
                  onClick={() => handlePageChange('Products')}
                  value={'five'}
                  label={'Products'}
                  key={'Products'}
                />
                <Tab
                  onClick={() => handlePageChange('Education')}
                  value={'six'}
                  label={'Education'}
                  key={'Education'}
                />
                <Tab
                  onClick={() => handlePageChange('Recharge Center')}
                  value={'seven'}
                  label={'Recharge Center'}
                  key={'Recharge Center'}
                />
                
                <Tab
                  onClick={() => handlePageChange('Give')}
                  value={'eight'}
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
                {aboutPanelData && aboutPanelData.map((panel, id) => (
                  <MenuItem onClick={() => handleAboutMenu(id)}>
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