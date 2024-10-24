import React, {useState, useContext} from 'react';
import { AdminLoginContext } from "../context/AdminProvider"
import PersonCard from '../components/PersonCard'
import PersonBio from '../components/PersonBio';
import { Typography, Toolbar, Button, Grid, Box, Container } from '@mui/material';
import { useQuery } from '@apollo/client';
import { QUERY_PEOPLE } from '../utils/queries';
import CreatePerson from '../components/CreatePerson';


function People() {
    const { isLoggedIn } = useContext(AdminLoginContext)
    const { loading, data } = useQuery(QUERY_PEOPLE);
    const peopleList = data?.people || [];
    const [currentPerson, setCurrentPerson] = useState(null);

    const [newPerson, setNewPerson] = useState(false)
    const backToPeople = () => setNewPerson(false)
  
    const renderPerson = (details) => {
        setCurrentPerson(details._id)
    };

    const backToCards = () => {
        setCurrentPerson(null)
    }

    const currentPersonDetails = peopleList.find(person => person._id === currentPerson);
    const leadershipMembers = peopleList.filter(person => person.category === "Leadership");
    const staffMembers = peopleList.filter(person => person.category === "Staff");
    const postdocMembers = peopleList.filter(person => person.category === "Postdoc")
    const gradMembers = peopleList.filter(person => person.category === "Graduate Student");
    const alumniMembers = peopleList.filter(person =>person.category === "Center Alumnus");

    const emptyDetails = {
        firstName: null,
        lastName: null,
        title: [],
        image: null,
        description: null,
        research: null,
        projects: [],
        category: null,
        current: null,
        email: null,
        gscholar: null,
        linkedin: null,
        website: null,
        advisors: []
    }

    return (
        <div>
            {/* show loading if mongodb is being slow */}

            { newPerson ? (
                <CreatePerson onSubmit={backToPeople} details={emptyDetails} />
            ): (
                <div>
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
                                <Typography variant='h4' align='left' marginTop="30px" marginBottom="30px" paddingBottom="5px" borderBottom={1} borderColor="divider">
                                Leadership
                                </Typography>
                            </Toolbar>
                    
                            <Grid container direction="row" justifyContent='center' columnSpacing={4} rowSpacing={4}> 
                            {leadershipMembers.map((person) => (    
                                <PersonCard details = {person} renderPerson={renderPerson} key={person.id} />    
                            ))}
                            </Grid>
                            
                            {/* STAFF */}
                            <Toolbar sx={{ marginTop: '40px', marginBottom: '5px' }} align='center'>
                                <Typography variant='h4' align='left' marginTop="30px" marginBottom="30px" paddingBottom="5px" borderBottom={1} borderColor="divider">
                                Staff
                                </Typography>
                            </Toolbar>
                            
                            <Grid container direction="row" justifyContent='center' columnSpacing={4} rowSpacing={4}> 
                            {staffMembers && staffMembers.map((person) => (    
                                <PersonCard details = {person} renderPerson={renderPerson} key={person.id} />    
                            ))}
                            </Grid>

                            {/* POSTDOCS */}
                            <Toolbar sx={{ marginTop: '40px', marginBottom: '5px' }} align='center'>
                                <Typography variant='h4' align='left' marginTop="30px" marginBottom="30px" paddingBottom="5px" borderBottom={1} borderColor="divider">
                                Postdocs
                                </Typography>
                            </Toolbar>
        
                            <Grid container direction="row" justifyContent='center' columnSpacing={4} rowSpacing={4}> 
                            {postdocMembers && postdocMembers.map((person) => (    
                                <PersonCard details = {person} renderPerson={renderPerson} key={person.id} />    
                            ))}
                            </Grid>
                            
                            {/* GRAD STUDENTS */}
                            <Toolbar sx={{ marginTop: '40px', marginBottom: '5px' }} align='center'>
                                <Typography variant='h4' align='left' marginTop="30px" marginBottom="30px" paddingBottom="5px" borderBottom={1} borderColor="divider">
                                Graduate Students
                                </Typography>
                            </Toolbar>
        
                            <Grid container direction="row" justifyContent='center' columnSpacing={4} rowSpacing={4}> 
                            {gradMembers && gradMembers.map((person) => (    
                                <PersonCard details = {person} renderPerson={renderPerson} key={person.id} />    
                            ))}
                            </Grid>

                            {/* CENTER ALUMNI */}
                            <Toolbar sx={{ marginTop: '40px', marginBottom: '5px' }} align='center'>
                                <Typography variant='h4' align='left' marginTop="30px" marginBottom="30px" paddingBottom="5px" borderBottom={1} borderColor="divider">
                                Center Alumni
                                </Typography>
                            </Toolbar>
        
                            <Grid container direction="row" justifyContent='center' columnSpacing={4} rowSpacing={4}> 
                            {alumniMembers && alumniMembers.map((person) => (    
                                <PersonCard details = {person} renderPerson={renderPerson} key={person.id} />    
                            ))}
                            </Grid>
                        </Container>
                    )
                    )}
                    { isLoggedIn && (
                    <Button variant='contained' style={{maxWidth: 200}} onClick={() => {setNewPerson(true)}}>Add new member</Button>
                    )} 
                </div> 
            )}
            
        </div>  
           
    )

}

export default People