export type Client = {
  id: number;
  name: string;
  default_email: string | null;
  website: string | null;
  description: string | null;
  active: boolean;
  created_at: string;
};

export type DashboardStats = {
  total_clients: number;
  total_keywords: number;
  total_subreddits: number;
  total_alerts_today: number;
  active_clients: Client[];
};

export type Keyword = {
  id: number;
  client_id: number;
  keyword: string;
  subreddit: string;
  email: string;
  include_comments: boolean;
  use_regex: boolean;
  active: boolean;
  created_at: string;
};

export type Alert = {
  id: number;
  client_id: number;
  keyword_id: number;
  post_id: string;
  post_title: string;
  post_url: string;
  subreddit: string;
  matched_keyword: string;
  sent_at: string;
};

export type ClientEmail = {
  id: number;
  client_id: number | null;
  email: string;
  is_primary: boolean;
  active: boolean;
  created_at: string;
};

export type KeywordWithClient = Keyword & {
  client: Client;
};

export type Resource = {
  url: string;
  title: string;
  snippet: string;
};

export type AiSuggestion = {
  id: number;
  client_id: number;
  alert_id: number;
  post_id: string;
  post_title: string;
  post_url: string;
  post_author: string;
  subreddit: string;
  keyword: string;
  relevance_score: number;
  user_intent: string;
  resources: Resource[];
  generated_at: string;
  generic_reply: string;
  official_reply: string;
};
