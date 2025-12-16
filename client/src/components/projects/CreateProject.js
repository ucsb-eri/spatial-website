import * as React from 'react';
import { useState, useEffect, useContext } from 'react';
import RichTextEditor from '../RichTextEditor';
import {EditorState, ContentState} from 'draft-js'
import {stateToHTML} from 'draft-js-export-html'
import { convertFromHTML } from 'draft-js';
import Container from '@mui/material/Container';
import 'draft-js/dist/Draft.css'
import '../../css/RichText.css'
import axios from 'axios'
import Auth from '../../utils/auth'
import { getUploadUrl } from '../../utils/config'

import { FormGroup, FormControl, TextField, InputLabel, Button, Input, Box, Card, CardMedia, Typography, IconButton, Alert, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useMutation } from '@apollo/client';
import { ADD_PROJECT, EDIT_PROJECT } from '../../utils/mutations';
import { GET_PROJECTS } from '../../utils/queries';
import { useProjectContext } from '../../context/ProjectContext';
import { AdminLoginContext } from '../../context/AdminProvider'


export default function CreateProject(props) {
    const { logout } = useContext(AdminLoginContext)
    useEffect( () => {

        if (Auth.isTokenExpired()) {
            logout()
        }

    })
        

    let onSubmit
    if (props.onSubmit) {
        onSubmit = props.onSubmit
    } else {
        onSubmit = () => {
            console.log("editted project")
        }
    }
    const {setEditProjectId} = useProjectContext()

    const createEditorState = () => {
        if (props.id) {
            const blocksFromHtml = convertFromHTML(props.description)
            const editState = ContentState.createFromBlockArray(
                blocksFromHtml.contentBlocks,
                blocksFromHtml.entityMap
            )
            return EditorState.createWithContent(editState)
        } else {
            return EditorState.createEmpty()
        }
    }

    const [editorState, setEditorState] = useState(createEditorState);
    
    const [name, setName] = useState(props.name || '')
    const [summary, setSummary] = useState(props.summary || '')
    const [pis, setPis] = useState(props.pis || '')
    const [funder, setFunder] = useState(props.funder || '')
    const [funderLogo, setFunderLogo] = useState(props.funderLogo || '')
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
            confirmExit()
        }
    }
    
    // Confirm exit without saving
    const confirmExit = () => {
        setShowExitDialog(false)
        setEditProjectId(null)
        onSubmit()
    }
    
    // Update state when editing a different project
    useEffect(() => {
        if (props.id) {
            console.log('Updating project form with:', props);
            
            // Update description editor
            if (props.description) {
                try {
                    const blocksFromHtml = convertFromHTML(props.description)
                    const editState = ContentState.createFromBlockArray(
                        blocksFromHtml.contentBlocks,
                        blocksFromHtml.entityMap
                    )
                    setEditorState(EditorState.createWithContent(editState))
                    console.log('✓ Loaded description into editor')
                } catch (error) {
                    console.error('Error loading description:', error)
                    setEditorState(EditorState.createEmpty())
                }
            }
            
            // Update other fields
            setName(props.name || '')
            setSummary(props.summary || '')
            setPis(props.pis || '')
            setFunder(props.funder || '')
            setFunderLogo(props.funderLogo || '')
            setExistingImage(props.image || null)
            setImage(null) // Clear any pending new image
        }
    }, [props.id, props.name, props.summary, props.description, props.image])

    const handleImageUpload = async (image) => {
       const formData = new FormData()
        formData.append("image", image)
        console.log(formData)
      
        try {
            const token = Auth.getToken();
            const result = await axios.post(getUploadUrl(), formData, { 
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${token}`
                }
            })
            console.log("result: ")
            console.log(result);
            return result
        } catch (error) {
            console.error('Error uploading image:', error);
            return false
        }
      };

    const [addProject] = useMutation(ADD_PROJECT, {
        refetchQueries: [{ query: GET_PROJECTS }]
    })
    const [editProject] = useMutation(EDIT_PROJECT, {
        refetchQueries: [{ query: GET_PROJECTS }]
    })

    let handleProject
    if (props.id) {

        handleProject = async () => {
            const id = props.id
            const description = stateToHTML(editorState.getCurrentContent())
            
            // Validate required fields
            if (!name || !name.trim()) {
                setErrorMessage('Project name is required');
                return;
            }
            if (!pis || !pis.trim()) {
                setErrorMessage('Principal Investigators (PIs) field is required');
                return;
            }
            if (!summary || !summary.trim()) {
                setErrorMessage('Project summary is required');
                return;
            }
            if (!description || description === '<p><br></p>') {
                setErrorMessage('Project description is required');
                return;
            }
            
            setErrorMessage(''); // Clear any previous errors
            
            try {
                let finalImage = existingImage; // Default to keeping existing image
                
                // If user selected a new image file, upload it
                if (image != null) {
                    const imageSuccess = await handleImageUpload(image)
                    if (imageSuccess) {
                        finalImage = imageSuccess.data.imageName
                        console.log("Uploaded new image:", finalImage)
                    }
                }
                // If both image and existingImage are null, finalImage will be null (image is optional)
                
                await editProject({
                    variables: {
                        id, 
                        name, 
                        pis,
                        summary, 
                        description, 
                        image: finalImage,
                        funder,
                        funderLogo
                    }
                })
                
                console.log('Project updated successfully');

            } catch (error) {
                console.error("Error updating project:", error)
                setErrorMessage(error.message || 'Failed to update project. Please check all required fields.')
                return; // Don't close the form if there's an error
            }
            setEditProjectId(null)
            onSubmit()
        }
    } else {
        handleProject = async () => {
            const description = stateToHTML(editorState.getCurrentContent())
            
            // Validate required fields
            if (!name || !name.trim()) {
                setErrorMessage('Project name is required');
                return;
            }
            if (!pis || !pis.trim()) {
                setErrorMessage('Principal Investigators (PIs) field is required');
                return;
            }
            if (!summary || !summary.trim()) {
                setErrorMessage('Project summary is required');
                return;
            }
            if (summary.length < 50) {
                setErrorMessage('Project summary must be at least 50 characters');
                return;
            }
            if (!description || description === '<p><br></p>') {
                setErrorMessage('Project description is required');
                return;
            }
            const plainTextDescription = editorState.getCurrentContent().getPlainText();
            if (plainTextDescription.length < 300) {
                setErrorMessage('Project description must be at least 300 characters');
                return;
            }
            
            setErrorMessage(''); // Clear any previous errors
            
            try {
                let finalImage = null;
                
                // If user selected an image file, upload it
                if (image != null) {
                    const imageSuccess = await handleImageUpload(image)
                    if (imageSuccess) {
                        finalImage = imageSuccess.data.imageName
                        console.log("Uploaded new image:", finalImage)
                    }
                }
                
                const result = await addProject({
                    variables: {
                        name, 
                        pis,
                        summary, 
                        description, 
                        image: finalImage,
                        funder,
                        funderLogo
                    }
                })
                
                console.log('Project created successfully:', result)
            } catch (error) {
                console.error('Error creating project:', error)
                setErrorMessage(error.message || 'Failed to create project. Please check all required fields.')
                return; // Don't close the form if there's an error
            }
            onSubmit()
        }
    }

    // Styling
    
    const formControlStyle = {
        marginBottom: '100px', // Adjust the margin as needed
      };
    const richTextEditorStyle = {
        border: '1px solid #ced4da', // Example border for better visualization
        borderRadius: '4px',
        padding: '10px', // Example padding
        marginTop: '50px',
        width: "100%",
        height: "100%"
      };
    

    return (
        <Container >
            {/* Back Button */}
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2, mt: 2 }}>
                <Button 
                    startIcon={<ArrowBackIcon />} 
                    onClick={handleBack}
                    sx={{ mr: 2 }}
                >
                    Back
                </Button>
                <Typography variant="h6">
                    {props.id ? 'Edit Project' : 'Add New Project'}
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
            
            {/* Error Message Display */}
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
                <FormControl sx={{ width: "100%", mb: 3 }}>
                    <TextField 
                        id="new-project-name" 
                        label="Project Name" 
                        value={name} 
                        variant="outlined" 
                        onChange={(e) => {
                            setName(e.target.value);
                            markDirty();
                            if (errorMessage) setErrorMessage('');
                        }}
                        required
                        error={errorMessage.includes('name')}
                        fullWidth
                    />
                </FormControl>
                
                <FormControl sx={{ width: "100%", mb: 3 }}>
                    <TextField 
                        id="project-pis" 
                        label="Principal Investigators (PIs)" 
                        value={pis} 
                        variant="outlined"
                        helperText="e.g., 'Dr. Jane Smith, Dr. John Doe'"
                        onChange={(e) => {
                            setPis(e.target.value);
                            markDirty();
                            if (errorMessage) setErrorMessage('');
                        }}
                        required
                        error={errorMessage.includes('PI')}
                        fullWidth
                    />
                </FormControl>
                
                <FormControl sx={{ width: "100%", mb: 3 }}>
                    <TextField 
                        id="project-summary" 
                        label="Project Summary" 
                        value={summary} 
                        variant="outlined"
                        multiline
                        rows={3}
                        onChange={(e) => {
                            setSummary(e.target.value);
                            markDirty();
                            if (errorMessage) setErrorMessage('');
                        }}
                        required
                        error={errorMessage.includes('summary') || (summary && summary.length < 50)}
                        helperText={`${summary?.length || 0}/50 characters minimum${summary && summary.length < 50 ? ' ⚠️ Too short' : summary && summary.length >= 50 ? ' ✓' : ''}`}
                        fullWidth
                    />
                </FormControl>
                <FormControl sx={{ width: "100%", mb: 3 }}>
                    <Box sx={{ mb: 1, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Typography variant="subtitle1">
                            Project Description (Required)
                        </Typography>
                        <Typography 
                            variant="caption" 
                            color={
                                !editorState?.getCurrentContent()?.getPlainText()?.trim() ? 'text.secondary' :
                                editorState.getCurrentContent().getPlainText().length < 300 ? 'error' : 'success.main'
                            }
                        >
                            {editorState?.getCurrentContent()?.getPlainText()?.length || 0}/300 characters minimum
                            {editorState?.getCurrentContent()?.getPlainText()?.length < 300 ? ' ⚠️' : ' ✓'}
                        </Typography>
                    </Box>
                    <Box sx={{ 
                        border: '1px solid #ced4da', 
                        borderRadius: 1, 
                        p: 2, 
                        minHeight: 300,
                        bgcolor: 'background.paper'
                    }}>
                        <RichTextEditor editorState = {editorState} setEditorState = {setEditorState}/>
                    </Box>
                </FormControl>
                {/* Image Upload Section */}
                <FormControl sx={{ width: "100%", mb: 3 }}>
                    <Typography variant="subtitle1" gutterBottom sx={{ mb: 2 }}>
                        Project Image (Optional)
                    </Typography>
                    
                    {/* Show existing image preview if available */}
                    {(existingImage || image) && (
                        <Card sx={{ maxWidth: 300, mb: 2, position: 'relative' }}>
                            <CardMedia
                                component="img"
                                height="200"
                                image={
                                    image 
                                        ? URL.createObjectURL(image)
                                        : existingImage?.startsWith('http')
                                            ? existingImage
                                            : `${process.env.REACT_APP_API_URL || 'http://localhost:3001'}/images/${existingImage}`
                                }
                                alt="Project preview"
                                sx={{ objectFit: 'cover' }}
                            />
                            <Box sx={{ p: 1, display: 'flex', justifyContent: 'center', gap: 1 }}>
                                <Button
                                    size="small"
                                    color="error"
                                    startIcon={<DeleteIcon />}
                                    onClick={() => {
                                        setImage(null);
                                        setExistingImage(null);
                                    }}
                                    aria-label="Remove image"
                                >
                                    Remove
                                </Button>
                            </Box>
                        </Card>
                    )}
                    
                    {/* Upload button */}
                    <input
                        accept="image/*"
                        id="project-image-upload"
                        type="file"
                        style={{ display: 'none' }}
                        onChange={(e) => {
                            const file = e.target.files[0];
                            if (file) {
                                setImage(file);
                                setExistingImage(null); // Clear existing image when new one is selected
                            }
                        }}
                    />
                    <label htmlFor="project-image-upload">
                        <Button
                            variant="outlined"
                            component="span"
                            startIcon={<CloudUploadIcon />}
                            aria-label="Upload project image"
                        >
                            {existingImage || image ? 'Replace Image' : 'Upload Image'}
                        </Button>
                    </label>
                </FormControl>
                
            </FormGroup>
            
            <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end', mt: 4, mb: 3 }}>
                <Button variant="outlined" onClick={handleBack}>
                    Cancel
                </Button>
                <Button variant="contained" onClick={handleProject} size="large">
                    {props.id ? 'Update Project' : 'Create Project'}
                </Button>
            </Box>
            
        </Container>
        
    )
}