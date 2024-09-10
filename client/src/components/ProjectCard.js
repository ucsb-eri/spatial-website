import { React} from 'react';

import {Typography, Card, CardActionArea, CardContent, CardMedia, Box} from '@mui/material';

export default function ProjectCard(props) {

    const { project, index, renderProject } = props
    const imageRoute = process.env.NODE_ENV === "production" ? "https://spatialtest.grit.ucsb.edu/images/" : "http://localhost:3001/images/"
    console.log("modulo?: ", index%2)
    const cardDirection = index%2 === 0 ? 'row' : 'row-reverse' 
    console.log(project.name, cardDirection)

    return(
        <Card  key={project.id} mb={3}>
            <CardActionArea sx={{display: 'flex', flexDirection: {'xs': 'column', 'sm': 'column-reverse', 'md': cardDirection}}} onClick={() => renderProject(project.id)}>
                <Box sx={{display: {xs: 'flex', sm: 'block'}, flexDirection: 'column'}}>
                    <CardContent 
                        sx={{ 
                            flex: '1 0 auto',
                            height: {                              
                                sm: '200px'
                             }
                        }}
                        
                        >
                        <Typography component="div" variant="h5">
                            {project.name}
                        </Typography>
                        <Typography component="div" variant="h6" sx={{color: 'text.secondary'}}>
                            {"Test description that is around 300 character? Gotta fill this in as a good example.... we'll see!"}
                        </Typography>
                    </CardContent>
                </Box>
                <CardMedia 
                    component="img" 
                    sx={{minWidth: {'sm': '100%', 'md': '450px'}}}
                    image={imageRoute + project.image}
                    alt={`image of ${project.name}`}
                    />
            </CardActionArea>
        </Card>
    )
}