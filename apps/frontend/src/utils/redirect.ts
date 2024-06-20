import { REDIRECT } from "@/config";
import { Path } from "@/router";

export const redirectHome = () => {
  redirect(REDIRECT);
};

export const redirect = (url: Path) => {
  window.location.assign(url);
};
