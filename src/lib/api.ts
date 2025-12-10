import type {
  Client,
  Keyword,
  KeywordWithClient,
  DashboardStats,
  Alert,
  AiSuggestion,
  CompetitorMentionsResponse,
  KeywordCompetitor,
} from "@/shared/types/database";

// const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";
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

export async function getAiSuggestions(params?: {
  client_id?: number;
  subreddit?: string;
  was_used?: boolean;
  limit?: number;
  offset?: number;
}) {
  const queryParams = new URLSearchParams();
  if (params?.client_id) queryParams.append("client_id", params.client_id.toString());
  if (params?.subreddit) queryParams.append("subreddit", params.subreddit);
  if (params?.was_used !== undefined) queryParams.append("was_used", params.was_used.toString());
  if (params?.limit) queryParams.append("limit", params.limit.toString());
  if (params?.offset) queryParams.append("offset", params.offset.toString());

  const queryString = queryParams.toString();
  return fetchApi<AiSuggestion[]>(`/api/ai-suggestions${queryString ? `?${queryString}` : ""}`);
}

export async function getClientCompetitors(clientName: string) {
  return fetchApi<CompetitorMentionsResponse>(`/api/clients/${clientName}/competitors`);
}

export async function getKeywordCompetitors(keywordId: number) {
  return fetchApi<KeywordCompetitor[]>(`/api/keywords/${keywordId}/competitors`);
}

export async function addKeywordCompetitor(keywordId: number, competitorName: string) {
  return fetchApi<KeywordCompetitor>(`/api/keywords/${keywordId}/competitors`, {
    method: "POST",
    body: JSON.stringify({ competitor_name: competitorName }),
  });
}

export async function deleteKeywordCompetitor(keywordId: number, competitorId: number) {
  return fetchApi<{ success: true; message: string }>(
    `/api/keywords/${keywordId}/competitors/${competitorId}`,
    {
      method: "DELETE",
    }
  );
}
