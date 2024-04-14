export interface Employee {
  id: string;
  name: string;
  position: string;
  gender: "Male" | "Female" | "Other";
  age: number;
  active: boolean;
  companyId: string;
}

export interface Company {
  id: string;
  name: string;
  geo: string;
}