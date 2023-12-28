import * as React from 'react';
import DOMPurify from 'dompurify'
import {stateToHTML} from 'draft-js-export-html'
import {Container, Grid, Typography} from '@mui/material';
import '../../node_modules/draft-js/dist/Draft.css'
import '../css/RichText.css'

import { FormGroup, FormControl, TextField, InputLabel, Button, Input } from '@mui/material';
import { useQuery } from '@apollo/client';
import { GET_PROJECTS } from '../utils/queries';

export default function ProjectDescriptions() {
    const {loading, data, error} = useQuery(GET_PROJECTS)

    if (loading) return <p>loading...</p>
    if (error) return <p>Error: {error.message}</p>
    const projects = data.projects
    if (projects.length === 0) {
        return <p>no projects!</p>
    }

    return (
        <Container>
            <h2>Projects</h2>
            <Grid container direction="column">
                {projects.map((project) => (
                    <Grid container key = {project.id} direction="column" style={{marginBottom: 50}}>
                        <Typography align="left" mb={2}>{project.name}</Typography>
                        <Typography align="left"><div dangerouslySetInnerHTML={{__html: project.description}} /></Typography>
                        
                    </Grid>
                ))}
            </Grid>
        </Container>
    )


}