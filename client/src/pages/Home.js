import * as React from 'react';
import {Grid, Typography, Toolbar}  from '@mui/material';

import LandingCarousel from '../components/LandingCarousel';
import EventsTable from '../components/EventsTable'

const imageRoute = process.env.NODE_ENV === "production" ? "https://spatialtest.grit.ucsb.edu/images/" : "http://localhost:3001/images/"
const featuredPosts = [
  {
    title: 'Initiative 1',
    labgroup: 'SPAR',
    description:
      'This is a wider card with supporting text below as a natural lead-in to additional content.',
    image: 'https://images.unsplash.com/photo-1537944434965-cf4679d1a598?auto=format&fit=crop&w=400&h=250&q=60',
    imageText: 'Image Text',
    color: 'white'
  },
  {
    title: 'ESRI Curriculum',
    labgroup: 'MOVE',
    description:
      'Advancing the Geographic Approach to Conservation',
    image: `${imageRoute + 'research_geographic_approach.png'}`,
    imageText: 'Image Text',
    color:'black'
  },
  {
    title: 'Goal Y',
    labgroup: 'SPAR',
    description:
      'This is a wider card with supporting text below as a natural lead-in to additional content.',
    image: 'https://images.unsplash.com/photo-1538032746644-0212e812a9e7?auto=format&fit=crop&w=400&h=250&q=60',
    imageText: 'Image Text',
    color: 'white'
  },
  {
    title: 'Initiative 2',
    labgroup: 'MOVE',
    description:
      'This is a wider card with supporting text below as a natural lead-in to additional content.',
    image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=400&h=250',
    imageText: 'Image Text',
    color: 'white'
  },
];


export default function Home() {
  return (
      <Grid item>
          
          {/* center description + goals or whatever + events calender */}
          <Grid container direction='row' spacing={4} justifyContent='center'>
            <Grid item xs={12}>
              <LandingCarousel slides={featuredPosts} />
            </Grid>
            <Grid item xs={11} md={9} sx={{mb: '50px'}}>
                  <Typography align="center" variant="h4" paragraph>
                  At the Center for Spatial Studies and Data Science at University of California Santa Barbara - we collaboratively design, implement and disseminate spatial science for a better world!
                  </Typography>
                  
              </Grid>
            <Grid item xs={12} sm={11}>
              <Grid container direction='row' justifyContent="space-around">
                
                <Grid item xs={12}>
                  <Toolbar sx={{ marginTop: '5px', marginBottom: '5px' }} align='center'>
                      <Typography variant='h4' component="h2" align='left' marginTop="30px" marginBottom="30px" paddingBottom="5px" borderBottom={1} borderColor="divider">
                      News & Events
                      </Typography>
                  </Toolbar>

                </Grid>


                <Grid item xs={11} md={5}>
                
                <EventsTable />
                {/* <iframe src="https://calendar.google.com/calendar/embed?height=600&wkst=1&ctz=America%2FLos_Angeles&bgcolor=%23ffffff&src=ZGFud2lsbGV0dEB1Y3NiLmVkdQ&src=Y19iOWQyOTA4NzdiNGE4NTlkMWY3MGJjYTdlOGZkMTBkZTMxOTVmZjUwYWZhNzExMWMyMmJiMDEwMDMzY2ZlY2M3QGdyb3VwLmNhbGVuZGFyLmdvb2dsZS5jb20&src=ZW4udXNhI2hvbGlkYXlAZ3JvdXAudi5jYWxlbmRhci5nb29nbGUuY29t&color=%23039BE5&color=%234285F4&color=%230B8043" style={{border:"solid 1px #777", width: "800", height: "600", frameborder:"0", scrolling:"no"}}></iframe> */}
                {/* <iframe src="https://calendar.google.com/calendar/embed?src=c_b9d290877b4a859d1f70bca7e8fd10de3195ff50afa7111c22bb010033cfecc7%40group.calendar.google.com&ctz=America%2FLos_Angeles" style={{border: "0", width: '100%', height: '450px', frameborder: "0", scrolling: "no"}}></iframe> */}
                
                </Grid>
              </Grid>
            </Grid>
            

          </Grid>
      </Grid>
        

  
  );
}

