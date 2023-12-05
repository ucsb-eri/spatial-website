import * as React from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CardActionArea from '@mui/material/CardActionArea';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

function PersonBio(props) {

    const {details, backToCards} = props
    console.log(details)
    console.log(backToCards)
    

    return (
        <Container>
            <Grid item align="left">
                <Button 
                    variant="text" 
                    onClick={() => backToCards()} 
                    startIcon={<ArrowBackIcon />}
                    sx={{maxWidth: "100px", marginBottom: "20px", marginTop: "20px"}}
                    align="left"
                    
                    >
                        Back
                </Button>
            </Grid>
                
                <Container maxWidth={80}>
                    {/* <Grid container direction="column" rowGap={1} columnGap={2} alignItems="center" justifyContent="center" mb={4}>
                        <Typography component= "h2" variant="h4" align="center">{details.name}</Typography>
                    </Grid> */}
                    

                    <Grid container direction="row" spacing={3} columnGap={6} justifyContent="center">
                        

                        {/* person's pic */}
                        <Grid item xs = {10} md = {4} align="center" alignItems="center" alignSelf="center">
                        
                            <Box
                            component="img"
                            sx={{
                                height: {xs: 300, md: 300 },
                                width: {xs: 250, md: 250 },
                            }}
                            alt=""
                            src={details.image}
                            align="center"
                            alignContent="center"
                            alignItems= "center"
                            />
                        </Grid>
                        
                        {/* Bio */}
                        <Grid item xs={12} md = {7} align="center" maxWidth="400px">
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
                    <Grid item>

                    </Grid>
                </Container>
                
            


        </Container>
    )

}

export default PersonBio