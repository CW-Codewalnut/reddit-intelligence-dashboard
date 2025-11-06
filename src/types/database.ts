export interface Client {
  id: number;
  name: string;
  default_email: string | null;
  active: boolean;
  created_at: string;
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
  content: string | null;
  url: string | null;
  email_sent_to: string | null;
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

export interface ProcessedPost {
  id: number;
  post_id: string;
  title: string | null;
  author: string | null;
  url: string | null;
  subreddit: string | null;
  created_at: string;
  processed_timestamp: string;
}

export interface ProcessedComment {
  id: number;
  comment_id: string;
  post_id: string;
  body: string | null;
  author: string | null;
  created_at: string;
  processed_timestamp: string;
}

export interface LastCheck {
  id: number;
  subreddit: string;
  last_check_time: string;
}

export interface KeywordWithClient extends Keyword {
  client: Client;
}

export interface AlertWithRelations extends Alert {
  client: Client;
  keyword: Keyword;
}
