import type { Alert } from "@/shared/types/database";
import { format, subDays, subMonths, startOfDay, startOfMonth } from "date-fns";

export type TimePeriod = "week" | "month" | "year";

export function processEngagementData(
  alerts: Alert[],
  period: TimePeriod
): { date: string; count: number; fullDate: string }[] {
  const now = new Date();
  let startDate: Date;
  let dateFormat: string;
  let fullDateFormat: string;
  let groupBy: (date: Date) => string;

  switch (period) {
    case "week":
      startDate = subDays(now, 6);
      dateFormat = "EEE";
      fullDateFormat = "EEEE, MMM d, yyyy";
      groupBy = (date) => format(startOfDay(date), "yyyy-MM-dd");
      break;
    case "month":
      startDate = subDays(now, 29);
      dateFormat = "MMM d";
      fullDateFormat = "MMM d, yyyy";
      groupBy = (date) => format(startOfDay(date), "yyyy-MM-dd");
      break;
    case "year":
      startDate = subMonths(now, 11);
      dateFormat = "MMM";
      fullDateFormat = "MMMM yyyy";
      groupBy = (date) => format(startOfMonth(date), "yyyy-MM");
      break;
  }

  const filteredAlerts = alerts.filter((alert) => {
    const alertDate = new Date(alert.sent_at);
    return alertDate >= startDate && alertDate <= now;
  });

  const grouped = filteredAlerts.reduce(
    (acc, alert) => {
      const key = groupBy(new Date(alert.sent_at));
      acc[key] = (acc[key] || 0) + 1;
      return acc;
    },
    {} as Record<string, number>
  );

  const result: { date: string; count: number; fullDate: string }[] = [];

  if (period === "year") {
    for (let i = 11; i >= 0; i--) {
      const date = subMonths(now, i);
      const key = format(startOfMonth(date), "yyyy-MM");
      result.push({
        date: format(date, dateFormat),
        fullDate: format(date, fullDateFormat),
        count: grouped[key] || 0,
      });
    }
  } else {
    const days = period === "week" ? 7 : 30;
    for (let i = days - 1; i >= 0; i--) {
      const date = subDays(now, i);
      const key = format(startOfDay(date), "yyyy-MM-dd");
      result.push({
        date: format(date, dateFormat),
        fullDate: format(date, fullDateFormat),
        count: grouped[key] || 0,
      });
    }
  }

  return result;
}
