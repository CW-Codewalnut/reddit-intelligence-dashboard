import { useState, useMemo } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { EngagementChart } from "./engagement-chart";
import { TimePeriodFilter, type TimePeriod } from "./time-period-filter";
import { processEngagementData } from "@/utils/engagement-utils";
import type { Alert } from "@/types/database";
import { Activity } from "lucide-react";

interface EngagementTrendsProps {
  alerts: Alert[];
}

export function EngagementTrends({ alerts }: EngagementTrendsProps) {
  const [period, setPeriod] = useState<TimePeriod>("week");

  const chartData = useMemo(() => {
    return processEngagementData(alerts, period);
  }, [alerts, period]);

  return (
    <Card className="border-lw-accent/20">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Activity className="text-lw-accent h-5 w-5" />
            <div>
              <CardTitle>Opportunity Trends</CardTitle>
              <CardDescription>Opportunity activity over time</CardDescription>
            </div>
          </div>
          <TimePeriodFilter value={period} onChange={setPeriod} />
        </div>
      </CardHeader>
      <CardContent>
        <EngagementChart data={chartData} />
      </CardContent>
    </Card>
  );
}
