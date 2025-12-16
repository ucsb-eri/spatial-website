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

export default function ManageAccordionOrder({ open, onClose, accordionItems, onSave }) {
    const [orderedAccordions, setOrderedAccordions] = useState([]);
    const [draggedItem, setDraggedItem] = useState(null);
    const [draggedOverItem, setDraggedOverItem] = useState(null);

    // Initialize ordered accordions when dialog opens or items change
    useEffect(() => {
        if (accordionItems && accordionItems.length > 0) {
            // Sort by accordionOrder if it exists, otherwise by current order
            const sorted = [...accordionItems].sort((a, b) => {
                const orderA = a.accordionOrder !== undefined ? a.accordionOrder : accordionItems.indexOf(a);
                const orderB = b.accordionOrder !== undefined ? b.accordionOrder : accordionItems.indexOf(b);
                return orderA - orderB;
            });
            setOrderedAccordions(sorted);
        }
    }, [accordionItems, open]);

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

        const items = [...orderedAccordions];
        const draggedItemContent = items[draggedItem];
        
        // Remove dragged item
        items.splice(draggedItem, 1);
        
        // Insert at new position
        items.splice(draggedOverItem, 0, draggedItemContent);
        
        setOrderedAccordions(items);
        setDraggedItem(null);
        setDraggedOverItem(null);
    };

    const handleSave = () => {
        // Update accordionOrder for each item based on its position
        const updatedAccordions = orderedAccordions.map((item, index) => ({
            ...item,
            accordionOrder: index
        }));
        
        onSave(updatedAccordions);
        onClose();
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
            aria-labelledby="manage-accordion-order-dialog-title"
        >
            <DialogTitle id="manage-accordion-order-dialog-title">
                <Box display="flex" alignItems="center" justifyContent="space-between">
                    <Typography variant="h6">
                        Manage Accordion Order
                    </Typography>
                    <IconButton 
                        onClick={onClose} 
                        size="small"
                        aria-label="Close accordion order manager"
                    >
                        <CloseIcon />
                    </IconButton>
                </Box>
                <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                    Drag and drop to reorder accordion items
                </Typography>
            </DialogTitle>
            
            <DialogContent dividers>
                {orderedAccordions.length === 0 ? (
                    <Typography color="text.secondary" align="center" sx={{ py: 4 }}>
                        No accordion items to reorder
                    </Typography>
                ) : (
                    <List sx={{ p: 0 }}>
                        {orderedAccordions.map((accordion, index) => (
                            <Paper
                                key={accordion.id}
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
                                aria-label={`Accordion ${index + 1}: ${accordion.title}`}
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
                                                {index + 1}. {accordion.title || '(Untitled)'}
                                            </Typography>
                                        }
                                        secondary={
                                            accordion.content && accordion.content.length > 0 ? (
                                                <Typography variant="caption" color="text.secondary">
                                                    {accordion.content.length} content block{accordion.content.length !== 1 ? 's' : ''}
                                                </Typography>
                                            ) : null
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
                    disabled={orderedAccordions.length === 0}
                    aria-label="Save new accordion order"
                >
                    Save Order
                </Button>
            </DialogActions>
        </Dialog>
    );
}

