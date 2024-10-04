import React from "react";

import { Card, CardHeader, CardActionArea, CardMedia, CardContent, Typography } from "@mui/material";

export default function GiveCard(props) {

    const { title, description, image, imageDescription, link } = props

    return(
        <Card sx={{width: '100%'}}>
            <CardActionArea href={link} target="_blank">
                <CardHeader
                    title={title}
                />

                
            <CardMedia
                    component="div"
                    
                    alt={imageDescription}
                    sx={{
                        width: '100%',
                        height: '50vh',
                        backgroundImage: `url(${image})`,
                        backgroundSize: 'cover',
                        backgroundRepeat: 'no-repeat',
                        backgroundPosition: 'center',
                        
                    }}
                />
            <CardContent>
                <Typography variant="h6" component="h4">
                    {description}
                </Typography>
            </CardContent>
            </CardActionArea>
            

        </Card>
    )
}