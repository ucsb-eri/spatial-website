import * as React from 'react';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import Header from './Header';
import MainFeaturedPost from './MainFeaturedPost';
import FeaturedPost from './FeaturedPost';
import SpatialDescription from './SpatialDescription'

import NavTabs from './NavTabs';
import { Typography } from '@mui/material';


// const sections = [
//   { title: 'About', url: '#', value: 'one' },
//   { title: 'Research', url: '#', value: 'two' },
//   { title: 'Groups', url: '#', value: 'three' },
//   { title: 'People', url: '#', value: 'four' },
//   { title: 'History', url: '#', value: 'five' },
//   // { title: 'Politics', url: '#' },
//   // { title: 'Opinion', url: '#' },
//   // { title: 'Science', url: '#' },
//   // { title: 'Health', url: '#' },
//   // { title: 'Style', url: '#' },
//   // { title: 'Travel', url: '#' },
// ];

const mainFeaturedPost = {
  title: '@ Spatial Center',
  description:
    "Spatial Center one liner description",
  image: 'https://source.unsplash.com/random?wallpapers',
  imageText: 'main image description',
  linkText: 'Continue reading…',
};

const featuredPosts = [
  {
    title: 'Project 1',
    labgroup: 'SPAR',
    description:
      'This is a wider card with supporting text below as a natural lead-in to additional content.',
    image: 'https://source.unsplash.com/random?wallpapers',
    imageLabel: 'Image Text',
  },
  {
    title: 'Project 2',
    labgroup: 'MOVE',
    description:
      'This is a wider card with supporting text below as a natural lead-in to additional content.',
    image: 'https://source.unsplash.com/random?wallpapers',
    imageLabel: 'Image Text',
  },
];



export default function About() {
  return (
      <Container maxWidth="lg">
          <main>
            <MainFeaturedPost post={mainFeaturedPost} />
           
            <Grid container spacing={4}>
            {featuredPosts.map((post) => (
                <FeaturedPost key={post.title} post={post} />
              ))}
            </Grid>
          </main>
        
          {/* center description + goals or whatever + events calender */}
          <SpatialDescription></SpatialDescription>
      </Container>
        

  
  );
}