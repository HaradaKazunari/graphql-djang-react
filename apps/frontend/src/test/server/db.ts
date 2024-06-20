import { factory, primaryKey } from "@mswjs/data";

const models = {
  charge: {
    charge_id: primaryKey(String),
    client_id: String,
    charge_name: String,
    email: String,
    created_date: Date,
  },
  client: {
    client_id: primaryKey(String),
    company_name: String,
    company_kana: String,
    post_code: String,
    company_address: String,
    invoice_code: String,
    bank_code: String,
    bank_name: String,
    created_date: Date,
  },
  versatility: {
    versatility_code: primaryKey(String),
    identify_code: String,
    identify_name: String,
    key: String,
    value: String,
  },
  closingDate: {
    id: primaryKey(String),
    closing_ym: Date,
    closing_fixed_date: Date,
  },
  invoice: {
    invoice_id: primaryKey(String),
    client_id: String,
    invoice_ym: Date,
    client_name: String,
    close_classification: Number,
    project_count: String,
  },
  estimate: {
    estimate_id: primaryKey(String),
    accrual_date: Date,
    accrual_place: String,
    estimate_validity_period: String,
    delivery_date: String,
    delivery_place: String,
    transaction_condition: String,
  },
  project: {
    project_id: primaryKey(String),
    project_name: String,
    client_name: String,
    charge: "1",
    delivery_schedule_date: Date,
  },
  contract: {
    contract_id: primaryKey(String),
    project_id: String,
    employee_id: String,
    delivery_schedule_date: Date,
    invoice_schedule_date: Date,
    delivery_date: Date,
    invoice_date: Date,
    order_no: String,
  },
  user: {
    id: primaryKey(() => "1"),
    username: () => "admin",
    password: () => "admin",
  },
  projectDetail: {
    id: primaryKey(String),
    project_id: String,
    product_name: String,
    model_name: String,
    amount: Number,
    amount_unit: String,
    unit_price: Number,
    remarks: String,
  },
};

export const db = factory(models);

export type Model = keyof typeof db;

export const loadDb = () =>
  Object.assign(JSON.parse(window.localStorage.getItem("msw-db") || "{}"));

export const persistDb = (model: Model) => {
  if (process.env.NODE_ENV === "test") return;
  const data = loadDb();
  data[model] = db[model].getAll();
  window.localStorage.setItem("msw-db", JSON.stringify(data));
};

export const initializeDb = () => {
  const database = loadDb();
  Object.entries(db).forEach(([key, model]) => {
    const dataEnters = database[key];
    if (dataEnters) {
      dataEnters?.forEach((entry: Record<string, any>) => {
        model.create(entry);
      });
    }
  });
};

export const resetDb = () => {
  window.localStorage.clear();
};

initializeDb();
