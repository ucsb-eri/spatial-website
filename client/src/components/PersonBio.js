import { React, useContext } from 'react';
import { AdminLoginContext } from "../context/AdminProvider"
import { useProjectContext } from '../context/ProjectContext';
import CreatePerson from './CreatePerson';

import { Container, Box, Typography, Card, CardMedia, Button, Grid, Avatar, styled, useMediaQuery } from '@mui/material';

import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import MailIcon from '@mui/icons-material/Mail';
import WorkIcon from '@mui/icons-material/Work';
import PhoneIcon from '@mui/icons-material/Phone';
import WebsiteIcon from '@mui/icons-material/Web'

// Styled line in the card
const HorizontalLine = styled('div')(({ theme }) => ({
    position: 'relative',
    left: 0,
    top: "130px",
    width: '100%',
    height: '15px',
    backgroundColor: theme.palette.primary.main,
    zIndex: -1
  }));

function PersonBio(props) {
    const { isLoggedIn } = useContext(AdminLoginContext)
    const {editPersonId, setEditPersonId} = useProjectContext()
    const {details, backToCards} = props

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
                <Container sx={{md: "80%", sm: "100%", marginTop: "50px"}}>
                    
                    <Grid container direction="row" justifyContent="space-between" rowGap={3} minHeight="300px" >
                        <Grid item alignItems="center" align="center" xs={12} sm={5} md={6}>
                            {/* person's pic */}
                            <Card sx={{ maxWidth: 300, borderRadius: 0 }} elevation={0}>

                                <CardMedia
                                    component="img"
                                    alt="green iguana"
                                    maxHeight="400"
                                    src= {details.image}
                                    align="center" 
                                    
                                />
                            </Card>
                        </Grid>
                        {/* Bio */}
                        <Grid item alignContent="top" sx={{paddingTop: isXsScreen ? "0px" : "110px"}} justifyContent="center" xs={12} sm={7} md={6} pt={3}>
                            <Typography component= "h2" variant="h4" align="center" mb={1} >{details.firstName} {details.lastName}</Typography>
                            <Typography component= "h2" variant="h6" align="center" mb={1}>{details.title}</Typography>
                            
                            <Grid container direction="row" justifyContent="center" mt={4}>
                                <Box sx={{display:"flex", flexDirection: "row", flexWrap: "nowrap", alignItems: "center", align: "center", marginBottom:'20px'}}>
                                    <Avatar>
                                        <MailIcon />
                                    </Avatar>
                                    <Typography  sx={{ paddingLeft: "15px", paddingRight: "15px",  whiteSpace: 'nowrap'}}>
                                        {/* {details.email} */}
                                    </Typography>
                                </Box>
                                {details.website !== null && (<Box sx={{display:"flex", flexDirection: "row", flexWrap: "nowrap", alignItems: "center", marginBottom:'20px'}}>
                                    <Avatar>
                                        <WebsiteIcon />
                                    </Avatar>
                                    <Typography sx={{ paddingLeft: "15px", paddingRight: "15px",  whiteSpace: 'nowrap'}}>
                                        {/* {details.website} */}
                                    </Typography>
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
                    <Grid container direction="row" mt={4}>
                        
                        <Grid item xs={12}>
                            <Typography variant='h5' paragraph align="left">About</Typography>
                            <Typography align="left">{details.description}</Typography>
                        </Grid>

                        <Grid item xs={12} sm={7} mt={4}>
                            <Typography variant='h5' paragraph align="left">Research</Typography>
                            <Typography align="left">{details.research}</Typography>
                        </Grid>

                        <Grid item xs={12} sm={5} mt={4}>
                            <Typography variant='h5' paragraph align="left">Current Projects</Typography>
                            <Typography align="left">{details.projects}</Typography>
                        </Grid>

                    </Grid>
                    
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
                </Container>
            
            { isLoggedIn && 
                (
                <Button variant='contained' style={{maxWidth: 50}} onClick={() => {setEditPersonId(details.id)}}>Edit</Button>
                )}
            </div>

        ) : (
            <CreatePerson />
        )}
        </Container>
            
    )

}

export default PersonBio