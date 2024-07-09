import * as React from 'react';
import PropTypes from 'prop-types'
import {Grid, Container, Typography, Paper, Tabs, Tab, Box, useMediaQuery} from '@mui/material'
import LandingCarouselSlide from '../components/LandingCarouselSlide';

function TabPanel(props) {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`vertical-tabpanel-${index}`}
        aria-labelledby={`vertical-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box sx={{ p: 3 }}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }
  
  TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
  };
  
  function a11yProps(index) {
    return {
      id: `vertical-tab-${index}`,
      'aria-controls': `vertical-tabpanel-${index}`,
    };
  }

const mainAboutOverview = {
  title: '@ Spatial Center',
  description:
    "Spatial Center one liner description",
  image: "https://www.geog.ucsb.edu/sites/default/files/styles/big_banner_desktop/public/2021-01/storke-sunrise-02.jpg?h=0197d72c&itok=IAbqYhXS",
  imageText: 'main image description',
  linkText: 'Continue reading…',
};

export default function About(props) {
    const {value, setValue} = props

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const smallScreen = useMediaQuery("(max-width: 768px)");
    console.log(smallScreen)

    return(
        <Container maxWidth="lg">
            <Paper
                sx={{
                    position: 'relative',
                    backgroundColor: 'grey.800',
                    color: '#fff',
                    mb: 4,
                    maxHeight: '50vh',
                    height: '400px',
                    backgroundSize: 'cover',
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'center',
                    backgroundImage: `url(${mainAboutOverview.image})`,
                }}>
                <LandingCarouselSlide post={mainAboutOverview} />
            </Paper>
        
            <Box sx={{ flexGrow: 1, bgcolor: 'background.paper', display: smallScreen ? "block" : "flex", height: "100%" }}>
                
                <Tabs
                    orientation={smallScreen ? "horizontal" : "vertical"}
                    centered={smallScreen ? true : false}
                    
                    value={value}
                    onChange={handleChange}
                    aria-label="Vertical tabs"
                    sx={{ borderRight: smallScreen ? 0 : 1, borderColor: 'divider', minWidth: '150px' }}
                >
                    <Tab label="Overview" {...a11yProps(0)} />
                    <Tab label="History" {...a11yProps(1)} />
                    <Tab label="escholarship" {...a11yProps(2)} />
                </Tabs>
                <TabPanel value={value} index={0}>
                    <Grid container direction='row' spacing={4} justifyContent='space-between'>
                        <Grid item xs={12} md={10}>
                            
                            <Typography align='left' variant='h5' paragraph>
                                Overview
                            </Typography>
                            <Typography align="left" paragraph>
                                The Center for Spatial Studies focuses on promoting spatial thinking and spatial analytics across academia, industry, and government agencies, and across disciplines ranging from the humanities to the physical sciences with a particular focus on novel Spatial Data Science methods and Knowledge Graphs.
                            </Typography>
                            <Typography align="left" paragraph>
                                The center has expertise in spatiotemporally-explicit machine learning, in the formal representation of spatial phenomena including but not limited to geographic space, knowledge engineering, as well as in methods to improve the publication, retrieval, reuse, and integration of heterogeneous data across domain boundaries.
                            </Typography>
                            <Typography align="left" paragraph>
                                Following the insight that understanding when and where things happen is key to understanding why they happened or will happen, our vision is to demonstrate how (geographic) space and time act as convergence catalysts to integrate heterogeneous data across domains to answer complex social and scientific questions that cannot be answered from within one domain alone. Our mission is to develop spatially and temporally explicit techniques for the creation, filtering, linkage, synthesis, prediction, and forecasting of information in large-scale, cross-domain data repositories and knowledge graphs.
                            </Typography>
                            <Typography align="left" paragraph>
                            The center is particularly interested in regional and cultural differences in the conceptualization of geographic space with the ultimate goal of assisting machines to better understand the information needs of an increasingly diverse user base.
                            </Typography>
                        </Grid>
                        

                    </Grid>
                </TabPanel>
                <TabPanel value={value} index={1}>
                    <Grid container direction='row' spacing={4} justifyContent='space-between'>
                        <Grid item xs={12} md={10}>
                            
                            <Typography align='left' variant='h5' paragraph>
                                History
                            </Typography>
                            <Typography align="left" paragraph>
                                The Center for Spatial Studies (spatial@ucsb) was founded in July 2007 through an initiative by Professor Michael Goodchild. Upon his retirement in July 2012, Professor Mary Hegarty (Department of Psychological and Brain Sciences) assumed the directorship. Beginning November 2013, Werner Kuhn will be the director of the center and Hegarty will be the codirector.    The founding vision of the center was to develop spatial thinking as an approach to scholarship, supporting its use across the entire range of disciplines at UCSB for research and education.
                            </Typography>
                            <Typography align="left" paragraph>
                                The Center for Spatial Studies, also known as spatial@ucsb, was established in July 2007 with three years of funding from the 
                                Executive Vice-Chancellor. This report describes the center’s activities and achievements to date. 
                                The vision of a Center for Spatial Studies was developed by a special committee that met in the first few months of 2007 with a 
                                mandate to consider the state of spatial thinking, data, and tools across the campus. The committee recommended the establishment 
                                of a center whose primary objective would be to develop spatial thinking as an approach to scholarship, supporting its use across 
                                the entire range of disciplines at UCSB. 
                                </Typography>
                            <Typography align="left" paragraph>
                                To be continued... 
                            </Typography>
                            
                        </Grid>
                        
                    </Grid>
                </TabPanel>
                <TabPanel value={value} index={2}>
                <Grid container direction='row' spacing={4} justifyContent='space-between'>
                        <Grid item xs={12} md={10}>
                            
                            <Typography align='left' variant='h5' paragraph>
                                The Center's Archive on eScholarship
                            </Typography>
                            <Typography align="left" paragraph>
                            The Center for Spatial Studies has created an archive through the <b>California Digital Library's 
                            eScholarship initiative</b> to preserve in perpetuity, and to enhance access to, the accomplishments and 
                            publications of the National Center for Geographic Information and Analysis (NCGIA), the Center for Spatially 
                            Integrated Social Science (CSISS), and the Center for Spatial Studies (spatial@ucsb).
                            </Typography>
                            <Typography align="left" paragraph>
                                The initiative is led by <a href='https://escholarship.org/' target='_'>https://escholarship.org/</a>:
                                <ul>
                                    <li>Archive for the <a href='https://escholarship.org/uc/spatial_ucsb'>UCSB Center for Spatial Studies</a> (since 2007)</li>
                                    <li>Archive for the <a href='https://escholarship.org/uc/spatial_ucsb_ncgia'>National Center for Geographic Information and Analysis (NCGIA)</a> (1988-1999)</li>
                                
                                </ul>
                            </Typography>
                            <Typography align="left" paragraph>
                                The archive is available at <a href='#' target='_'>Professor Emeritus Don Janelle</a>.
                            </Typography>
                            <Typography align="left" paragraph>
                                The Center for Spatial Studies, also known as spatial@ucsb, was established in July 2007 with three years of funding from the 
                                Executive Vice-Chancellor. This report describes the center’s activities and achievements to date. 
                                The vision of a Center for Spatial Studies was developed by a special committee that met in the first few months of 2007 with a 
                                mandate to consider the state of spatial thinking, data, and tools across the campus. The committee recommended the establishment 
                                of a center whose primary objective would be to develop spatial thinking as an approach to scholarship, supporting its use across 
                                the entire range of disciplines at UCSB. 
                                </Typography>
                            <Typography align="left" paragraph>
                                To be continued... 
                            </Typography>
                            
                        </Grid>
                        
                    </Grid>
                </TabPanel>
      
            </Box>

          
      </Container>
    )
}