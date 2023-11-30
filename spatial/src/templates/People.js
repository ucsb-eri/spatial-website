import React, {useState} from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import PersonCard from './PersonCard'
import { Typography, Toolbar } from '@mui/material';
import { makeStyles } from '@mui/material';



function People() {
    const peopleList = [
        {
            name: "Trisalyn Nelson",
            email: "trisalyn@ucsb.edu",
            titles: ["Director", "Dangermond"],
            image: "https://source.unsplash.com/random?wallpapers",
            bio: "whole description about Trisalyn"

        },
        {
            name: "Trisalyn Nelson",
            email: "trisalyn@ucsb.edu",
            titles: ["Director", "Dangermond"],
            image: "https://source.unsplash.com/random?wallpapers",
            bio: "whole description about Trisalyn"

        },
        {
            name: "Trisalyn Nelson",
            email: "trisalyn@ucsb.edu",
            titles: ["Director", "Dangermond"],
            image: "https://source.unsplash.com/random?wallpapers",
            bio: "whole description about Trisalyn"

        },
        {
            name: "Trisalyn Nelson",
            email: "trisalyn@ucsb.edu",
            titles: ["Director", "Dangermond"],
            image: "https://source.unsplash.com/random?wallpapers",
            bio: "whole description about Trisalyn"

        },
    ]


    return (
        <Container maxWidth='lg'>
            <Toolbar sx={{ marginTop: '5px', marginBottom: '5px' }} align='center'>
                <Typography variant='h5' align='left' marginTop="30px" marginBottom="30px" paddingBottom="5px" borderBottom={1} borderColor="divider">
                Core Faculty
                </Typography>
            </Toolbar>
            
            
            <Grid container justifyContent='space-between'> 
            {peopleList.map((person) => (    
                <PersonCard details = {person} />    
            ))}
            </Grid>
            

            <Toolbar sx={{ marginTop: '40px', marginBottom: '5px' }} align='center'>
                <Typography variant='h5' align='left' marginTop="30px" marginBottom="30px" paddingBottom="5px" borderBottom={1} borderColor="divider">
                Core Staff
                </Typography>
            </Toolbar>
            
            <Grid container justifyContent='space-between'> 
            {peopleList.map((person) => (    
                <PersonCard details = {person} />    
            ))}
            </Grid>
            
            <Toolbar sx={{ marginTop: '40px', marginBottom: '5px' }} align='center'>
                <Typography variant='h5' align='left' marginTop="30px" marginBottom="30px" paddingBottom="5px" borderBottom={1} borderColor="divider">
                Graduate Students
                </Typography>
            </Toolbar>

            <Grid container justifyContent='space-between'> 
            {peopleList.map((person) => (    
                <PersonCard details = {person} />    
            ))}
            </Grid>


        </Container>

    )

}

export default People