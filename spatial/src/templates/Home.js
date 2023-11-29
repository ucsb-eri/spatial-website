import * as React from 'react';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import Header from './Header';
import MainFeaturedPost from './MainFeaturedPost';
import FeaturedPost from './FeaturedPost';
import SpatialDescription from './SpatialDescription'
import Footer from './Footer';
import NavTabs from './NavTabs';


const sections = [
  { title: 'About', url: '#', value: 'one' },
  { title: 'Research', url: '#', value: 'two' },
  { title: 'Groups', url: '#', value: 'three' },
  { title: 'People', url: '#', value: 'four' },
  { title: 'History', url: '#', value: 'five' },
  // { title: 'Politics', url: '#' },
  // { title: 'Opinion', url: '#' },
  // { title: 'Science', url: '#' },
  // { title: 'Health', url: '#' },
  // { title: 'Style', url: '#' },
  // { title: 'Travel', url: '#' },
];

const mainFeaturedPost = {
  title: 'Center for Spatial Studies',
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



export default function Blog() {
  return (
      <Container maxWidth="lg">
        <Container maxWidth="lg">
          <Header title="Center for Spatial Studies & Data Science" />
          <NavTabs sections={sections}/>
          <main>
            <MainFeaturedPost post={mainFeaturedPost} />
           
            <Grid container spacing={4}>
            {featuredPosts.map((post) => (
                <FeaturedPost key={post.title} post={post} />
              ))}
            </Grid>
          </main>
        </Container>
        <Container maxWidth='lg'>
          {/* center description + goals or whatever + events calender */}
          <SpatialDescription></SpatialDescription>
        </Container>
        <Footer
          title="Footer"
          description="Something here to give the footer a purpose!"
        />
      </Container>
        

  
  );
}