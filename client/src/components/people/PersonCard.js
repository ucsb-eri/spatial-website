import { React } from 'react';
import { Card, Box, CardActionArea, CardContent, CardMedia, Typography, Grid } from '@mui/material';
import { getImageUrl } from '../../utils/config';

function PersonCard(props) {
    
    const {details, renderPerson} = props
    const title = details.title
       
    return (
        <Grid item xs={10} sm={6} md={4}>
            <CardActionArea onClick={() => {renderPerson(details)}}>
                <Card >
                    <Box
                    sx={{
                        position: 'relative',
                        paddingTop: '95%', // Aspect ratio 16:9
                    }}
                    >
                        <CardMedia
                            component="img"
                            alt={`${details.firstName} ${details.lastName} headshot`}
                            src={getImageUrl(details.image)}
                            sx={{
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                width: '100%',
                                height: '100%',
                                objectFit: 'cover',
                            }}
                        />
                    </Box>
                    <CardContent>
                        <Typography gutterBottom mt={1}variant="h5" component="div">
                        {details.firstName} {details.lastName}
                        </Typography>
                        <Box
                        sx={{
                            height: '50px',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'start'
                        }}
                        >
                            {title && title.map((titleText, index) => (
                            <Typography key={index} variant="body1" color="text.secondary" sx={{'lineHeight': '25px'}}>
                                {titleText}
                            </Typography> 
                            ))}
                        </Box>
                        
                        
                    </CardContent>
                    {/* <CardActions>
                        <Button size="small">Share</Button>
                        <Button size="small">Learn More</Button>
                    </CardActions> */}
                </Card>
            </CardActionArea>
        </Grid>
      );

}

export default PersonCard
