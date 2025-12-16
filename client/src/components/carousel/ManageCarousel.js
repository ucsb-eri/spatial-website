import React, { useState, useContext } from 'react';
import {
    Container,
    Box,
    Typography,
    Button,
    Card,
    CardContent,
    CardMedia,
    Grid,
    IconButton,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions,
    Chip
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import { useQuery, useMutation } from '@apollo/client';
import { GET_CAROUSEL_SLIDES } from '../../utils/queries';
import { DELETE_CAROUSEL_SLIDE, EDIT_CAROUSEL_SLIDE } from '../../utils/mutations';
import CreateCarouselSlide from './CreateCarouselSlide';
import { AdminLoginContext } from '../../context/AdminProvider';

export default function ManageCarousel() {
    const { isLoggedIn } = useContext(AdminLoginContext);
    const [editingSlide, setEditingSlide] = useState(null);
    const [showForm, setShowForm] = useState(false);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [slideToDelete, setSlideToDelete] = useState(null);

    const { loading, error, data } = useQuery(GET_CAROUSEL_SLIDES);
    const [deleteSlide] = useMutation(DELETE_CAROUSEL_SLIDE, {
        refetchQueries: [{ query: GET_CAROUSEL_SLIDES }]
    });

    if (!isLoggedIn) {
        return (
            <Container>
                <Typography variant="h5" sx={{ mt: 4 }}>
                    Please log in to manage carousel slides
                </Typography>
            </Container>
        );
    }

    if (loading) return <Typography>Loading...</Typography>;
    if (error) return <Typography>Error loading carousel slides</Typography>;

    const slides = data?.carouselSlides || [];

    const handleDelete = (slide) => {
        setSlideToDelete(slide);
        setDeleteDialogOpen(true);
    };

    const confirmDelete = async () => {
        if (slideToDelete) {
            try {
                await deleteSlide({
                    variables: { id: slideToDelete.id }
                });
                setDeleteDialogOpen(false);
                setSlideToDelete(null);
            } catch (error) {
                console.error('Error deleting slide:', error);
                alert('Failed to delete slide');
            }
        }
    };

    const handleEdit = (slide) => {
        setEditingSlide(slide);
        setShowForm(true);
    };

    const handleAdd = () => {
        setEditingSlide(null);
        setShowForm(true);
    };

    const handleFormClose = () => {
        setShowForm(false);
        setEditingSlide(null);
    };

    if (showForm) {
        return (
            <CreateCarouselSlide
                id={editingSlide?.id}
                details={editingSlide}
                onSubmit={handleFormClose}
                onCancel={handleFormClose}
            />
        );
    }

    return (
        <Container maxWidth="xl" sx={{ py: 4 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
                <Typography variant="h4">
                    Manage Carousel Slides
                </Typography>
                <Button
                    variant="contained"
                    startIcon={<AddIcon />}
                    onClick={handleAdd}
                >
                    Add New Slide
                </Button>
            </Box>

            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                💡 Tip: Drag slides to reorder them (feature coming soon)
            </Typography>

            {slides.length === 0 ? (
                <Box sx={{ textAlign: 'center', py: 8 }}>
                    <Typography variant="h6" color="text.secondary">
                        No carousel slides yet
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                        Click "Add New Slide" to create your first slide
                    </Typography>
                </Box>
            ) : (
                <Grid container spacing={3}>
                    {slides.map((slide, index) => (
                        <Grid item xs={12} md={6} lg={4} key={slide.id}>
                            <Card>
                                <Box sx={{ position: 'relative' }}>
                                    <CardMedia
                                        component="img"
                                        height="200"
                                        image={
                                            slide.image?.startsWith('http')
                                                ? slide.image
                                                : `${process.env.REACT_APP_API_URL || 'http://localhost:3001'}/images/${slide.image}`
                                        }
                                        alt={slide.title}
                                        sx={{ objectFit: 'cover' }}
                                    />
                                    <Box sx={{
                                        position: 'absolute',
                                        top: 8,
                                        right: 8,
                                        display: 'flex',
                                        gap: 1
                                    }}>
                                        {!slide.active && (
                                            <Chip
                                                label="Inactive"
                                                size="small"
                                                color="warning"
                                            />
                                        )}
                                    </Box>
                                </Box>
                                <CardContent>
                                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                                        <DragIndicatorIcon sx={{ mr: 1, color: 'text.secondary', cursor: 'grab' }} />
                                        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                                            {index + 1}. {slide.title}
                                        </Typography>
                                    </Box>
                                    <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                                        {slide.description.substring(0, 100)}
                                        {slide.description.length > 100 ? '...' : ''}
                                    </Typography>
                                    {slide.linkText && (
                                        <Typography variant="caption" display="block" sx={{ mb: 2 }}>
                                            🔗 {slide.linkText}
                                        </Typography>
                                    )}
                                    <Box sx={{ display: 'flex', gap: 1 }}>
                                        <Button
                                            size="small"
                                            variant="outlined"
                                            startIcon={<EditIcon />}
                                            onClick={() => handleEdit(slide)}
                                        >
                                            Edit
                                        </Button>
                                        <IconButton
                                            size="small"
                                            color="error"
                                            onClick={() => handleDelete(slide)}
                                        >
                                            <DeleteIcon />
                                        </IconButton>
                                    </Box>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            )}

            <Dialog open={deleteDialogOpen} onClose={() => setDeleteDialogOpen(false)}>
                <DialogTitle>Delete Carousel Slide?</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Are you sure you want to delete "{slideToDelete?.title}"? This action cannot be undone.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setDeleteDialogOpen(false)}>Cancel</Button>
                    <Button onClick={confirmDelete} color="error" variant="contained">
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>
        </Container>
    );
}

