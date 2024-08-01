import React, {useState} from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import PersonCard from '../components/PersonCard'
import PersonBio from '../components/PersonBio';
import { Typography, Toolbar } from '@mui/material';
import { useQuery } from '@apollo/client';
import { QUERY_PEOPLE } from '../utils/queries';


function People() {
    const { loading, data } = useQuery(QUERY_PEOPLE);
    const peopleList = data?.people || [];
    const [currentPerson, setCurrentPerson] = useState(null);
    console.log("Current person: ", currentPerson)
  
    const renderPerson = (details) => {
        console.log(details.firstName, details._id)
        setCurrentPerson(details._id)
    };

    const backToCards = () => {
        setCurrentPerson(null)
        console.log("Current person: ", currentPerson)

    }

    const currentPersonDetails = peopleList.find(person => person._id === currentPerson);
    const facultyMembers = peopleList.filter(person => person.category === "Faculty");
    const staffMembers = peopleList.filter(person => person.category === "Staff");
    const gradMembers = peopleList.filter(person => person.category === "Graduate Student");

    return (
        <div>
            {/* show loading if mongodb is being slow */}
            {loading ? (
            <div>Loading...</div>
            ) : (
                
             currentPerson ? (
                <Container maxWidth={false}>
                    <PersonBio details={currentPersonDetails} backToCards= {backToCards}/>
                </Container>
            ): (
                <Container maxWidth={false}>

                    {/* FACULTY */}
                    <Toolbar sx={{ marginTop: '5px', marginBottom: '5px' }} align='center'>
                        <Typography variant='h5' align='left' marginTop="30px" marginBottom="30px" paddingBottom="5px" borderBottom={1} borderColor="divider">
                        Leadership
                        </Typography>
                    </Toolbar>
            
                    <Grid container direction="row" justifyContent='center' columnSpacing={4} rowSpacing={4}> 
                    {facultyMembers.map((person) => (    
                        <PersonCard details = {person} renderPerson={renderPerson} />    
                    ))}
                    </Grid>
                    
                    {/* STAFF */}
                    <Toolbar sx={{ marginTop: '40px', marginBottom: '5px' }} align='center'>
                        <Typography variant='h5' align='left' marginTop="30px" marginBottom="30px" paddingBottom="5px" borderBottom={1} borderColor="divider">
                        Staff
                        </Typography>
                    </Toolbar>
                    
                    <Grid container direction="row" justifyContent='center' columnSpacing={4} rowSpacing={4}> 
                    {staffMembers.map((person) => (    
                        <PersonCard details = {person} renderPerson={renderPerson} />    
                    ))}
                    </Grid>
                    
                    {/* GRAD STUDENTS */}
                    <Toolbar sx={{ marginTop: '40px', marginBottom: '5px' }} align='center'>
                        <Typography variant='h5' align='left' marginTop="30px" marginBottom="30px" paddingBottom="5px" borderBottom={1} borderColor="divider">
                        Graduate Students
                        </Typography>
                    </Toolbar>

                    <Grid container direction="row" justifyContent='center' columnSpacing={4} rowSpacing={4}> 
                    {gradMembers.map((person) => (    
                        <PersonCard details = {person} renderPerson={renderPerson} />    
                    ))}
                    </Grid>
                </Container>
            )
            )}
        </div>      
    )

}

export default People