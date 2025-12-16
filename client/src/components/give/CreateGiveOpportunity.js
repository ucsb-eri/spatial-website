import * as React from 'react';
import { useState, useEffect, useContext } from 'react';
import Container from '@mui/material/Container';
import Auth from '../../utils/auth'
import { getUploadUrl } from '../../utils/config'
import axios from 'axios'

import { 
    FormGroup, 
    FormControl, 
    TextField, 
    Button, 
    Box, 
    Card, 
    CardMedia, 
    IconButton, 
    Typography,
    Alert,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions 
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useMutation } from '@apollo/client';
import { ADD_GIVE_OPPORTUNITY, EDIT_GIVE_OPPORTUNITY } from '../../utils/mutations';
import { GET_GIVE_OPPORTUNITIES } from '../../utils/queries';
import { AdminLoginContext } from '../../context/AdminProvider'

export default function CreateGiveOpportunity(props) {
    const { logout } = useContext(AdminLoginContext)
    
    useEffect(() => {
        if (Auth.isTokenExpired()) {
            logout()
        }
    })

    const onSubmit = props.onSubmit || (() => console.log("Give opportunity saved"))

    const [title, setTitle] = useState(props.title || '')
    const [description, setDescription] = useState(props.description || '')
    const [link, setLink] = useState(props.link || '')
    const [imageDescription, setImageDescription] = useState(props.imageDescription || '')
    const [image, setImage] = useState(null)
    const [existingImage, setExistingImage] = useState(props.image || null)
    const [errorMessage, setErrorMessage] = useState('')
    
    // Track if form has been modified
    const [isDirty, setIsDirty] = useState(false)
    const [showExitDialog, setShowExitDialog] = useState(false)
    
    // Mark form as dirty when any field changes
    const markDirty = () => setIsDirty(true)
    
    // Handle back/cancel button - check for unsaved changes
    const handleBack = () => {
        if (isDirty) {
            setShowExitDialog(true)
        } else {
            onSubmit()
        }
    }
    
    // Confirm exit without saving
    const confirmExit = () => {
        setShowExitDialog(false)
        onSubmit()
    }

    // Update state when editing
    useEffect(() => {
        if (props.id) {
            setTitle(props.title || '')
            setDescription(props.description || '')
            setLink(props.link || '')
            setImageDescription(props.imageDescription || '')
            setExistingImage(props.image || null)
            setImage(null)
        }
    }, [props.id, props.title, props.description, props.link, props.imageDescription, props.image])

    const [addOpportunity] = useMutation(ADD_GIVE_OPPORTUNITY, {
        refetchQueries: [{ query: GET_GIVE_OPPORTUNITIES }]
    })
    const [editOpportunity] = useMutation(EDIT_GIVE_OPPORTUNITY, {
        refetchQueries: [{ query: GET_GIVE_OPPORTUNITIES }]
    })

    const handleImageUpload = async (imageFile) => {
        const formData = new FormData()
        formData.append("image", imageFile)
      
        try {
            const token = Auth.getToken();
            const result = await axios.post(getUploadUrl(), formData, { 
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${token}`
                }
            })
            return result
        } catch (error) {
            console.error('Error uploading image:', error);
            return false
        }
    };

    const handleSave = async () => {
        // Validation
        if (!title || !title.trim()) {
            setErrorMessage('Title is required');
            return;
        }
        if (!description || !description.trim()) {
            setErrorMessage('Description is required');
            return;
        }
        if (!link || !link.trim()) {
            setErrorMessage('Donation link is required');
            return;
        }

        setErrorMessage('');

        try {
            let finalImage = existingImage;
            
            // Upload new image if selected
            if (image != null) {
                const imageSuccess = await handleImageUpload(image)
                if (imageSuccess) {
                    finalImage = imageSuccess.data.imageName
                }
            }

            const variables = {
                title,
                description,
                image: finalImage,
                imageDescription,
                link,
                order: props.order || 9999
            };

            if (props.id) {
                await editOpportunity({
                    variables: { id: props.id, ...variables }
                })
            } else {
                await addOpportunity({
                    variables
                })
            }

            onSubmit()
        } catch (error) {
            console.error('Error saving give opportunity:', error)
            setErrorMessage(error.message || 'Failed to save. Please check all required fields.')
        }
    };

    return (
        <Container maxWidth="md" sx={{ py: 4 }}>
            {/* Back Button */}
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Button 
                    startIcon={<ArrowBackIcon />} 
                    onClick={handleBack}
                    sx={{ mr: 2 }}
                >
                    Back
                </Button>
                <Typography variant="h5">
                    {props.id ? 'Edit' : 'Create'} Giving Opportunity
                </Typography>
            </Box>
            
            {/* Unsaved Changes Dialog */}
            <Dialog
                open={showExitDialog}
                onClose={() => setShowExitDialog(false)}
                aria-labelledby="exit-dialog-title"
                aria-describedby="exit-dialog-description"
            >
                <DialogTitle id="exit-dialog-title">
                    Discard Changes?
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="exit-dialog-description">
                        You have unsaved changes. Are you sure you want to leave? Your changes will be lost.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setShowExitDialog(false)}>
                        Keep Editing
                    </Button>
                    <Button onClick={confirmExit} color="error" variant="contained">
                        Discard Changes
                    </Button>
                </DialogActions>
            </Dialog>
            
            {errorMessage && (
                <Alert 
                    severity="error" 
                    sx={{ mb: 3 }}
                    onClose={() => setErrorMessage('')}
                >
                    {errorMessage}
                </Alert>
            )}

            <FormGroup>
                <FormControl sx={{ mb: 2 }}>
                    <TextField 
                        label="Title" 
                        value={title}
                        onChange={(e) => {
                            setTitle(e.target.value);
                            markDirty();
                            if (errorMessage) setErrorMessage('');
                        }}
                        fullWidth
                        required
                        error={errorMessage.includes('Title')}
                        aria-label="Opportunity title"
                    />
                </FormControl>

                <FormControl sx={{ mb: 2 }}>
                    <TextField 
                        label="Description" 
                        value={description}
                        onChange={(e) => {
                            setDescription(e.target.value);
                            markDirty();
                            if (errorMessage) setErrorMessage('');
                        }}
                        fullWidth
                        multiline
                        rows={4}
                        required
                        error={errorMessage.includes('Description')}
                        aria-label="Opportunity description"
                    />
                </FormControl>

                <FormControl sx={{ mb: 2 }}>
                    <TextField 
                        label="Donation Link" 
                        value={link}
                        onChange={(e) => {
                            setLink(e.target.value);
                            markDirty();
                            if (errorMessage) setErrorMessage('');
                        }}
                        fullWidth
                        required
                        error={errorMessage.includes('link')}
                        helperText="e.g., https://giving.ucsb.edu/Funds/Give?id=496"
                        aria-label="Donation link URL"
                    />
                </FormControl>

                {/* Image Upload Section */}
                <FormControl sx={{ mb: 2 }}>
                    <Typography variant="subtitle1" gutterBottom>
                        Image (Optional)
                    </Typography>
                    
                    {(existingImage || image) && (
                        <Card sx={{ maxWidth: 400, mb: 2 }}>
                            <CardMedia
                                component="img"
                                height="250"
                                image={
                                    image 
                                        ? URL.createObjectURL(image)
                                        : existingImage?.startsWith('http')
                                            ? existingImage
                                            : `${process.env.REACT_APP_API_URL || 'http://localhost:3001'}/images/${existingImage}`
                                }
                                alt="Opportunity preview"
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
                                    aria-label="Remove image"
                                >
                                    Remove
                                </Button>
                            </Box>
                        </Card>
                    )}
                    
                    <input
                        accept="image/*"
                        id="give-image-upload"
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
                    <label htmlFor="give-image-upload">
                        <Button
                            variant="outlined"
                            component="span"
                            startIcon={<CloudUploadIcon />}
                            aria-label="Upload opportunity image"
                        >
                            {existingImage || image ? 'Replace Image' : 'Upload Image'}
                        </Button>
                    </label>
                </FormControl>

                <FormControl sx={{ mb: 3 }}>
                    <TextField 
                        label="Image Description (Optional)" 
                        value={imageDescription}
                        onChange={(e) => { setImageDescription(e.target.value); markDirty(); }}
                        fullWidth
                        helperText="Alt text for accessibility"
                        aria-label="Image description for accessibility"
                    />
                </FormControl>

                <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end', mt: 3, mb: 2 }}>
                    <Button variant="outlined" onClick={handleBack}>
                        Cancel
                    </Button>
                    <Button variant="contained" onClick={handleSave}>
                        {props.id ? 'Update' : 'Create'}
                    </Button>
                </Box>
            </FormGroup>
        </Container>
    )
}

