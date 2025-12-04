import { useQuery } from "@tanstack/react-query";
import { getDashboardStats } from "@/lib/api";
import { queryKeys } from "@/lib/query-keys";

/**
 * Hook to fetch dashboard statistics
 *
 * @returns Query result with dashboard stats
 *
 * Caching: 1 minute staleTime (stats are aggregated and can be slightly stale)
 */
export function useDashboardStats() {
  return useQuery({
    queryKey: queryKeys.dashboard.stats(),
    queryFn: getDashboardStats,
    staleTime: 60 * 1000,
  });
}
