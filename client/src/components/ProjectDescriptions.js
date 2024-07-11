import * as React from 'react';
import {useState} from 'react'
import DOMPurify from 'dompurify'

import {Container, Grid, Typography, Button, Card, CardMedia, Toolbar, Divider} from '@mui/material';
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
        <Container maxWidth={false}>

            <Grid container direction="column">
                {projects.map((project) => (
                    
                        <Grid container key={project.id} direction="column" style={{marginBottom: 50, padding: 10}}>
                        {project.id !== editProjectId ? (
                            <Grid container direction="row" justifyContent="center" columnSpacing={5}>
                                <Grid item xs={12} sm={11} md={5} lg={4} justifyContent="center" alignItems="center" align="center" style={{marginBottom: 50}}>
                                    {/* person's pic */}
                                    <Card sx={{ width: '100%' }}>
                                        <CardMedia
                                            component="img"
                                            alt="green iguana"
                                            height="400"
                                            src= {'https://cff2.earth.com/uploads/2024/03/15171622/tree-frogs_live-in-trees_lay-eggs-on-ground_1.jpg'}
                                            align="center"
                                        />
                                    </Card>
                                </Grid>
                                <Grid item xs={12} sm={11} md={7} lg={8}>
                                    <Typography align="left" mb={2} variant='h5'>{project.name}</Typography>
                                    <Typography align="left"><div dangerouslySetInnerHTML={{__html: project.description}} /></Typography>
                                    
                                    <Button variant='contained' style={{maxWidth: 50}} onClick={() => {setEditProjectId(project.id)}}>Edit</Button>
                                    
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