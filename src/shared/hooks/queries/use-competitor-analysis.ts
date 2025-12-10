import { useQuery } from "@tanstack/react-query";
import { getClientCompetitors } from "@/lib/api";
import { competitorKeys } from "@/lib/query-keys";

export function useClientCompetitors(clientName: string) {
  return useQuery({
    queryKey: competitorKeys.byClient(clientName),
    queryFn: () => getClientCompetitors(clientName),
    enabled: !!clientName,
  });
}
