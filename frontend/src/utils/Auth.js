import { redirect } from "react-router-dom";

const AuthToken = "AuthToken";

export function getAuthToken() {
  return localStorage.getItem(AuthToken);
}

export function storeAuthToken(token) {
  return localStorage.setItem(AuthToken, token);
}

export function removeAuthToken() {
  localStorage.removeItem(AuthToken);
}

export function tokenLoader() {
  return getAuthToken();
}

export function checkAuthLoader() {
  const token = getAuthToken();

  if (!token) {
    return redirect("/login");
  }

  return null;
}
