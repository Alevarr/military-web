import { ButtonProps } from "@chakra-ui/react";
import { z } from "zod";

export const CitizenSchema = z.object({
  last_name: z.string().min(1, { message: "Фамилия обязательна к заполнению" }),
  first_name: z.string().min(1, { message: "Имя обязательно к заполнению" }),
  middle_name: z.string().optional(),
  passport: z
    .string()
    .regex(/^\d{10}$/, {
      message: "Паспорт должен состоять из 10 цифр",
    })
    .min(1, { message: "Паспорт обязателен к заполненнию" }),
  feasibility_category: z
    .string()
    .min(1, { message: "Категория здоровья обязательна к заполнению" }),
  deferment_end_date: z.date().optional(),
});

export type CitizenFormValues = z.infer<typeof CitizenSchema>;

export const SingInSchema = z.object({
  email: z.string().min(1, { message: "Поле обязательно к заполнению" }),
  password: z.string().min(1, { message: "Поле обязательно к заполнению" }),
});

export type SignInFormValues = z.infer<typeof SingInSchema>;

export const MilitarySchema = z.object({
  military_serial: z
    .string()
    .regex(/^[А-Я]{2}\d{7}$/, { message: "Неверный формат" })
    .min(1, { message: "Поле обязательно к заполнению" }),
  comment: z.string().optional(),
  release_date: z.date(),
});

export type MilitaryFormValues = z.infer<typeof MilitarySchema>;

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
  citizen_id: number;
};

export const RecordSchema = z.object({
  type: z.enum(["registered", "removed"]),
  department_id: z
    .string()
    .min(1, { message: "Поле обязательно к заполнению" }),
  date: z.date(),
});

export type RecordFormValues = z.infer<typeof RecordSchema>;

export type Department = {
  id: number;
  name: string;
  address: string;
};

export type Record = {
  id: number;
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

export type User = {
  id: number;
  email: string;
  role: "viewer" | "editor";
};

export interface EditCitizenModalProps extends ButtonProps {
  citizen: CitizenFull;
}
