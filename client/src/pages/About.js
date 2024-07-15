import {React, useState, useContext} from 'react';
import { AdminLoginContext } from "../context/AdminProvider"
import { useAboutPanelContext} from "../components/contexts/AboutPanelContext"
import CreateAboutPanel from '../components/CreateAboutPanel';

import PropTypes from 'prop-types'
import {Grid, Container, Typography, Paper, Tabs, Tab, Box, useMediaQuery, Toolbar, Button} from '@mui/material'
import LandingCarouselSlide from '../components/LandingCarouselSlide';

import { useQuery, useMutation } from '@apollo/client';
import { GET_ABOUTPANELS } from '../utils/queries';

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
    const { isLoggedIn } = useContext(AdminLoginContext)
    const {editPanelId, setEditPanelId} = useAboutPanelContext()

    const [newPanel, setNewPanel] = useState(false)
    const backToPanels = () => setNewPanel(false)
    const {value, setValue} = props

    const {loading, data, error} = useQuery(GET_ABOUTPANELS)
    
    let panels = false
    if (!error && !loading){
        panels = data.aboutPanels
    }

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const smallScreen = useMediaQuery("(max-width: 768px)");
    console.log(smallScreen)

    return(
        <>
            {newPanel ? (
                    <CreateAboutPanel onSubmit={backToPanels}/>
                ) : (
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
                    
                        
                            { loading && (
                                <Typography>Loading</Typography>
                            )}
                            { panels && (
                                <Box sx={{ flexGrow: 1, bgcolor: 'background.paper', display: smallScreen ? "block" : "flex", height: "100%" }}>
                                    <Tabs
                                        orientation={smallScreen ? "horizontal" : "vertical"}
                                        centered={smallScreen ? true : false}
                                        
                                        value={value}
                                        onChange={handleChange}
                                        aria-label="Vertical tabs"
                                        sx={{ borderRight: smallScreen ? 0 : 1, borderColor: 'divider', minWidth: '150px' }}
                                    >   
                                        {panels.map((panel, id) => (
                                            <Tab label={panel.name} {...a11yProps(id)} />
                                        ))}
                                    </Tabs>
                                    {panels.map((panel, id) => (
                                        <TabPanel value={value} index={id}>
                                            {panel.id !== editPanelId ? (
                                                <Grid container direction='row' spacing={4} justifyContent='center'>
                                                    <Grid item xs={12} md={11}>                                   
                                                        <Toolbar align='left' disableGutters={true}>
                                                            <Typography variant='h5' align='left'  marginBottom="30px" paddingBottom="5px" borderBottom={1} borderColor="divider">
                                                                {panel.name}
                                                            </Typography>
                                                        </Toolbar>
                                                        <Typography align="left"><div dangerouslySetInnerHTML={{__html: panel.description}} /></Typography>
                                                    </Grid>
                                                    { isLoggedIn && (
                                                        <Grid xs={12}>
                                                            <Grid container direction="row">
                                                                <Button variant='contained' style={{maxWidth: 50}} onClick={() => {setEditPanelId(panel.id)}}>Edit</Button>
                                                                <Button variant='contained' style={{maxWidth: 50}} onClick={() => {setEditPanelId(panel.id)}}>Delete</Button>
                                                            </Grid>
                                                        </Grid>
                                                    )}
                                                </Grid>
                                                
                                            ): (
                                                <CreateAboutPanel id={panel.id} description={panel.description} name={panel.name} />
                                            )}
                                        </TabPanel>
                                        
                                    ))}
                                    
                                </Box>
                            )}  
                                                
                         
                        { isLoggedIn && (
                            <Button variant='contained' style={{maxWidth: 200}} onClick={() => {setNewPanel(true)}}>Add new panel</Button>
                        )}
                    
                    </Grid>
            )}        
        
        </>
        
    )
}