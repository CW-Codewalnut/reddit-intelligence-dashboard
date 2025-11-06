import { TrendingUp } from "lucide-react";
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Area,
  AreaChart,
} from "recharts";

interface EngagementChartProps {
  data: { date: string; count: number; fullDate?: string }[];
}

export function EngagementChart({ data }: EngagementChartProps) {
  if (data.length === 0) {
    return (
      <div className="text-muted-foreground flex h-64 items-center justify-center">
        No engagement data available for this period
      </div>
    );
  }

  // Calculate tick interval based on data length
  const getTickInterval = () => {
    if (data.length <= 7) return 0; // Show all for week
    if (data.length <= 12) return 0; // Show all for year (months)
    return Math.floor(data.length / 6); // Show ~6 labels for month (30 days)
  };

  return (
    <div className="space-y-4">
      <ResponsiveContainer width="100%" height={280}>
        <AreaChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="colorCount" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="rgb(79, 70, 229)" stopOpacity={0.3} />
              <stop offset="95%" stopColor="rgb(6, 182, 212)" stopOpacity={0.05} />
            </linearGradient>
          </defs>
          <CartesianGrid
            strokeDasharray="3 3"
            stroke="hsl(var(--muted-foreground))"
            opacity={0.2}
          />
          <XAxis
            dataKey="date"
            stroke="hsl(var(--muted-foreground))"
            fontSize={11}
            tickLine={false}
            axisLine={false}
            interval={getTickInterval()}
            angle={data.length > 12 ? -45 : 0}
            textAnchor={data.length > 12 ? "end" : "middle"}
            height={data.length > 12 ? 60 : 30}
          />
          <YAxis
            stroke="hsl(var(--muted-foreground))"
            fontSize={12}
            tickLine={false}
            axisLine={false}
            tickFormatter={(value) => `${value}`}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: "hsl(var(--background))",
              border: "1px solid hsl(var(--border))",
              borderRadius: "8px",
              padding: "8px 12px",
              boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
            }}
            labelStyle={{
              color: "hsl(var(--foreground))",
              fontWeight: 600,
              marginBottom: "4px",
            }}
            formatter={(value: number) => [
              <span key="value" className="text-lw-primary font-semibold">
                {value}
              </span>,
              "Alerts",
            ]}
            labelFormatter={(label, payload) => {
              if (payload && payload[0]?.payload?.fullDate) {
                return payload[0].payload.fullDate;
              }
              return label;
            }}
          />
          <Area
            type="monotone"
            dataKey="count"
            stroke="rgb(79, 70, 229)"
            strokeWidth={2.5}
            fill="url(#colorCount)"
            dot={false}
            activeDot={{ r: 6, fill: "rgb(79, 70, 229)" }}
          />
        </AreaChart>
      </ResponsiveContainer>

      <div className="text-muted-foreground flex items-center justify-center gap-2 text-sm">
        <TrendingUp className="text-lw-accent h-4 w-4" />
        <span>
          Total:{" "}
          <span className="text-foreground font-semibold">
            {data.reduce((sum, d) => sum + d.count, 0)}
          </span>{" "}
          alerts
        </span>
      </div>
    </div>
  );
}
