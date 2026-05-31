import { getToken, removeToken } from "./auth";

const API_URL = "http://localhost:5000";

export const apiFetch = async (url, options = {}) => {
  const token = getToken();

  const res = await fetch(`${API_URL}${url}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
      Authorization: token ? `Bearer ${token}` : "",
    },
  });

  if (res.status === 401) {
    removeToken();
    window.location.reload();
    return null;
  }

  return res;
};