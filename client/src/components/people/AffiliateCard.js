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
    
    const {details, key} = props
    const showWebsite = details.websiteUrl !== null && details.websiteUrl!== ""
       
    return (
        <Grid item xs={8} sm={5} lg={4} key={key}>
            <CardActionArea href={details.description} target='_blank' rel="noopener noreferrer" sx={{height: '200px'}}>
                <Card sx={{ width: "100%", height: '100%' }}>
                <CardContent sx={{display: 'flex', heigth: '100%', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
                    
                    <Typography variant="h5" mb={1} mt={2}>
                        {details.firstName} {details.lastName}
                    </Typography>
                    <Typography variant="body1" color="text.secondary"  mb={1}>
                        {details.title}
                    </Typography>
                  
                    {showWebsite && (
                        <Box mb={1} sx={{display:"flex", flexDirection: "row", flexWrap: "nowrap", alignItems: "center", justifyContent:"center"}}>
                            <HoverLink href={details.websiteUrl} rel="noopener noreferrer" target="_blank" color='#027C91' underline='hover'>
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
                                )
                                    }
                            
                        </HoverLink>
                        
                    </Box>)}

                    <Typography variant="body2" color="text.secondary">
                        {details.research}
                    </Typography>
                   
                </CardContent>
                </Card>
            </CardActionArea>
        
        </Grid>
      );

}

export default AffiliateCard
