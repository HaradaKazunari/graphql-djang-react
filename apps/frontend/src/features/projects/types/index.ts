import { BaseEntity } from "@/types";

export type Project = {
  project_id: string;
  project_name: string;
  charge_id: string;
  charge_name: string;
  client_id: string;
  client_name: string;
  contract_id: string;
  estimate_id: string;

  delivery_schedule_date: string;
  delivery_issued_date: string | Date;
  invoice_schedule_date: string | Date;
  invoice_issued_date: string | Date;
};

export type InputProject = {
  project_name: string;
  charge_id: string;
};

export type Projects = {
  project_id: string;
  project_name: string;
  charge: string;
  client_name: string;
  delivery_schedule_date: string;
  delivery_issued_date: string | Date;
  invoice_schedule_date: string | Date;
  invoice_issued_date: string | Date;
} & BaseEntity;

export type UnclaimedProject = {
  project_id: string;
  project_name: string;
  client_name: string;
  invoice_ym: string;
  total_amount: number;
} & BaseEntity;
