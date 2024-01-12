import React from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import { ProjectProvider } from '../components/contexts/ProjectContext';
import ProjectDescriptions from '../components/ProjectDescriptions';

function Research() {

    return (
        <Container>
            <ProjectProvider>
                <ProjectDescriptions />
            </ProjectProvider>
            

        </Container>
    )
}

export default Research