import { redirect } from "react-router-dom";
import { removeAuthToken } from "../utils/Auth";

export function action() {
  removeAuthToken();
  return redirect("/login");
}
