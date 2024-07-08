import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import axios from 'axios';

function LoginForm({ onLogin, toggleForm }) {
  const [formData, setFormData] = useState({
    mailuserId: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleLogin = async() => {
    try {
        console.log("rakesh",formData)
        const response = await axios.post('http://localhost:4000/api/auth/signin', formData);
        const token = response.data.token;
       
        console.log('Logged in successfully. Token:', token);
         // Store the token in localStorage 
         localStorage.setItem('token', token);
        onLogin(token)
      } catch (error) {
        console.error('Login failed:', error);
      }
    // Send a request to your backend to log in the user with formData
    // Handle the response and store the token if login is successful
    // Call onLogin with the token
  };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
      }}
    >
      <Paper elevation={3} sx={{ padding: '16px', minWidth: '300px' }}>
        <Typography variant="h4" gutterBottom>
          Login
        </Typography>
        <form>
          <TextField
            label="Username or Email "
            name="mailuserId"
            value={formData.mailuserId}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <Button variant="contained" color="primary" onClick={handleLogin} fullWidth>
            Login
          </Button>
        </form>
        <Typography sx={{ marginTop: '16px' }}>
          Don't have an account?{' '}
          <span
            style={{ cursor: 'pointer', color: 'blue' }}
            onClick={toggleForm}
          >
            Sign Up
          </span>
        </Typography>
      </Paper>
    </Box>
  );
}

export default LoginForm;
