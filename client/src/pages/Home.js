import * as React from 'react';
import {Grid, Container, Typography}  from '@mui/material';
import Header from '../components/Header';
import LandingCarousel from '../components/LandingCarousel';
import FeaturedPost from '../components/FeaturedPost';
import EventsTable from '../components/EventsTable';


const featuredPosts = [
  {
    title: 'Initiative 1',
    labgroup: 'SPAR',
    description:
      'This is a wider card with supporting text below as a natural lead-in to additional content.',
    image: 'https://images.unsplash.com/photo-1537944434965-cf4679d1a598?auto=format&fit=crop&w=400&h=250&q=60',
    imageText: 'Image Text',
  },
  {
    title: 'Project X',
    labgroup: 'MOVE',
    description:
      'This is a wider card with supporting text below as a natural lead-in to additional content.',
    image: 'https://source.unsplash.com/random?wallpapers',
    imageText: 'Image Text',
  },
  {
    title: 'Goal Y',
    labgroup: 'SPAR',
    description:
      'This is a wider card with supporting text below as a natural lead-in to additional content.',
    image: 'https://images.unsplash.com/photo-1538032746644-0212e812a9e7?auto=format&fit=crop&w=400&h=250&q=60',
    imageText: 'Image Text',
  },
  {
    title: 'Initiative 2',
    labgroup: 'MOVE',
    description:
      'This is a wider card with supporting text below as a natural lead-in to additional content.',
    image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=400&h=250',
    imageText: 'Image Text',
  },
];



export default function Home() {
  return (
      <Grid item>
          <main>
            <LandingCarousel slides={featuredPosts} />
           
            {/* <Grid container spacing={4}>
            {featuredPosts.map((post) => (
                <FeaturedPost key={post.title} post={post} />
              ))}
            </Grid> */}
          </main>
        
          {/* center description + goals or whatever + events calender */}
          <Grid container direction='row' spacing={4} mt={2} justifyContent='center'>
            <Grid item xs={11} md={8}>
                <Typography align="left" variant="h5" paragraph>
                The Center for Spatial Studies and Data Science at UC Santa Barbara is an interdisciplinary research hub dedicated to pushing the boundaries of spatial thinking, geoinformatics, and geographic information science. It champions scientific discovery and educational excellence through workshops, speaker series, and annual Specialist Meetings that assemble leading global experts in spatial data science.
                </Typography>
                
            </Grid>
            <Grid item xs={12} md={4}>
            <iframe src="https://calendar.google.com/calendar/embed?height=600&wkst=1&ctz=America%2FLos_Angeles&bgcolor=%23ffffff&src=ZGFud2lsbGV0dEB1Y3NiLmVkdQ&src=Y19iOWQyOTA4NzdiNGE4NTlkMWY3MGJjYTdlOGZkMTBkZTMxOTVmZjUwYWZhNzExMWMyMmJiMDEwMDMzY2ZlY2M3QGdyb3VwLmNhbGVuZGFyLmdvb2dsZS5jb20&src=ZW4udXNhI2hvbGlkYXlAZ3JvdXAudi5jYWxlbmRhci5nb29nbGUuY29t&color=%23039BE5&color=%234285F4&color=%230B8043" style={{border:"solid 1px #777", width: "800", height: "600", frameborder:"0", scrolling:"no"}}></iframe>
            </Grid>

          </Grid>
      </Grid>
        

  
  );
}