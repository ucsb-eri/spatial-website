import { React} from 'react';

import {Typography, Card, CardActionArea, CardContent, Box} from '@mui/material';

export default function ProjectCard(props) {

    const { project, index, renderProject } = props
    const imageRoute = process.env.NODE_ENV === "production" ? "https://spatialtest.grit.ucsb.edu/images/" : "http://localhost:3001/images/"

    return(
        <Card  
            key={project.id} 
            mb={3} 
            elevation={0}
            sx={{ 
                position: 'relative', 
                backgroundImage: `url(${imageRoute + project.image})`, 
                backgroundSize: 'cover', 
                backgroundPosition: 'center', 
                color: 'white', // Light text color
                height: {
                    xs: '550px',
                    sm: '500px'
                }
            }}
        >
            
            <CardActionArea onClick={() => renderProject(project.id)}>
                <Box
                    sx={{ 
                        position: 'absolute',
                        left: {
                            xs: '0', 
                            sm: '0px' 
                        },
                        top: {
                            xs: '0', 
                            sm: 'auto' 
                        },
                        width: '100%',
                        height: '500px'
                    }}
                >
                    <CardContent 
                        sx={{ 
                            alignContent: 'start',
                            width: {
                                sm: '40%'
                            },
                            maxWidth: {
                                sm: '300px'
                            },
                            height: {                              
                                sm: '500px',
                                xs: 'auto'
                            },
                            backgroundColor: 'rgba(0, 0, 0, 0.6)', // Dark gray background with transparency
                            padding: '20px',
                        }}
                        >
                        <Typography component="div" variant="h5" align='left' paragraph>
                            {project.name}
                        </Typography>
                        <Typography component="div" variant="caption" align='left'>
                            {project.summary}
                        </Typography>
                    </CardContent>
                </Box>
                
            </CardActionArea>
        </Card>
    )
}