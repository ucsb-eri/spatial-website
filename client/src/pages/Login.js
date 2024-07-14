import React, { useState, useContext } from "react";
import { Box, Button, Container, TextField, Typography } from '@mui/material';

import { useMutation } from "@apollo/client";

import { ADMIN_LOGIN } from "../utils/mutations";
import { AdminLoginContext} from "../context/AdminProvider"
import Auth from "../utils/auth";




export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loginMutation, { loading, error }] = useMutation(ADMIN_LOGIN);
    const { login } = useContext(AdminLoginContext)
    const [errorMsg, setErrorMsg] = useState('')


    const handleLogin = async (e) => {
    e.preventDefault();
    try {
        const loginResponse = await loginMutation({ variables: { email, password } });
        if (!loginResponse.data.adminSignOn) {
            setErrorMsg("Incorrect Email or Password")
        } else {
            const token = loginResponse.data.adminSignOn.token
            setErrorMsg("")
            login(token)
        }

    } catch (error) {
        setErrorMsg("Error logging in.")
    }
    };

    return (
    <Container maxWidth="sm">
        <Box sx={{ mt: 4, p: 3, boxShadow: 2, borderRadius: 2, bgcolor: 'background.paper' }}>
        <Typography variant="h5" gutterBottom>
            Admin Login
        </Typography>
        <form onSubmit={handleLogin}>
            <TextField
            id="email"
            label="Email"
            variant="outlined"
            fullWidth
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            margin="normal"
            required
            />
            <TextField
            id="password"
            label="Password"
            variant="outlined"
            type="password"
            fullWidth
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            margin="normal"
            required
            />
            <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            disabled={loading}
            sx={{ mt: 2 }}
            >
            {loading ? 'Logging in...' : 'Login'}
            </Button>
            {error && (
            <Typography variant="body2" color="error" sx={{ mt: 2 }}>
                {error.message}
            </Typography>
            )}
        </form>
        <Typography color="red">
            {errorMsg}
        </Typography>
        </Box>
    </Container>
    );
};