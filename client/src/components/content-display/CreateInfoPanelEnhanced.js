import * as React from 'react';
import { useState, useEffect, useContext } from 'react';
import RichTextEditor from '../RichTextEditor';
import ImageUpload from '../ImageUpload';
import ManageAccordionOrder from './ManageAccordionOrder';
import {EditorState, ContentState} from 'draft-js'
import {stateToHTML} from 'draft-js-export-html'
import { convertFromHTML } from 'draft-js';
import 'draft-js/dist/Draft.css'
import '../../css/RichText.css'
import Auth from '../../utils/auth'

import { 
    FormGroup, 
    FormControl, 
    TextField, 
    Button, 
    Container,
    Paper,
    Typography,
    Box,
    IconButton,
    Accordion,
    AccordionSummary,
    AccordionDetails,
    Divider,
    Card,
    CardContent,
    CardHeader
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ReorderIcon from '@mui/icons-material/Reorder';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogActions from '@mui/material/DialogActions';

import { useMutation } from '@apollo/client';
import { ADD_INFOPANEL, EDIT_INFOPANEL } from '../../utils/mutations';
import { GET_INFOPANELS } from '../../utils/queries';
import { useProjectContext } from '../../context/ProjectContext';
import { AdminLoginContext } from '../../context/AdminProvider'

export default function CreateInfoPanelEnhanced(props) {
    const { logout } = useContext(AdminLoginContext)
    const {setEditInfoPanelId} = useProjectContext()
    const {location} = props

    useEffect(() => {
        if (Auth.isTokenExpired()) {
            logout()
        }
    })

    let onSubmit = props.onSubmit || (() => console.log("Panel saved"))

    // Helper to convert HTML to EditorState
    const htmlToEditorState = (html) => {
        if (!html) return EditorState.createEmpty()
        try {
            const blocksFromHtml = convertFromHTML(html)
            const contentState = ContentState.createFromBlockArray(
                blocksFromHtml.contentBlocks,
                blocksFromHtml.entityMap
            )
            return EditorState.createWithContent(contentState)
        } catch (error) {
            console.error('Error converting HTML to EditorState:', error)
            return EditorState.createEmpty()
        }
    }

    // Initialize from props if editing
    const initializeFromProps = () => {
        if (props.id) {
            // Editing mode - get data from panel query
            return {
                name: props.name || '',
                tabname: props.tabname || '',
                taborder: props.taborder || 0,
                contentSections: props.content?.map((c, idx) => ({
                    id: c.id || Date.now() + idx,
                    subtitle: c.subtitle || '',
                    description: htmlToEditorState(c.description),
                    // Handle both old format (strings) and new format (objects with url/label)
                    images: (c.image || []).map(img => 
                        typeof img === 'string' ? { url: img, label: '' } : img
                    )
                })) || [{
                    id: Date.now(),
                    subtitle: '',
                    description: htmlToEditorState(props.description),
                    images: []
                }],
                accordionItems: props.accordion?.map((acc, idx) => ({
                    id: acc.id || Date.now() + idx + 1000,
                    title: acc.title || '',
                    accordionOrder: acc.accordionOrder !== undefined ? acc.accordionOrder : idx,
                    taborder: acc.taborder !== undefined ? acc.taborder : props.taborder,
                    content: acc.content?.map((c, cIdx) => ({
                        id: c.id || Date.now() + idx + cIdx + 2000,
                        subtitle: c.subtitle || '',
                        description: htmlToEditorState(c.description),
                        // Handle both old format (strings) and new format (objects with url/label)
                        images: (c.image || []).map(img => 
                            typeof img === 'string' ? { url: img, label: '' } : img
                        )
                    })) || []
                })).sort((a, b) => a.accordionOrder - b.accordionOrder) || []
            }
        } else {
            // New panel mode
            return {
                name: '',
                tabname: '',
                taborder: 0,
                contentSections: [{
                    id: Date.now(),
                    subtitle: '',
                    description: EditorState.createEmpty(),
                    images: []
                }],
                accordionItems: []
            }
        }
    }

    const initialData = initializeFromProps()

    // Basic panel info
    const [name, setName] = useState(initialData.name)
    const [tabname, setTabname] = useState(initialData.tabname)
    // taborder is now auto-assigned, not user-editable

    // Content sections state
    const [contentSections, setContentSections] = useState(initialData.contentSections)

    // Accordion items state
    const [accordionItems, setAccordionItems] = useState(initialData.accordionItems)
    
    // Track if form has been modified
    const [isDirty, setIsDirty] = useState(false)
    const [showExitDialog, setShowExitDialog] = useState(false)
    const [showAccordionOrderDialog, setShowAccordionOrderDialog] = useState(false)
    
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
        setEditInfoPanelId(null)
        onSubmit()
    }

    const [addPanel] = useMutation(ADD_INFOPANEL, {
        refetchQueries: [{ query: GET_INFOPANELS }]
    })
    const [editPanel] = useMutation(EDIT_INFOPANEL, {
        refetchQueries: [{ query: GET_INFOPANELS }]
    })

    // Content section handlers
    const addContentSection = () => {
        setContentSections([...contentSections, {
            id: Date.now(),
            subtitle: '',
            description: EditorState.createEmpty(),
            images: []
        }])
        markDirty()
    }

    const removeContentSection = (id) => {
        setContentSections(contentSections.filter(section => section.id !== id))
        markDirty()
    }

    const updateContentSection = (id, field, value) => {
        setContentSections(contentSections.map(section => 
            section.id === id ? { ...section, [field]: value } : section
        ))
        markDirty()
    }

    // Accordion handlers
    const addAccordionItem = () => {
        const newAccordionOrder = accordionItems.length > 0 
            ? Math.max(...accordionItems.map(item => item.accordionOrder || 0)) + 1 
            : 0;
        
        setAccordionItems([...accordionItems, {
            id: Date.now(),
            title: '',
            accordionOrder: newAccordionOrder,
            taborder: props.taborder || 0,
            content: [{
                id: Date.now() + 1,
                subtitle: '',
                description: EditorState.createEmpty(),
                images: []
            }]
        }])
        markDirty()
    }

    const removeAccordionItem = (id) => {
        setAccordionItems(accordionItems.filter(item => item.id !== id))
        markDirty()
    }

    const updateAccordionTitle = (id, title) => {
        setAccordionItems(accordionItems.map(item =>
            item.id === id ? { ...item, title } : item
        ))
        markDirty()
    }
    
    const handleAccordionOrderSave = (reorderedAccordions) => {
        setAccordionItems(reorderedAccordions)
        markDirty()
    }

    const addAccordionContent = (accordionId) => {
        setAccordionItems(accordionItems.map(item =>
            item.id === accordionId ? {
                ...item,
                content: [...item.content, {
                    id: Date.now(),
                    subtitle: '',
                    description: EditorState.createEmpty(),
                    images: []
                }]
            } : item
        ))
        markDirty()
    }

    const removeAccordionContent = (accordionId, contentId) => {
        setAccordionItems(accordionItems.map(item =>
            item.id === accordionId ? {
                ...item,
                content: item.content.filter(c => c.id !== contentId)
            } : item
        ))
        markDirty()
    }

    const updateAccordionContent = (accordionId, contentId, field, value) => {
        setAccordionItems(accordionItems.map(item =>
            item.id === accordionId ? {
                ...item,
                content: item.content.map(c =>
                    c.id === contentId ? { ...c, [field]: value } : c
                )
            } : item
        ))
        markDirty()
    }

    // Save handler
    const handlePanel = async () => {
        try {
            // Convert all editor states to HTML
            const processedContent = contentSections.map(section => {
                // Ensure images are properly formatted as {url, label} objects
                const imageData = (section.images || []).map(img => ({
                    url: typeof img === 'string' ? img : (img.url || img),
                    label: typeof img === 'string' ? '' : (img.label || '')
                }));

                return {
                    subtitle: section.subtitle || null,
                    description: stateToHTML(section.description.getCurrentContent()),
                    image: imageData
                };
            });

            const processedAccordion = accordionItems.map((item, index) => ({
                title: item.title,
                taborder: parseInt(props.id ? (props.taborder || 0) : 9999),
                accordionOrder: item.accordionOrder !== undefined ? item.accordionOrder : index,
                content: item.content.map(c => {
                    // Ensure images are properly formatted as {url, label} objects
                    const imageData = (c.images || []).map(img => ({
                        url: typeof img === 'string' ? img : (img.url || img),
                        label: typeof img === 'string' ? '' : (img.label || '')
                    }));

                    return {
                        subtitle: c.subtitle || null,
                        description: stateToHTML(c.description.getCurrentContent()),
                        image: imageData
                    };
                })
            }));

            const input = {
                location,
                name: name || "Untitled",
                tabname: tabname || "untitled",
                taborder: parseInt(props.id ? (props.taborder || 0) : 9999), // Keep existing order or assign to end for new panels
                content: processedContent,
                accordion: processedAccordion
            };

            console.log('Saving panel with input:', JSON.stringify(input, null, 2));

            if (props.id) {
                // Edit existing panel - keep same order
                await editPanel({
                    variables: { id: props.id, input }
                })
                setEditInfoPanelId(null)
            } else {
                // Create new panel - will be added to end (order 9999), admin can reorder later
                await addPanel({
                    variables: { input }
                })
            }

            onSubmit()
        } catch (error) {
            console.error('Error saving panel:', error)
            alert('Failed to save panel. Please check the console for details.')
        }
    }

    return (
        <Container maxWidth="lg" sx={{ py: 4 }}>
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
                    {props.id ? 'Edit Panel' : 'Create New Panel'}
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
            
            <Paper elevation={3} sx={{ p: 4 }}>
                {/* Basic Info */}
                <Box sx={{ mb: 4 }}>
                    <Typography variant="h6" gutterBottom color="primary">
                        Panel Information
                    </Typography>
                    <FormGroup>
                        <TextField 
                            label="Panel Name" 
                            value={name}
                            onChange={(e) => { setName(e.target.value); markDirty(); }}
                            fullWidth
                            margin="normal"
                            required
                            aria-label="Panel name"
                        />
                        <TextField 
                            label="Tab Name (URL)" 
                            value={tabname}
                            onChange={(e) => { setTabname(e.target.value); markDirty(); }}
                            fullWidth
                            margin="normal"
                            required
                            helperText="Lowercase, no spaces (e.g., 'overview', 'history')"
                            aria-label="Tab name for URL"
                        />
                        {props.id && (
                            <Typography variant="caption" color="text.secondary" sx={{ mt: 1 }}>
                                💡 To reorder panels, use the "Manage Panel Order" button on the main page
                            </Typography>
                        )}
                    </FormGroup>
                </Box>

                <Divider sx={{ my: 3 }} />

                {/* Content Sections */}
                <Box sx={{ mb: 4 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                        <Typography variant="h6" color="primary">
                            Content Sections
                        </Typography>
                        <Button 
                            startIcon={<AddIcon />} 
                            variant="outlined"
                            onClick={addContentSection}
                        >
                            Add Section
                        </Button>
                    </Box>

                    {contentSections.map((section, index) => (
                        <Card key={section.id} sx={{ mb: 2 }}>
                            <CardHeader
                                title={`Section ${index + 1}`}
                                action={
                                    contentSections.length > 1 && (
                                        <IconButton 
                                            onClick={() => removeContentSection(section.id)}
                                            color="error"
                                        >
                                            <DeleteIcon />
                                        </IconButton>
                                    )
                                }
                            />
                            <CardContent>
                                <TextField 
                                    label="Subtitle (Optional)" 
                                    value={section.subtitle}
                                    onChange={(e) => updateContentSection(section.id, 'subtitle', e.target.value)}
                                    fullWidth
                                    margin="normal"
                                />
                                <Box sx={{ 
                                    border: '1px solid #ccc', 
                                    borderRadius: 1, 
                                    p: 2, 
                                    mt: 2,
                                    minHeight: 200
                                }}>
                                    <Typography variant="caption" color="text.secondary" gutterBottom>
                                        Description (Required)
                                    </Typography>
                                    <RichTextEditor 
                                        editorState={section.description} 
                                        setEditorState={(newState) => 
                                            updateContentSection(section.id, 'description', newState)
                                        }
                                    />
                                </Box>
                                
                                <Box sx={{ mt: 3 }}>
                                    <Typography variant="caption" color="text.secondary" gutterBottom>
                                        Images (Optional)
                                    </Typography>
                                    <ImageUpload
                                        images={section.images}
                                        onChange={(newImages) => updateContentSection(section.id, 'images', newImages)}
                                        multiple={true}
                                        maxImages={5}
                                    />
                                </Box>
                            </CardContent>
                        </Card>
                    ))}
                </Box>

                <Divider sx={{ my: 3 }} />

                {/* Accordion Items */}
                <Box sx={{ mb: 4 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                        <Typography variant="h6" color="primary">
                            Accordion Items (Optional)
                        </Typography>
                        <Box sx={{ display: 'flex', gap: 1 }}>
                            {accordionItems.length > 1 && (
                                <Button 
                                    startIcon={<ReorderIcon />} 
                                    variant="outlined"
                                    onClick={() => setShowAccordionOrderDialog(true)}
                                >
                                    Reorder
                                </Button>
                            )}
                            <Button 
                                startIcon={<AddIcon />} 
                                variant="outlined"
                                onClick={addAccordionItem}
                            >
                                Add Accordion
                            </Button>
                        </Box>
                    </Box>

                    {accordionItems.map((accordion, accIndex) => (
                        <Accordion key={accordion.id} sx={{ mb: 2 }}>
                            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                                <Box sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
                                    <Typography sx={{ flexGrow: 1 }}>
                                        Accordion {accIndex + 1}: {accordion.title || '(Untitled)'}
                                    </Typography>
                                    <IconButton 
                                        size="small"
                                        onClick={(e) => {
                                            e.stopPropagation()
                                            removeAccordionItem(accordion.id)
                                        }}
                                        color="error"
                                    >
                                        <DeleteIcon />
                                    </IconButton>
                                </Box>
                            </AccordionSummary>
                            <AccordionDetails>
                                <TextField 
                                    label="Accordion Title" 
                                    value={accordion.title}
                                    onChange={(e) => updateAccordionTitle(accordion.id, e.target.value)}
                                    fullWidth
                                    margin="normal"
                                    required
                                />
                                
                                <Box sx={{ mt: 2 }}>
                                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                                        <Typography variant="subtitle2" color="text.secondary">
                                            Accordion Content
                                        </Typography>
                                        <Button 
                                            size="small"
                                            startIcon={<AddIcon />}
                                            onClick={() => addAccordionContent(accordion.id)}
                                        >
                                            Add Content
                                        </Button>
                                    </Box>

                                    {accordion.content.map((content, contentIndex) => (
                                        <Card key={content.id} variant="outlined" sx={{ mb: 1, p: 2 }}>
                                            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                                                <Typography variant="caption">
                                                    Content Block {contentIndex + 1}
                                                </Typography>
                                                {accordion.content.length > 1 && (
                                                    <IconButton 
                                                        size="small"
                                                        onClick={() => removeAccordionContent(accordion.id, content.id)}
                                                        color="error"
                                                    >
                                                        <DeleteIcon fontSize="small" />
                                                    </IconButton>
                                                )}
                                            </Box>
                                            <TextField 
                                                label="Subtitle (Optional)" 
                                                value={content.subtitle}
                                                onChange={(e) => updateAccordionContent(
                                                    accordion.id, content.id, 'subtitle', e.target.value
                                                )}
                                                fullWidth
                                                size="small"
                                                margin="dense"
                                            />
                                            <Box sx={{ 
                                                border: '1px solid #ddd', 
                                                borderRadius: 1, 
                                                p: 1, 
                                                mt: 1,
                                                minHeight: 150
                                            }}>
                                                <RichTextEditor 
                                                    editorState={content.description} 
                                                    setEditorState={(newState) => 
                                                        updateAccordionContent(
                                                            accordion.id, content.id, 'description', newState
                                                        )
                                                    }
                                                />
                                            </Box>
                                            
                                            <Box sx={{ mt: 2 }}>
                                                <Typography variant="caption" color="text.secondary" gutterBottom>
                                                    Images (Optional)
                                                </Typography>
                                                <ImageUpload
                                                    images={content.images}
                                                    onChange={(newImages) => updateAccordionContent(
                                                        accordion.id, content.id, 'images', newImages
                                                    )}
                                                    multiple={true}
                                                    maxImages={5}
                                                />
                                            </Box>
                                        </Card>
                                    ))}
                                </Box>
                            </AccordionDetails>
                        </Accordion>
                    ))}
                </Box>
                
                {/* Accordion Order Manager Dialog */}
                <ManageAccordionOrder
                    open={showAccordionOrderDialog}
                    onClose={() => setShowAccordionOrderDialog(false)}
                    accordionItems={accordionItems}
                    onSave={handleAccordionOrderSave}
                />

                {/* Action Buttons */}
                <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end', mt: 4, mb: 2 }}>
                    <Button 
                        variant="outlined" 
                        onClick={handleBack}
                    >
                        Cancel
                    </Button>
                    <Button 
                        variant="contained" 
                        onClick={handlePanel}
                        size="large"
                    >
                        {props.id ? 'Update Panel' : 'Create Panel'}
                    </Button>
                </Box>
            </Paper>
        </Container>
    )
}

