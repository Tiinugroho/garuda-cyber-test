const API_URL = "http://127.0.0.1:8000/api";

export async function apiFetch(endpoint: string, options: any = {}) {
  const token = localStorage.getItem("token");

  const res = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json",
      Authorization: token ? `Bearer ${token}` : "",
      ...(options.headers || {}),
    },
  });

  const data = await res.json();

  if (!res.ok) {
    throw data;
  }

  return data;
}