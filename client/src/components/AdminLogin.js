import React, { useState, useContext } from "react";
import { 
    Dialog, 
    DialogTitle, 
    DialogContent, 
    Button, 
    TextField, 
    Typography,
    IconButton,
    Box
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

import { useMutation } from "@apollo/client";
import { ADMIN_LOGIN } from "../utils/mutations";
import { AdminLoginContext } from "../context/AdminProvider";

/**
 * AdminLogin Dialog Component
 * 
 * A reusable login dialog for admin authentication.
 * Can be triggered from anywhere in the app (navbar, footer, etc.)
 * 
 * Props:
 * - open: Boolean - controls dialog visibility
 * - onClose: Function - callback when dialog should close
 */
export default function AdminLogin({ open, onClose }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loginMutation, { loading }] = useMutation(ADMIN_LOGIN);
    const { login } = useContext(AdminLoginContext);
    const [errorMsg, setErrorMsg] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const loginResponse = await loginMutation({ variables: { email, password } });
            if (!loginResponse.data.adminSignOn) {
                setErrorMsg("Incorrect Email or Password");
            } else {
                const token = loginResponse.data.adminSignOn.token;
                setErrorMsg("");
                login(token);
                
                // Clear form and close dialog
                setEmail('');
                setPassword('');
                onClose();
            }
        } catch (error) {
            setErrorMsg("Error logging in. Please try again.");
        }
    };

    const handleClose = () => {
        // Clear error message when closing
        setErrorMsg('');
        onClose();
    };

    return (
        <Dialog 
            open={open} 
            onClose={handleClose}
            maxWidth="xs"
            fullWidth
            aria-labelledby="admin-login-dialog-title"
        >
            <DialogTitle id="admin-login-dialog-title">
                <Box display="flex" alignItems="center" justifyContent="space-between">
                    <Typography variant="h6">
                        Admin Login
                    </Typography>
                    <IconButton 
                        onClick={handleClose} 
                        size="small"
                        aria-label="Close login dialog"
                    >
                        <CloseIcon />
                    </IconButton>
                </Box>
            </DialogTitle>
            
            <DialogContent>
                <form onSubmit={handleLogin}>
                    <TextField
                        id="admin-email"
                        label="Email"
                        variant="outlined"
                        fullWidth
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        margin="normal"
                        required
                        autoComplete="email"
                        aria-label="Admin email address"
                    />
                    <TextField
                        id="admin-password"
                        label="Password"
                        variant="outlined"
                        type="password"
                        fullWidth
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        margin="normal"
                        required
                        autoComplete="current-password"
                        aria-label="Admin password"
                    />
                    {errorMsg && (
                        <Typography 
                            variant="body2" 
                            color="error" 
                            sx={{ mt: 2 }}
                            role="alert"
                        >
                            {errorMsg}
                        </Typography>
                    )}
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        fullWidth
                        disabled={loading}
                        sx={{ mt: 3 }}
                        aria-label={loading ? 'Logging in, please wait' : 'Login to admin panel'}
                    >
                        {loading ? 'Logging in...' : 'Login'}
                    </Button>
                </form>
            </DialogContent>
        </Dialog>
    );
}


