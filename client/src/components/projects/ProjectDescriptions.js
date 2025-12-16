import { React, useContext, useEffect, useState } from 'react';
import { AdminLoginContext } from "../../context/AdminProvider"

import { IconButton, Container, Grid, Typography, Button, Card, CardMedia, CardContent, Box, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import CreateProject from './CreateProject';
import { useProjectContext } from '../../context/ProjectContext';
import { useMutation } from '@apollo/client';
import { DELETE_PROJECT } from '../../utils/mutations';
import { GET_PROJECTS } from '../../utils/queries';

import ArrowBackIcon from '@mui/icons-material/ArrowBack';

// import { useQuery } from '@apollo/client';
// import { GET_PROJECTS } from '../utils/queries';

export default function ProjectDescriptions(props) {
    // Helper to get image URL - handles both full URLs and local filenames
    const getImageUrlLocal = (image) => {
        if (!image) return "https://images.freeimages.com/images/large-previews/ac7/sky-1401862.jpg?fmt=webp&w=500";
        if (image.startsWith('http')) return image;
        const imageRoute = process.env.NODE_ENV === "production" ? "/images/" : "http://localhost:3001/images/";
        return imageRoute + image;
    };

    useEffect(() => {
        window.scrollTo(0,0)
    })

    const { project, backToCards } = props
    const { isLoggedIn } = useContext(AdminLoginContext)
    const {editProjectId, setEditProjectId} = useProjectContext()
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)

    const [deleteProject] = useMutation(DELETE_PROJECT, {
        refetchQueries: [{ query: GET_PROJECTS }],
        onCompleted: () => {
            backToCards();
        },
        onError: (error) => {
            console.error('Error deleting project:', error);
            alert('Failed to delete project. Please try again.');
        }
    });

    const handleDelete = async () => {
        try {
            await deleteProject({ variables: { id: project.id } });
            setDeleteDialogOpen(false);
        } catch (error) {
            console.error('Error deleting project:', error);
        }
    };


    // if (loading) return <div>loading...</div>
    // if (error) return <div>Error: {error.message}</div>
    // const projects = data.projects
    // console.log(projects)
    // if (projects.length === 0) {
    //     return <div>no projects!</div>
    // }

    return (
        <Container maxWidth={false} >
            {/* Only show Back button when NOT in edit mode - edit form has its own back button */}
            {project.id !== editProjectId && (
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
            )}

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
                                src={getImageUrlLocal(project.image)}
                                align="center"
                            />
                            <CardContent>
                                {project.pis && (
                                    <Typography variant='h5' paragraph component='h2' align='left'>
                                    <strong>PIs:</strong> {project.pis}
                                    </Typography>
                                )}
                                {project.website && (
                                    <Typography variant='h5' paragraph component='h2' align='left'>
                                    <strong>Website:</strong> <IconButton href={project.website} target='_blank' rel="noopener noreferrer"><OpenInNewIcon /></IconButton>
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
                                    src={getImageUrlLocal(project.funderLogo)}
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
                            <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
                                <Button 
                                    variant='contained' 
                                    onClick={() => {setEditProjectId(project.id)}}
                                >
                                    Edit
                                </Button>
                                <Button 
                                    variant='outlined' 
                                    color='error'
                                    onClick={() => setDeleteDialogOpen(true)}
                                >
                                    Delete
                                </Button>
                            </Box>
                        )}
                                               
                    </Grid>                
                </Grid>               
                ):(
                    <CreateProject 
                        key={project.id}
                        id={project.id} 
                        description={project.description} 
                        name={project.name}
                        summary={project.summary}
                        pis={project.pis}
                        image={project.image}
                        funder={project.funder}
                        funderLogo={project.funderLogo}
                        onSubmit={() => setEditProjectId(null)}
                    />
                )}                    
            </Grid>

            {/* Delete Confirmation Dialog */}
            <Dialog
                open={deleteDialogOpen}
                onClose={() => setDeleteDialogOpen(false)}
            >
                <DialogTitle>Delete Project?</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Are you sure you want to delete <strong>{project.name}</strong>? 
                        This action cannot be undone.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setDeleteDialogOpen(false)}>
                        Cancel
                    </Button>
                    <Button onClick={handleDelete} color="error" variant="contained" autoFocus>
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>
        </Container>
    )


}