import * as React from 'react';
import PropTypes from 'prop-types';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography';
import ucsbLogo from '../ucsb.png'

function Header(props) {
  const { title } = props;
  const containerStyle = {
    marginTop: '10px', 
    marginBottom: '10px',// Adjust the spacing as needed
  };
  
  return (
    <React.Fragment>
      <Toolbar sx={{ borderBottom: 1, borderColor: 'divider', marginTop: '5px', marginBottom: '5px' }} align='center'>
        <Grid container spacing={0} direction="column" style={containerStyle}>
          <Grid container item xs={12} md={12} direction="row" alignItems="center" justifyContent="space-between">
            
            <Box
              component="img"
              sx={{
                maxHeight: { xs: 233, md: 167 },
                maxWidth: { xs: 150, md: 150 },
              }}
              alt="The house from the offer."
              src={ucsbLogo}
            />

            <Button variant="outlined" size="small">Donate</Button>
       
          </Grid>
          <Grid item xs={12} md={6}>
              <Typography
                component="h1"
                variant="h4"
                color="inherit"
                align="left"
                sx={{ flex: 1, marginTop: 1 }}
                className="produkt-thin"
              >
                {title}
              </Typography>
          </Grid>
        </Grid>
   
      </Toolbar>

    </React.Fragment>
  );
}

Header.propTypes = {
  sections: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired,
    }),
  ).isRequired,
  title: PropTypes.string.isRequired,
};

export default Header;