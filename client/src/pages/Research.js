import {React, useState} from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import { ProjectProvider } from '../components/contexts/ProjectContext';
import ProjectDescriptions from '../components/ProjectDescriptions';
import CreateProject from '../components/CreateProject';

function Research() {
    const [newProject, setNewProject] = useState(false)
    const backToProjects = () => setNewProject(false)
    return (
        <Container>
            <ProjectProvider>
            
                {newProject ? (
                    <CreateProject onSubmit={backToProjects}/>
                ) : (
                    <div>
                        <ProjectDescriptions />
                        <Button variant='contained' style={{maxWidth: 200}} onClick={() => {setNewProject(true)}}>Add new project</Button>
                    </div>
                    
                )

                }
            </ProjectProvider>


        </Container>
    )
}

export default Research