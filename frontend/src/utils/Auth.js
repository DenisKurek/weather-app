import { redirect } from "react-router-dom";
import jwt_decode from "jwt-decode";
const AuthToken = "AuthToken";

export function getAuthToken() {
  return localStorage.getItem(AuthToken);
}

export function getRole() {
  try {
    return jwt_decode(getAuthToken()).roles;
  } catch (error) {
    return "";
  }
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

export function checkRoleLoader() {
  const role = getRole();

  if (role !== "ADMIN") {
    return redirect("/login");
  }

  return null;
}
