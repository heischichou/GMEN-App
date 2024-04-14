import {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLNonNull,
  // GraphQLID,
  GraphQLString,
  GraphQLInt,
  GraphQLEnumType,
  GraphQLBoolean,
  GraphQLList,
} from "graphql";
import { Employee, Company } from "@/types";
import { data } from "../data";

const { employees, companies } = data;
// const EmployeeFields = Object.keys(employees[0]);
// const CompanyFields = Object.keys(companies[0]);

const CompanyType = new GraphQLObjectType({
  name: "Company",
  fields: () => ({
    id: { type: new GraphQLNonNull(GraphQLString) },
    name: { type: new GraphQLNonNull(GraphQLString) },
    geo: { type: new GraphQLNonNull(GraphQLString) },
  }),
});

const NullableGenderEnum = new GraphQLEnumType({
  name: "Gender",
  values: {
    Male: { value: "Male" },
    Female: { value: "Female" },
    Other: { value: "Other" },
  },
});

const GenderEnum = new GraphQLNonNull(NullableGenderEnum);

const EmployeeType = new GraphQLObjectType({
  name: "Employee",
  fields: () => ({
    id: { type: new GraphQLNonNull(GraphQLString) },
    name: { type: new GraphQLNonNull(GraphQLString) },
    position: { type: new GraphQLNonNull(GraphQLString) },
    gender: { type: GenderEnum },
    age: { type: new GraphQLNonNull(GraphQLInt) },
    active: { type: new GraphQLNonNull(GraphQLBoolean) },
    companyId: { type: new GraphQLNonNull(GraphQLString) },
  }),
});

const RootQuery = new GraphQLObjectType({
  name: "RootQuery",
  fields: {
    hello: { type: GraphQLString },
    employee: {
      type: new GraphQLNonNull(EmployeeType),
      args: {
        id: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve: async (root, { id }) => {
        try {
          return employees.find((Employee: Employee) => Employee.id === id);
        } catch (error) {
          console.log(error);
        }
      },
    },
    employees: {
      type: new GraphQLNonNull(new GraphQLList(EmployeeType)),
      resolve: async (root, args) => {
        try {
          return employees;
        } catch (error) {
          console.log(error);
        }
      },
    },
    company: {
      type: new GraphQLNonNull(CompanyType),
      args: {
        id: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve: async (root, { id }) => {
        try {
          return companies.find((company: Company) => company.id === id);
        } catch (error) {
          console.log(error);
        }
      },
    },
    companies: {
      type: new GraphQLNonNull(new GraphQLList(CompanyType)),
      resolve: async (root, args) => {
        try {
          return employees;
        } catch (error) {
          console.log(error);
        }
      },
    },
  },
});

const schema = new GraphQLSchema({
  query: RootQuery,
});

export default schema;
