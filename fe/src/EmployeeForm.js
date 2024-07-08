
import React, { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import axiosInstance from './axiosInstance';

function EmployeeForm({ employeeDataForEditing, onFormSubmit }) {
  const [employeeData, setEmployeeData] = useState({
    empid: '',
    name: '',
    designation: '',
    address: '',
    phoneNo: '',
    email: '',
    gender: '',
  });

  useEffect(() => {
    if (employeeDataForEditing) {
      setEmployeeData(employeeDataForEditing);
    }
  }, [employeeDataForEditing]);

  const [errors, setErrors] = useState({
    empid: '',
    name: '',
    designation: '',
    address: '',
    phoneNo: '',
    email: '',
    gender: '',
  });

  const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmployeeData({ ...employeeData, [name]: value });
    validateInput(name, value);
  };

  const validateInput = (name, value) => {
    const updatedErrors = { ...errors };
    let isFormValid = true;

    // Validation rules
    const emailPattern = /\S+@\S+\.\S+/;
    const phoneNoPattern = /^\d{10}$/;

    // Validate required fields
    if (value.trim() === '') {
      updatedErrors[name] = 'Field is required';
      isFormValid = false;
    } else {
      updatedErrors[name] = '';
    }

    // Validate email format
    if (name === 'email' && !emailPattern.test(value)) {
      updatedErrors.email = 'Invalid email format';
      isFormValid = false;
    }

    // Validate phoneNo format
    if (name === 'phoneNo' && !phoneNoPattern.test(value)) {
      updatedErrors.phoneNo = 'Phone number should be 10 digits';
      isFormValid = false;
    }

    // Validate gender (dropdown)
    if (name === 'gender' && value.trim() === '') {
      updatedErrors.gender = 'Field is required';
      isFormValid = false;
    } else {
      updatedErrors.gender = '';
    }

    // Validate empid
    if (name === 'empid' && !/^\d+$/.test(value)) {
      updatedErrors.empid = 'Employee ID must be a number';
      isFormValid = false;
    } else {
      updatedErrors.empid = '';
    }

    setErrors(updatedErrors);
    setIsSubmitDisabled(!isFormValid);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (employeeDataForEditing) {
        // If editing, use PUT request to update the employee's data
        const response = await axiosInstance.put(`employees/${employeeData._id}`, employeeData);
        console.log('Employee updated successfully', response);
        // setEmployeeDataForEditing("")
      } else {
        // If not editing, use POST request to add a new employee
        const response = await axiosInstance.post('employees', employeeData);
        console.log('Employee added successfully:', response.data);
      }
      onFormSubmit(); // Notify the parent component about the submission
      clearForm();
    } catch (error) {
      console.error('Employee data submission failed:', error);
    }
  };

  const clearForm = () => {
    setEmployeeData({
      empid: '',
      name: '',
      designation: '',
      address: '',
      phoneNo: '',
      email: '',
      gender: '',
    });
    setErrors({
      empid: '',
      name: '',
      designation: '',
      address: '',
      phoneNo: '',
      email: '',
      gender: '',
    });
    setIsSubmitDisabled(true);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '80vh',
      }}
    >
      <Paper elevation={3} sx={{ padding: '16px', width: '400px' }}>
        <Typography variant="h4" gutterBottom>
          {employeeDataForEditing ? 'Edit Employee' : 'Add Employee'}
        </Typography>
        <form>
          <TextField
            label="Employee ID"
            name="empid"
            value={employeeData.empid}
            onChange={handleChange}
            fullWidth
            sx={{ marginBottom: '16px' }}  // Add margin here
          />
          {errors.empid && <p style={{ color: 'red' }}>{errors.empid}</p>}
          <TextField
            label="Name"
            name="name"
            value={employeeData.name}
            onChange={handleChange}
            fullWidth
            sx={{ marginBottom: '16px' }}  // Add margin here
          />
          {errors.name && <p style={{ color: 'red' }}>{errors.name}</p>}
          <TextField
            label="Designation"
            name="designation"
            value={employeeData.designation}
            onChange={handleChange}
            fullWidth
            sx={{ marginBottom: '16px' }}  // Add margin here
          />
          {errors.designation && <p style={{ color: 'red' }}>{errors.designation}</p>}
          <TextField
            label="Address"
            name="address"
            value={employeeData.address}
            onChange={handleChange}
            fullWidth
            sx={{ marginBottom: '16px' }}  // Add margin here
          />
          {errors.address && <p style={{ color: 'red' }}>{errors.address}</p>}
          <TextField
            label="PhoneNo"
            name="phoneNo"
            value={employeeData.phoneNo}
            onChange={handleChange}
            fullWidth
            sx={{ marginBottom: '16px' }}  // Add margin here
          />
          {errors.phoneNo && <p style={{ color: 'red' }}>{errors.phoneNo}</p>}
          <TextField
            label="Email"
            name="email"
            value={employeeData.email}
            onChange={handleChange}
            fullWidth
            sx={{ marginBottom: '16px' }}  // Add margin here
          />
          {errors.email && <p style={{ color: 'red' }}>{errors.email}</p>}
          <FormControl fullWidth>
            <InputLabel>Gender</InputLabel>
            <Select name="gender" value={employeeData.gender} onChange={handleChange} sx={{ marginBottom: '16px' }}>  // Add margin here
              <MenuItem value="Male">Male</MenuItem>
              <MenuItem value="Female">Female</MenuItem>
              <MenuItem value="Other">Other</MenuItem>
            </Select>
            {errors.gender && <p style={{ color: 'red' }}>{errors.gender}</p>}
          </FormControl>
          <Grid container spacing={2} sx={{ marginTop: '16px' }}>
            <Grid item xs={6}>
              <Button
                variant="contained"
                color="primary"
                onClick={handleSubmit}
                fullWidth
                disabled={isSubmitDisabled}
              >
                {employeeDataForEditing ? 'Update' : 'Submit'}
              </Button>
            </Grid>
            <Grid item xs={6}>
              <Button variant="contained" color="secondary" onClick={clearForm} fullWidth>
                Reset
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Box>
  );
}

export default EmployeeForm;

