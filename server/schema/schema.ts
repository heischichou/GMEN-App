import {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLString,
  GraphQLInt,
  GraphQLEnumType,
  GraphQLBoolean,
  GraphQLList,
} from "graphql";

// Mongoose Models
import Company from "@/models/Company";
import Employee from "@/models/Employee";

const NullableGenderEnum = new GraphQLEnumType({
  name: "Gender",
  values: {
    Male: { value: "Male" },
    Female: { value: "Female" },
    Other: { value: "Other" },
  },
});

const GenderEnum = new GraphQLNonNull(NullableGenderEnum);

const EmployeeStaticFields = (fields: any) => ({
  id: { type: GraphQLString },
  name: { type: GraphQLString },
  position: { type: GraphQLString },
  gender: { type: NullableGenderEnum },
  age: { type: GraphQLInt },
  active: { type: GraphQLBoolean },
  company_id: { type: GraphQLString },
  ...fields,
});

let EmployeeType = new GraphQLObjectType({
  name: "Employee",
  fields: () => EmployeeStaticFields({}),
});

const CompanyType = new GraphQLObjectType({
  name: "Company",
  fields: () => ({
    id: { type: GraphQLString },
    name: { type: GraphQLString },
    geo: { type: GraphQLString },
    employees: {
      type: new GraphQLList(EmployeeType),
      resolve: async (root: any) => {
        try {
          return await Employee.find({ company_id: root._id });
        } catch (error: any) {
          console.log(error);
          return error;
        }
      },
    },
  }),
});

EmployeeType = new GraphQLObjectType({
  name: "Employee",
  fields: () =>
    EmployeeStaticFields({
      company: {
        type: new GraphQLNonNull(CompanyType),
        resolve: async (root: any) => {
          try {
            return await Company.findById(root.company_id);
          } catch (error: any) {
            console.log(error);
            return error;
          }
        },
      },
    }),
});

const GET = {
  getEmployees: {
    type: new GraphQLNonNull(new GraphQLList(EmployeeType)),
    resolve: async (root: any) => {
      try {
        return await Employee.find();
      } catch (error: any) {
        console.log(error);
        return error;
      }
    },
  },
  getEmployee: {
    type: new GraphQLNonNull(EmployeeType),
    args: {
      id: { type: new GraphQLNonNull(GraphQLString) },
    },
    resolve: async (root: any, args: any) => {
      try {
        return await Employee.findById(args.id).exec();
      } catch (error: any) {
        console.log(error);
        return error;
      }
    },
  },
  getCompanies: {
    type: new GraphQLNonNull(new GraphQLList(CompanyType)),
    resolve: async (root: any) => {
      try {
        return await Company.find();
      } catch (error: any) {
        console.log(error);
        return error;
      }
    },
  },
  getCompany: {
    type: new GraphQLNonNull(CompanyType),
    args: {
      id: { type: new GraphQLNonNull(GraphQLString) },
    },
    resolve: async (root: any, args: any) => {
      try {
        return await Company.findById(args.id).exec();
      } catch (error: any) {
        console.log(error);
        return error;
      }
    },
  },
};

const POST = {
  createCompany: {
    type: CompanyType,
    args: {
      name: { type: new GraphQLNonNull(GraphQLString) },
      geo: { type: new GraphQLNonNull(GraphQLString) },
    },
    resolve: async (root: any, args: any) => {
      try {
        const company = await Company.create({
          ...args,
        });

        console.log("Successfully created a new company.", company);
        return company;
      } catch (error: any) {
        console.log(error);
        return error;
      }
    },
  },
  createEmployee: {
    type: EmployeeType,
    args: {
      name: { type: new GraphQLNonNull(GraphQLString) },
      position: { type: new GraphQLNonNull(GraphQLString) },
      gender: { type: GenderEnum },
      age: { type: new GraphQLNonNull(GraphQLInt) },
      active: { type: new GraphQLNonNull(GraphQLBoolean) },
      company_id: { type: new GraphQLNonNull(GraphQLString) },
    },
    resolve: async (root: any, args: any) => {
      try {
        const employee = await Employee.create({
          ...args,
        });

        console.log("Successfully created a new employee.", employee);
        return employee;
      } catch (error: any) {
        console.log(error);
        return error;
      }
    },
  },
};

const PUT = {
  updateCompany: {
    type: CompanyType,
    args: {
      id: { type: new GraphQLNonNull(GraphQLString) },
      name: { type: GraphQLString },
      geo: { type: GraphQLString },
    },
    resolve: async (root: any, args: any) => {
      try {
        const { id, ...body } = args;
        return await Company.findByIdAndUpdate(
          args.id,
          {
            ...body,
          },
          {
            new: true,
          }
        ).exec();
      } catch (error: any) {
        console.log(error);
        return error;
      }
    },
  },
  updateEmployee: {
    type: EmployeeType,
    args: {
      id: { type: new GraphQLNonNull(GraphQLString) },
      name: { type: GraphQLString },
      position: { type: GraphQLString },
      gender: { type: NullableGenderEnum },
      age: { type: GraphQLInt },
      active: { type: GraphQLBoolean },
      company_id: { type: GraphQLString },
    },
    resolve: async (root: any, args: any) => {
      try {
        const { id, ...body } = args;
        return await Employee.findByIdAndUpdate(
          args.id,
          {
            ...body,
          },
          {
            new: true,
          }
        ).exec();
      } catch (error: any) {
        console.log(error);
        return error;
      }
    },
  },
};

const DELETE = {
  deleteEmployee: {
    type: new GraphQLNonNull(EmployeeType),
    args: {
      id: { type: new GraphQLNonNull(GraphQLString) },
    },
    resolve: async (root: any, args: any) => {
      try {
        return await Employee.findByIdAndDelete(args.id);
      } catch (error: any) {
        console.log(error);
        return error;
      }
    },
  },
  deleteCompany: {
    type: new GraphQLNonNull(CompanyType),
    args: {
      id: { type: new GraphQLNonNull(GraphQLString) },
    },
    resolve: async (root: any, args: any) => {
      try {
        await Employee.deleteMany({ company_id: args.id });
        return await Company.findByIdAndDelete(args.id);
      } catch (error: any) {
        console.log(error);
        return error;
      }
    },
  },
};

const mutations = {
  ...GET,
  ...POST,
  ...PUT,
  ...DELETE,
};

const RootQuery = new GraphQLObjectType({
  name: "RootQuery",
  fields: {
    server_status: { type: GraphQLString },
    ...mutations,
  },
});

const schema = new GraphQLSchema({
  query: RootQuery,
});

export default schema;
