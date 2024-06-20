import { BaseEntity } from "@/types";

export type Employee = {
  employee_id: string;
} & InputEmployee &
  BaseEntity;

export type InputEmployee = {
  employee_name: string;
  employee_kana: string;
  position_code: string;
};
