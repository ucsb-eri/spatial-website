import { React, useContext, useState } from 'react';
import { AdminLoginContext } from "../context/AdminProvider"
import {Grid, Toolbar, Typography, Button, Container} from '@mui/material';

import ProjectCard from '../components/projects/ProjectCard';
import ProjectDescriptions from '../components/projects/ProjectDescriptions';
import CreateProject from '../components/projects/CreateProject';
import { useQuery } from '@apollo/client';
import { GET_PROJECTS } from '../utils/queries';


function Projects() {

    const [currentProject, setCurrentProject] = useState(null)
    const [newProject, setNewProject] = useState(false)
    const { isLoggedIn } = useContext(AdminLoginContext)
    const backToProjects = () => setNewProject(false)

    const backToCards = () => {
        setCurrentProject(null)
    }

    const renderProject = (id) => {
        setCurrentProject(id)
    };

    const {loading, data, error} = useQuery(GET_PROJECTS)

    const projects = data?.projects || [];
    if (projects.length === 0) {
        return <div>no projects!</div>
    }

    const currentProjectDetails = projects.find(project => project.id === currentProject);
    return (
        <Grid item>
            {newProject ? (
                    <CreateProject onSubmit={backToProjects}/>
                ) : (
                    <div>
                        
                        {loading ? (
                            <div>Loading...</div>
                            ) : (
                                currentProject ? (
                                    <ProjectDescriptions project={currentProjectDetails} backToCards={backToCards} />
                                ) : (
                                    <Container maxWidth={false}>
                                        <Grid container direciton='row' justifyContent='center'>
                                            <Grid item xs={12} >
                                            <Toolbar  align='center'>
                                            <Toolbar sx={{ marginTop: '5px', marginBottom: '5px' }} align='center'>
                                                <Typography variant='h4' align='left' marginTop="30px" marginBottom="10px" paddingBottom="5px" borderBottom={1} borderColor="divider">
                                                Research
                                                </Typography>
                                            </Toolbar>
                                                
                                            </Toolbar>
                                            </Grid>
                                            
                                            <Grid item xs={11} my={4}>
                                                <Typography variant='h6' align='left'>
                                                Center faculty, researchers, and students work together on diverse projects, applying spatial data science techniques to solve a variety of challenges.
                                                </Typography>
                                            </Grid>
                                            <Grid item xs={12} lg={11}>
                                            <Grid container justifyContent="space-evenly" alignItems="center" rowGap={3} columnSpacing={3} my={3}>
                                                { projects.map((project, index) => (    
                                                    <Grid item xs={11} lg={6}>                                    
                                                        <ProjectCard project={project} index={index} renderProject={renderProject} />
                                                    </Grid>
                                                ))}
                                                </Grid>
                                            </Grid>
                                            
                                        
                                        </Grid>
                                    </Container>
                                )
                                                            

                            )}
                        { isLoggedIn && (
                            <Button variant='contained' style={{maxWidth: 200}} onClick={() => {setNewProject(true)}}>Add new project</Button>
                        )}
                    </div>
                )}
                            

                {/* {newProject ? (
                    <CreateProject onSubmit={backToProjects}/>
                ) : (
                    <div>
                        <ProjectDescriptions />
                        { isLoggedIn && (
                            <Button variant='contained' style={{maxWidth: 200}} onClick={() => {setNewProject(true)}}>Add new project</Button>
                        )}
                        
                    </div>
                    
                )
                }            */}
        </Grid>
    )
}

export default Projects