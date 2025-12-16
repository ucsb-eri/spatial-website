import { React, useContext, useEffect, useState } from 'react';
import { AdminLoginContext } from "../../context/AdminProvider"
import { useProjectContext } from '../../context/ProjectContext';
import emailIcon from '../../content/logos/emailicon.png'
import scholarIcon from '../../content/logos/googlescholaricon.png'
import CreatePerson from './CreatePerson';
import { useMutation } from '@apollo/client';
import { DELETE_PERSON } from '../../utils/mutations';
import { QUERY_PEOPLE } from '../../utils/queries';

import { Container, Box, Link, Typography, Card, CardMedia, Button, Grid, Alert, Popover, styled, useMediaQuery, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';

import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import CheckIcon from '@mui/icons-material/Check'
import XIcon from '@mui/icons-material/X';
import WebIcon from '@mui/icons-material/Web';
import GitHubIcon from '@mui/icons-material/GitHub';


import { getImageUrl } from '../../utils/config';

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


function PersonBio(props) {

    useEffect(() => {
        window.scrollTo(0,0)
    })

    
    const { isLoggedIn } = useContext(AdminLoginContext)
    const {editPersonId, setEditPersonId} = useProjectContext()
    const {details, backToCards} = props
    const isXsScreen = useMediaQuery('(max-width: 599px')
    
    // Parse projects - handle both HTML format and array format
    const parseProjects = () => {
        if (!details.projects || details.projects.length === 0) return [];
        
        const result = [];
        details.projects.forEach(item => {
            if (typeof item === 'string') {
                if (item.includes('<li>')) {
                    // HTML format - extract list items
                    const tempDiv = document.createElement('div');
                    tempDiv.innerHTML = item;
                    const listItems = tempDiv.querySelectorAll('li');
                    listItems.forEach(li => {
                        const text = li.textContent.trim();
                        if (text) result.push(text);
                    });
                } else {
                    // Plain string
                    const cleaned = item.trim();
                    if (cleaned) result.push(cleaned);
                }
            }
        });
        return result;
    };
    
    const projectsList = parseProjects();
    const showProjects = projectsList.length > 0;
    const showAdvisors = details.advisors.length !== 0
    const showGscholar = details.gscholar !== null && details.gscholar !== ""
    const showX = details.x !== null && details.x !== ""
    const showLinkedIn = details.linkedin !== null && details.linkedin !== ""
    const showWebsite = details.websiteUrl !== null && details.websiteUrl!== ""
    const showGithub = details.github !== null && details.github !== ""
    
    
    const [ anchorEl, setAnchorEl ] = useState(null)  
    const [ showEmailAlert, setShowEmailAlert ] = useState(false)
    const [ deleteDialogOpen, setDeleteDialogOpen ] = useState(false)

    const [deletePerson] = useMutation(DELETE_PERSON, {
        refetchQueries: [{ query: QUERY_PEOPLE }],
        onCompleted: () => {
            backToCards();
        },
        onError: (error) => {
            console.error('Error deleting person:', error);
            alert('Failed to delete person. Please try again.');
        }
    });

    const handleDelete = async () => {
        try {
            await deletePerson({ variables: { id: details._id } });
            setDeleteDialogOpen(false);
        } catch (error) {
            console.error('Error deleting person:', error);
        }
    };

    const copyEmail = (email) => {
        navigator.clipboard.writeText(email)
        setShowEmailAlert(true)
        setTimeout(() => setShowEmailAlert(false), 2500)
    }

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
                                    src={getImageUrl(details.image)}
                                    align="center"/>
                            </Card>
                        </Grid>
                        {/* Bio */}
                        <Grid item 
                            alignContent="top" 
                            sx={{paddingTop: isXsScreen ? "0px" : "145px"}} 
                            justifyContent="center" 
                            xs={12} 
                            sm={7} 
                            md={7} 
                            pt={3}>
                            <Typography component= "h2" variant="h2" align="center" mb={1} ><b>{details.firstName} {details.lastName}</b></Typography>
                            {details.title.map((title) => (
                                <Typography variant="h6" component="h2" align="center">{title}</Typography>
                            ))}
                            
                            
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
                                            onClick={(event) => {
                                                setAnchorEl(event.currentTarget)
                                                copyEmail(details.email)}
                                            }
                                            />
                                    </HoverLink>
                                </Grid>
                                    
                                {showGscholar && (
                                    <Grid item xs={2}>
                                        <HoverLink href={details.gscholar} target="_blank" rel="noopener noreferrer" >
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
                                        <HoverLink href={details.linkedin} target="_blank" rel="noopener noreferrer" >
                                        <LinkedInIcon 
                                            className='logos'
                                            sx={{fontSize: '45px', color: '#027C91'}}
                                            />
                                            
                                        </HoverLink>
                                    </Grid>
                                )}


                                {showX && (
                                    <Grid item xs={2}>
                                    <HoverLink href={details.x} target="_blank" rel="noopener noreferrer">
                                    <XIcon 
                                        flex= {1}
                                        flexShrink={1}
                                        className='logos'
                                        sx={{fontSize: '45px', color: '#027C91'}}
                                        />
                                        
                                    </HoverLink>
                                    </Grid>
                                )}
                                {showGithub && (
                                    <Grid item xs={2}>
                                    <HoverLink href={details.github} target="_blank" rel="noopener noreferrer">
                                    <GitHubIcon 
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
                                    <HoverLink href={details.websiteUrl} target="_blank" rel="noopener noreferrer" p={1} color='#027C91'>
                                    {details.websiteName !== null ? (
                                        <Typography variant="h4" >
                                        {details.websiteName}
                                        </Typography>
                                    ) : (
                                        <WebIcon 
                                        flex= {1}
                                        flexShrink={1}
                                        className='logos'
                                        sx={{fontSize: '45px', color: '#027C91'}}
                                        />
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
                            <Typography component="div" align="left" paragraph variant='h6'><div dangerouslySetInnerHTML={{__html: details.description}} /></Typography>
                        </Grid>
                        { details.research && (
                            <Grid item xs={12} sm={7} mt={4}>
                            <Typography variant='h5' paragraph align="left"><b>Research</b></Typography>
                            <Typography component="div" align="left" paragraph variant='h6'><div dangerouslySetInnerHTML={{__html: details.research}} /></Typography>
                        </Grid>
                        )}
                        
                        
                        {showProjects && (
                            <Grid item xs={12} sm={5} mt={4}>
                                <Typography variant='h5' paragraph align="left"><b>Current Projects</b></Typography>
                                <Box component="ul" sx={{ pl: 2, mt: 1 }}>
                                    {projectsList.map((project, index) => (
                                        <Typography 
                                            component="li" 
                                            key={index} 
                                            variant='body1' 
                                            align="left" 
                                            sx={{ mb: 0.5 }}
                                        >
                                            {project}
                                        </Typography>
                                    ))}
                                </Box>
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
                        

                    </Grid>                         
                </Grid>
               
            
            { isLoggedIn && (
                <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
                    <Button 
                        variant='contained' 
                        onClick={() => {setEditPersonId(details.id)}}
                    >
                        Edit
                    </Button>
                    <Button 
                        variant='outlined' 
                        color='error'
                        onClick={() => setDeleteDialogOpen(true)}
                    >
                        Delete
                    </Button>
                </Box>
            )}
            </div>

        ) : (
            <CreatePerson 
                key={details._id} 
                id={details._id} 
                details={details} 
                onSubmit={() => setEditPersonId(null)} 
            />
        )}

            <Popover
                open={showEmailAlert}
                anchorEl={anchorEl}
                anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "center"
                  }}
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "center"
                  }}
                py={4}
            >
                <Alert icon={<CheckIcon fontSize="inherit" />} severity="success">
                    Email Copied!
                </Alert>
            </Popover>

            {/* Delete Confirmation Dialog */}
            <Dialog
                open={deleteDialogOpen}
                onClose={() => setDeleteDialogOpen(false)}
            >
                <DialogTitle>Delete Person?</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Are you sure you want to delete <strong>{details.firstName} {details.lastName}</strong>? 
                        This action cannot be undone.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setDeleteDialogOpen(false)}>
                        Cancel
                    </Button>
                    <Button onClick={handleDelete} color="error" variant="contained" autoFocus>
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>
        </Container>
            
    )

}

export default PersonBio