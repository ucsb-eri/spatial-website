import {React, useContext} from 'react';
import { AdminLoginContext } from '../context/AdminProvider';

import { Toolbar, Button, Box, Grid, Typography, IconButton} from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'

import ucsbLogo from '../ucsb.png'
// import spatialLogo from '../spatiallogo.png';


function Header(props) {
  const { isLoggedIn, logout } = useContext(AdminLoginContext)

  const { title, handleDrawerToggle } = props;
  const containerStyle = {
    marginTop: '10px', 
    marginBottom: '10px',// Adjust the spacing as needed
  };

  

  
  return (

      <Toolbar sx={{ borderBottom: 1, borderColor: 'divider', marginTop: '5px' }} align='center'>
        <Grid container justifyContent='space-between' direction="row" alignItems="center" columnGap={1} style={containerStyle} >
          <Grid container direction="row" alignItems="center" justifyContent="space-between">
            
            <Box
              component="img"
              sx={{
                maxHeight: { xs: 233, md: 167 },
                maxWidth: { xs: 150, md: 150 },
              }}
              alt="The house from the offer."
              src={ucsbLogo}
            />

            { isLoggedIn && (
              <Button variant="outlined" size="small" onClick={() => logout()}>Log Out!</Button>
            )}
            
       
          </Grid>
          <Grid item xs={10}>
              <Typography
                component="h3"
                variant="h3"
                color="inherit"
                align="left"
                sx={{ flex: 1, marginTop: 1}} >
                {title}
              </Typography>
          </Grid>
          <Grid item xs={1}>
                <IconButton
                    aria-label="open drawer"
                    edge="start"
                    onClick={handleDrawerToggle}
                    color="primary"
                    sx={{ display: { md: 'none' }}}
                >
                    <MenuIcon />
                </IconButton>
          </Grid>
        </Grid>
   
      </Toolbar>

  );
}


export default Header;