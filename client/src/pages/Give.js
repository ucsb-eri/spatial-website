import * as React from 'react';
import {Grid, Container, Paper, Box, Typography}  from '@mui/material';
import LandingCarouselSlide from '../components/LandingCarouselSlide';
import GiveCard from '../components/GiveCard';

const imageRoute = process.env.NODE_ENV === "production" ? "https://spatialtest.grit.ucsb.edu/images/" : "http://localhost:3001/images/"

const giveBanner = {
    description: "",
    image: `${imageRoute + 'give.jpeg'}`,
    imageLabel: '',
    title: 'Give to the Spatial Center!',
    color: 'white'
}

const giveCards = [
    {
        title: 'Spatial General Fund',
        description: "The Center for Spatial Studies and Data Science at UC Santa Barbara is an interdisciplinary research hub dedicated to pushing the boundaries of spatial thinking, geoinformatics, and geographic information science. It champions scientific discovery and educational excellence through workshops, speaker series, and annual Specialist Meetings that assemble leading global experts in spatial data science. Your gift supports the Center's research, students, and outreach efforts.",
        image: `${imageRoute + 'LagoonCampusPoint7.jpg'}`,
        imageDescription: '',
        link: ''
    },
    {
        title: 'Goodchild Fund',
        description: 'The Goodchild Fellowship was established to support outstanding geography doctoral students, including incoming students, pursuing research in Geographic Information Science. Gifts to this Fund support annual fellowship awards.',
        image: `${imageRoute + 'LagoonCampusPoint66.jpg'}`,
        imageDescription: '',
        link: 'https://giving.ucsb.edu/Funds/Give?id=487'
    },

]

export default function Give() {

    

    return(
            <Grid container maxWidth='xl' direction="row" justifyContent='center' >
                <Grid item xs={12}>
                    
                    <Paper
                        sx={{
                            position: 'relative',
                            backgroundColor: 'grey.800',
                            color: '#fff',
                            mb: 4,
                            height: '50vh',
                            maxHeight: '500px',
                            backgroundSize: 'cover',
                            backgroundRepeat: 'no-repeat',
                            backgroundPosition: 'center',
                            backgroundImage: `url(${giveBanner.image})`,
                        }}>
                            <LandingCarouselSlide post={giveBanner} />
                    </Paper>
                    
                    
                </Grid>
                <Grid item xs={11} sm={10} md={9} my={5}>
                    <Typography variant='h3' paragraph>Why Give?</Typography>
                    <Typography paragraph variant='h6' align='center'>
                        Giving to the Center for Spatial Studies and Data Science supports promote groundbreaking research by providing funding support for grad students, computational resources, conference expenses, and catered lunch at Spatial Hour!
                        We hope to see you donate to either the General Spatial Fund or the Goodchild Fund!
                        </Typography>
                    
                </Grid>

                <Grid item xs={11}>
                    <Grid container direction="row" justifyContent="center" columnSpacing={3} rowSpacing={5}>
                        
                        {giveCards.map((card) => (
                            <Grid item xs={11} md={6}>
                            <GiveCard {...card} key={card.title} />
                            </Grid>
                        )
                        )}
                    </Grid>    
                </Grid>
                

            </Grid>
        
    )
}