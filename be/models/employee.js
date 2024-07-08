const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema({
  empid: { type: Number },
  name: { type: String, required: true },
  designation: { type: String },
  address: { type: String, required: true },
  phoneno: { type: Number },
  email: {
    type: String,
  },
  gender:{
    type:String
  }
});

module.exports = mongoose.model("employee", employeeSchema);
