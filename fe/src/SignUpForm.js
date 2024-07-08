import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import axios from 'axios';

function SignUpForm({ onSignUp, toggleForm }) {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });

  const [alertOpen, setAlertOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertSeverity, setAlertSeverity] = useState('success');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleAlertClose = () => {
    setAlertOpen(false);
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
        const response = await axios.post('http://localhost:4000/api/auth/signup', formData);
        console.log('User registered successfully:', response.data);
      // Simulate a successful signup
      // Replace this with your actual signup logic
      setAlertSeverity('success');
      setAlertMessage('Signup successful!');
      setAlertOpen(true);

      // Call onSignUp with the token if needed
    } catch (error) {
      console.error('Registration failed:', error);
      setAlertSeverity('error');
      setAlertMessage('Signup failed. Please try again.');
      setAlertOpen(true);
    }
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
          Sign Up
        </Typography>
        <form>
          <TextField
            label="Username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Email"
            name="email"
            value={formData.email}
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
          <Button variant="contained" color="primary" onClick={handleSignUp} fullWidth>
            Sign Up
          </Button>
        </form>
        <Typography sx={{ marginTop: '16px' }}>
          Already have an account?{' '}
          <span
            style={{ cursor: 'pointer', color: 'blue' }}
            onClick={toggleForm}
          >
            Login
          </span>
        </Typography>
        <Snackbar open={alertOpen} autoHideDuration={6000} onClose={handleAlertClose}>
        <MuiAlert
          elevation={6}
          variant="filled"
          onClose={handleAlertClose}
          severity={alertSeverity}
        >
          {alertMessage}
        </MuiAlert>
      </Snackbar>
      </Paper>
     
    </Box>
  );
}

export default SignUpForm;
