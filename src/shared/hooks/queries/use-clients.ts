import { useQuery } from "@tanstack/react-query";
import { getClients, getClient } from "@/lib/api";
import { queryKeys } from "@/lib/query-keys";

/**
 * Hook to fetch all clients with optional filtering
 *
 * @param activeOnly - If true, only fetch active clients
 * @returns Query result with clients data
 *
 * Caching: 5 minutes staleTime (clients rarely change)
 * This hook automatically deduplicates requests - if 6 components
 * call this hook simultaneously, only 1 network request is made
 */
export function useClients(activeOnly = false) {
  return useQuery({
    queryKey: queryKeys.clients.list(activeOnly),
    queryFn: () => getClients(activeOnly),
    staleTime: 5 * 60 * 1000,
  });
}

/**
 * Hook to fetch a single client by ID
 *
 * @param id - Client ID to fetch
 * @returns Query result with client data
 */
export function useClient(id: number) {
  return useQuery({
    queryKey: queryKeys.clients.detail(id.toString()),
    queryFn: () => getClient(id),
    staleTime: 5 * 60 * 1000,
  });
}
