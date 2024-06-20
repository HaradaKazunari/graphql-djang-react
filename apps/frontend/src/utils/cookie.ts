type Cookie = {
  [k: string]: string;
};
export const getCookies = (): Cookie => {
  const cookies = document.cookie
    .split(";")
    .map((item: string) => item.split("="))
    // @ts-ignore
    .reduce((acc, [k, v]) => (acc[k.trim().replace('"', "")] = v) && acc, {});
  return cookies;
};

export const getCookie = (key: keyof Cookie) => {
  const cookies = getCookies();
  if (cookies && cookies[key]) {
    return cookies[key];
  }
  return "";
};

export const deleteCookie = (key: string) => {
  document.cookie = key + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
};
