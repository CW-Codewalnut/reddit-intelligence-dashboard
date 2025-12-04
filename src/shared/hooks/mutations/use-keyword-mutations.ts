import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createKeyword, updateKeyword, deleteKeyword } from "@/lib/api";
import { queryKeys } from "@/lib/query-keys";
import type { Keyword } from "@/shared/types/database";

/**
 * Hook to create a new keyword
 *
 * Automatically invalidates keywords and clients cache on success
 */
export function useCreateKeyword() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      clientId,
      keyword,
    }: {
      clientId: number;
      keyword: Omit<Keyword, "id" | "created_at" | "client_id">;
    }) => createKeyword(clientId, keyword),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.keywords.byClient(variables.clientId.toString()),
      });
      queryClient.invalidateQueries({ queryKey: queryKeys.clients.all });
      queryClient.invalidateQueries({ queryKey: queryKeys.dashboard.all });
    },
  });
}

/**
 * Hook to update an existing keyword
 *
 * Automatically invalidates keywords cache on success
 */
export function useUpdateKeyword() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      updates,
    }: {
      id: number;
      updates: Partial<Omit<Keyword, "id" | "created_at" | "client_id">>;
    }) => updateKeyword(id, updates),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.keywords.all });
    },
  });
}

/**
 * Hook to delete a keyword with optimistic updates
 *
 * Provides instant UI feedback by removing the keyword immediately,
 * then rolls back on error
 */
export function useDeleteKeyword() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => deleteKeyword(id),
    onMutate: async (deletedId) => {
      await queryClient.cancelQueries({ queryKey: queryKeys.keywords.all });

      const previousKeywords = queryClient.getQueriesData({
        queryKey: queryKeys.keywords.all,
      });

      queryClient.setQueriesData({ queryKey: queryKeys.keywords.all }, (old: any) => {
        if (!old) return old;
        return old.filter((keyword: any) => keyword.id !== deletedId);
      });

      return { previousKeywords };
    },
    onError: (_err, _deletedId, context) => {
      if (context?.previousKeywords) {
        context.previousKeywords.forEach(([queryKey, data]) => {
          queryClient.setQueryData(queryKey, data);
        });
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.keywords.all });
      queryClient.invalidateQueries({ queryKey: queryKeys.clients.all });
      queryClient.invalidateQueries({ queryKey: queryKeys.dashboard.all });
    },
  });
}
