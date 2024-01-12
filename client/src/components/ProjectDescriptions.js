import * as React from 'react';
import {useState} from 'react'
import DOMPurify from 'dompurify'

import {Container, Grid, Typography} from '@mui/material';
import CreateProject from './CreateProject';
import { useProjectContext } from './contexts/ProjectContext';

import {Button} from '@mui/material';
import { useQuery } from '@apollo/client';
import { GET_PROJECTS } from '../utils/queries';

export default function ProjectDescriptions() {
    const {loading, data, error} = useQuery(GET_PROJECTS)

    const {editProjectId, setEditProjectId} = useProjectContext()


    if (loading) return <p>loading...</p>
    if (error) return <p>Error: {error.message}</p>
    const projects = data.projects
    if (projects.length === 0) {
        return <p>no projects!</p>
    }

    return (
        <Container>
            <Typography align='left' variant='h6'>Projects</Typography>
            <Grid container direction="column">
                {projects.map((project) => (
                    
                        <Grid container key={project.id} direction="column" style={{marginBottom: 50, padding: 20}}>
                        {project.id !== editProjectId ? (
                            <div>
                                <Typography align="left" mb={2} variant='h5'>{project.name}</Typography>
                                <Typography align="left"><div dangerouslySetInnerHTML={{__html: project.description}} /></Typography>
                                <Button variant='contained' style={{maxWidth: 50}} onClick={() => {setEditProjectId(project.id)}}>Edit</Button>
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