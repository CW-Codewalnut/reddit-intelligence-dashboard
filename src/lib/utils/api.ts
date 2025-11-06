import { supabase } from "../supabase";
import type {
  Client,
  Keyword,
  ClientEmail,
  ProcessedPost,
  ProcessedComment,
  KeywordWithClient,
  AlertWithRelations,
} from "@/types/database";

// Clients API
export async function getClients() {
  const { data, error } = await supabase
    .from("clients")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data as Client[];
}

export async function getClient(id: number) {
  const { data, error } = await supabase.from("clients").select("*").eq("id", id).single();

  if (error) throw error;
  return data as Client;
}

export async function createClient(client: Omit<Client, "id" | "created_at">) {
  const { data, error } = await supabase.from("clients").insert([client]).select().single();

  if (error) throw error;
  return data as Client;
}

export async function updateClient(
  id: number,
  updates: Partial<Omit<Client, "id" | "created_at">>
) {
  const { data, error } = await supabase
    .from("clients")
    .update(updates)
    .eq("id", id)
    .select()
    .single();

  if (error) throw error;
  return data as Client;
}

// Keywords API - Filtered for Splashtop (active keywords only)
export async function getKeywords(clientName: string) {
  // Get Splashtop client
  const { data: client } = await supabase
    .from("clients")
    .select("id")
    .ilike("name", clientName)
    .single();

  const { data, error } = await supabase
    .from("keywords")
    .select("*, client:clients(*)")
    .eq("client_id", client?.id)
    .eq("active", true)
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data as KeywordWithClient[];
}

export async function getKeywordsByClient(clientId: number) {
  const { data, error } = await supabase
    .from("keywords")
    .select("*, client:clients(*)")
    .eq("client_id", clientId)
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data as KeywordWithClient[];
}

export async function createKeyword(keyword: Omit<Keyword, "id" | "created_at">) {
  const { data, error } = await supabase.from("keywords").insert([keyword]).select().single();

  if (error) throw error;
  return data as Keyword;
}

export async function updateKeyword(
  id: number,
  updates: Partial<Omit<Keyword, "id" | "created_at">>
) {
  const { data, error } = await supabase
    .from("keywords")
    .update(updates)
    .eq("id", id)
    .select()
    .single();

  if (error) throw error;
  return data as Keyword;
}

export async function getAlerts(clientName: string) {
  const { data: client } = await supabase
    .from("clients")
    .select("id")
    .ilike("name", clientName)
    .single();

  const { data, error } = await supabase
    .from("alerts")
    .select("*, client:clients(*), keyword:keywords(*)")
    .eq("client_id", client?.id)
    .order("sent_at", { ascending: false });

  if (error) throw error;
  return data as AlertWithRelations[];
}

export async function getAlertsByClient(clientId: number) {
  const { data, error } = await supabase
    .from("alerts")
    .select("*, client:clients(*), keyword:keywords(*)")
    .eq("client_id", clientId)
    .order("sent_at", { ascending: false });

  if (error) throw error;
  return data as AlertWithRelations[];
}

export async function getAlertsByKeyword(keywordId: number) {
  const { data, error } = await supabase
    .from("alerts")
    .select("*, client:clients(*), keyword:keywords(*)")
    .eq("keyword_id", keywordId)
    .order("sent_at", { ascending: false });

  if (error) throw error;
  return data as AlertWithRelations[];
}

export async function getProcessedPosts(limit = 100) {
  const { data, error } = await supabase
    .from("processed_posts")
    .select("*")
    .order("processed_timestamp", { ascending: false })
    .limit(limit);

  if (error) throw error;
  return data as ProcessedPost[];
}

export async function getProcessedComments(limit = 100) {
  const { data, error } = await supabase
    .from("processed_comments")
    .select("*")
    .order("processed_timestamp", { ascending: false })
    .limit(limit);

  if (error) throw error;
  return data as ProcessedComment[];
}

export async function getClientEmails(clientId: number) {
  const { data, error } = await supabase
    .from("client_emails")
    .select("*")
    .eq("client_id", clientId)
    .order("is_primary", { ascending: false });

  if (error) throw error;
  return data as ClientEmail[];
}

export async function getDashboardStats(clientName: string) {
  try {
    const { data: client } = await supabase
      .from("clients")
      .select("id")
      .ilike("name", clientName)
      .single();

    const [keywordsResult, alertsResult] = await Promise.all([
      supabase.from("keywords").select("keyword").eq("client_id", client?.id).eq("active", true),
      supabase.from("alerts").select("url").eq("client_id", client?.id).not("url", "is", null),
    ]);

    const uniqueKeywords = new Set(keywordsResult.data?.map((k) => k.keyword.toLowerCase()) || []);

    const uniqueThreads = new Set(
      alertsResult.data
        ?.map((alert) => {
          const match = alert.url?.match(/\/comments\/([a-z0-9]+)\//);
          return match ? match[1] : null;
        })
        .filter((id): id is string => id !== null) || []
    );

    const threadsCount = uniqueThreads.size;
    const alertsCount = threadsCount * 2;

    return {
      keywords: uniqueKeywords.size,
      alerts: alertsCount,
      threads: threadsCount,
    };
  } catch (error) {
    console.error("Error fetching dashboard stats:", error);
    return {
      keywords: 0,
      alerts: 0,
      threads: 0,
    };
  }
}
