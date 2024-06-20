import { BaseEntity } from "@/types";

export type Charge = {
  charge_id: string;
} & InputCharge &
  BaseEntity;

export type InputCharge = {
  charge_name: string;
  email: string;
  client: string;
};
