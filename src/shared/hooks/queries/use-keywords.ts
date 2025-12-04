import { useQuery } from "@tanstack/react-query";
import { getKeywordsByClient } from "@/lib/api";
import { queryKeys } from "@/lib/query-keys";

/**
 * Hook to fetch keywords for a specific client
 *
 * @param clientId - The client ID to fetch keywords for
 * @param options - Optional query options
 * @returns Query result with keywords data
 *
 * Caching: 2 minutes staleTime (keywords can be updated but not frequently)
 */
export function useKeywords(clientId: number | undefined, options?: { enabled?: boolean }) {
  return useQuery({
    queryKey: queryKeys.keywords.byClient(clientId?.toString() || ""),
    queryFn: () => getKeywordsByClient(clientId!),
    staleTime: 2 * 60 * 1000,
    enabled: !!clientId && options?.enabled !== false,
  });
}
