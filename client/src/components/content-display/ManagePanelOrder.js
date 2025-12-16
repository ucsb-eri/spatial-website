import React, { useState, useEffect } from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    List,
    ListItem,
    ListItemText,
    ListItemIcon,
    Paper,
    Typography,
    Box,
    IconButton
} from '@mui/material';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import CloseIcon from '@mui/icons-material/Close';
import { useMutation } from '@apollo/client';
import { EDIT_INFOPANEL } from '../../utils/mutations';
import { GET_INFOPANELS } from '../../utils/queries';

export default function ManagePanelOrder({ open, onClose, panels, location }) {
    const [orderedPanels, setOrderedPanels] = useState([]);
    const [draggedItem, setDraggedItem] = useState(null);
    const [draggedOverItem, setDraggedOverItem] = useState(null);

    const [editPanel] = useMutation(EDIT_INFOPANEL, {
        refetchQueries: [{ query: GET_INFOPANELS }]
    });

    // Initialize ordered panels when dialog opens or panels change
    useEffect(() => {
        if (panels && panels.length > 0) {
            const sorted = [...panels].sort((a, b) => 
                parseInt(a.taborder) - parseInt(b.taborder)
            );
            setOrderedPanels(sorted);
        }
    }, [panels, open]);

    const handleDragStart = (e, index) => {
        setDraggedItem(index);
        e.dataTransfer.effectAllowed = 'move';
        e.dataTransfer.setData('text/html', e.currentTarget);
    };

    const handleDragOver = (e, index) => {
        e.preventDefault();
        e.dataTransfer.dropEffect = 'move';
        
        if (draggedItem === null) return;
        if (index === draggedItem) return;
        
        setDraggedOverItem(index);
    };

    const handleDragEnd = () => {
        if (draggedItem === null || draggedOverItem === null) {
            setDraggedItem(null);
            setDraggedOverItem(null);
            return;
        }

        const items = [...orderedPanels];
        const draggedItemContent = items[draggedItem];
        
        // Remove dragged item
        items.splice(draggedItem, 1);
        
        // Insert at new position
        items.splice(draggedOverItem, 0, draggedItemContent);
        
        setOrderedPanels(items);
        setDraggedItem(null);
        setDraggedOverItem(null);
    };

    const handleSave = async () => {
        try {
            // Update all panels with their new order
            await Promise.all(
                orderedPanels.map(async (panel, index) => {
                    // Only update if order changed
                    if (parseInt(panel.taborder) !== index) {
                        const input = {
                            location: panel.location,
                            name: panel.name,
                            tabname: panel.tabname,
                            taborder: index,
                            content: (panel.content || []).map(c => ({
                                subtitle: c.subtitle || null,
                                description: c.description || '<p></p>', // Ensure never empty/null
                                image: (c.image || []).map(img => {
                                    if (!img) return null;
                                    if (typeof img === 'string') {
                                        return { url: img, label: '' };
                                    }
                                    if (img.url) {
                                        return { url: img.url, label: img.label || '' };
                                    }
                                    return null;
                                }).filter(img => img !== null)
                            })),
                            accordion: (panel.accordion || []).map((acc, accIndex) => ({
                                title: acc.title || 'Untitled',
                                taborder: acc.taborder !== undefined ? acc.taborder : index,
                                accordionOrder: acc.accordionOrder !== undefined ? acc.accordionOrder : accIndex,
                                content: (acc.content || []).map(c => ({
                                    subtitle: c.subtitle || null,
                                    description: c.description || '<p></p>', // Ensure never empty/null
                                    image: (c.image || []).map(img => {
                                        if (!img) return null;
                                        if (typeof img === 'string') {
                                            return { url: img, label: '' };
                                        }
                                        if (img.url) {
                                            return { url: img.url, label: img.label || '' };
                                        }
                                        return null;
                                    }).filter(img => img !== null)
                                }))
                            }))
                        };

                        console.log('Updating panel order for:', panel.name, 'New order:', index);

                        await editPanel({
                            variables: { id: panel.id, input }
                        });
                        
                        console.log('✓ Updated:', panel.name);
                    }
                })
            );
            onClose();
        } catch (error) {
            console.error('Error updating panel order:', error);
            alert(`Failed to update panel order: ${error.message || 'Unknown error'}`);
        }
    };

    const getItemStyle = (isDragging, index) => ({
        opacity: isDragging && draggedItem === index ? 0.5 : 1,
        backgroundColor: draggedOverItem === index ? '#e3f2fd' : 'white',
        cursor: 'grab',
        transition: 'background-color 0.2s ease',
        '&:active': {
            cursor: 'grabbing'
        }
    });

    return (
        <Dialog 
            open={open} 
            onClose={onClose}
            maxWidth="sm"
            fullWidth
            aria-labelledby="manage-order-dialog-title"
        >
            <DialogTitle id="manage-order-dialog-title">
                <Box display="flex" alignItems="center" justifyContent="space-between">
                    <Typography variant="h6">
                        Manage Panel Order - {location.charAt(0).toUpperCase() + location.slice(1)}
                    </Typography>
                    <IconButton 
                        onClick={onClose} 
                        size="small"
                        aria-label="Close panel order manager"
                    >
                        <CloseIcon />
                    </IconButton>
                </Box>
                <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                    Drag and drop to reorder panels
                </Typography>
            </DialogTitle>
            
            <DialogContent dividers>
                {orderedPanels.length === 0 ? (
                    <Typography color="text.secondary" align="center" sx={{ py: 4 }}>
                        No panels to reorder
                    </Typography>
                ) : (
                    <List sx={{ p: 0 }}>
                        {orderedPanels.map((panel, index) => (
                            <Paper
                                key={panel.id}
                                elevation={draggedItem === index ? 8 : 1}
                                sx={{
                                    mb: 1,
                                    ...getItemStyle(draggedItem !== null, index)
                                }}
                                draggable
                                onDragStart={(e) => handleDragStart(e, index)}
                                onDragOver={(e) => handleDragOver(e, index)}
                                onDragEnd={handleDragEnd}
                                role="listitem"
                                aria-label={`Panel ${index + 1}: ${panel.name}`}
                            >
                                <ListItem>
                                    <ListItemIcon>
                                        <DragIndicatorIcon 
                                            sx={{ cursor: 'grab' }}
                                            aria-label="Drag to reorder"
                                        />
                                    </ListItemIcon>
                                    <ListItemText
                                        primary={
                                            <Typography variant="body1" fontWeight="medium">
                                                {index + 1}. {panel.name}
                                            </Typography>
                                        }
                                        secondary={
                                            <Typography variant="caption" color="text.secondary">
                                                Tab: {panel.tabname}
                                            </Typography>
                                        }
                                    />
                                </ListItem>
                            </Paper>
                        ))}
                    </List>
                )}
            </DialogContent>
            
            <DialogActions sx={{ px: 3, py: 2 }}>
                <Button onClick={onClose} color="inherit">
                    Cancel
                </Button>
                <Button 
                    onClick={handleSave} 
                    variant="contained" 
                    disabled={orderedPanels.length === 0}
                    aria-label="Save new panel order"
                >
                    Save Order
                </Button>
            </DialogActions>
        </Dialog>
    );
}

