import { useQuery } from "@tanstack/react-query";
import { getAllSubreddits, getClientSubreddits } from "@/lib/api";
import { queryKeys } from "@/lib/query-keys";

/**
 * Hook to fetch all subreddits
 *
 * @returns Query result with all subreddits
 *
 * Caching: 5 minutes staleTime (subreddits don't change often)
 */
export function useAllSubreddits() {
  return useQuery({
    queryKey: queryKeys.subreddits.allSubreddits(),
    queryFn: () => getAllSubreddits(),
    staleTime: 5 * 60 * 1000,
  });
}

/**
 * Hook to fetch subreddits for a specific client
 *
 * @param clientId - Client ID to fetch subreddits for
 * @param enabled - Whether to enable the query (default: true when clientId is provided)
 * @returns Query result with client subreddits
 *
 * Caching: 5 minutes staleTime
 */
export function useClientSubreddits(clientId: number | null, enabled = true) {
  return useQuery({
    queryKey: queryKeys.subreddits.byClient(clientId?.toString() || ""),
    queryFn: () => getClientSubreddits(clientId!),
    staleTime: 5 * 60 * 1000,
    enabled: enabled && clientId !== null,
  });
}
