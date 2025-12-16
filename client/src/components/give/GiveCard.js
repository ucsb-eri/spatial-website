import React from "react";

import { Card, CardHeader, CardActionArea, CardMedia, CardContent, Typography, Link, Box, Button } from "@mui/material";

export default function GiveCard(props) {

    const { title, description, image, imageDescription, link, onEdit, onDelete } = props
    const imageRoute = process.env.NODE_ENV === "production" ? "/images/" : "http://localhost:3001/images/"
    
    const getImageUrl = (img) => {
        if (!img) return '';
        return img.startsWith('http') ? img : `${imageRoute}${img}`;
    };

    const handleCardClick = () => {
        if (!onEdit) {
            window.open(link, '_blank', 'noopener,noreferrer');
        }
    };

    return(
        <Card elevation={0} sx={{width: '100%', borderRadius: '0'}}>
            <Box onClick={handleCardClick} sx={{ cursor: onEdit ? 'default' : 'pointer' }}>
                <CardHeader
                    title={title}
                />
                
                <CardMedia
                    component="div"
                    alt={imageDescription}
                    sx={{
                        width: '100%',
                        height: '50vh',
                        backgroundImage: `url(${getImageUrl(image)})`,
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
                            <Link align='left' href={link} target="_blank" rel="noopener noreferrer">Donate Here!</Link>
                        ): (
                            <Typography>Donation link coming soon!</Typography>
                        )}
                    </Typography>
                    
                    {/* Admin Controls */}
                    {(onEdit || onDelete) && (
                        <Box sx={{ display: 'flex', gap: 1, mt: 2 }}>
                            {onEdit && (
                                <Button 
                                    variant='contained' 
                                    size="small"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        onEdit();
                                    }}
                                >
                                    Edit
                                </Button>
                            )}
                            {onDelete && (
                                <Button 
                                    variant='outlined' 
                                    color='error'
                                    size="small"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        onDelete();
                                    }}
                                >
                                    Delete
                                </Button>
                            )}
                        </Box>
                    )}

                </CardContent>
            </Box>
            

        </Card>
    )
}