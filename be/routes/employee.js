const express = require("express");
const router = express.Router();
const {
  addEmployee,
  getEmployee,
  deleteEmployee,
  getEmployeeById,
  updateEmpdetails,
  searchEmpdetails,
} = require("../controller/employeeController");

// Define routes for CRUD operations on todos
router.post("/", addEmployee);
router.get("/", getEmployee);
router.get("/:id", getEmployeeById);
router.put("/:id", updateEmpdetails);
router.delete("/:id", deleteEmployee);
router.get("/search", searchEmpdetails);

module.exports = router;
