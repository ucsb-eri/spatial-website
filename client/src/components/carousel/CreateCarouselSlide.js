import * as React from 'react';
import { useState, useEffect, useContext } from 'react';
import {
    Container,
    FormGroup,
    FormControl,
    TextField,
    Button,
    Box,
    Typography,
    Card,
    CardMedia,
    MenuItem,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions,
    FormControlLabel,
    Checkbox
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import axios from 'axios';
import Auth from '../../utils/auth';
import { getUploadUrl } from '../../utils/config';
import { useMutation } from '@apollo/client';
import { ADD_CAROUSEL_SLIDE, EDIT_CAROUSEL_SLIDE } from '../../utils/mutations';
import { GET_CAROUSEL_SLIDES } from '../../utils/queries';
import { AdminLoginContext } from '../../context/AdminProvider';

export default function CreateCarouselSlide(props) {
    const { details, onSubmit, onCancel } = props;
    const { logout } = useContext(AdminLoginContext);

    useEffect(() => {
        if (Auth.isTokenExpired()) {
            logout();
        }
    });

    const [title, setTitle] = useState(details?.title || '');
    const [description, setDescription] = useState(details?.description || '');
    const [linkText, setLinkText] = useState(details?.linkText || '');
    const [color, setColor] = useState(details?.color || 'white');
    const [active, setActive] = useState(details?.active !== undefined ? details.active : true);
    const [image, setImage] = useState(null);
    const [existingImage, setExistingImage] = useState(details?.image || null);

    const [isDirty, setIsDirty] = useState(false);
    const [showExitDialog, setShowExitDialog] = useState(false);

    const markDirty = () => setIsDirty(true);

    const handleBack = () => {
        if (isDirty) {
            setShowExitDialog(true);
        } else {
            confirmExit();
        }
    };

    const confirmExit = () => {
        setShowExitDialog(false);
        if (onCancel) {
            onCancel();
        } else {
            onSubmit();
        }
    };

    const handleImageUpload = async (image) => {
        const formData = new FormData();
        formData.append('image', image);

        try {
            const token = Auth.getToken();
            const result = await axios.post(getUploadUrl(), formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${token}`
                }
            });
            return result;
        } catch (error) {
            console.error('Error uploading image:', error);
            return false;
        }
    };

    const [addSlide] = useMutation(ADD_CAROUSEL_SLIDE, {
        refetchQueries: [{ query: GET_CAROUSEL_SLIDES }]
    });
    const [editSlide] = useMutation(EDIT_CAROUSEL_SLIDE, {
        refetchQueries: [{ query: GET_CAROUSEL_SLIDES }]
    });

    const handleSave = async () => {
        try {
            let finalImage = existingImage;

            if (image != null) {
                const imageSuccess = await handleImageUpload(image);
                if (imageSuccess) {
                    finalImage = imageSuccess.data.imageName;
                }
            }

            if (props.id) {
                await editSlide({
                    variables: {
                        id: props.id,
                        title,
                        description,
                        image: finalImage,
                        linkText: linkText || null,
                        color,
                        active
                    }
                });
            } else {
                await addSlide({
                    variables: {
                        title,
                        description,
                        image: finalImage,
                        linkText: linkText || null,
                        color,
                        active
                    }
                });
            }

            onSubmit();
        } catch (error) {
            console.error('Error saving carousel slide:', error);
            alert('Failed to save carousel slide. Please check the console for details.');
        }
    };

    return (
        <Container maxWidth="lg" sx={{ py: 4 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Button
                    startIcon={<ArrowBackIcon />}
                    onClick={handleBack}
                    sx={{ mr: 2 }}
                >
                    Back
                </Button>
                <Typography variant="h5">
                    {props.id ? 'Edit Carousel Slide' : 'Add New Carousel Slide'}
                </Typography>
            </Box>

            <Dialog
                open={showExitDialog}
                onClose={() => setShowExitDialog(false)}
            >
                <DialogTitle>Discard Changes?</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        You have unsaved changes. Are you sure you want to leave? Your changes will be lost.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setShowExitDialog(false)}>Keep Editing</Button>
                    <Button onClick={confirmExit} color="error" variant="contained">
                        Discard Changes
                    </Button>
                </DialogActions>
            </Dialog>

            <FormGroup>
                <FormControl sx={{ mb: 3 }}>
                    <TextField
                        label="Title"
                        value={title}
                        onChange={(e) => { setTitle(e.target.value); markDirty(); }}
                        required
                        fullWidth
                    />
                </FormControl>

                <FormControl sx={{ mb: 3 }}>
                    <TextField
                        label="Description"
                        value={description}
                        onChange={(e) => { setDescription(e.target.value); markDirty(); }}
                        required
                        fullWidth
                        multiline
                        rows={3}
                    />
                </FormControl>

                <FormControl sx={{ mb: 3 }}>
                    <TextField
                        label="Link URL (optional)"
                        value={linkText}
                        onChange={(e) => { setLinkText(e.target.value); markDirty(); }}
                        fullWidth
                        helperText="Optional: URL for 'Learn more' button"
                    />
                </FormControl>

                <FormControl sx={{ mb: 3 }}>
                    <TextField
                        select
                        label="Text Color"
                        value={color}
                        onChange={(e) => { setColor(e.target.value); markDirty(); }}
                    >
                        <MenuItem value="white">White</MenuItem>
                        <MenuItem value="black">Black</MenuItem>
                    </TextField>
                </FormControl>

                <FormControl sx={{ mb: 3 }}>
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={active}
                                onChange={(e) => { setActive(e.target.checked); markDirty(); }}
                            />
                        }
                        label="Active (visible on homepage)"
                    />
                </FormControl>

                {/* Image Upload */}
                <FormControl sx={{ mb: 3 }}>
                    <Typography variant="subtitle1" gutterBottom>
                        Background Image
                    </Typography>

                    {(existingImage || image) && (
                        <Card sx={{ maxWidth: 600, mb: 2 }}>
                            <CardMedia
                                component="img"
                                height="300"
                                image={
                                    image
                                        ? URL.createObjectURL(image)
                                        : existingImage?.startsWith('http')
                                            ? existingImage
                                            : `${process.env.REACT_APP_API_URL || 'http://localhost:3001'}/images/${existingImage}`
                                }
                                alt="Slide background"
                                sx={{ objectFit: 'cover' }}
                            />
                            <Box sx={{ p: 1, display: 'flex', justifyContent: 'center' }}>
                                <Button
                                    size="small"
                                    color="error"
                                    startIcon={<DeleteIcon />}
                                    onClick={() => {
                                        setImage(null);
                                        setExistingImage(null);
                                        markDirty();
                                    }}
                                >
                                    Remove
                                </Button>
                            </Box>
                        </Card>
                    )}

                    <input
                        accept="image/*"
                        id="carousel-image-upload"
                        type="file"
                        style={{ display: 'none' }}
                        onChange={(e) => {
                            const file = e.target.files[0];
                            if (file) {
                                setImage(file);
                                setExistingImage(null);
                                markDirty();
                            }
                        }}
                    />
                    <label htmlFor="carousel-image-upload">
                        <Button
                            variant="outlined"
                            component="span"
                            startIcon={<CloudUploadIcon />}
                        >
                            {existingImage || image ? 'Replace Image' : 'Upload Image'}
                        </Button>
                    </label>
                </FormControl>
            </FormGroup>

            <Box sx={{ display: 'flex', gap: 2, mt: 3 }}>
                <Button variant="outlined" onClick={handleBack}>
                    Cancel
                </Button>
                <Button
                    variant="contained"
                    onClick={handleSave}
                    disabled={!title || !description || (!existingImage && !image)}
                >
                    Save
                </Button>
            </Box>
        </Container>
    );
}

