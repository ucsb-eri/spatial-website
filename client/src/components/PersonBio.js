import { React, useContext } from 'react';
import { AdminLoginContext } from "../context/AdminProvider"
import { useProjectContext } from '../context/ProjectContext';
import emailIcon from '../content/logos/emailicon.png'
import scholarIcon from '../content/logos/googlescholaricon.png'
import CreatePerson from './CreatePerson';

import { Container, Box, Link, Typography, Card, CardMedia, Button, Grid, Avatar, Icon, styled, useMediaQuery } from '@mui/material';

import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import XIcon from '@mui/icons-material/X';


const imageRoute = process.env.NODE_ENV === "production" ? "https://spatialtest.grit.ucsb.edu/images/" : "http://localhost:3001/images/"

// Styled line in the card
const HorizontalLine = styled('div')(({ theme }) => ({
    position: 'relative',
    left: 0,
    width: '100%',
    height: '15px',
    backgroundColor: '#027C91',
    zIndex: -1
  }));

const HoverLink = styled(Link)(({ theme }) => ({
    transition: 'background-color 0.3s ease',
    '&:hover': {
      backgroundColor: theme.palette.action.hover,
      cursor: 'pointer'
    }
  }));

const copyEmail = (email) => {
    navigator.clipboard.writeText(email)
    alert(`Copied ${email} to clipboard!`)
}



