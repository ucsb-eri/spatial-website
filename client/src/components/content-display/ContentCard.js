import { React } from 'react'
import { Typography, Grid, CardContent, CardMedia, Box } from '@mui/material'
import sanitizeHtml from '../../utils/sanitizeHtml'

export default function ContentCard(props) {
    const { content } = props
    const imageRoute = process.env.NODE_ENV === "production" ? "/images/" : "http://localhost:3001/images/"
    
    // Helper to get image URL - handles both old format (string) and new format (object with url/label)
    const getImageUrl = (image) => {
        if (typeof image === 'string') {
            // Old format: just a string (URL or filename)
            return image.startsWith('http') ? image : imageRoute + image;
        }
        // New format: object with url and optional label
        return image.url.startsWith('http') ? image.url : imageRoute + image.url;
    };

    // Helper to get image label
    const getImageLabel = (image) => {
        return typeof image === 'string' ? '' : (image.label || '');
    };

    // Sanitize HTML content before rendering to prevent XSS attacks
    const sanitizedDescription = sanitizeHtml(content.description);

    return (

        content.image && content.image.length > 0 ? (
            <Grid container justifyContent='center' columnSpacing={4}>
                
                <Grid item xs={12} md={11} lg={7}>
                    <CardContent sx={{textAlign: 'left'}}>
                        {content.subtitle && (                            
                            <Typography sx={{textTransform: 'none'}} align="left" variant='h6' paragraph>
                                {content.subtitle}
                            </Typography>
                        )}
                        <div className="fontTheme" dangerouslySetInnerHTML={{__html: sanitizedDescription}}/>
                    </CardContent>
                </Grid>
                
                { content.image.map((image, index) => {
                    const imageUrl = getImageUrl(image);
                    const imageLabel = getImageLabel(image);
                    return (
                        <Grid item key={index} xs={10} md={9} lg={5}>
                            <Box 
                                component="figure" 
                                sx={{ margin: 0, padding: 0 }}
                                role="img"
                                aria-label={imageLabel || `Content image ${index + 1}`}
                            >
                                <CardMedia
                                    component="img"
                                    alt={imageLabel || `Content image ${index + 1}`}
                                    src={imageUrl}
                                    align="left"
                                    sx={{ width: '100%' }}
                                    loading="lazy"
                                />
                                {imageLabel && (
                                    <Typography 
                                        component="figcaption"
                                        variant="caption" 
                                        sx={{ 
                                            display: 'block',
                                            mt: 1,
                                            textAlign: 'center',
                                            color: 'text.secondary',
                                            fontStyle: 'italic'
                                        }}
                                    >
                                        {imageLabel}
                                    </Typography>
                                )}
                            </Box>
                        </Grid>
                    );
                })}      
                
            </Grid>
            ): (
            <CardContent>
                {content.subtitle && (
                    <Typography sx={{textTransform: 'none'}} align="left" variant='h6' paragraph>
                        {content.subtitle}
                    </Typography>
                )}
                <Typography component="div" sx={{textTransform: 'none'}} align="left">
                    <div className='fontTheme' dangerouslySetInnerHTML={{__html: sanitizedDescription}}/>
                </Typography>
            </CardContent>
        )
    )

}