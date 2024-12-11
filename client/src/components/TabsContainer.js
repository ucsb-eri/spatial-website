import {React, useContext} from 'react';
import { AdminLoginContext } from "../context/AdminProvider"
import CreateInfoPanel from './CreateInfoPanel';


import PropTypes from 'prop-types'
import {Grid, Typography, Card, Tabs, Tab, Box, useMediaQuery, Toolbar, Button} from '@mui/material'
import ContentCard from './ContentCard';

import AccordionContent from './AccordionContent';


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


export default function TabsContainer(props) {
    const { isLoggedIn } = useContext(AdminLoginContext)
    const {editPanelId, setEditPanelId, panelData, deletePanelMutation, value, setValue, location } = props

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const smallScreen = useMediaQuery("(max-width: 768px)");

    const deletePanel = async (id) => {
        try {
            const panel = await deletePanelMutation({ variables: {id: id}})
        } catch (err) {
            console.error("Could not delete delete about panel", err)
        }
    }

    return(
                   
        <Box sx={{ flexGrow: 1, bgcolor: 'background.paper', display: smallScreen ? "block" : "flex", height: "100%" }}>
            <Tabs
                orientation={smallScreen ? "horizontal" : "vertical"}
                centered={smallScreen ? true : false}
                value={value}
                onChange={handleChange}
                aria-label="Vertical tabs"
                sx={{ borderRight: smallScreen ? 0 : 1, borderColor: 'divider', minWidth: '200px' }}
            >   
                {panelData.map((panel, id) => (
                    <Tab label={panel.tabname} {...a11yProps(id)} />
                ))}
            </Tabs>



            {panelData.map((panel, id) => (
                <TabPanel value={value} index={id}>
                    {panel.id !== editPanelId ? (
                        <Grid container direction='row' justifyContent='center'>
                            <Grid item xs={12} md={11}>                                   
                                <Toolbar align='left' disableGutters={true}>
                                    <Typography variant='h4' align='left' paddingBottom="5px" borderBottom={1} borderColor="divider">
                                        {panel.name}
                                    </Typography>
                                </Toolbar>
                                <Card elevation={0} sx={{borderRadius: '0'}}>
                                { panel.content.map((content) => (
                                    <ContentCard content={content} />
                                ))}                                

                                { panel.accordion && (                                  
                                    <AccordionContent accordions={panel.accordion} />                             
                                )}
                    
                                </Card>
                            </Grid>
                            { isLoggedIn && (
                                <Grid xs={12}>
                                    <Grid container direction="row">
                                        <Button variant='contained' style={{maxWidth: 50}} onClick={() => {setEditPanelId(panel.id)}}>Edit</Button>
                                        <Button variant='contained' style={{maxWidth: 50}} onClick={() => {deletePanel(panel.id)}}>Delete</Button>
                                    </Grid>
                                </Grid>
                            )}
                        </Grid> 
                    ): (
                        <CreateInfoPanel location={location} id={panel.id} description={panel.description} name={panel.name} tabname={panel.tabname} taborder={panel.taborder} />
                    )}
                </TabPanel> 
            ))}             
        </Box>                               
    )
}