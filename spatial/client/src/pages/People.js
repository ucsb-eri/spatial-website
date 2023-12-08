import React, {useState} from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import PersonCard from '../components/PersonCard'
import PersonBio from '../components/PersonBio';
import { Typography, Toolbar } from '@mui/material';
import { makeStyles } from '@mui/material';



function People() {

    const [currentPerson, setCurrentPerson] = useState(null);
  
    const renderPerson = (details) => {
        console.log(details)
        setCurrentPerson(details.name)
    };

    const backToCards = () => {
        setCurrentPerson(null)
        console.log(currentPerson)
        console.log("should be null")
    }
    const peopleList = [
        {
            name: "Trisalyn Nelson",
            email: "trisalyn@ucsb.edu",
            titles: ["Center Director"],
            image: "https://source.unsplash.com/random?wallpapers",
            bio: "whole description about Trisalyn"

        },
        {
            name: "Trisalyn Nelson",
            email: "trisalyn@ucsb.edu",
            titles: ["Center Director"],
            image: "https://source.unsplash.com/random?wallpapers",
            bio: "whole description about Trisalyn"

        },
        {
            name: "Trisalyn Nelson",
            email: "trisalyn@ucsb.edu",
            titles: ["Center Director"],
            image: "https://source.unsplash.com/random?wallpapers",
            bio: "whole description about Trisalyn"

        },
        {
            name: "Trisalyn Nelson",
            email: "trisalyn@ucsb.edu",
            titles: ["Center Director"],
            image: "https://source.unsplash.com/random?wallpapers",
            bio: "whole description about Trisalyn"

        },
    ]


    return (
        <div>
            { currentPerson ? (
                <Container maxWidth='lg'>
                    <PersonBio details={peopleList[0]} backToCards= {backToCards}/>
                </Container>
            ): (
                <Container maxWidth='lg'>
                    <Toolbar sx={{ marginTop: '5px', marginBottom: '5px' }} align='center'>
                        <Typography variant='h5' align='left' marginTop="30px" marginBottom="30px" paddingBottom="5px" borderBottom={1} borderColor="divider">
                        Core Faculty
                        </Typography>
                    </Toolbar>
            
            
                    <Grid container justifyContent='space-between'> 
                    {peopleList.map((person) => (    
                        <PersonCard details = {person} renderPerson={renderPerson} />    
                    ))}
                    </Grid>
                    

                    <Toolbar sx={{ marginTop: '40px', marginBottom: '5px' }} align='center'>
                        <Typography variant='h5' align='left' marginTop="30px" marginBottom="30px" paddingBottom="5px" borderBottom={1} borderColor="divider">
                        Core Staff
                        </Typography>
                    </Toolbar>
                    
                    <Grid container justifyContent='space-between'> 
                    {peopleList.map((person) => (    
                        <PersonCard details = {person} renderPerson={renderPerson} />    
                    ))}
                    </Grid>
                    
                    <Toolbar sx={{ marginTop: '40px', marginBottom: '5px' }} align='center'>
                        <Typography variant='h5' align='left' marginTop="30px" marginBottom="30px" paddingBottom="5px" borderBottom={1} borderColor="divider">
                        Graduate Students
                        </Typography>
                    </Toolbar>

                    <Grid container justifyContent='space-between'> 
                    {peopleList.map((person) => (    
                        <PersonCard details = {person} renderPerson={renderPerson} />    
                    ))}
                    </Grid>


                </Container>

            )}
        </div>
            
    )

}

export default People