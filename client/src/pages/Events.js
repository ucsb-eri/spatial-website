import {React, useState, useContext} from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { AdminLoginContext } from "../context/AdminProvider"
import { useProjectContext} from "../context/ProjectContext"
import CreateInfoPanel from '../components/content-display/CreateInfoPanelEnhanced';
import ManagePanelOrder from '../components/content-display/ManagePanelOrder';
import PanelTabs from '../components/navigation/PanelTabs';

import {Container, Grid, Paper, Box, useMediaQuery, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from '@mui/material'
import ReorderIcon from '@mui/icons-material/Reorder';
import LandingCarouselSlide from '../components/LandingCarouselSlide';

import { useMutation } from '@apollo/client';
import { DELETE_INFOPANEL } from '../utils/mutations';
import { GET_INFOPANELS } from '../utils/queries';


const mainAboutOverview = {
  title: '@ Spatial Center',
  description:
    "Collaborative Design, Implementation, and Dissemination of Spatial Science for a Better World",
  image: "https://www.geog.ucsb.edu/sites/default/files/styles/big_banner_desktop/public/2021-01/storke-sunrise-02.jpg?h=0197d72c&itok=IAbqYhXS",
  color: 'white'
};


export default function Events() {
    const { isLoggedIn } = useContext(AdminLoginContext)
    const {infoPanelData } = useProjectContext()
    const navigate = useNavigate()
    
    let eventPanelData
    if (infoPanelData) {
        eventPanelData = infoPanelData.filter(panel => panel.location === "events")
    }

    const [newPanel, setNewPanel] = useState(false)
    const [editingPanel, setEditingPanel] = useState(null)
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
    const [panelToDelete, setPanelToDelete] = useState(null)
    const [manageOrderOpen, setManageOrderOpen] = useState(false)
    
    const backToPanels = () => {
        setNewPanel(false)
        setEditingPanel(null)
    }

    const [deleteInfoPanel] = useMutation(DELETE_INFOPANEL, {
        refetchQueries: [{ query: GET_INFOPANELS }],
        onError: (error) => {
            console.error('Error deleting panel:', error);
            alert('Failed to delete panel. Please try again.');
        }
    })
    
    const smallScreen = useMediaQuery("(max-width: 768px)");

    const handleEdit = (panel) => {
        setEditingPanel(panel)
        setNewPanel(false)
    }

    const handleDeleteClick = (panel) => {
        setPanelToDelete(panel)
        setDeleteDialogOpen(true)
    }

    const handleDeleteConfirm = async () => {
        if (panelToDelete) {
            try {
                await deleteInfoPanel({ variables: { id: panelToDelete.id } })
                setDeleteDialogOpen(false)
                setPanelToDelete(null)
                
                // Redirect to the first available panel after deletion
                const updatedPanels = eventPanelData.filter(p => p.id !== panelToDelete.id)
                if (updatedPanels.length > 0) {
                    const firstPanel = updatedPanels[0]
                    const route = `/events/${firstPanel.tabname.replace(/[^a-zA-Z0-9\s]/g, '').toLowerCase().replaceAll(' ', '-')}`
                    navigate(route)
                } else {
                    // No panels left, navigate to events page
                    navigate('/events')
                }
            } catch (error) {
                console.error('Error deleting panel:', error)
            }
        }
    }

    return(
        <Container maxWidth='xl' disableGutters={true}>
            {newPanel || editingPanel ? (
                    <CreateInfoPanel 
                        location="events" 
                        onSubmit={backToPanels} 
                        id={editingPanel?.id}
                        name={editingPanel?.name}
                        tabname={editingPanel?.tabname}
                        taborder={editingPanel?.taborder}
                        content={editingPanel?.content}
                        accordion={editingPanel?.accordion}
                    />
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
                        
                        {/* Admin Controls - Positioned at top for easy access */}
                        { isLoggedIn && (
                            <Box sx={{ display: 'flex', gap: 2, mb: 3, justifyContent: 'flex-end' }}>
                                <Button 
                                    variant='contained' 
                                    onClick={() => {setNewPanel(true)}}
                                    aria-label="Add new panel"
                                >
                                    Add New Panel
                                </Button>
                                <Button 
                                    variant='outlined' 
                                    startIcon={<ReorderIcon />}
                                    onClick={() => setManageOrderOpen(true)}
                                    aria-label="Manage panel order"
                                >
                                    Manage Order
                                </Button>
                            </Box>
                        )}
                                      
                            { eventPanelData && (
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
                                    <PanelTabs panelData={eventPanelData} panelRoute={"events"} />
                                    <Outlet context={{ onEdit: handleEdit, onDelete: handleDeleteClick }} />
                                </Box>
                            )}  
                    
                    </Grid>
            )}
            
            {/* Manage Panel Order Dialog */}
            <ManagePanelOrder
                open={manageOrderOpen}
                onClose={() => setManageOrderOpen(false)}
                panels={eventPanelData || []}
                location="events"
            />

            {/* Delete Confirmation Dialog */}
            <Dialog
                open={deleteDialogOpen}
                onClose={() => setDeleteDialogOpen(false)}
            >
                <DialogTitle>Delete Panel?</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Are you sure you want to delete the panel <strong>{panelToDelete?.name}</strong>? 
                        This action cannot be undone.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setDeleteDialogOpen(false)}>
                        Cancel
                    </Button>
                    <Button onClick={handleDeleteConfirm} color="error" variant="contained" autoFocus>
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>
        
        </Container>
        
    )
}