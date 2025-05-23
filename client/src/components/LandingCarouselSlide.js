import * as React from 'react';
import PropTypes from 'prop-types';
import { Typography, Grid, Box, Button } from '@mui/material';

function LandingCarouselSlide(props) {
  const { post } = props;

  return (
      <Grid container direction="row">
        <Grid item xs={12}>
          <Box
            sx={{
              position: 'relative',
              paddingX: {
                xs: "30px",
                sm: "35px",
                md:"50px"
              },
              paddingTop: {
                xs: "100px"
              },
              maxWidth: '600px',
              color: post.color === 'white' ? '#fff' : '#333333' 
            }}
          >
            {/* <Box
              sx={{
                width: 'auto',
                backgroundColor: 'blue',
                padding: '10px'
              }}
            > */}
              <Typography variant="h1" color="inherit" mb={2} align='left'>
                {post.title}
              </Typography>
            {/* </Box> */}
            
            <Typography variant="h4" color="inherit" paragraph align='left' mb={5} marginTop='20px' sx={{ textShadow: '1px 1px 2px rgba(0, 0, 0, 0.7)'}}>
              {post.description}
            </Typography>
            {post.linkText && (
              <Grid container direction='column'>
              {/* <Typography variant='subtitle1' align='left' color="inherit" mb={3}>
                Read more <a href={post.linkText} style={{color: 'white'}}>here</a>
              </Typography> */}
              
              <Button 
                variant='outlined' 
                href={post.linkText}
                target='_blank'
                sx={{
                  width: '130px',
                  my: '10px',
                  borderColor: 'white',
                  textTransform: 'none',
                  color: 'white',        
                  '&:hover': {
                    borderColor: 'white', 
                    backgroundColor: 'rgba(255, 255, 255, 0.1)', 
                    color: 'white',      
                }}}
                >
                Learn more!
              </Button> 
              </Grid>
            )}
            
          </Box>
        </Grid>
      </Grid>
  );
}

LandingCarouselSlide.propTypes = {
  post: PropTypes.shape({
    description: PropTypes.string.isRequired,
    // image: PropTypes.string.isRequired,
    // imageText: PropTypes.string.isRequired,
    linkText: PropTypes.string,
    title: PropTypes.string.isRequired,
  }).isRequired,
};

export default LandingCarouselSlide;