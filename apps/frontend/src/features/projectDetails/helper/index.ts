import { showPrice } from "@/utils/format";
import { ProjectDetail } from "../types";

export const getAmountPrice = ({ amount, unit_price }: ProjectDetail) => {
  if (!amount || !unit_price) return showPrice(0);

  const calc = amount * unit_price;
  if (isNaN(calc)) {
    return showPrice(0);
  }
  return showPrice(calc);
};
