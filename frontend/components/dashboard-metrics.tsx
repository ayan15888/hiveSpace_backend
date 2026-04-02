"use client";

import { Card, CardContent } from "@/components/ui/card";
import { MOCK_METRICS } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

export function DashboardMetrics() {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {MOCK_METRICS.map((metric) => (
        <Card key={metric.label} className="border-zinc-200 bg-white shadow-sm dark:border-zinc-800 dark:bg-zinc-950 overflow-hidden group">
          <CardContent className="p-4 flex flex-col gap-1.5">
            <span className="text-[10px] font-medium uppercase tracking-wider text-zinc-500 group-hover:text-zinc-900 dark:group-hover:text-zinc-50 transition-colors">
              {metric.label}
            </span>
            <div className="flex items-baseline gap-2">
              <span className={cn(
                "text-2xl font-semibold tracking-tight",
                metric.label === "Overdue" ? "text-rose-600 dark:text-rose-400" : "text-zinc-900 dark:text-zinc-50"
              )}>
                {metric.value}
              </span>
            </div>
            <span className={cn(
              "text-[10px] font-medium",
              metric.trend === "warning" ? "text-amber-600 dark:text-amber-400" : "text-emerald-600 dark:text-emerald-400"
            )}>
              {metric.subtext}
            </span>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
