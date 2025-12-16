import React, { useState } from 'react';
import { Box, Button, Typography, IconButton, Card, CardMedia, CardActions, CircularProgress, TextField, CardContent } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import axios from 'axios';
import Auth from '../utils/auth';
import { getUploadUrl } from '../utils/config';

/**
 * ImageUpload Component
 * 
 * A reusable component for uploading images to Azure Blob Storage or local storage.
 * Supports multiple images with labels and displays previews.
 * Includes full accessibility support with aria-labels and alt text.
 * 
 * Props:
 * - images: Array of image objects [{url: string, label: string}] or strings (for backward compatibility)
 * - onChange: Callback function called when images change
 * - multiple: Boolean - allow multiple images (default: false)
 * - maxImages: Number - maximum number of images (default: 5)
 */
export default function ImageUpload({ images = [], onChange, multiple = false, maxImages = 5 }) {
    const [uploading, setUploading] = useState(false);
    const [uploadProgress, setUploadProgress] = useState({});

    // Normalize images to always be objects with url and label
    const normalizeImages = (imgs) => {
        return imgs.map(img => 
            typeof img === 'string' ? { url: img, label: '' } : img
        );
    };

    const normalizedImages = normalizeImages(images);

    const handleFileSelect = async (event) => {
        const files = Array.from(event.target.files);
        
        if (!multiple && files.length > 1) {
            alert('Please select only one image');
            return;
        }

        if (normalizedImages.length + files.length > maxImages) {
            alert(`Maximum ${maxImages} images allowed`);
            return;
        }

        setUploading(true);

        try {
            const uploadPromises = files.map((file, index) => uploadSingleImage(file, index));
            const uploadedUrls = await Promise.all(uploadPromises);
            
            // Create image objects with empty labels
            const uploadedImages = uploadedUrls
                .filter(url => url !== null)
                .map(url => ({ url, label: '' }));
            
            const newImages = multiple 
                ? [...normalizedImages, ...uploadedImages]
                : uploadedImages;
            
            onChange(newImages);
        } catch (error) {
            console.error('Upload error:', error);
            alert('Failed to upload one or more images');
        } finally {
            setUploading(false);
            setUploadProgress({});
        }
    };

    const uploadSingleImage = async (file, index) => {
        const formData = new FormData();
        formData.append('image', file);

        try {
            const token = Auth.getToken();
            const result = await axios.post(getUploadUrl(), formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${token}`
                },
                onUploadProgress: (progressEvent) => {
                    const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                    setUploadProgress(prev => ({
                        ...prev,
                        [index]: percentCompleted
                    }));
                }
            });

            console.log('Upload successful:', result.data);
            return result.data.imageName; // This is either Azure URL or local filename
        } catch (error) {
            console.error('Upload failed:', error);
            return null;
        }
    };

    const handleRemoveImage = (indexToRemove) => {
        const newImages = normalizedImages.filter((_, index) => index !== indexToRemove);
        onChange(newImages);
    };

    const handleLabelChange = (index, newLabel) => {
        const newImages = [...normalizedImages];
        newImages[index] = { ...newImages[index], label: newLabel };
        onChange(newImages);
    };

    const getImageUrl = (imageUrlOrObject) => {
        // Handle both string URLs and image objects
        const url = typeof imageUrlOrObject === 'string' ? imageUrlOrObject : imageUrlOrObject.url;
        
        // If it's already a full URL (Azure), return as-is
        if (url.startsWith('http')) {
            return url;
        }
        // For local storage, construct the URL
        return `${process.env.REACT_APP_API_URL || 'http://localhost:3001'}/images/${url}`;
    };

    return (
        <Box sx={{ width: '100%' }} role="region" aria-label="Image upload section">
            {/* Upload Button */}
            <Box sx={{ mb: 2 }}>
                <input
                    accept="image/*"
                    style={{ display: 'none' }}
                    id="image-upload-input"
                    type="file"
                    multiple={multiple}
                    onChange={handleFileSelect}
                    disabled={uploading || (normalizedImages.length >= maxImages)}
                    aria-label={multiple ? 'Upload multiple images' : 'Upload single image'}
                />
                <label htmlFor="image-upload-input">
                    <Button
                        variant="outlined"
                        component="span"
                        startIcon={uploading ? <CircularProgress size={20} /> : <CloudUploadIcon />}
                        disabled={uploading || (normalizedImages.length >= maxImages)}
                        fullWidth
                        aria-label={uploading ? 'Uploading images, please wait' : (multiple ? 'Select images to upload' : 'Select image to upload')}
                    >
                        {uploading ? 'Uploading...' : multiple ? 'Upload Images' : 'Upload Image'}
                    </Button>
                </label>
                {multiple && (
                    <Typography variant="caption" display="block" sx={{ mt: 1 }} color="text.secondary" aria-live="polite">
                        {normalizedImages.length} of {maxImages} images uploaded
                    </Typography>
                )}
            </Box>

            {/* Upload Progress */}
            {Object.keys(uploadProgress).length > 0 && (
                <Box sx={{ mb: 2 }}>
                    {Object.entries(uploadProgress).map(([index, progress]) => (
                        <Box key={index} sx={{ mb: 1 }}>
                            <Typography variant="caption">
                                Uploading image {parseInt(index) + 1}: {progress}%
                            </Typography>
                            <Box sx={{ width: '100%', height: 4, bgcolor: '#e0e0e0', borderRadius: 2, overflow: 'hidden' }}>
                                <Box sx={{ width: `${progress}%`, height: '100%', bgcolor: 'primary.main', transition: 'width 0.3s' }} />
                            </Box>
                        </Box>
                    ))}
                </Box>
            )}

            {/* Image Previews */}
            {normalizedImages.length > 0 && (
                <Box 
                    sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}
                    role="list"
                    aria-label="Uploaded images"
                >
                    {normalizedImages.map((image, index) => (
                        <Card 
                            key={index} 
                            sx={{ width: 200, position: 'relative', display: 'flex', flexDirection: 'column' }}
                            role="listitem"
                        >
                            <CardMedia
                                component="img"
                                height="150"
                                image={getImageUrl(image)}
                                alt={image.label || `Uploaded image ${index + 1}`}
                                sx={{ objectFit: 'cover' }}
                                loading="lazy"
                            />
                            <CardActions sx={{ justifyContent: 'flex-end', p: 0.5, position: 'absolute', top: 0, right: 0, bgcolor: 'rgba(255,255,255,0.7)' }}>
                                <IconButton
                                    size="small"
                                    color="error"
                                    onClick={() => handleRemoveImage(index)}
                                    disabled={uploading}
                                    aria-label={`Delete image ${index + 1}${image.label ? `: ${image.label}` : ''}`}
                                >
                                    <DeleteIcon fontSize="small" />
                                </IconButton>
                            </CardActions>
                            <CardContent sx={{ p: 1.5, pb: 1.5, '&:last-child': { pb: 1.5 }, flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'flex-start' }}>
                                <Typography variant="caption" color="text.secondary" sx={{ mb: 0.5, display: 'block', fontWeight: 500 }}>
                                    Caption (Optional):
                                </Typography>
                                <TextField
                                    fullWidth
                                    size="small"
                                    placeholder="e.g., 'Research team at conference 2024'"
                                    value={image.label || ''}
                                    onChange={(e) => handleLabelChange(index, e.target.value)}
                                    aria-label={`Caption for image ${index + 1}`}
                                    inputProps={{
                                        'aria-label': 'Image caption',
                                        maxLength: 200
                                    }}
                                    helperText={`${(image.label || '').length}/200 characters`}
                                    sx={{
                                        '& .MuiInputBase-input': {
                                            fontSize: '0.875rem'
                                        },
                                        '& .MuiFormHelperText-root': {
                                            fontSize: '0.65rem',
                                            marginTop: 0.5
                                        }
                                    }}
                                />
                            </CardContent>
                        </Card>
                    ))}
                </Box>
            )}
        </Box>
    );
}

