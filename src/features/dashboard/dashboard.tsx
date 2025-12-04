import { useMemo } from "react";
import { StatCard } from "@/shared/ui/stat-card";
import { Hash, Bell, FileText } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/shared/ui/card";
import { Skeleton } from "@/shared/ui/skeleton";
import { useParams } from "react-router-dom";
import { EngagementTrends } from "@/features/dashboard/engagement-trends";
import {
  useClients,
  useKeywords,
  useAiSuggestions,
  useAlerts,
  useDashboardStats,
} from "@/shared/hooks/queries";

export function Dashboard() {
  const params = useParams();
  const clientName = params.id;

  const { data: clients } = useClients();
  const client = useMemo(
    () => clients?.find((c) => c.name.toLowerCase() === clientName?.toLowerCase()),
    [clients, clientName]
  );

  const { data: keywordsData, isLoading: keywordsLoading } = useKeywords(client?.id);
  const { data: aiSuggestionsData, isLoading: aiSuggestionsLoading } = useAiSuggestions({
    client_id: client?.id,
  });
  const { data: alertsData, isLoading: alertsLoading } = useAlerts({
    client_id: client?.id,
  });
  const { data: dashboardStatsData, isLoading: dashboardStatsLoading } = useDashboardStats();

  const stats = useMemo(() => {
    const uniqueKeywords = new Set(keywordsData?.map((k) => k.keyword.toLowerCase()) || []);

    return {
      keywords: uniqueKeywords.size,
      aiSuggestions: aiSuggestionsData?.length || 0,
      threads: dashboardStatsData?.total_subreddits || 0,
    };
  }, [keywordsData, aiSuggestionsData, dashboardStatsData]);

  const loading = keywordsLoading || aiSuggestionsLoading || alertsLoading || dashboardStatsLoading;

  if (loading) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            {clientName
              ?.toLowerCase()
              .replace(/-/g, " ")
              .replace(/\b\w/g, (char) => char.toUpperCase())}{" "}
            Dashboard
          </h1>
          <p className="text-muted-foreground">
            Overview of your Reddit intelligence monitoring for {clientName}
          </p>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {[...Array(3)].map((_, i) => (
            <Card key={i}>
              <CardHeader>
                <Skeleton className="h-4 w-24" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-8 w-16" />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="relative">
        <div className="from-lw-primary/10 to-lw-accent/10 bg-gradien-to-r absolute inset-0 -z-10 rounded-xl"></div>
        <div className="px-6 py-6">
          <h1 className="text-3xl font-bold tracking-tight">
            {clientName
              ?.toLowerCase()
              .replace(/-/g, " ")
              .replace(/\b\w/g, (char) => char.toUpperCase())}{" "}
            Dashboard
          </h1>
          <p className="text-muted-foreground">
            Overview of your Reddit intelligence monitoring for {clientName}
          </p>
        </div>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <StatCard
          title="Number of Keywords Monitored"
          value={stats.keywords}
          icon={Hash}
          description="Unique active keywords being monitored"
          className="border-lw-accent/20 hover:border-lw-accent/40 transition-all duration-200 hover:shadow-md"
        />
        <StatCard
          title="Relevant Reddit Threads Detected"
          value={stats.threads}
          icon={FileText}
          description="Reddit opportunities with keyword matches"
          className="border-lw-amber/20 hover:border-lw-amber/40 transition-all duration-200 hover:shadow-md"
        />
        <StatCard
          title="Number of Responses Sent"
          value={stats.aiSuggestions}
          icon={Bell}
          description="AI-generated response suggestions"
          className="border-lw-purple/20 hover:border-lw-purple/40 transition-all duration-200 hover:shadow-md"
        />
      </div>
      <EngagementTrends alerts={alertsData || []} />
    </div>
  );
}
