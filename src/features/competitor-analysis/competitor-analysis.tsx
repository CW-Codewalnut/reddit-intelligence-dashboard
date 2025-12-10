import { useParams } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/card";
import { TrendingUp, Users } from "lucide-react";
import { LoadingState } from "@/shared/ui/loading-state";
import { EmptyState } from "@/shared/ui/empty-state";
import { useClientCompetitors } from "@/shared/hooks/queries";

export function CompetitorAnalysisPage() {
  const params = useParams();
  const clientName = params.id || "";

  const { data, isLoading } = useClientCompetitors(clientName);

  if (isLoading) {
    return <LoadingState />;
  }

  const competitors = data?.competitors || [];
  const totalMentions = competitors.reduce((sum, comp) => sum + comp.total_mentions, 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="relative overflow-hidden rounded-xl">
        <div className="from-lw-purple/10 to-lw-crimson/10 absolute inset-0 -z-10 bg-linear-to-r"></div>
        <div className="px-6 py-8">
          <div className="flex items-center gap-4">
            <div className="bg-lw-primary/10 flex h-16 w-16 items-center justify-center rounded-2xl">
              <TrendingUp className="text-lw-primary h-8 w-8" />
            </div>
            <div className="flex-1">
              <h1 className="text-3xl font-bold tracking-tight">Competitor Analysis</h1>
              <p className="text-muted-foreground mt-1">
                Track and analyze competitor mentions across Reddit discussions
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Overview */}
      {competitors.length > 0 && (
        <div className="grid gap-4 md:grid-cols-2">
          <Card className="border-lw-purple/20">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Competitors</CardTitle>
              <Users className="text-muted-foreground h-4 w-4" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{competitors.length}</div>
            </CardContent>
          </Card>
          <Card className="border-lw-purple/20">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Mentions</CardTitle>
              <TrendingUp className="text-muted-foreground h-4 w-4" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalMentions}</div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Competitor Cards */}
      {competitors.length === 0 ? (
        <Card className="border-lw-purple/20">
          <CardContent className="pt-6">
            <EmptyState
              message="No competitor mentions found. Competitor tracking data will appear here once configured."
              icon={TrendingUp}
            />
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {competitors.map((competitor, index) => (
            <Card key={index} className="border-lw-purple/20 hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2 text-xl">
                    <span className="capitalize">{competitor.competitor_name}</span>
                  </CardTitle>
                  <div className="flex items-center gap-2">
                    <span className="bg-lw-primary/10 text-lw-primary rounded-full px-3 py-1 text-xs font-semibold">
                      Last 30 days: {competitor.last_30_days}
                    </span>
                    <span className="bg-lw-primary text-white rounded-full px-4 py-1.5 text-sm font-semibold shadow-sm">
                      Total: {competitor.total_mentions}
                    </span>
                  </div>
                </div>
              </CardHeader>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
