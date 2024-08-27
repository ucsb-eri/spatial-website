import { React, useContext } from 'react';
import { AdminLoginContext } from "../context/AdminProvider"
import { useProjectContext } from '../context/ProjectContext';
import emailIcon from '../content/logos/emailicon.png'
import scholarIcon from '../content/logos/googlescholaricon.png'
import CreatePerson from './CreatePerson';

import { Container, Box, Link, Typography, Card, CardMedia, Button, Grid, Avatar, styled, useMediaQuery } from '@mui/material';

import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import MailIcon from '@mui/icons-material/Mail';
import WorkIcon from '@mui/icons-material/Work';
import PhoneIcon from '@mui/icons-material/Phone';
import WebsiteIcon from '@mui/icons-material/Web'

const imageRoute = process.env.NODE_ENV === "production" ? "https://spatialtest.grit.ucsb.edu/images/" : "http://localhost:3001/images/"

// Styled line in the card
const HorizontalLine = styled('div')(({ theme }) => ({
    position: 'relative',
    left: 0,
    top: "130px",
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
    console.log("image: " + details.image)

    const isXsScreen = useMediaQuery('(max-width: 599px')

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
                <HorizontalLine />
                
                <Container maxWidth="md">
                    <Grid container direction="row" justifyContent="space-between" rowGap={3} minHeight="300px" >
                        <Grid item alignItems="center" align="left" xs={12} sm={5}>
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
                        <Grid item alignContent="top" sx={{paddingTop: isXsScreen ? "0px" : "150px"}} justifyContent="center" xs={12} sm={7} md={7} pt={3}>
                            <Typography component= "h2" variant="h2" align="center" mb={1} >{details.firstName} {details.lastName}</Typography>
                            <Typography component= "h2" variant="h6" align="center" mb={1}>{details.title}</Typography>
                            
                            <Grid container direction="row" justifyContent="center" mt={4}>
                                <Box sx={{display:"flex", flexDirection: "row", flexWrap: "nowrap", alignItems: "center", align: "center", marginBottom:'20px'}}>
                                <HoverLink p={1}>
                                    <Box 
                                        flex= {1}
                                        flexShrink={1}
                                        component="img"
                                        className='logos'
                                        sx={{maxWidth: '56px'}}
                                        src={emailIcon}
                                        onClick={() => copyEmail(details.email)}
                                         />
                                </HoverLink>
                                    
                                    
                                <HoverLink href={details.gscholar} target="_blank" p={1}>
                                    <Box 
                                        flex= {1}
                                        flexShrink={1}
                                        component="img"
                                        className='logos'
                                        sx={{maxWidth: '56px'}}
                                        src={scholarIcon}
                                        
                                         />
                                </HoverLink>
                                </Box>
                                {details.websiteUrl !== null && (<Box sx={{display:"flex", flexDirection: "row", flexWrap: "nowrap", alignItems: "center", marginBottom:'20px'}}>
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
                    <Grid container direction="row" mt={4} columnSpacing={2}>
                        
                        <Grid item xs={12}>
                            <Typography variant='h5' paragraph align="left">About</Typography>
                            <Typography align="left"><div dangerouslySetInnerHTML={{__html: details.description}} /></Typography>
                        </Grid>

                        <Grid item xs={12} sm={7} mt={4}>
                            <Typography variant='h5' paragraph align="left">Research</Typography>
                            <Typography align="left"><div dangerouslySetInnerHTML={{__html: details.research}} /></Typography>
                        </Grid>

                        <Grid item xs={12} sm={5} mt={4}>
                            <Typography variant='h5' paragraph align="left">Current Projects</Typography>
                            <Typography align="left"><div dangerouslySetInnerHTML={{__html: details.projects}} /></Typography>
                        </Grid>

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