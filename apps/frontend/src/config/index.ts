export const API_URL = import.meta.env.VITE_APP_API_URL as string;
export const JWT_SECRET = "123456" as string;
export const ENV = import.meta.env.VITE_ENV as string;
export const APP_NAME = import.meta.env.VITE_APP_NAME || ("App name" as string);
export const APP_URL =
  import.meta.env.VITE_APP_URL || ("http://localhost:3000" as string);

export const NOTIFICATION_TIME = 2000;
export const SHOW_YM_FORMATE = "YYYY年MM月";
export const SHOW_DATE_FORMATE = "YYYY年MM月DD日";
export const DATE_FORMATE = "YYYY-MM-DD";
export const REDIRECT = "/";
