"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { MOCK_SPRINT } from "@/lib/mock-data";

export function SprintStatus() {
  return (
    <Card className="flex h-full flex-col border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-950 overflow-hidden group">
      <CardHeader className="flex flex-row items-center justify-between border-b border-zinc-100 bg-zinc-50/50 px-4 py-3 dark:border-zinc-800 dark:bg-zinc-900/50 transition-colors group-hover:bg-zinc-100/50 dark:group-hover:bg-zinc-800/50">
        <CardTitle className="text-sm font-semibold text-zinc-900 dark:text-zinc-50 font-heading tracking-wide">
          Sprint progress
        </CardTitle>
        <span className="cursor-pointer text-[11px] font-medium text-indigo-600 hover:text-indigo-500 transition-colors">
          Sprint board
        </span>
      </CardHeader>
      
      <CardContent className="flex flex-col gap-5 p-5">
        {MOCK_SPRINT.map((sprint) => (
          <div key={sprint.label} className="flex items-center gap-4 group/item">
            <span className="w-24 shrink-0 text-xs font-semibold text-zinc-500 dark:text-zinc-400 group-hover/item:text-zinc-900 dark:group-hover/item:text-zinc-50 transition-colors">
              {sprint.label}
            </span>
            <div className="flex-1 flex items-center gap-3">
              <div className="relative h-2 w-full bg-zinc-100 dark:bg-zinc-900 rounded-full overflow-hidden shadow-inner">
                <div 
                  className="h-full rounded-full transition-all duration-700 ease-out shadow-sm"
                  style={{ 
                    width: `${sprint.percentage}%`, 
                    backgroundColor: sprint.color,
                    boxShadow: `0 0 8px ${sprint.color}33`
                  }}
                />
              </div>
              <span className="w-8 shrink-0 text-right text-[11px] font-bold text-zinc-600 dark:text-zinc-400">
                {sprint.percentage}%
              </span>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { MOCK_TEAM } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

export function TeamWorkload() {
  return (
    <Card className="flex h-full flex-col border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-950 overflow-hidden group">
      <CardHeader className="flex flex-row items-center justify-between border-b border-zinc-100 bg-zinc-50/50 px-4 py-3 dark:border-zinc-800 dark:bg-zinc-900/50 transition-colors group-hover:bg-zinc-100/50 dark:group-hover:bg-zinc-800/50">
        <CardTitle className="text-sm font-semibold text-zinc-900 dark:text-zinc-50 font-heading tracking-wide">
          Team workload
        </CardTitle>
        <span className="cursor-pointer text-[11px] font-medium text-indigo-600 hover:text-indigo-500 transition-colors">
          Manage members
        </span>
      </CardHeader>
      
      <CardContent className="p-0">
        <div className="flex flex-col">
          {MOCK_TEAM.map((member, index) => (
            <div
              key={member.id}
              className={cn(
                "flex items-center gap-3 p-4 transition-all hover:bg-zinc-50 dark:hover:bg-zinc-900/50",
                index !== MOCK_TEAM.length - 1 ? "border-b border-zinc-100 dark:border-zinc-800/50" : ""
              )}
            >
              <Avatar className="h-8 w-8 border border-zinc-200 dark:border-zinc-800 shadow-sm transition-transform hover:scale-105">
                <AvatarFallback
                  className="text-[10px] font-bold"
                  style={{ backgroundColor: member.color, color: member.textColor }}
                >
                  {member.initials}
                </AvatarFallback>
              </Avatar>
              <div className="flex flex-col flex-1 min-w-0">
                <span className="text-[12px] font-bold text-zinc-950 dark:text-zinc-50">{member.name}</span>
                <span className="text-[10px] font-medium text-zinc-500">{member.tasks} tasks assigned</span>
              </div>
              <div className={cn(
                "h-2 w-2 shrink-0 rounded-full ring-2 ring-offset-2 ring-transparent transition-all",
                member.status === "online" ? "bg-emerald-500 ring-emerald-500/20" : 
                member.status === "away" ? "bg-amber-500 ring-amber-500/20" : 
                "bg-zinc-300 ring-zinc-300/20"
              )} />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
