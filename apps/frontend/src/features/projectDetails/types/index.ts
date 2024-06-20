export type ProjectDetail = {
  id: string;
  project: string;
  product_name: string;
  model_name: string;
  unit_price: number | null;
  amount: number | null;
  amount_unit: string;
  remarks: string;
  total_amount: string;
};
