import * as React from 'react';
import {Grid, Container, Paper, Box, Typography}  from '@mui/material';
import LandingCarouselSlide from '../components/LandingCarouselSlide';
import GiveCard from '../components/GiveCard';

const giveBanner = {
    description: "Please",
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSwvaheFL9X72HGjx7tMEb5GJBLZ49MYba5TA&s',
    imageLabel: '',
    title: 'Give to the Spatial Center!',
}

const giveCards = [
    {
        title: 'Spatial General Fund',
        description: 'fund goes to a bunch of really great things. You should totally donate!',
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQt1OOHhuPndEfrgOGJzZHoFqrhQW185csfUw&s',
        imageDescription: '',
        link: 'https://google.com'
    },
    {
        title: 'Goodchild Fund',
        description: 'fund goes to a bunch of really great things. You should totally donate!',
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTyPu2jKzxeWh7Yv0l0G6esEce_ochybEvEag&s',
        imageDescription: '',
        link: 'https://google.com'
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
                            maxHeight: '50vh',
                            height: '400px',
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
                    <Typography paragraph variant='h6' align='left'>
                        Giving to the Center for Spatial Studies and Data Science supports promote groundbreaking research by providing funding support for grad students, computational resources, conference expenses, and catered lunch at Spatial Hour!
                        We hope to see you donate to either the General Spatial Fund or the Goodchild Fund!
                        </Typography>
                    
                </Grid>

                <Grid item xs={11}>
                    <Grid container direction="row" justifyContent="space-between" columnSpacing={3} rowSpacing={5}>
                        
                        {giveCards.map((card) => (
                            <Grid item xs={11} sm={6}>
                            <GiveCard {...card} key={card.title} />
                            </Grid>
                        )
                        )}
                    </Grid>    
                </Grid>
                

            </Grid>
        
    )
}