import React, { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import axiosInstance from "./axiosInstance";
import EmployeeForm from "./EmployeeForm"; // Import the EmployeeForm component

function EmployeeList() {
  const [employees, setEmployees] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [employeeDetailsToEdit, setEmployeeDetailsToEdit] = useState("");

  const [editingEmployeeId, setEditingEmployeeId] = useState(null); // Step 1: Add editingEmployeeId state

  const itemsPerPage = 10; // Adjust the number of items per page

  useEffect(() => {
    console.log("rakesh");
    // Fetch employee data from your backend API using Axios.
    // Use pagination parameters to get a specific page of results.
    handleGetEmployeesList(currentPage);
  }, [currentPage]);

  const handleGetEmployeesList = async (pageNo) => {
    setEmployeeDetailsToEdit("");
    try {
      const response = await axiosInstance.get(`employees?page=${pageNo}`);
      console.log("Employee list shown:", response.data);

      if (response) {
        setEmployees(response.data);
      }
    } catch (error) {
      console.error("Employee list show failed:", error);
    }
  };

  const handleEdit = async (employeeId) => {
    // Step 2: Set the editingEmployeeId state with the selected employee's _id
    // setEditingEmployeeId(employeeId);
    try {
      const response = await axiosInstance.get(`employees/${employeeId}`);
      console.log("Employee list shown:", response.data);
      setEmployeeDetailsToEdit(response.data);
    } catch (error) {
      console.error("Employee list show failed:", error);
    }
  };

  const handleDelete = async (employeeId) => {
    try {
      // Send a DELETE request to your backend to delete the selected employee.
      await axiosInstance.delete(`employees/${employeeId}`);
      console.log("Employee deleted successfully");
      // Refresh the employee list after deletion.
      handleGetEmployeesList(currentPage);
    } catch (error) {
      console.error("Employee deletion failed:", error);
    }
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  //   const filteredEmployees = employees.filter((employee) => {
  //     return (
  //       employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
  //       employee.designation.toLowerCase().includes(searchTerm.toLowerCase())
  //     );
  //   });

  const handleSearch = async (event) => {
    let searchKeyword = event.target.value;
    setSearchTerm(searchKeyword);
    try {
      // Send a DELETE request to your backend to delete the selected employee.
      const response = await axiosInstance.get(
        `employees?searchTerm=${searchKeyword}`
      );
      if (response) {
        setEmployees(response.data);
      }
      console.log(" search detail employee data");
      // Refresh the employee list after deletion.
    } catch (error) {
      console.error("Employee deletion failed:", error);
    }
    console.log(event.target.value);
  };

  return (
    <div>
      <EmployeeForm
        employeeDataForEditing={employeeDetailsToEdit}
        onFormSubmit={handleGetEmployeesList}
      />
      <h2>Employee List</h2>
      <TextField label="Search" value={searchTerm} onChange={handleSearch} />

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>PhoneNo</TableCell>
              <TableCell>Designation</TableCell>
              <TableCell>Address</TableCell>
              <TableCell>Gender</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {employees.map((employee) => (
              <TableRow key={employee._id}>
                <TableCell>{employee.empid}</TableCell>
                <TableCell>{employee.name}</TableCell>
                <TableCell>{employee.email}</TableCell>
                <TableCell>{employee.phoneNo}</TableCell>
                <TableCell>{employee.designation}</TableCell>
                <TableCell>{employee.address}</TableCell>
                <TableCell>{employee.gender}</TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleEdit(employee._id)}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => handleDelete(employee._id)}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {/* {editingEmployeeId !== null && ( // Step 3: Render the EmployeeForm when editingEmployeeId is set
        <EmployeeForm employeeId={editingEmployeeId} onFormClose={() => setEditingEmployeeId(null)} />
      )} */}
      <div>
        <Button
          variant="contained"
          color="primary"
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous Page
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={() => handlePageChange(currentPage + 1)}
        >
          Next Page
        </Button>
      </div>
    </div>
  );
}

export default EmployeeList;
