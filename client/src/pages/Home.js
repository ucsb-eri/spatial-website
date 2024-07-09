import * as React from 'react';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import { Typography } from '@mui/material';
import Header from '../components/Header';
import LandingCarousel from '../components/LandingCarousel';
import FeaturedPost from '../components/FeaturedPost';
import EventsTable from '../components/EventsTable';

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

// const mainFeaturedPost = [{
//   title: '@ Spatial Center',
//   description:
//     "Spatial Center one liner description",
//   image: 'https://source.unsplash.com/random?wallpapers',
//   imageText: 'main image description',
//   linkText: 'Continue reading…',
// }];

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
      <Container maxWidth="lg">
          <main>
            <LandingCarousel slides={featuredPosts} />
           
            {/* <Grid container spacing={4}>
            {featuredPosts.map((post) => (
                <FeaturedPost key={post.title} post={post} />
              ))}
            </Grid> */}
          </main>
        
          {/* center description + goals or whatever + events calender */}
          <Grid container direction='row' spacing={4} mt={2} justifyContent='space-between'>
            <Grid item xs={12} md={8}>
                <Typography align="left" paragraph>
                The Center for Spatial Studies and Data Science at UC Santa Barbara is an interdisciplinary research hub dedicated to pushing the boundaries of spatial thinking, geoinformatics, and geographic information science. It champions scientific discovery and educational excellence through workshops, speaker series, and annual Specialist Meetings that assemble leading global experts in spatial data science.
                </Typography>
                
                {/* <Typography align="left" paragraph>
                    The Center for Spatial Studies focuses on promoting spatial thinking and spatial analytics across academia, industry, and government agencies, and across disciplines ranging from the humanities to the physical sciences with a particular focus on novel Spatial Data Science methods and Knowledge Graphs.
                </Typography>
                <Typography align="left" paragraph>
                    The center has expertise in spatiotemporally-explicit machine learning, in the formal representation of spatial phenomena including but not limited to geographic space, knowledge engineering, as well as in methods to improve the publication, retrieval, reuse, and integration of heterogeneous data across domain boundaries.
                </Typography>
                <Typography align="left" paragraph>
                    Following the insight that understanding when and where things happen is key to understanding why they happened or will happen, our vision is to demonstrate how (geographic) space and time act as convergence catalysts to integrate heterogeneous data across domains to answer complex social and scientific questions that cannot be answered from within one domain alone. Our mission is to develop spatially and temporally explicit techniques for the creation, filtering, linkage, synthesis, prediction, and forecasting of information in large-scale, cross-domain data repositories and knowledge graphs.
                </Typography>
                <Typography align="left" paragraph>
                The center is particularly interested in regional and cultural differences in the conceptualization of geographic space with the ultimate goal of assisting machines to better understand the information needs of an increasingly diverse user base.
                </Typography> */}
            </Grid>
            <Grid item xs={12} md={4}>
                <EventsTable />
            </Grid>

          </Grid>
      </Container>
        

  
  );
}