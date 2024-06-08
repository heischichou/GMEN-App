import mongoose from "mongoose";
const { Types } = mongoose.Schema;

const CompanySchema = new mongoose.Schema(
  {
    name: {
      type: Types.String,
      required: [true, "Name is required."],
    },
    geo: {
      type: Types.String,
      required: [true, "Geo cannot be null."],
    },
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  }
);

const Company = mongoose.model('Company', CompanySchema);

export default Company;