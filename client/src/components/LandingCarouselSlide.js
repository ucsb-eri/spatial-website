import * as React from 'react';
import PropTypes from 'prop-types';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';

function LandingCarouselSlide(props) {
  const { post } = props;

  return (
    <div>
      <Grid container>
        <Grid item md={8}>
          <Box
            sx={{
              position: 'relative',
              p: { xs: 3, md: 6 },
              pr: { md: 0 },
            }}
          >
            <Typography component="h1" variant="h1" color="inherit" align='left'>
              {post.title}
            </Typography>
            <Typography variant="h5" color="inherit" paragraph align='left' marginTop='20px'>
              {post.description}
            </Typography>
            {/* <Link variant="subtitle1" href="#">
              {post.linkText}
            </Link> */}
          </Box>
        </Grid>
      </Grid>
    </div>
  );
}

LandingCarouselSlide.propTypes = {
  post: PropTypes.shape({
    description: PropTypes.string.isRequired,
    // image: PropTypes.string.isRequired,
    // imageText: PropTypes.string.isRequired,
    // linkText: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
  }).isRequired,
};

export default LandingCarouselSlide;