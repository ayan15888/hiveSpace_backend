"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MOCK_TASKS } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

export function DashboardKanban() {
  const columns = [
    { title: "To do", status: "todo", count: 8 },
    { title: "In progress", status: "in-progress", count: 5 },
    { title: "Done", status: "done", count: 11 },
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high": return "bg-rose-500";
      case "medium": return "bg-amber-500";
      case "low": return "bg-emerald-500";
      default: return "bg-zinc-300";
    }
  };

  const getTagColor = (tag: string) => {
    switch (tag) {
      case "feature": return "bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400";
      case "design": return "bg-rose-50 dark:bg-rose-900/30 text-rose-600 dark:text-rose-400";
      case "bug": return "bg-amber-50 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400";
      case "docs": return "bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400";
      default: return "bg-zinc-50 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400";
    }
  };

  return (
    <Card className="flex h-full flex-col overflow-hidden border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-950">
      <CardHeader className="flex flex-row items-center justify-between border-b border-zinc-100 bg-zinc-50/50 px-4 py-3 dark:border-zinc-800 dark:bg-zinc-900/50">
        <CardTitle className="text-sm font-medium text-zinc-900 dark:text-zinc-50 font-heading tracking-wide">
          HiveSpace v2 — kanban
        </CardTitle>
        <span className="cursor-pointer text-[11px] font-medium text-indigo-600 hover:text-indigo-500 transition-colors">
          Open full board
        </span>
      </CardHeader>
      
      <CardContent className="grid grid-cols-1 gap-4 p-4 md:grid-cols-3">
        {columns.map((column) => (
          <div key={column.status} className="flex flex-col gap-3">
            <div className="flex items-center gap-2 px-1">
              <span className="text-[11px] font-bold uppercase tracking-widest text-zinc-500">
                {column.title}
              </span>
              <span className="rounded-full bg-zinc-100 px-1.5 py-0.5 text-[10px] font-bold text-zinc-500 dark:bg-zinc-800">
                {column.count}
              </span>
            </div>

            <div className="flex flex-col gap-2.5">
              {MOCK_TASKS.filter((task) => task.status === column.status).map((task) => (
                <div
                  key={task.id}
                  className={cn(
                    "group relative flex flex-col gap-3 rounded-lg border border-zinc-200 bg-white p-3.5 shadow-sm transition-all hover:border-indigo-400 hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900/50 dark:hover:border-indigo-700",
                    task.status === "in-progress" && "border-l-[3px]",
                    task.status === "in-progress" && task.priority === "high" && "border-l-rose-500",
                    task.status === "in-progress" && task.priority === "medium" && "border-l-amber-500",
                    task.status === "done" && "opacity-60 grayscale-[0.3]"
                  )}
                >
                  <h3 className="text-[12px] font-medium leading-relaxed text-zinc-900 group-hover:text-indigo-600 dark:text-zinc-200 dark:group-hover:text-indigo-400 transition-colors">
                    {task.title}
                  </h3>
                  
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <div className={cn("h-1.5 w-1.5 rounded-full", getPriorityColor(task.priority))} />
                      <Badge variant="outline" className={cn(
                        "h-5 border-none px-2 text-[9px] font-bold uppercase tracking-wider",
                        getTagColor(task.tag)
                      )}>
                        {task.tag}
                      </Badge>
                    </div>
                    
                    <Avatar className="h-5 w-5 border-2 border-white dark:border-zinc-900 shadow-sm">
                      <AvatarFallback 
                        className="text-[8px] font-bold" 
                        style={{ backgroundColor: task.assigneeColor, color: task.assigneeTextColor }}
                      >
                        {task.assignee}
                      </AvatarFallback>
                    </Avatar>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
