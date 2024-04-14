import { Employee, Company } from "@/types";

export const data = {
  employees: [
    {
      id: "eb13b409-b00e-4969-837f-4e81c74807f7",
      name: "John Doe",
      position: "DevOps Engineer",
      gender: "Male",
      age: 22,
      active: true,
      companyId: "5c568c3b-bb38-4147-ad83-75c25555abe2",
    },
    {
      id: "707b6596-cf3a-4b42-9c10-e109f9e874f2",
      name: "Jane Doe",
      position: "Systems Administrator",
      gender: "Female",
      age: 36,
      active: true,
      companyId: "21ecaa16-2905-4762-aacb-17e17c8e0e10",
    },
    {
      id: "95dd6b40-0deb-48d4-8a17-c2b272d02f5b",
      name: "Lionel Johnson",
      position: "Cybersecurity Consultant",
      gender: "Male",
      age: 42,
      active: true,
      companyId: "25d32010-65e5-4eeb-8876-9022141d8a92",
    },
    {
      id: "14d7b983-832a-48c7-bfd5-debcdf24ca20",
      name: "William Shakespeare",
      position: "Data Analyst",
      gender: "Male",
      age: 55,
      active: false,
      companyId: "25d32010-65e5-4eeb-8876-9022141d8a92",
    },
    {
      id: "2df17134-7810-4a2a-a470-19d6056193ca",
      name: "Therese Celestine",
      position: "Senior Manager",
      gender: "Female",
      age: 27,
      active: true,
      companyId: "21ecaa16-2905-4762-aacb-17e17c8e0e10",
    },
  ] as Employee[],
  companies: [
    {
      id: "5c568c3b-bb38-4147-ad83-75c25555abe2",
      name: "Apple",
      geo: "North America",
    },
    {
      id: "21ecaa16-2905-4762-aacb-17e17c8e0e10",
      name: "Microsoft",
      geo: "North America",
    },
    {
      id: "25d32010-65e5-4eeb-8876-9022141d8a92",
      name: "Google",
      geo: "Asia",
    },
    {
      id: "006b1086-8e12-4675-873c-48b72e602500",
      name: "IBM",
      geo: "Europe",
    },
  ] as Company[],
};
