import * as React from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Avatar from '@mui/material/Avatar';
import MailIcon from '@mui/icons-material/Mail';
import WorkIcon from '@mui/icons-material/Work';
import PhoneIcon from '@mui/icons-material/Phone';
import WebsiteIcon from '@mui/icons-material/Web'


function PersonBio(props) {

    const {details, backToCards} = props
    console.log(details)
    console.log(backToCards)
    

    return (
        <Container maxWidth={100}>
            <Grid item align="left">
                <Button 
                    variant="text" 
                    onClick={() => backToCards()} 
                    startIcon={<ArrowBackIcon />}
                    sx={{maxWidth: "100px", marginTop: "20px"}}
                    align="left"

                    >
                        Back
                </Button>
            </Grid>
                
                <Container sx={{md: "80%", sm: "100%", marginTop: "50px"}}>
                    {/* <Grid container direction="column" rowGap={1} columnGap={2} alignItems="center" justifyContent="center" mb={4}>
                        <Typography component= "h2" variant="h4" align="center">{details.name}</Typography>
                    </Grid> */}
                    

                    <Grid container direction="row" rowGap="40px" columnGap={6} justifyContent="center" alignItems="top" minHeight="400px" >
                        
                        <Grid item justifyContent="center" alignItems="center" align="center">
                            {/* person's pic */}
                            <Card sx={{ width: 300 }}>
                                <CardMedia
                                    component="img"
                                    alt="green iguana"
                                    height="400"
                                    src= {details.image}
                                    align="center"
                                />
                            </Card>
                        </Grid>
                        
                        {/* Bio */}
                        <Grid 
                            item 
                            justifyContent="center" 
                            sx={{maxWidth: 
                                    {
                                        xs: '100%',
                                        sm: '100%',
                                        md: '600px',
                                        lg: '600px',
                                        xlg: '600px'
                                    }
                                }} 
                        >
                            <Typography component= "h2" variant="h4" align="left" mb={2}>{details.name}</Typography>
                            <Typography component= "h2" variant="h6" align="left" mb={1}>{details.titles}</Typography>
                            
                            <Typography align="left" paragraph>
                                The Center for Spatial Studies focuses on promoting spatial thinking and spatial analytics across academia, industry, and government agencies, and across disciplines ranging from the humanities to the physical sciences with a particular focus on novel Spatial Data Science methods and Knowledge Graphs.
                            </Typography>
                            <Typography align="left" paragraph>
                                The center has expertise in spatiotemporally-explicit machine learning, in the formal representation of spatial phenomena including but not limited to geographic space, knowledge engineering, as well as in methods to improve the publication, retrieval, reuse, and integration of heterogeneous data across domain boundaries.
                            </Typography>
                            

                        </Grid>
                    </Grid>
                    
                    {/* contact info + links? */}
                    <Grid container sx={{marginTop: "60px"}}>
                        <Grid item
                            sx={{
                                display: 'flex',
                                flexDirection: 'row', // Set the direction to row for horizontal alignment
                                justifyContent: 'space-between',
                                width: '100%',
                                bgcolor: 'background.paper',
                                flexWrap: 'wrap'
                            }}
                            >
                            <Box sx={{display:"flex", flexDirection: "row", flexWrap: "nowrap", alignItems: "center", marginBottom:'20px'}}>
                                <Avatar>
                                    <MailIcon />
                                </Avatar>
                                <Typography  sx={{ paddingLeft: "15px", paddingRight: "15px",  whiteSpace: 'nowrap'}}>
                                    tnelson@gmail.com
                                </Typography>
                            </Box>
                            <Box sx={{display:"flex", flexDirection: "row", flexWrap: "nowrap", alignItems: "center", marginBottom:'20px'}}>
                                <Avatar>
                                    <WorkIcon />
                                </Avatar>
                                <Typography  sx={{ paddingLeft: "15px", paddingRight: "15px",  whiteSpace: 'nowrap'}}>
                                1111 Elison Hall
                                </Typography>
                            </Box>
                            <Box sx={{display:"flex", flexDirection: "row", flexWrap: "nowrap", alignItems: "center", marginBottom:'20px'}}>
                                <Avatar>
                                    <PhoneIcon />
                                </Avatar>
                                <Typography sx={{ paddingLeft: "15px", paddingRight: "15px",  whiteSpace: 'nowrap'}}>
                                    805-444-4444
                                </Typography>
                            </Box>
                            <Box sx={{display:"flex", flexDirection: "row", flexWrap: "nowrap", alignItems: "center", marginBottom:'20px'}}>
                                <Avatar>
                                    <WebsiteIcon />
                                </Avatar>
                                <Typography sx={{ paddingLeft: "15px", paddingRight: "15px",  whiteSpace: 'nowrap'}}>
                                    805-444-4444
                                </Typography>
                            </Box>
                            
                        </Grid>
                            
                    </Grid>
                </Container>
                
            


        </Container>
    )

}

export default PersonBio