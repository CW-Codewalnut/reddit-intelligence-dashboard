import type {
  Client,
  Keyword,
  ClientEmail,
  KeywordWithClient,
  DashboardStats,
  Alert,
} from "@/types/database";

const API_BASE_URL = "http://localhost:8000";

async function fetchApi<T>(endpoint: string, options?: RequestInit): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...options?.headers,
    },
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.detail || "API request failed");
  }

  return response.json();
}

export async function getClients(activeOnly = false) {
  return fetchApi<Client[]>(`/api/clients?active_only=${activeOnly}`);
}

export async function getClient(id: number) {
  return fetchApi<Client>(`/api/clients/${id}`);
}

export async function createClient(client: Omit<Client, "id" | "created_at">) {
  return fetchApi<Client>("/api/clients", {
    method: "POST",
    body: JSON.stringify(client),
  });
}

export async function updateClient(
  id: number,
  updates: Partial<Omit<Client, "id" | "created_at">>
) {
  return fetchApi<Client>(`/api/clients/${id}`, {
    method: "PUT",
    body: JSON.stringify(updates),
  });
}

export async function deleteClient(id: number) {
  return fetchApi<{ success: true; message: string }>(`/api/clients/${id}`, {
    method: "DELETE",
  });
}

export async function getKeywords(clientName: string) {
  const clients = await getClients();
  const client = clients.find((c) => c.name.toLowerCase() === clientName.toLowerCase());

  if (!client) {
    throw new Error(`Client not found: ${clientName}`);
  }

  return getKeywordsByClient(client.id);
}

export async function getKeywordsByClient(clientId: number) {
  return fetchApi<KeywordWithClient[]>(`/api/clients/${clientId}/keywords`);
}

export async function createKeyword(
  clientId: number,
  keyword: Omit<Keyword, "id" | "created_at" | "client_id">
) {
  return fetchApi<Keyword>(`/api/clients/${clientId}/keywords`, {
    method: "POST",
    body: JSON.stringify(keyword),
  });
}

export async function updateKeyword(
  id: number,
  updates: Partial<Omit<Keyword, "id" | "created_at" | "client_id">>
) {
  return fetchApi<Keyword>(`/api/keywords/${id}`, {
    method: "PUT",
    body: JSON.stringify(updates),
  });
}

export async function deleteKeyword(id: number) {
  return fetchApi<{ success: true; message: string }>(`/api/keywords/${id}`, {
    method: "DELETE",
  });
}

export async function getAllAlerts(params?: {
  client_id?: number;
  limit?: number;
  offset?: number;
}) {
  const queryParams = new URLSearchParams();
  if (params?.client_id) queryParams.append("client_id", params.client_id.toString());
  if (params?.limit) queryParams.append("limit", params.limit.toString());
  if (params?.offset) queryParams.append("offset", params.offset.toString());

  const queryString = queryParams.toString();
  return fetchApi<Alert[]>(`/api/alerts${queryString ? `?${queryString}` : ""}`);
}

export async function getDashboardStats() {
  return fetchApi<DashboardStats>("/api/dashboard");
}

export async function getClientEmails(clientId: number) {
  return fetchApi<ClientEmail[]>(`/api/clients/${clientId}/emails`);
}

export async function createClientEmail(
  clientId: number,
  email: Omit<ClientEmail, "id" | "created_at" | "client_id">
) {
  return fetchApi<ClientEmail>(`/api/clients/${clientId}/emails`, {
    method: "POST",
    body: JSON.stringify(email),
  });
}

export async function updateClientEmail(
  id: number,
  updates: Partial<Omit<ClientEmail, "id" | "created_at" | "client_id" | "email">>
) {
  return fetchApi<ClientEmail>(`/api/emails/${id}`, {
    method: "PUT",
    body: JSON.stringify(updates),
  });
}

export async function deleteClientEmail(id: number) {
  return fetchApi<{ success: true; message: string }>(`/api/emails/${id}`, {
    method: "DELETE",
  });
}
