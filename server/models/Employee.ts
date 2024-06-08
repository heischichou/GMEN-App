import mongoose from "mongoose";
const { Types } = mongoose.Schema;

const EmployeeSchema = new mongoose.Schema(
  {
    name: {
      type: Types.String,
      required: [true, "Name is required."],
    },
    position: {
      type: Types.String,
    },
    gender: {
      type: Types.String,
      enum: ["Male", "Female", "Other"],
    },
    age: {
      type: Types.Number,
      required: [true, "Age is required,"],
    },
    active: {
      type: Types.Boolean,
      required: [true, "Age is required,"],
    },
    company_id: {
      type: Types.ObjectId,
      ref: "Client",
    },
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  }
);

const Employee = mongoose.model("Employee", EmployeeSchema);

export default Employee;
