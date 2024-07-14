import { React, useContext, useState } from 'react';
import { AdminLoginContext } from "../context/AdminProvider"
import DOMPurify from 'dompurify'

import {Container, Grid, Typography, Button, Card, CardMedia, Toolbar, Divider} from '@mui/material';
import CreateProject from './CreateProject';
import { useProjectContext } from './contexts/ProjectContext';

import { useQuery } from '@apollo/client';
import { GET_PROJECTS } from '../utils/queries';

export default function ProjectDescriptions() {
    const { isLoggedIn } = useContext(AdminLoginContext)
    const {loading, data, error} = useQuery(GET_PROJECTS)

    const {editProjectId, setEditProjectId} = useProjectContext()


    if (loading) return <div>loading...</div>
    if (error) return <div>Error: {error.message}</div>
    const projects = data.projects
    console.log(projects)
    if (projects.length === 0) {
        return <div>no projects!</div>
    }

    return (
        <Container maxWidth={false}>

            <Grid container direction="column">
                {projects.map((project) => (
                    
                        <Grid container key={project.id} direction="column" style={{marginBottom: 50, padding: 10}}>
                        {project.id !== editProjectId ? (
                            <Grid container direction="row" justifyContent="center" columnSpacing={5}>
                                <Grid item xs={12} sm={11} md={5} lg={4} justifyContent="center" alignItems="center" align="center" style={{marginBottom: 50}}>
                                    
                                    <Card sx={{ maxWidth: '500px' }}>
                                        <CardMedia
                                            component="img"
                                            alt="green iguana"
                                            height="400"
                                            src= {project.image ? `http://localhost:3001/images/${project.image}` : "https://images.freeimages.com/images/large-previews/ac7/sky-1401862.jpg?fmt=webp&w=500"}
                                            align="center"
                                        />
                                    </Card>
                                </Grid>
                                <Grid item xs={12} sm={11} md={7} lg={8}>
                                    <Typography align="left" mb={2} variant='h5'>{project.name}</Typography>
                                    <Typography align="left"><div dangerouslySetInnerHTML={{__html: project.description}} /></Typography>
                                    { isLoggedIn && (
                                        <Button variant='contained' style={{maxWidth: 50}} onClick={() => {setEditProjectId(project.id)}}>Edit</Button>
                                    )}
                                    
                                    
                                </Grid>
                                <Grid item xs={12} my={3}>
                                    <Divider />
                                </Grid>
                               
                            </Grid>
                            
                            ):(
                                <CreateProject id={project.id} description={project.description} name={project.name} />
                            )}
                        
                        
                        </Grid>

                    
                ))}
            </Grid>
        </Container>
    )


}