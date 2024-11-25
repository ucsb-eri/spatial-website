import React from "react";

import { Card, CardHeader, CardActionArea, CardMedia, CardContent, Typography, Link } from "@mui/material";

export default function GiveCard(props) {

    const { title, description, image, imageDescription, link } = props

    return(
        <Card elevation={0} sx={{width: '100%', borderRadius: '0'}}>
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
                <Typography variant="h6" paragraph align='left' component="h4">
                    {description}
                </Typography>
                <Typography variant="h6" align='left' component="h4">
                    {link ? (
                        <Link align='left' href={link} target="_blank">Donate Here!</Link>
                    ): (
                        <p>Donatation link coming soon!</p>
                    )}
                </Typography>
                
                

            </CardContent>
            </CardActionArea>
            

        </Card>
    )
}