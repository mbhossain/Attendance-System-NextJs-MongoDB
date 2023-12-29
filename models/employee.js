import mongoose, { Schema } from "mongoose";

const employeeSchema = new Schema(
  {
    name: String,
    mobile: String,
    email: String,
    blood_group: String,
    status: String,
  },
  {
    timestamps: true,
  }
);

const Employee = mongoose.models.Employee || mongoose.model("Employee", employeeSchema);

export default Employee;
