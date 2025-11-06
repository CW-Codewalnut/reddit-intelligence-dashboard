import { useEffect, useState } from "react";
import { StatCard } from "@/components/ui/stat-card";
import { Hash, Bell, FileText } from "lucide-react";
import { getDashboardStats } from "@/lib/utils/api";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useParams } from "react-router-dom";

export function Dashboard() {
  const [stats, setStats] = useState({
    keywords: 0,
    alerts: 0,
    threads: 0,
  });
  const [loading, setLoading] = useState(true);
  const params = useParams();
  const clientName = params.id;
  useEffect(() => {
    async function loadStats() {
      try {
        const data = await getDashboardStats(clientName ?? "");
        setStats(data);
      } catch (error) {
        console.error("Failed to load dashboard stats:", error);
      } finally {
        setLoading(false);
      }
    }
    loadStats();
  }, [clientName]);

  if (loading) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">Overview of your Reddit intelligence monitoring</p>
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
        <div className="from-lw-primary/10 to-lw-accent/10 absolute inset-0 -z-10 rounded-xl bg-gradient-to-r"></div>
        <div className="px-6 py-6">
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">Overview of your Reddit intelligence monitoring</p>
        </div>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <StatCard
          title="Unique Keywords"
          value={stats.keywords}
          icon={Hash}
          description="Unique active keywords being monitored"
          className="border-lw-accent/20 hover:border-lw-accent/40 transition-all duration-200 hover:shadow-md"
        />
        <StatCard
          title="Alerts Sent"
          value={stats.alerts}
          icon={Bell}
          description="Recommendations sent (2 per thread)"
          className="border-lw-purple/20 hover:border-lw-purple/40 transition-all duration-200 hover:shadow-md"
        />
        <StatCard
          title="Threads Found"
          value={stats.threads}
          icon={FileText}
          description="Reddit threads with keyword matches"
          className="border-lw-amber/20 hover:border-lw-amber/40 transition-all duration-200 hover:shadow-md"
        />
      </div>
    </div>
  );
}
