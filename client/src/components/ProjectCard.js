import { React} from 'react';

import {Typography, Card, CardActionArea, CardContent, CardMedia, Box} from '@mui/material';

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
                    sm: '500px', 
                    xs: '400px'
                }
            }}
        >
            
            <CardActionArea onClick={() => renderProject(project.id)}>
                <Box
                    sx={{ 
                        display: 'flex', 
                        flexDirection: 'column', 
                        justifyContent: { xs: 'flex-end', sm: 'flex-start' }, // Position at the bottom for xs
                        flexGrow: 1 // Allow this box to grow and push content down
                    }}
                >
                    <CardContent 
                        sx={{ 
                            alignContent: 'start',
                            width: {
                                sm: '40%'
                            },
                            maxWidth: '350px',
                            height: {                              
                                sm: '500px',
                                xs: '400px'
                            },
                            backgroundColor: 'rgba(0, 0, 0, 0.6)', // Dark gray background with transparency
                            padding: 2,
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