import { BaseEntity } from "@/types";

export type Client = {
  client_id: string;
} & InputClient &
  BaseEntity;

export type InputClient = {
  company_name: string;
  company_kana: string;
  post_code: string;
  company_address: string;
  invoice_code: string;
  bank_name: string;
  bank_code: string;
  close_classification: string;
};
