import {React, useState, useContext} from 'react';
import { Outlet } from 'react-router-dom';
import { AdminLoginContext } from "../context/AdminProvider"
import { useProjectContext} from "../context/ProjectContext"
import CreateInfoPanel from '../components/content-display/CreateInfoPanel';
import TabsContainer from '../components/navigation/TabsContainer';
import PanelTabs from '../components/navigation/PanelTabs';

import {Container, Grid, Paper, Button, Box, useMediaQuery} from '@mui/material'
import LandingCarouselSlide from '../components/LandingCarouselSlide';

import { useMutation } from '@apollo/client';
import { DELETE_INFOPANEL } from '../utils/mutations';


const mainOppsOverview = {
  title: '@ Spatial Center',
  description:
    "Collaborative Design, Implementation, and Dissemination of Spatial Science for a Better World",
  image: "https://www.geog.ucsb.edu/sites/default/files/styles/big_banner_desktop/public/2021-01/storke-sunrise-02.jpg?h=0197d72c&itok=IAbqYhXS",
  color: 'white'
};


export default function Opportunities(props) {
    const { isLoggedIn } = useContext(AdminLoginContext)
    const {editInfoPanelId, setEditInfoPanelId, infoPanelData } = useProjectContext()
    
    let oppsPanelData
    if (infoPanelData) {
        oppsPanelData = infoPanelData.filter(panel => panel.location === "opportunities")
    }

    const [newPanel, setNewPanel] = useState(false)
    const backToPanels = () => setNewPanel(false)
    
    const {value, setValue} = props
    const [deleteInfoPanel] = useMutation(DELETE_INFOPANEL)
    
    const smallScreen = useMediaQuery("(max-width: 768px)");

    return(
        <Container maxWidth='xl' disableGutters={true}>
            {newPanel ? (
                    // <CreateAboutPanel onSubmit={backToPanels}/>
                    <CreateInfoPanel location="opps" onSubmit={backToPanels} />
                ) : (
                    <div>
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
                                backgroundImage: `url(${mainOppsOverview.image})`,
                            }}>
                            <LandingCarouselSlide post={mainOppsOverview} />
                        </Paper>
                    
                    
                            { oppsPanelData && (
                                
                                <Box 
                                sx={{ 
                                    flexGrow: 1, 
                                    bgcolor: 'background.paper', 
                                    display: "flex", 
                                    flexDirection: smallScreen ? 'column' : 'row', 
                                    height: "100%", 
                                    alignItems: smallScreen ? 'center' : 'flex-start'

                                }}
                                >
                                    <PanelTabs panelData={oppsPanelData} panelRoute={"opportunities"} />
                                    <Outlet />
                                </Box>
                                )}  
                                {/* <TabsContainer 
                                    editPanelId = {editInfoPanelId} 
                                    setEditPanelId = {setEditInfoPanelId} 
                                    panelData = {oppsPanelData} 
                                    deletePanelMutation = {deleteInfoPanel} 
                                    value = {value} 
                                    setValue = {setValue}
                                    location = "about"
                                     /> */}
                            
                                                
                        { isLoggedIn && (
                            <Button variant='contained' style={{maxWidth: 200}} onClick={() => {setNewPanel(true)}}>Add new panel</Button>
                        )}
                    
                    </div>
            )}        
        
        </Container>
        
    )
}