import { AxiosErrorType } from "@/lib/axios";
import { ValidationMessage } from "@/stores/validation";
import { z } from "zod";

export const REQUIRED = "必須です";
export const STR_INVALID = "文字を入力してください";
export const INT_INVALID = "整数を入力してください";
export const NUM_INVALID = "数値を入力してください";
export const MAX_STR_INVALID = "最大%d文字以内で入力してください";
export const MAX_NUM_INVALID = "最大%d桁で入力してください";
export const MIN_STR_INVALID = "最小%d文字以上で入力してください";
export const MIN_NUM_INVALID = "最小%d桁で入力してください";
export const DATE_INVALID = "日付を入力してください";
export const EMAIL_INVALID = "メールの形式が正しくありません";
export const POST_CODE_LEN = "7桁で入力してください";
export const INVOICE_LEN = "13桁で入力してください";
export const HIRAGANA_INVALID = "ひらがなで入力してください";
export const HIRAGANA_SIGN_INVALID = "ひらがなと記号のみで入力してください";

const schema = {
  // NOTE: auth
  username: z.string().min(1, REQUIRED),
  password: z.string().min(1, REQUIRED),

  // NOTE: project(estimate, contract)
  project_name: z
    .string()
    .min(1, REQUIRED)
    .max(50, MAX_STR_INVALID.replace("%d", "50")),
  charge_id: z.string().min(1, REQUIRED),

  // NOTE:  estimate
  accrual_date: z.string().date(DATE_INVALID),
  accrual_place: z
    .string()
    .min(1, REQUIRED)
    .max(20, MAX_STR_INVALID.replace("%d", "20")),
  estimate_validity_period: z
    .string()
    .min(1, REQUIRED)
    .max(10, MAX_STR_INVALID.replace("%d", "10")),
  deadline: z
    .string()
    .min(1, REQUIRED)
    .max(10, MAX_STR_INVALID.replace("%d", "10")),
  delivery_place: z
    .string()
    .min(1, REQUIRED)
    .max(20, MAX_STR_INVALID.replace("%d", "20")),
  transaction_condition: z
    .string()
    .max(20, MAX_STR_INVALID.replace("%d", "20")),

  // NOTE: project detail
  product_name: z
    .string()
    .min(1, REQUIRED)
    .max(20, MAX_STR_INVALID.replace("%d", "20")),
  model_name: z
    .string()
    .max(20, MAX_STR_INVALID.replace("%d", "20"))
    .nullable(),
  amount: z.string().regex(/^\d+$/, INT_INVALID).nullable(),
  amount_unit: z.string().nullable(),
  unit_price: z.string().regex(/^\d+$/, INT_INVALID).nullable(),
  remarks: z.string().max(20, MAX_STR_INVALID.replace("%d", "20")).nullable(),

  // NOTE:  contract
  delivery_schedule_date: z.string().date(DATE_INVALID),
  invoice_schedule_date: z.string().date(DATE_INVALID),
  order_no: z.string().max(50, MAX_STR_INVALID.replace("%d", "50")).nullable(),

  // NOTE: client
  company_name: z
    .string()
    .min(1, REQUIRED)
    .max(50, MAX_STR_INVALID.replace("%d", "50")),
  company_kana: z
    .string()
    .min(1, REQUIRED)
    .max(50, MAX_STR_INVALID.replace("%d", "50"))
    .regex(/^[ぁ-ん!-/:-@¥[-`{-~]+$/, HIRAGANA_SIGN_INVALID),
  post_code: z
    .string()
    .min(1, REQUIRED)
    .regex(/^\d+$/, NUM_INVALID)
    .length(7, POST_CODE_LEN),
  company_address: z
    .string()
    .min(1, REQUIRED)
    .max(250, MAX_STR_INVALID.replace("%d", "250")),
  invoice_code: z
    .string()
    .regex(/^\d{13}$/, INVOICE_LEN)
    .optional()
    .or(z.literal("")),
  bank_name: z.string().max(50, MAX_STR_INVALID.replace("%d", "50")),
  bank_code: z.string().max(7, MAX_NUM_INVALID.replace("%d", "7")),
  close_classification: z.string().min(1, REQUIRED),

  // NOTE: charge
  charge_name: z
    .string()
    .min(1, REQUIRED)
    .max(50, MAX_STR_INVALID.replace("%d", "50")),
  email: z
    .string()
    .max(254, MAX_STR_INVALID.replace("%d", "254"))
    .email({
      message: EMAIL_INVALID,
    })
    .optional()
    .or(z.literal("")),

  // NOTE: employee
  employee_name: z
    .string()
    .min(1, REQUIRED)
    .max(20, MAX_STR_INVALID.replace("%d", "20")),
  employee_kana: z
    .string()
    .min(1, REQUIRED)
    .max(20, MAX_STR_INVALID.replace("%d", "20"))
    .regex(/^[ぁ-ん]+$/, HIRAGANA_INVALID),
  position_code: z.string().min(1, REQUIRED),

  // NOTE: payment_term
  payment_term: z
    .string()
    .min(1, REQUIRED)
    .max(20, MAX_STR_INVALID.replace("%d", "20")),
};

const multi: {
  [key: string]: (keyof typeof schema)[];
} = {
  project_detail: [
    "product_name",
    "model_name",
    "amount",
    "amount_unit",
    "unit_price",
    "remarks",
  ],
};

type ValidateRule = keyof typeof schema | keyof typeof multi;

export const getValidateRule = (keys: ValidateRule[]) => {
  let getSchema = {};
  keys.map((key: ValidateRule) => {
    if (Object.keys(multi).includes(String(key))) {
      getSchema = {
        ...getSchema,
        [key]: z.array(getValidateRule(multi[key])),
      };
    } else {
      if (Object.keys(schema).includes(String(key))) {
        getSchema = {
          ...getSchema,
          [key]: schema[key as keyof typeof schema],
        };
      }
    }
  });
  return z.object(getSchema);
};

export const resolveValidateResponse = (
  res: AxiosErrorType["result"]
): ValidationMessage[] => {
  if (!res) return [];

  const validates = Object.keys(res).map((key) => ({
    key: key,
    message: res[key].join("\n"),
  }));
  return validates;
};
