import { BaseEntity } from "@/types";

export type Versatility = {
  versatility_code: string;
  indentify_code: string;
  indentify_name: string;
  key: string;
  value: string;
} & BaseEntity;
