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

import { FormGroup, FormControl, TextField, InputLabel, Button, Input, MenuItem, FormControlLabel, Checkbox, Box, Card, CardMedia, IconButton, Typography, Chip, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import AddIcon from '@mui/icons-material/Add';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useMutation } from '@apollo/client';
import { ADD_PERSON, EDIT_PERSON } from '../../utils/mutations';
import { QUERY_PEOPLE } from '../../utils/queries';
import { useProjectContext } from '../../context/ProjectContext';
import { AdminLoginContext } from '../../context/AdminProvider'


export default function CreatePerson(props) {
    const { details } = props
    const { logout } = useContext(AdminLoginContext)
    
    console.log('CreatePerson rendered with props:', {
        id: props.id,
        hasDetails: !!details,
        detailsKeys: details ? Object.keys(details) : [],
        projectsRaw: details?.projects,
        projectsType: typeof details?.projects,
        projectsIsArray: Array.isArray(details?.projects)
    });
    
    useEffect(() => {
        if (Auth.isTokenExpired()) {
            logout()
        }
    })

    let onSubmit
    if (props.onSubmit) {
        onSubmit = props.onSubmit
    } else {
        onSubmit = () => {
            console.log("edited person")
        }
    }
    const {setEditPersonId} = useProjectContext()

    const createDesEditorState = () => {
        if (props.id && details.description) {
            try {
                const blocksFromHtml = convertFromHTML(details.description)
                const editState = ContentState.createFromBlockArray(
                    blocksFromHtml.contentBlocks,
                    blocksFromHtml.entityMap
                )
                return EditorState.createWithContent(editState)
            } catch (e) {
                console.warn('Error parsing description HTML:', e)
                return EditorState.createEmpty()
            }
        } else {
            return EditorState.createEmpty()
        }
    }

    const createResEditorState = () => {
        if (props.id && details.research) {
            try {
                const blocksFromHtml = convertFromHTML(details.research)
                const editState = ContentState.createFromBlockArray(
                    blocksFromHtml.contentBlocks,
                    blocksFromHtml.entityMap
                )
                return EditorState.createWithContent(editState)
            } catch (e) {
                console.warn('Error parsing research HTML:', e)
                return EditorState.createEmpty()
            }
        } else {
            return EditorState.createEmpty()
        }
    }

    const [desEditorState, setDesEditorState] = useState(createDesEditorState);
    const [resEditorState, setResEditorState] = useState(createResEditorState);

    const [firstName, setFirstName] = useState(details?.firstName || '')
    const [lastName, setLastName] = useState(details?.lastName || '')
    const [title, setTitle] = useState(details?.title || '')
    const [research, setResearch] = useState(details?.research || '')
    const [websiteUrl, setWebsiteUrl] = useState(details?.websiteUrl || '')
    const [websiteName, setWebsiteName] = useState(details?.websiteName || '')
    const [affiliateDepartment, setAffiliateDepartment] = useState(details?.description || '')
    
    // Initialize projects - handle HTML lists or proper arrays
    const initializeProjects = () => {
        if (!details?.projects) return [];
        
        let projectsArray = details.projects;
        
        // If it's already an array of strings (correct format), use it
        if (Array.isArray(projectsArray)) {
            const result = [];
            
            projectsArray.forEach(item => {
                if (typeof item === 'string') {
                    // Check if it's HTML with <li> tags
                    if (item.includes('<li>')) {
                        // Parse HTML and extract each <li> content
                        const tempDiv = document.createElement('div');
                        tempDiv.innerHTML = item;
                        const listItems = tempDiv.querySelectorAll('li');
                        listItems.forEach(li => {
                            const text = li.textContent.trim();
                            if (text) result.push(text);
                        });
                    } else {
                        // Plain string, just clean it
                        const cleaned = item.replace(/<[^>]*>/g, '').trim();
                        if (cleaned) result.push(cleaned);
                    }
                } else {
                    // Handle other types
                    const text = String(item).trim();
                    if (text) result.push(text);
                }
            });
            
            return result;
        }
        
        return [];
    };
    const [projects, setProjects] = useState(initializeProjects())
    
    const [category, setCategory] = useState(details?.category || '')
    const [current, setCurrent] = useState(details?.current !== undefined ? details.current : true)
    const [email, setEmail] = useState(details?.email || '')
    const [gscholar, setGscholar] = useState(details?.gscholar || '')
    const [linkedin, setLinkedin] = useState(details?.linkedin || '')
    const [website, setWebsite] = useState(details?.website || '')
    const [advisors, setAdvisors] = useState(details?.advisors || '')
    const [image, setImage] = useState(null)
    const [existingImage, setExistingImage] = useState(details?.image || null)
    
    // Track if form has been modified
    const [isDirty, setIsDirty] = useState(false)
    const [showExitDialog, setShowExitDialog] = useState(false)
    
    // Mark form as dirty when any field changes
    const markDirty = () => setIsDirty(true)
    
    // Handle back button - check for unsaved changes
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
        setEditPersonId(null)
        if (props.onCancel) {
            props.onCancel()
        } else {
            onSubmit()
        }
    }
    
    // Update editor states when editing a different person
    useEffect(() => {
        if (props.id && details) {
            console.log('Updating form with details:', details);
            
            // Update description editor
            if (details.description) {
                try {
                    const blocksFromHtml = convertFromHTML(details.description)
                    const editState = ContentState.createFromBlockArray(
                        blocksFromHtml.contentBlocks,
                        blocksFromHtml.entityMap
                    )
                    setDesEditorState(EditorState.createWithContent(editState))
                    console.log('✓ Loaded description into editor')
                } catch (error) {
                    console.error('Error loading description:', error)
                    setDesEditorState(EditorState.createEmpty())
                }
            } else {
                setDesEditorState(EditorState.createEmpty())
            }
            
            // Update research editor
            if (details.research) {
                try {
                    const blocksFromHtml = convertFromHTML(details.research)
                    const editState = ContentState.createFromBlockArray(
                        blocksFromHtml.contentBlocks,
                        blocksFromHtml.entityMap
                    )
                    setResEditorState(EditorState.createWithContent(editState))
                    console.log('✓ Loaded research into editor')
                } catch (error) {
                    console.error('Error loading research:', error)
                    setResEditorState(EditorState.createEmpty())
                }
            } else {
                setResEditorState(EditorState.createEmpty())
            }
            
            // Update all other fields
            setFirstName(details.firstName || '')
            setLastName(details.lastName || '')
            setTitle(details.title || '')
            
            // Handle projects - parse HTML lists or use array
            let projectsArray = [];
            if (details.projects && Array.isArray(details.projects)) {
                details.projects.forEach(item => {
                    if (typeof item === 'string') {
                        // Check if it's HTML with <li> tags
                        if (item.includes('<li>')) {
                            // Parse HTML and extract each <li> content
                            const tempDiv = document.createElement('div');
                            tempDiv.innerHTML = item;
                            const listItems = tempDiv.querySelectorAll('li');
                            listItems.forEach(li => {
                                const text = li.textContent.trim();
                                if (text) projectsArray.push(text);
                            });
                        } else {
                            // Plain string, just clean it
                            const cleaned = item.replace(/<[^>]*>/g, '').trim();
                            if (cleaned) projectsArray.push(cleaned);
                        }
                    } else {
                        const text = String(item).trim();
                        if (text) projectsArray.push(text);
                    }
                });
            }
            setProjects(projectsArray)
            console.log('Projects loaded:', projectsArray)
            
            setCategory(details.category || '')
            setCurrent(details.current !== undefined ? details.current : true)
            setEmail(details.email || '')
            setGscholar(details.gscholar || '')
            setLinkedin(details.linkedin || '')
            setWebsite(details.website || '')
            setAdvisors(details.advisors || '')
            setWebsiteUrl(details.websiteUrl || '')
            setWebsiteName(details.websiteName || '')
            setAffiliateDepartment(details.description || '')
            setExistingImage(details.image || null)
            setImage(null) // Clear any pending new image
        }
    }, [props.id, details])
    
    
    const [newProject, setNewProject] = useState('')

    const removeProject = (index) => {
        setProjects((prevProjects) => prevProjects.filter((_, i) => i !== index))
    }
    
    const updateProject = (index, value) => {
        setProjects((prevProjects) => 
            prevProjects.map((proj, i) => i === index ? value : proj)
        )
    }
    
    const addProject = () => {
        if (newProject.trim()) {
            setProjects([...projects, newProject.trim()])
            setNewProject('')
        }
    }

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

    const [addPerson] = useMutation(ADD_PERSON, {
        refetchQueries: [{ query: QUERY_PEOPLE }]
    })
    const [editPerson] = useMutation(EDIT_PERSON, {
        refetchQueries: [{ query: QUERY_PEOPLE }]
    })

    // Check if current category is an affiliate
    const isAffiliate = category === 'Faculty Affiliate' || category === 'Student Affiliate'
    
    let handlePerson
    if (props.id) {

        handlePerson = async () => {
            const id = props.id
            // For affiliates, use plain text; for others, use rich text editor
            const description = isAffiliate ? affiliateDepartment : stateToHTML(desEditorState.getCurrentContent())
            let researchValue = isAffiliate ? research : stateToHTML(resEditorState.getCurrentContent())
            
            if (researchValue === "<p><br></p>"){
                researchValue = null
            }
            
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
                // If both image and existingImage are null, finalImage will be null (user removed it)
                
                await editPerson({
                    variables: {
                        id, 
                        firstName, 
                        lastName, 
                        title: Array.isArray(title) ? title : [title], 
                        image: finalImage, 
                        description, 
                        research: researchValue, 
                        projects: isAffiliate ? [] : projects, 
                        category, 
                        current, 
                        email: isAffiliate ? null : email, 
                        gscholar, 
                        linkedin, 
                        website, 
                        advisors,
                        websiteUrl,
                        websiteName
                    }
                })

            } catch (error) {
                console.error("Error updating person:", error)
                alert("Failed to update person. Please try again.")
            }
            setEditPersonId(null)
            onSubmit()
        }
    } else {
        handlePerson = async () => {
            // For affiliates, use plain text; for others, use rich text editor
            const description = isAffiliate ? affiliateDepartment : stateToHTML(desEditorState.getCurrentContent())
            let researchValue = isAffiliate ? research : stateToHTML(resEditorState.getCurrentContent())
            if (researchValue === "<p><br></p>"){
                researchValue = null
            }
            
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
                
                console.log('Creating person with:', {
                    firstName, lastName, title, 
                    image: finalImage, 
                    description, research, projects, 
                    category, current, email, 
                    gscholar, linkedin, 
                    website, advisors
                })
                
                const result = await addPerson({
                    variables: {
                        firstName, 
                        lastName, 
                        title: Array.isArray(title) ? title : [title], 
                        image: finalImage, 
                        description, 
                        research: researchValue, 
                        projects: isAffiliate ? [] : projects, 
                        category, 
                        current, 
                        email: isAffiliate ? null : email, 
                        gscholar, 
                        linkedin, 
                        website, 
                        advisors,
                        websiteUrl,
                        websiteName
                    }
                })
                
                console.log('Person created successfully:', result)
            } catch (error) {
                console.error('Error creating person:', error)
                alert('Failed to create person. Please check the console for details.')
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
                    {props.id ? 'Edit Person' : 'Add New Person'}
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
            
            <FormGroup>
                <div>
                    <FormControl sx= {{m:1, width: '40ch'}}>
                        <TextField select id="category" label="Category" value={category} helperText="Please select member role" onChange={(e) => { setCategory(e.target.value); markDirty(); }} >
                            <MenuItem key="leadership" value="Leadership">Leadership</MenuItem>
                            <MenuItem key="staff" value="Staff">Staff</MenuItem>
                            <MenuItem key="postdoc" value="Postdoc">Postdoc</MenuItem>
                            <MenuItem key="graduate-student" value="Graduate Student">Graduate Student</MenuItem>
                            <MenuItem key="undergraduate-student" value="Undergrad Student">Undergraduate Student</MenuItem>
                            <MenuItem key="faculty-affiliate" value="Faculty Affiliate">Faculty Affiliate</MenuItem>
                            <MenuItem key="student-affiliate" value="Student Affiliate">Student Affiliate</MenuItem>
                        </TextField>
                    </FormControl>
                    
                    <FormControl sx= {{m:1, width: '40ch'}}>
                        <TextField id="title" label="Title" value={title} variant="outlined" onChange={(e) => { setTitle(e.target.value); markDirty(); }} />
                    </FormControl>
                    
                </div>

                <div>
                    <FormControl sx= {{m:1, width: '40ch'}}>
                        <TextField id="first-name" label="First Name" value={firstName} variant="outlined" onChange={(e) => { setFirstName(e.target.value); markDirty(); }} />
                    </FormControl>
                    <FormControl sx= {{m:1, width: '40ch'}}>
                        <TextField id="last-name" label= "Last Name" value={lastName} variant="outlined" onChange={(e) => { setLastName(e.target.value); markDirty(); }} />
                    </FormControl>
                </div>

                <div>
                    <FormControlLabel control={<Checkbox checked={current} onChange={(e) => { setCurrent(e.target.checked); markDirty(); }} />} label="Current Member" />
                    {!isAffiliate && (
                        <FormControl sx= {{m:1, width: '40ch'}}>
                            <TextField id="email" label="Email" value={email} variant="outlined" onChange={(e) => { setEmail(e.target.value); markDirty(); }} />
                        </FormControl>
                    )}
                </div>
                
                {isAffiliate ? (
                    <>
                        {/* Affiliate-specific fields */}
                        <Box sx={{ p: 2, bgcolor: '#f5f5f5', borderRadius: 1, mb: 2 }}>
                            <Typography variant="subtitle2" color="primary" gutterBottom>
                                📝 Affiliate Instructions
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                • <strong>Profile URL:</strong> Link to their full bio page (e.g., department website)<br/>
                                • <strong>Department:</strong> Their department affiliation<br/>
                                • <strong>Website:</strong> Link to their lab or research group (optional)
                            </Typography>
                        </Box>
                        
                        <FormControl sx={{ m: 1, width: '90%' }}>
                            <TextField 
                                id="affiliate-profile-url" 
                                label="Profile URL" 
                                value={research}
                                variant="outlined" 
                                onChange={(e) => { setResearch(e.target.value); markDirty(); }}
                                helperText="Full URL to their bio page (e.g., https://www.geog.ucsb.edu/people/faculty/name)"
                                required
                            />
                        </FormControl>
                        
                        <FormControl sx={{ m: 1, width: '90%' }}>
                            <TextField 
                                id="affiliate-department" 
                                label="Department" 
                                value={affiliateDepartment}
                                variant="outlined" 
                                onChange={(e) => { setAffiliateDepartment(e.target.value); markDirty(); }}
                                helperText="e.g., 'UCSB Department of Geography'"
                                required
                            />
                        </FormControl>
                        
                        <FormControl sx={{ m: 1, width: '90%' }}>
                            <TextField 
                                id="website-url" 
                                label="Lab/Group Website URL" 
                                value={websiteUrl}
                                variant="outlined" 
                                onChange={(e) => { setWebsiteUrl(e.target.value); markDirty(); }}
                                helperText="Optional: Link to their lab or research group"
                            />
                        </FormControl>
                        
                        <FormControl sx={{ m: 1, width: '90%' }}>
                            <TextField 
                                id="website-name" 
                                label="Lab/Group Name" 
                                value={websiteName}
                                variant="outlined" 
                                onChange={(e) => { setWebsiteName(e.target.value); markDirty(); }}
                                helperText="Optional: Name of their lab or research group"
                            />
                        </FormControl>
                    </>
                ) : (
                    <>
                        {/* Regular member fields with rich text editors */}
                        <FormControl style={{width:"100%", height: "80%", margin: '10px'}}>
                            <InputLabel htmlFor="my-input" style={formControlStyle}>Personal Bio</InputLabel>
                            <div style={richTextEditorStyle}>
                                <RichTextEditor editorState={desEditorState} setEditorState={(state) => { setDesEditorState(state); markDirty(); }}/>
                            </div>
                        </FormControl>

                        <FormControl style={{width:"100%", height: "80%", margin: '10px'}}>
                            <InputLabel htmlFor="my-input" style={formControlStyle}>Research Description</InputLabel>
                            <div style={richTextEditorStyle}>
                                <RichTextEditor editorState={resEditorState} setEditorState={(state) => { setResEditorState(state); markDirty(); }}/>
                            </div>
                        </FormControl>
                    </>
                )}

                {/* Image Upload Section - Only for non-affiliates */}
                {!isAffiliate && (
                <FormControl style={{width:"100%", margin: "10px"}}>
                    <Typography variant="subtitle1" gutterBottom sx={{ mb: 2 }}>
                        Profile Image
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
                                alt="Profile preview"
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
                        id="person-image-upload"
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
                    <label htmlFor="person-image-upload">
                        <Button
                            variant="outlined"
                            component="span"
                            startIcon={<CloudUploadIcon />}
                            aria-label="Upload profile image"
                        >
                            {existingImage || image ? 'Replace Image' : 'Upload Image'}
                        </Button>
                    </label>
                </FormControl>
                )}
                {/* Projects Section - Only for non-affiliates */}
                {!isAffiliate && (
                <Box sx={{ width: '100%', mt: 2 }}>
                    <Typography variant="subtitle1" gutterBottom>
                        Projects
                    </Typography>
                    
                    {/* Existing projects - editable */}
                    {projects && Array.isArray(projects) && projects.length > 0 && projects.map((project, index) => {
                        // Strip HTML tags if project contains HTML and handle arrays
                        const projectText = typeof project === 'string' 
                            ? project.replace(/<[^>]*>/g, '').trim()
                            : Array.isArray(project)
                                ? project.join(', ')
                                : String(project);
                        
                        if (!projectText) return null; // Skip empty projects
                        
                        return (
                            <Box key={index} sx={{ display: 'flex', gap: 1, mb: 1, alignItems: 'center' }}>
                                <TextField
                                    fullWidth
                                    size="small"
                                    value={projectText}
                                    onChange={(e) => updateProject(index, e.target.value)}
                                    aria-label={`Project ${index + 1}`}
                                />
                                <IconButton 
                                    color="error" 
                                    onClick={() => removeProject(index)}
                                    aria-label={`Remove project: ${projectText}`}
                                    size="small"
                                >
                                    <DeleteIcon />
                                </IconButton>
                            </Box>
                        );
                    })}
                    
                    {/* Add new project */}
                    <Box sx={{ display: 'flex', gap: 1, mt: 2 }}>
                        <TextField 
                            fullWidth
                            size="small"
                            id="project" 
                            label="Add New Project" 
                            value={newProject}
                            onChange={(e) => setNewProject(e.target.value)}
                            onKeyPress={(e) => {
                                if (e.key === 'Enter') {
                                    e.preventDefault();
                                    addProject();
                                }
                            }}
                            aria-label="New project name"
                        />
                        <Button 
                            variant="contained" 
                            onClick={addProject}
                            disabled={!newProject.trim()}
                            aria-label="Add project"
                        >
                            Add
                        </Button>
                    </Box>
                </Box>
                )}
                
            </FormGroup>
            <Box sx={{ display: 'flex', gap: 2, mt: 3, mb: 3 }}>
                <Button variant="outlined" onClick={handleBack}>
                    Cancel
                </Button>
                <Button variant="contained" onClick={handlePerson}>
                    Save
                </Button>
            </Box>

        </Container>
        
    )
}