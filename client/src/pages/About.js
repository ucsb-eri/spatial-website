import * as React from 'react';
import PropTypes from 'prop-types'
import {Grid, Container, Typography, Paper, Tabs, Tab, Box, useMediaQuery, Toolbar} from '@mui/material'
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
        <Grid item>
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
                {/* Overview */}
                <TabPanel value={value} index={0}>
                    <Grid container direction='row' spacing={4} justifyContent='center'>
                        <Grid item xs={12} md={11}>
                            
                            <Toolbar align='left' disableGutters={true}>
                                <Typography variant='h5' align='left'  marginBottom="30px" paddingBottom="5px" borderBottom={1} borderColor="divider">
                                    Overview
                                </Typography>
                            </Toolbar>
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
                {/* History */}
                <TabPanel value={value} index={1}>
                    <Grid container direction='row' spacing={4} justifyContent='center'>
                        <Grid item xs={12} md={11}>
                            
                            <Toolbar  align='left' disableGutters={true}>
                                <Typography variant='h5' align='left'  marginBottom="30px" paddingBottom="5px" borderBottom={1} borderColor="divider">
                                    History
                                </Typography>
                            </Toolbar>
                            <Typography align="left" paragraph>
                                The Center for Spatial Studies and Data Science (@Spatial) was founded in July 2007 through an initiative by Professor Michael Goodchild. The vision of a Center for Spatial Studies was developed by a special committee that met in the first few months of 2007 with a mandate to consider the state of spatial thinking, data, and tools across the campus. The committee recommended the establishment of a center whose primary objective would be to develop spatial thinking as an approach to scholarship, supporting its use across the entire range of disciplines at UCSB.
                            </Typography>
                            <Typography align="left" paragraph>
                                Upon Professor Goodchild’s retirement in July 2012, Mary Hegarty (Dept. of Psychological & Brain Sciences) served as interim director from 2012 to 2013, until Werner Kuhn was appointed Chair of the Jack and Laura Dangermond Endowment, director of @Spatial, and professor in the Dept. of Geography. Briefly, @Spatial provided several innovative educational resources and services to the academic community at UCSB and beyond. These included a consulting service (the GIS Help Desk) and two seminar series (ThinkSpatial and Spatial Technology Lunches); community outreach (most notably an annual poster and plenary session, spatial@ucsb.local); office space for students and visitors; student internships; a Specialist Meeting series; a new series of Spatial Un-conferences (participant-driven meetings); a Minor in Spatial Studies; and a Freshman Seminar in Thinking Spatially in the Arts and Sciences. These offerings helped enrich the resources at UCSB for spatially-enabled research and contributed to developing a strong interdisciplinary thread of spatial studies and broadening undergraduate and graduate educational opportunities. 
                            </Typography>
                            <Typography align="left" paragraph>
                                After focusing on raising awareness (2008–2012), on introducing spatially-enabled knowledge infrastructures (2013–2016), and on spatially enabled and sensor-driven smart communities (2017–2020), @Spatial was well positioned to address a new cross-cutting theme. Under its former director, Dr. Krzysztof Janowicz (2020-2023), @Spatial shifted its focus to Spatial Data Science and Knowledge Graphs, thereby also connecting more closely to a campus emphasis that had steadily grown over @Spatial’s past funding period. More specifically, @Spatial focused on spatiotemporally explicit machine learning models operating on these graphs.
                            </Typography>
                            <Typography align="left" paragraph>
                                Since 2023, @Spatial has been led by Professor Trisalyn Nelson and has continued to establish its presence as a premier research center in Geographic Information Sciences. The leadership team has expanded to include Professor Nelson (Director), Professor Somayeh Dodge (Associate Director), Professor Alan Murray (Associate Director), Professor Amy Frazier (Core Faculty), and Professor Peter Kedron (Core Faculty). This cohesive team integrates geographic information systems, spatial analysis, coding, statistics, optimization, and remote sensing for the analysis of spatial data. Through strategic partnerships on campus and within industry partnerships, they advance @Spatial’s mission to propel spatial data science at UC Santa Barbara by leading interdisciplinary discovery, education, and access to actionable solutions.
                            </Typography>
                            
                        </Grid>
                        
                    </Grid>
                </TabPanel>
                {/* eScholarship */}
                <TabPanel value={value} index={2}>
                <Grid container direction='row' spacing={4} justifyContent='center'>
                        <Grid item xs={12} md={11}>
                            
                            <Toolbar  align='left' disableGutters={true}>
                                <Typography variant='h5' align='left'  marginBottom="30px" paddingBottom="5px" borderBottom={1} borderColor="divider">
                                    The Center's Archive on eScholarship
                                </Typography>
                            </Toolbar>
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
                            
                            
                            
                        </Grid>
                        
                    </Grid>
                </TabPanel>
      
            </Box>

          
      </Grid>
    )
}