/**
 * Centralized query key factory for type-safe cache management
 *
 * Benefits:
 * - Type safety for all query keys
 * - Consistency across the app
 * - Easy cache invalidation
 * - Hierarchical key structure for targeted invalidation
 */

export const queryKeys = {
  // Clients queries
  clients: {
    all: ["clients"] as const,
    lists: () => [...queryKeys.clients.all, "list"] as const,
    list: (activeOnly?: boolean) =>
      [...queryKeys.clients.lists(), { activeOnly }] as const,
    details: () => [...queryKeys.clients.all, "detail"] as const,
    detail: (id: string) => [...queryKeys.clients.details(), id] as const,
  },

  // Keywords queries
  keywords: {
    all: ["keywords"] as const,
    lists: () => [...queryKeys.keywords.all, "list"] as const,
    byClient: (clientId: string) =>
      [...queryKeys.keywords.lists(), clientId] as const,
    byClientName: (clientName: string) =>
      [...queryKeys.keywords.lists(), "name", clientName] as const,
  },

  // Alerts queries
  alerts: {
    all: ["alerts"] as const,
    lists: () => [...queryKeys.alerts.all, "list"] as const,
    filtered: (params: { client_id?: number; limit?: number; offset?: number }) =>
      [...queryKeys.alerts.lists(), params] as const,
  },

  // AI Suggestions queries
  aiSuggestions: {
    all: ["ai-suggestions"] as const,
    lists: () => [...queryKeys.aiSuggestions.all, "list"] as const,
    filtered: (params: {
      client_id?: number;
      subreddit?: string;
      was_used?: boolean;
      limit?: number;
      offset?: number;
    }) => [...queryKeys.aiSuggestions.lists(), params] as const,
  },

  // Dashboard stats queries
  dashboard: {
    all: ["dashboard"] as const,
    stats: () => [...queryKeys.dashboard.all, "stats"] as const,
  },
} as const;
