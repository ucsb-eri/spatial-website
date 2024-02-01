import * as React from 'react';
import {useState} from 'react'
import DOMPurify from 'dompurify'

import {Container, Grid, Typography, Button, Card, CardMedia, Toolbar} from '@mui/material';
import CreateProject from './CreateProject';
import { useProjectContext } from './contexts/ProjectContext';

import { useQuery } from '@apollo/client';
import { GET_PROJECTS } from '../utils/queries';

export default function ProjectDescriptions() {
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
        <Container>

            <Grid container direction="column">
                {projects.map((project) => (
                    
                        <Grid container key={project.id} direction="column" style={{marginBottom: 50, padding: 20}}>
                        {project.id !== editProjectId ? (
                            <div>
                                <Grid item justifyContent="center" alignItems="center" align="center" style={{marginBottom: 50}}>
                                    {/* person's pic */}
                                    <Card sx={{ width: '100%' }}>
                                        <CardMedia
                                            component="img"
                                            alt="green iguana"
                                            height="400"
                                            src= {'https://source.unsplash.com/random?wallpapers'}
                                            align="center"
                                        />
                                    </Card>
                                </Grid>
                                <Typography align="left" mb={2} variant='h5'>{project.name}</Typography>
                                <Typography align="left"><div dangerouslySetInnerHTML={{__html: project.description}} /></Typography>
                                
                                <Button variant='contained' style={{maxWidth: 50}} onClick={() => {setEditProjectId(project.id)}}>Edit</Button>
                                <Toolbar sx={{ borderBottom: 1, borderColor: 'divider', marginTop: '5px', marginBottom: '5px' }} align='center'></Toolbar>
                            
                            </div>
                            
                            ):(
                                <CreateProject id={project.id} description={project.description} name={project.name} />
                            )}
                        
                        
                        </Grid>

                    
                ))}
            </Grid>
        </Container>
    )


}