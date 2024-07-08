const Employee = require("../models/employee");
const addEmployee = async (req, res) => {
  try {
    const employee = new Employee(req.body);
    await employee.save();
    res
      .status(201)
      .json({ message: "the employee details save successfully " });
  } catch (error) {
    res.status(501).json({ error: error.message });
  }
};

const getEmployee = async (req, res) => {
  try {
    // const employee = await Employee.find();
    const page = parseInt(req.query.page) || 1; // Current page number (default to 1)
    const perPage = parseInt(req.query.perPage) || 10;
    const skip = (page - 1) * perPage;
    const employees = await Employee.find().skip(skip).limit(perPage);

    res.status(201).json(employees);
  } catch (error) {
    res.status(501).json({ error: error.message });
  }
};
const getEmployeeById = async (req, res) => {
  try {
    // const employee = await Employee.find();

    const employee = await Employee.findById(req.params.id);
    if (employee == null) {
      res.status(404).json({ message: "employee details are not found" });
    }
    res.status(201).json(employee);
  } catch (error) {
    res.status(501).json({ error: error.message });
  }
};

const deleteEmployee = async (req, res) => {
  try {
    const deletedEmployee = await Employee.findByIdAndDelete(req.params.id);
    if (deletedEmployee.deletedCount === 0) {
      res.status(404).json({ message: "employee details not found" });
    }
    res.status(201).json(deletedEmployee);
  } catch (error) {
    res.status(501).json({ error: error.message });
  }
};
const updateEmpdetails = async (req, res) => {
  try {
    const employee = await Employee.findByIdAndUpdate(req.params.id, req.body);
    if (employee == null) {
      res.status(404).json({ message: "employee update failed" });
    }

    res.status(201).json(employee);
  } catch (error) {
    res.status(501).json({ error: error.message });
  }
};
const searchEmpdetails = async (req, res) => {
  try {
    const searchTerm = req.query.search;
    const foundEmployee = await Employee.find({
      $or: [
        { empid: { $regex: Number(searchTerm) } },
        { name: { $regex: searchTerm, $options: "i" } },
        { designation: { $regex: searchTerm, $options: "i" } },
        { address: { $regex: searchTerm, $options: "i" } },
        { phoneno: { $regex: Number(searchTerm) } },
        { email: { $regex: searchTerm, $options: "i" } },
        { gender: { $regex: searchTerm, $options: "i" } },
      ],
    });
    if (!foundEmployee) {
      return res
        .status(404)
        .json({ message: "employee details are not found not found" });
    }
    res.json(foundEmployee);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  addEmployee,
  getEmployee,
  getEmployeeById,
  deleteEmployee,
  updateEmpdetails,
  searchEmpdetails,
};
