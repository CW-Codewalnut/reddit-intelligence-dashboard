import { useQuery } from "@tanstack/react-query";
import { getAiSuggestions } from "@/lib/api";
import { queryKeys } from "@/lib/query-keys";

/**
 * Hook to fetch AI suggestions with optional filtering and pagination
 *
 * @param params - Filter and pagination parameters
 * @returns Query result with AI suggestions data
 *
 * Caching: 1 minute staleTime (suggestions update occasionally)
 */
export function useAiSuggestions(params?: {
  client_id?: number;
  subreddit?: string;
  was_used?: boolean;
  limit?: number;
  offset?: number;
}) {
  return useQuery({
    queryKey: queryKeys.aiSuggestions.filtered(params || {}),
    queryFn: () => getAiSuggestions(params),
    staleTime: 60 * 1000,
  });
}
