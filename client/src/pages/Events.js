import {React, useState, useContext} from 'react';
import { AdminLoginContext } from "../context/AdminProvider"
import { useProjectContext} from "../context/ProjectContext"
import CreateInfoPanel from '../components/CreateInfoPanel';
import TabsContainer from '../components/TabsContainer';

import {Grid, Container, Typography, Paper, Tabs, Tab, Box, useMediaQuery, Toolbar, Button} from '@mui/material'
import LandingCarouselSlide from '../components/LandingCarouselSlide';

import { useQuery, useMutation } from '@apollo/client';
import { DELETE_INFOPANEL } from '../utils/mutations';


const mainAboutOverview = {
  title: '@ Spatial Center',
  description:
    "Collaborative Design, Implementation, and Dissemination of Spatial Science for a Better World",
  image: "https://www.geog.ucsb.edu/sites/default/files/styles/big_banner_desktop/public/2021-01/storke-sunrise-02.jpg?h=0197d72c&itok=IAbqYhXS",
  imageText: 'main image description',
  linkText: 'Continue reading…',
  color: 'white'
};


export default function Events(props) {
    const { isLoggedIn } = useContext(AdminLoginContext)
    const {editInfoPanelId, setEditInfoPanelId, infoPanelData } = useProjectContext()
    
    let eventPanelData
    if (infoPanelData) {
        eventPanelData = infoPanelData.filter(panel => panel.location === "events")
    }
    console.log(eventPanelData)

    const [newPanel, setNewPanel] = useState(false)
    const backToPanels = () => setNewPanel(false)
    
    const {value, setValue} = props

    const [deleteInfoPanel] = useMutation(DELETE_INFOPANEL)
    

    return(
        <>
            {newPanel ? (
                    // <CreateAboutPanel onSubmit={backToPanels}/>
                    <CreateInfoPanel location="events" onSubmit={backToPanels} />
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
                    
                    
                            { eventPanelData && (
                                <TabsContainer 
                                    editPanelId = {editInfoPanelId} 
                                    setEditPanelId = {setEditInfoPanelId} 
                                    panelData = {eventPanelData} 
                                    deletePanelMutation = {deleteInfoPanel} 
                                    value = {value} 
                                    setValue = {setValue}
                                    location = "about"
                                     />
                            )}  
                                                
                        { isLoggedIn && (
                            <Button variant='contained' style={{maxWidth: 200}} onClick={() => {setNewPanel(true)}}>Add new panel</Button>
                        )}
                    
                    </Grid>
            )}        
        
        </>
        
    )
}