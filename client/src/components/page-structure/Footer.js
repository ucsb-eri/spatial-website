import * as React from 'react';
import { Box, Container, Grid, Typography, Link, Divider } from '@mui/material' 
import spatialLogoNavy from '../../content/logos/spatialnavy.png'
import instagramIcon from '../../content/logos/instaicon.png'
import emailIcon from '../../content/logos/emailicon.png'
import youtubeIcon from '../../content/logos/youtubeicon.png'

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://spatial.ucsb.edu">
        UC Santa Barbara Center for Spatial Studies and Data Science
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

function Footer(props) {
  const { description, title } = props;

  return (
    <Box component="footer" sx={{ bgcolor: 'background.paper', pb: 6, pt: 3}}>
      <Divider />
      <Container maxWidth="lg">
        <Grid container direction="row" justifyContent="center" columnGap={2} rowGap={1} alignItems="center" pt={3}>
          <Grid item >
            <Box 
            flex= {1}
            flexShrink={1}
            component="img"
            className='logos'
            sx={{maxWidth: '170px'}}
            src={spatialLogoNavy} />
          </Grid>
          <Grid item>
            <Link href="https://www.instagram.com/spatialucsb/" target="_blank" p={1}>
              <Box 
                flex= {1}
                flexShrink={1}
                component="img"
                className='logos'
                sx={{maxWidth: '40px'}}
                src={instagramIcon} />
            </Link>
                    
            <Link href="https://www.youtube.com/channel/UC5HiWCgZU-YjG647V_KTM7A" target="_blank">
              <Box 
                flex= {1}
                flexShrink={1}
                component="img"
                className='logos'
                sx={{maxWidth: '40px'}}
                src={youtubeIcon} />
            </Link>
                    
            <Link href="mailto:spatial-admin@ucsb.edu" target="_blank" p={1}>
              <Box 
                flex= {1}
                flexShrink={1}
                component="img"
                className='logos'
                sx={{maxWidth: '56px'}}
                src={emailIcon} />
            </Link>
          </Grid>
                   
        </Grid>
        <Grid container direction="row" justifyContent="center" py={2}>
          <Typography variant='body2'>
            Center for Spatial Studies and Data Science | Phelps 3512 | UC Santa Barbara, CA 93106-4060
          </Typography>
        </Grid>
        <Copyright />
      </Container>
    </Box>
  );
}


export default Footer;