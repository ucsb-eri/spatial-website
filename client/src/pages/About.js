import {React, useState, useContext} from 'react';
import { AdminLoginContext } from "../context/AdminProvider"
import { useProjectContext} from "../context/ProjectContext"
import CreateAboutPanel from '../components/CreateAboutPanel';

import PropTypes from 'prop-types'
import {Grid, Container, Typography, Paper, Tabs, Tab, Box, useMediaQuery, Toolbar, Button} from '@mui/material'
import LandingCarouselSlide from '../components/LandingCarouselSlide';

import { useQuery, useMutation } from '@apollo/client';
import { DELETE_ABOUTPANEL } from '../utils/mutations';

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
    const {editAboutPanelId, setEditAboutPanelId, aboutPanelData } = useProjectContext()

    const [newPanel, setNewPanel] = useState(false)
    const backToPanels = () => setNewPanel(false)
    const {value, setValue} = props

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const smallScreen = useMediaQuery("(max-width: 768px)");

    const [deletePanel] = useMutation(DELETE_ABOUTPANEL)
    const deleteAboutPanel = async (id) => {
        try {
            const panel = await deletePanel({ variables: {id: id}})
        } catch (err) {
            console.error("Could not delete delete about panel", err)
        }
    }

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
                    
                        
                            {/* { loading && (
                                <Typography>Loading</Typography>
                            )} */}
                            { aboutPanelData && (
                                <Box sx={{ flexGrow: 1, bgcolor: 'background.paper', display: smallScreen ? "block" : "flex", height: "100%" }}>
                                    <Tabs
                                        orientation={smallScreen ? "horizontal" : "vertical"}
                                        centered={smallScreen ? true : false}
                                        
                                        value={value}
                                        onChange={handleChange}
                                        aria-label="Vertical tabs"
                                        sx={{ borderRight: smallScreen ? 0 : 1, borderColor: 'divider', minWidth: '150px' }}
                                    >   
                                        {aboutPanelData.map((panel, id) => (
                                            <Tab label={panel.tabname} {...a11yProps(id)} />
                                        ))}
                                    </Tabs>
                                    {aboutPanelData.map((panel, id) => (
                                        <TabPanel value={value} index={id}>
                                            {panel.id !== editAboutPanelId ? (
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
                                                                <Button variant='contained' style={{maxWidth: 50}} onClick={() => {setEditAboutPanelId(panel.id)}}>Edit</Button>
                                                                <Button variant='contained' style={{maxWidth: 50}} onClick={() => {deleteAboutPanel(panel.id)}}>Delete</Button>
                                                            </Grid>
                                                        </Grid>
                                                    )}
                                                </Grid>
                                                
                                            ): (
                                                <CreateAboutPanel id={panel.id} description={panel.description} name={panel.name} tabname={panel.tabname} taborder={panel.taborder} />
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