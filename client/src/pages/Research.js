import {React, useState} from 'react';
import {Container, Toolbar, Typography, Button} from '@mui/material';

import { ProjectProvider } from '../components/contexts/ProjectContext';
import ProjectDescriptions from '../components/ProjectDescriptions';
import CreateProject from '../components/CreateProject';

function Research() {
    const [newProject, setNewProject] = useState(false)
    const backToProjects = () => setNewProject(false)
    return (
        <Container>
            <ProjectProvider>

                <Toolbar sx={{ marginTop: '5px', marginBottom: '5px' }} align='center'>
                        <Typography variant='h5' align='left' marginTop="30px" marginBottom="30px" paddingBottom="5px" borderBottom={1} borderColor="divider">
                        Projects & Initiatives
                        </Typography>
                    </Toolbar>
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