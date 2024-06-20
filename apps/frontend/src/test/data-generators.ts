import { DATE_FORMATE } from "@/config";
import { formatDate } from "@/utils/format";
import { faker } from "@faker-js/faker";
import dayjs from "dayjs";

type Overrides = Record<string, any>;

export const userGenerator = (overrides?: Overrides) => ({
  id: faker.string.uuid(),
  username: faker.internet.displayName(),
  password: faker.internet.password(),
  ...overrides,
});

export const chargeGenerator = (overrides?: Overrides) => ({
  charge_id: faker.string.numeric(),
  charge_name: faker.person.firstName(),
  email: faker.internet.email(),
  created_date: "2024-01-02",
  ...overrides,
});

export const clientGenerator = (overrides?: Overrides) => ({
  client_id: faker.string.numeric(),
  company_name: faker.company.name(),
  company_kana: "かいしゃ",
  post_code: faker.string.numeric(7),
  company_address: faker.location.city(),
  invoice_code: faker.string.numeric(13),
  bank_code: faker.string.numeric(7),
  bank_name: faker.finance.accountName(),
  ...overrides,
});

export const closingDateGenerator = (overrides?: Overrides) => ({
  id: faker.string.uuid(),
  closing_ym: dayjs(faker.date.anytime()).format(DATE_FORMATE),
  closing_fixed_date: dayjs(faker.date.anytime()).format(DATE_FORMATE),
  ...overrides,
});

export const invoiceGenerator = (overrides?: Overrides) => ({
  invoice_id: faker.string.uuid(),
  client_id: "1",
  invoice_ym: formatDate(faker.date.anytime(), DATE_FORMATE),
  client_name: faker.company.name(),
  close_classification: faker.number.int({ min: 1, max: 2 }),
  project_count: faker.string.numeric(1),
  ...overrides,
});

export const projectGenerator = (overrides?: Overrides) => ({
  project_id: faker.string.uuid(),
  project_name: faker.name.jobArea(),
  client_name: faker.company.name(),
  charge: "1",
  delivery_schedule_date: faker.date.anytime(),
  ...overrides,
});

export const contractGenerator = (overrides?: Overrides) => ({
  contract_id: faker.string.uuid(),
  project_id: "1",
  employee_id: "1",
  delivery_schedule_date: formatDate(faker.date.anytime(), DATE_FORMATE),
  invoice_schedule_date: formatDate(faker.date.anytime(), DATE_FORMATE),
  delivery_date: formatDate(faker.date.anytime(), DATE_FORMATE),
  invoice_date: formatDate(faker.date.anytime(), DATE_FORMATE),
  order_no: "22222",
  ...overrides,
});

export const estimateGenerator = (overrides?: Overrides) => ({
  estimate_id: faker.string.uuid(),
  accrual_date: formatDate(faker.date.anytime(), DATE_FORMATE),
  accrual_place: faker.location.city(),
  estimate_validity_period: faker.lorem.word(),
  delivery_date: faker.lorem.word(),
  delivery_place: faker.lorem.word(),
  transaction_condition: faker.lorem.word(),
  ...overrides,
});

export const projectDetailGenerator = (overrides?: Overrides) => ({
  id: faker.string.uuid(),
  project_id: "1",
  product_name: faker.lorem.word(),
  model_name: faker.lorem.word(),
  amount: faker.number.int(40),
  amount_unit: "01",
  unit_price: faker.number.int(40),
  remarks: faker.lorem.word(),
  ...overrides,
});