function PersonBio(props) {
    const { isLoggedIn } = useContext(AdminLoginContext)
    const {editPersonId, setEditPersonId} = useProjectContext()
    const {details, backToCards} = props
    const isXsScreen = useMediaQuery('(max-width: 599px')
    const isSmScreen = useMediaQuery('(max-width: 800px')
    const showProjects = details.projects.length !== 0 
    const showAdvisors = details.advisors.length !== 0
    const showGscholar = details.gscholar !== null
    const showX = details.x !== null
    const showLinkedIn = details.linkedin !== null
    const showWebsite = details.websiteUrl !== null
    

    return (
        <Container maxWidth={100}>

        {details.id !== editPersonId ? (
            <div>
                <Grid item align="left">
                    <Button 
                        variant="text" 
                        onClick={() => backToCards()} 
                        startIcon={<ArrowBackIcon />}
                        sx={{maxWidth: "100px", marginTop: "20px"}}
                        align="left"
                        >
                            Back
                    </Button>
                </Grid>
                <HorizontalLine sx={{ top: isXsScreen ? "100px" : "135px" }} />
                
                <Container maxWidth="md">
                    <Grid container direction="row" alignItems="center" columnSpacing={2} justifyContent="center" rowGap={3} minHeight="300px" >
                        <Grid item xs={10} sm={5}>
                            {/* person's pic */}
                            <Card sx={{ width:"100%", borderRadius: 0 }} elevation={0}>

                                <CardMedia
                                    component="img"
                                    alt={`${details.firstName} ${details.lastName} headshot`}
                                    maxHeight="400"
                                    src= {imageRoute + details.image}
                                    align="center"/>
                            </Card>
                        </Grid>
                        {/* Bio */}
                        <Grid item alignContent="top" sx={{paddingTop: isXsScreen ? "0px" : "145px"}} justifyContent="center" xs={12} sm={7} md={7} pt={3}>
                            <Typography component= "h2" variant="h2" align="center" mb={1} ><b>{details.firstName} {details.lastName}</b></Typography>
                            <Typography variant="h5" component="h2" align="center" mb={1}>{details.title}</Typography>
                            
                            <Grid container direction="row" columnSpacing={1} justifyContent="center" alignItems="center" mt={2}>
                                <Grid item xs={2}>
                                    <HoverLink   >
                                        <Box 
                                            
                                            component="img"
                                            className='logos'
                                            sx={{
                                                maxWidth: '45px',
                                                width: '100%'
                                            }}
                                            src={emailIcon}
                                            onClick={() => copyEmail(details.email)}
                                            />
                                    </HoverLink>
                                </Grid>
                                    
                                {showGscholar && (
                                    <Grid item xs={2}>
                                        <HoverLink href={details.gscholar} target="_blank" >
                                        <Box 
                                            
                                            component="img"
                                            className='logos'
                                            sx={{maxWidth: '45px',
                                                width: '100%'
                                            }}
                                            src={scholarIcon}
                                            
                                            />
                                        </HoverLink>
                                    </Grid>
                                )}

                                {showLinkedIn && (
                                    <Grid item xs={2}>
                                        <HoverLink href={details.linkedin} target="_blank" >
                                        <LinkedInIcon 
                                            className='logos'
                                            sx={{fontSize: '45px', color: '#027C91'}}
                                            />
                                            
                                        </HoverLink>
                                    </Grid>
                                )}


                                {showX && (
                                    <Grid item xs={2}>
                                    <HoverLink href={details.x} target="_blank" >
                                    <XIcon 
                                        flex= {1}
                                        flexShrink={1}
                                        className='logos'
                                        sx={{fontSize: '45px', color: '#027C91'}}
                                        />
                                        
                                    </HoverLink>
                                    </Grid>
                                )}
                                
                                {showWebsite && (
                                    <Box sx={{display:"flex", flexDirection: "row", flexWrap: "nowrap", alignItems: "center"}}>
                                    <HoverLink href={details.websiteUrl} target="_blank" p={1} color='#027C91'>
                                    {details.websiteName !== null ? (
                                        <Typography variant="h4" >
                                        {details.websiteName}
                                        </Typography>
                                    ) : (
                                        <Typography>
                                        {details.websiteUrl}
                                        </Typography>
                                    )
                                     }
                                        
                                    </HoverLink>
                                    
                                </Box>)}
                            </Grid>
                            
                            {/* <Typography align="left" paragraph>
                                The Center for Spatial Studies focuses on promoting spatial thinking and spatial analytics across academia, industry, and government agencies, and across disciplines ranging from the humanities to the physical sciences with a particular focus on novel Spatial Data Science methods and Knowledge Graphs.
                            </Typography>
                            <Typography align="left" paragraph>
                                The center has expertise in spatiotemporally-explicit machine learning, in the formal representation of spatial phenomena including but not limited to geographic space, knowledge engineering, as well as in methods to improve the publication, retrieval, reuse, and integration of heterogeneous data across domain boundaries.
                            </Typography>  */}
                        </Grid>
                            
                    </Grid>
                    <Grid container direction="row" mt={4} columnSpacing={2} justifyContent="space-between" >
                        
                        <Grid item xs={12}>
                            <Typography variant='h5' paragraph align="left"><b>About</b></Typography>
                            <Typography align="left" paragraph variant='h6'><div dangerouslySetInnerHTML={{__html: details.description}} /></Typography>
                        </Grid>

                        <Grid item xs={12} sm={7} mt={4}>
                            <Typography variant='h5' paragraph align="left"><b>Research</b></Typography>
                            <Typography align="left" paragraph variant='h6'><div dangerouslySetInnerHTML={{__html: details.research}} /></Typography>
                        </Grid>
                        
                        {showProjects && (
                            <Grid item xs={12} sm={5} mt={4}>
                                <Typography variant='h5' paragraph align="left"><b>Current Projects</b></Typography>
                                <Typography align="left" paragraph variant='h6'><div dangerouslySetInnerHTML={{__html: details.projects}} /></Typography>
                            </Grid>
                        )}

                        {showAdvisors && (
                            <Grid item xs={12} sm={4} mt={4}>
                                <Typography variant='h5' paragraph align="left"><b>Advisors</b></Typography>
                                {details.advisors.map((advisor, index) => (
                                    <Typography paragraph variant='h6' align='left'>
                                        {advisor}
                                    </Typography>    
                                ))}
                            </Grid>
                        )}
                        

                    </Grid>
                </Container>
                
                {/* contact info + links? */}
                <Grid container sx={{marginTop: "60px"}}>
                    <Grid item
                        sx={{
                            display: 'flex',
                            flexDirection: 'row', // Set the direction to row for horizontal alignment
                            justifyContent: 'space-between',
                            width: '100%',
                            bgcolor: 'background.paper',
                            flexWrap: 'wrap'
                        }}>
                        
                        {/* {details.location !== null && (<Box sx={{display:"flex", flexDirection: "row", flexWrap: "nowrap", alignItems: "center", marginBottom:'20px'}}>
                            <Avatar>
                                <WorkIcon />
                            </Avatar>
                            <Typography  sx={{ paddingLeft: "15px", paddingRight: "15px",  whiteSpace: 'nowrap'}}>
                            {details.location}
                            </Typography>
                        </Box>)} */}
                        {/* {details.phone !== null && (<Box sx={{display:"flex", flexDirection: "row", flexWrap: "nowrap", alignItems: "center", marginBottom:'20px'}}>
                            <Avatar>
                                <PhoneIcon />
                            </Avatar>
                            <Typography sx={{ paddingLeft: "15px", paddingRight: "15px",  whiteSpace: 'nowrap'}}>
                                {details.phone}
                            </Typography>
                        </Box>)} */}

                    </Grid>                         
                </Grid>
               
            
            { isLoggedIn && 
                (
                <Button variant='contained' style={{maxWidth: 50}} onClick={() => {setEditPersonId(details.id)}}>Edit</Button>
                )}
            </div>

        ) : (
            <CreatePerson id={details.id} details={details} />
        )}
        </Container>
            
    )

}

export default PersonBio