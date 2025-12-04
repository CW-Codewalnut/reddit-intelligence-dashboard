export interface Client {
  id: number;
  name: string;
  default_email: string | null;
  website: string | null;
  description: string | null;
  active: boolean;
  created_at: string;
}

export interface DashboardStats {
  total_clients: number;
  total_keywords: number;
  total_subreddits: number;
  total_alerts_today: number;
  active_clients: Client[];
}

export interface Keyword {
  id: number;
  client_id: number;
  keyword: string;
  subreddit: string;
  email: string;
  include_comments: boolean;
  use_regex: boolean;
  active: boolean;
  created_at: string;
}

export interface Alert {
  id: number;
  client_id: number;
  keyword_id: number;
  post_id: string;
  post_title: string;
  post_url: string;
  subreddit: string;
  matched_keyword: string;
  sent_at: string;
}

export interface ClientEmail {
  id: number;
  client_id: number | null;
  email: string;
  is_primary: boolean;
  active: boolean;
  created_at: string;
}

export interface KeywordWithClient extends Keyword {
  client: Client;
}

export interface Resource {
  url: string;
  title: string;
  snippet: string;
}

export interface AiSuggestion {
  id: number;
  client_id: number;
  alert_id: number;
  post_id: string;
  post_title: string;
  post_url: string;
  post_author: string;
  subreddit: string;
  keyword: string;
  suggestion_text: string;
  relevance_score: number;
  user_intent: string;
  resources: Resource[];
  generated_at: string;
}
