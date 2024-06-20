import { default as dayjs } from "dayjs";

export const formatDate = (
  date: number | Date | string | undefined | null,
  format: string = "MMMM D, YYYY h:mm A",
) => {
  if (!date) return "";
  return dayjs(date).format(format);
};

export const comma = (num: number | string | null | undefined) => {
  if (!num) return num;
  if (isNaN(num as number)) return num;
  return String(num).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");
};

export const showPrice = (price: string | number | null) => {
  return "¥" + comma(price);
};
