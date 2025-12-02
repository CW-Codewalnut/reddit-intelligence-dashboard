import { Tabs, TabsList, TabsTrigger } from "@/shared/ui/tabs";

export type TimePeriod = "week" | "month" | "year";

interface TimePeriodFilterProps {
  value: TimePeriod;
  onChange: (value: TimePeriod) => void;
}

export function TimePeriodFilter({ value, onChange }: TimePeriodFilterProps) {
  return (
    <Tabs value={value} onValueChange={(v) => onChange(v as TimePeriod)}>
      <TabsList>
        <TabsTrigger value="week">Week</TabsTrigger>
        <TabsTrigger value="month">Month</TabsTrigger>
        <TabsTrigger value="year">Year</TabsTrigger>
      </TabsList>
    </Tabs>
  );
}
