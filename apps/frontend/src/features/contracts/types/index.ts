import { BaseEntity } from "@/types";

export type Contract = {
  contract_id: string;
  project: string;
  delivery_issued_date: Date;
  invoice_issued_date: Date;
} & InputContract &
  BaseEntity;

export type InputContract = {
  project_name: string;
  charge_id: string;
  delivery_schedule_date: string;
  invoice_schedule_date: string;
  order_no: string;
};
