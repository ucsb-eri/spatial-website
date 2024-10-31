import { React, useContext, useEffect } from 'react';
import { AdminLoginContext } from "../context/AdminProvider"

import {Container, Grid, Typography, Button, Card, CardMedia, CardContent} from '@mui/material';
import CreateProject from './CreateProject';
import { useProjectContext } from '../context/ProjectContext';

import ArrowBackIcon from '@mui/icons-material/ArrowBack';

// import { useQuery } from '@apollo/client';
// import { GET_PROJECTS } from '../utils/queries';

export default function ProjectDescriptions(props) {
    const imageRoute = process.env.NODE_ENV === "production" ? "https://spatial.ucsb.edu/images/" : "http://localhost:3001/images/"

    useEffect(() => {
        window.scrollTo(0,0)
    })

    const { project, backToCards } = props
    const { isLoggedIn } = useContext(AdminLoginContext)
    // const {loading, data, error} = useQuery(GET_PROJECTS)

    const {editProjectId, setEditProjectId} = useProjectContext()


    // if (loading) return <div>loading...</div>
    // if (error) return <div>Error: {error.message}</div>
    // const projects = data.projects
    // console.log(projects)
    // if (projects.length === 0) {
    //     return <div>no projects!</div>
    // }

    return (
        <Container maxWidth={false} >
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

            <Grid container key={project.id} direction="column" my={4} style={{padding: 10}}>
            {project.id !== editProjectId ? (
                <Grid container direction="row" justifyContent="center" columnSpacing={5}>
                    <Grid item xs={12} sm={5} md={5} lg={4} justifyContent="center" alignItems="center" align="center" style={{marginBottom: 50}}>
                        
                        <Card 
                            key={project.id}
                            elevation={0}
                            
                            sx={{ maxWidth: '500px', borderRadius: '0' }}>
                            <CardMedia
                                component="img"
                                alt="project image"
                                height="400"
                                src= {project.image ? `${imageRoute}${project.image}` : "https://images.freeimages.com/images/large-previews/ac7/sky-1401862.jpg?fmt=webp&w=500"}
                                align="center"
                            />
                            <CardContent>
                                {project.pis && (
                                    <Typography variant='h5' paragraph component='h2' align='left'>
                                    <strong>PIs:</strong> {project.pis}
                                    </Typography>
                                )}
                                {project.funder && (
                                    <Typography variant='h5' component='h2' paragraph align='left'>
                                    <strong>Funded by:</strong> {project.funder}
                                    </Typography>
                                )}
                                {project.funderLogo && (
                                    <CardMedia
                                    component="img"
                                    alt="funding logo"
                                    src= {project.funderLogo ? `${imageRoute}${project.funderLogo}` : "https://images.freeimages.com/images/large-previews/ac7/sky-1401862.jpg?fmt=webp&w=500"}
                                    align="left"
                                    sx={{width: '150px'}}
                                />
                                )}
                                
                                
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={11} sm={6} md={7} lg={8}>
                        <Typography align="left" mb={2} variant='h4' component='h2'>{project.name}</Typography>
                        <Typography align="left"><div dangerouslySetInnerHTML={{__html: project.description}} /></Typography>
                        { isLoggedIn && (
                            <Button variant='contained' style={{maxWidth: 50}} onClick={() => {setEditProjectId(project.id)}}>Edit</Button>
                        )}
                                               
                    </Grid>                
                </Grid>               
                ):(
                    <CreateProject id={project.id} description={project.description} name={project.name} />
                )}                    
            </Grid>
        </Container>
    )


}