import { React } from 'react';
import { Grid, Card, CardContent, CardActionArea, Typography, Box, styled, Link } from '@mui/material';
import WebIcon from '@mui/icons-material/Web';

const HoverLink = styled(Link)(({ theme }) => ({
    transition: 'background-color 0.3s ease',
    '&:hover': {
      backgroundColor: theme.palette.action.hover,
      cursor: 'pointer'
    }
  }));

function AffiliateCard(props) {
    
    const {details} = props
    const showWebsite = details.websiteUrl !== null && details.websiteUrl!== ""
       
    return (
        <Grid item xs={8} sm={5} lg={4}>
            <Card sx={{ width: "100%", height: '200px' }}>
                <CardActionArea 
                    onClick={() => window.open(details.description, '_blank', 'noopener,noreferrer')} 
                    sx={{height: '100%'}}
                    aria-label={`View ${details.firstName} ${details.lastName}'s page`}
                >
                    <CardContent sx={{display: 'flex', heigth: '100%', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
                        
                        <Typography variant="h5" mb={1} mt={2}>
                            {details.firstName} {details.lastName}
                        </Typography>
                        <Typography variant="body1" color="text.secondary"  mb={1}>
                            {details.title}
                        </Typography>
                      
                        {showWebsite && (
                            <Box 
                                mb={1} 
                                sx={{display:"flex", flexDirection: "row", flexWrap: "nowrap", alignItems: "center", justifyContent:"center"}}
                                onClick={(e) => {
                                    e.stopPropagation(); // Prevent card click when clicking website link
                                    window.open(details.websiteUrl, '_blank', 'noopener,noreferrer');
                                }}
                            >
                                <Box 
                                    component="span"
                                    sx={{
                                        color: '#027C91',
                                        cursor: 'pointer',
                                        '&:hover': {
                                            textDecoration: 'underline'
                                        }
                                    }}
                                    role="button"
                                    tabIndex={0}
                                    aria-label={`Visit ${details.websiteName || 'website'}`}
                                >
                                    {details.websiteName !== null ? (
                                        <Typography variant="body2" >
                                        {details.websiteName}
                                        </Typography>
                                    ) : (
                                        <WebIcon 
                                        flex= {1}
                                        flexShrink={1}
                                        className='logos'
                                        sx={{fontSize: '20px', color: '#027C91'}}
                                        />
                                    )}
                                </Box>
                            </Box>
                        )}

                        <Typography variant="body2" color="text.secondary">
                            {details.research}
                        </Typography>
                       
                    </CardContent>
                </CardActionArea>
            </Card>
        
        </Grid>
      );

}

export default AffiliateCard
