export type Citizen = {
  id: number;
  first_name: string;
  middle_name?: string;
  last_name: string;
  passport: string;
  feasibility_category: "А" | "Б" | "В" | "Г" | "Д";
  deferment_end_date?: string;
};

export type Military = {
  id: number;
  release_date: string;
  military_serial: string;
  comment?: string;
};

export type Department = {
  id: number;
  name: string;
  address: string;
};

export type Record = {
  type: "registered" | "removed";
  date: string;
  department: Department;
};

export type Action = {
  id: number;
  type: "add" | "edit" | "delete";
  user_email: string;
};

export type CitizenFull = {
  id: number;
  first_name: string;
  middle_name?: string;
  last_name: string;
  passport: string;
  feasibility_category: "А" | "Б" | "В" | "Г" | "Д";
  deferment_end_date?: string;
  militaries: Military[];
  records: Record[];
  actions: Action[];
};
