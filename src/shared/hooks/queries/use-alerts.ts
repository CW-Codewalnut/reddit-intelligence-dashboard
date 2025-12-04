import { useQuery } from "@tanstack/react-query";
import { getAllAlerts } from "@/lib/api";
import { queryKeys } from "@/lib/query-keys";

/**
 * Hook to fetch alerts with optional filtering and pagination
 *
 * @param params - Filter and pagination parameters
 * @returns Query result with alerts data
 *
 * Caching: 30 seconds staleTime (alerts are time-sensitive)
 */
export function useAlerts(params?: { client_id?: number; limit?: number; offset?: number }) {
  return useQuery({
    queryKey: queryKeys.alerts.filtered(params || {}),
    queryFn: () => getAllAlerts(params),
    staleTime: 30 * 1000,
  });
}
