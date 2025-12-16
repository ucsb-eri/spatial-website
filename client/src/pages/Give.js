import {React, useState, useContext} from 'react';
import {Grid, Container, Paper, Typography, Button, Box, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions}  from '@mui/material';
import LandingCarouselSlide from '../components/LandingCarouselSlide';
import GiveCard from '../components/give/GiveCard';
import CreateGiveOpportunity from '../components/give/CreateGiveOpportunity';
import { AdminLoginContext } from "../context/AdminProvider"
import { useQuery, useMutation } from '@apollo/client';
import { GET_GIVE_OPPORTUNITIES } from '../utils/queries';
import { DELETE_GIVE_OPPORTUNITY } from '../utils/mutations';
import ReorderIcon from '@mui/icons-material/Reorder';

const imageRoute = process.env.NODE_ENV === "production" ? "/images/" : "http://localhost:3001/images/"

const giveBanner = {
    description: "",
    image: `${imageRoute + 'give.jpeg'}`,
    imageLabel: '',
    title: 'Give to the Spatial Center!',
    color: 'white'
}

export default function Give() {
    const { isLoggedIn } = useContext(AdminLoginContext)
    const { loading, data } = useQuery(GET_GIVE_OPPORTUNITIES);
    const giveCards = data?.giveOpportunities || [];

    const [newOpportunity, setNewOpportunity] = useState(false)
    const [editingOpportunity, setEditingOpportunity] = useState(null)
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
    const [opportunityToDelete, setOpportunityToDelete] = useState(null)

    const backToList = () => {
        setNewOpportunity(false)
        setEditingOpportunity(null)
    }

    const [deleteOpportunity] = useMutation(DELETE_GIVE_OPPORTUNITY, {
        refetchQueries: [{ query: GET_GIVE_OPPORTUNITIES }],
        onError: (error) => {
            console.error('Error deleting opportunity:', error);
            alert('Failed to delete opportunity. Please try again.');
        }
    });

    const handleDeleteConfirm = async () => {
        if (opportunityToDelete) {
            try {
                await deleteOpportunity({ variables: { id: opportunityToDelete.id } })
                setDeleteDialogOpen(false)
                setOpportunityToDelete(null)
            } catch (error) {
                console.error('Error deleting opportunity:', error)
            }
        }
    }

    return(
            <Grid container maxWidth='xl' direction="row" justifyContent='center' >
                {newOpportunity || editingOpportunity ? (
                    <Grid item xs={12}>
                        <CreateGiveOpportunity 
                            onSubmit={backToList}
                            id={editingOpportunity?.id}
                            title={editingOpportunity?.title}
                            description={editingOpportunity?.description}
                            image={editingOpportunity?.image}
                            imageDescription={editingOpportunity?.imageDescription}
                            link={editingOpportunity?.link}
                            order={editingOpportunity?.order}
                        />
                    </Grid>
                ) : (
                    <>
                        <Grid item xs={12}>
                            <Paper
                                sx={{
                                    position: 'relative',
                                    backgroundColor: 'grey.800',
                                    color: '#fff',
                                    mb: 4,
                                    height: '50vh',
                                    maxHeight: '500px',
                                    backgroundSize: 'cover',
                                    backgroundRepeat: 'no-repeat',
                                    backgroundPosition: 'center',
                                    backgroundImage: `url(${giveBanner.image})`,
                                }}>
                                    <LandingCarouselSlide post={giveBanner} />
                            </Paper>
                        </Grid>

                        {/* Admin Controls */}
                        { isLoggedIn && (
                            <Grid item xs={11}>
                                <Box sx={{ display: 'flex', gap: 2, mb: 3, justifyContent: 'flex-end' }}>
                                    <Button 
                                        variant='contained' 
                                        onClick={() => setNewOpportunity(true)}
                                        aria-label="Add new giving opportunity"
                                    >
                                        Add New Opportunity
                                    </Button>
                                </Box>
                            </Grid>
                        )}
                        
                        <Grid item xs={11} sm={10} md={9} my={5}>
                            <Typography variant='h3' paragraph>Why Give?</Typography>
                            <Typography paragraph variant='h6' align='center'>
                                Giving to the Center for Spatial Science supports groundbreaking research by providing funding support for grad students, computational resources, conference expenses, and catered lunch at Spatial Hour!
                                We hope to see you donate to either the General Spatial Fund or the Goodchild Fund!
                            </Typography>
                        </Grid>

                        <Grid item xs={11}>
                            {loading ? (
                                <Typography align="center">Loading...</Typography>
                            ) : (
                                <Grid container direction="row" justifyContent="center" columnSpacing={3} rowSpacing={5}>
                                    {giveCards.map((card) => (
                                        <Grid item xs={11} md={6} key={card.id}>
                                            <GiveCard 
                                                {...card} 
                                                onEdit={isLoggedIn ? () => setEditingOpportunity(card) : null}
                                                onDelete={isLoggedIn ? () => {
                                                    setOpportunityToDelete(card);
                                                    setDeleteDialogOpen(true);
                                                } : null}
                                            />
                                        </Grid>
                                    ))}
                                </Grid>
                            )}    
                        </Grid>
                    </>
                )}
                
                {/* Delete Confirmation Dialog */}
                <Dialog
                    open={deleteDialogOpen}
                    onClose={() => setDeleteDialogOpen(false)}
                >
                    <DialogTitle>Delete Giving Opportunity?</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Are you sure you want to delete <strong>{opportunityToDelete?.title}</strong>? 
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

            </Grid>
        
    )
}