"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { MOCK_SPRINT } from "@/lib/mock-data";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useWorkspaceStore } from "@/store";
import { cn } from "@/lib/utils";

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

export function TeamWorkload() {
  const teams = useWorkspaceStore((state) => state.teams);

  return (
    <Card className="flex h-full flex-col border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-950 overflow-hidden group">
      <CardHeader className="flex flex-row items-center justify-between border-b border-zinc-100 bg-zinc-50/50 px-4 py-3 dark:border-zinc-800 dark:bg-zinc-900/50 transition-colors group-hover:bg-zinc-100/50 dark:group-hover:bg-zinc-800/50">
        <CardTitle className="text-sm font-semibold text-zinc-900 dark:text-zinc-50 font-heading tracking-wide">
          Project Teams
        </CardTitle>
        <span className="cursor-pointer text-[11px] font-medium text-indigo-600 hover:text-indigo-500 transition-colors">
          Manage teams
        </span>
      </CardHeader>
      
      <CardContent className="p-0">
        <div className="flex flex-col">
          {teams.length > 0 ? (
            teams.map((team, index) => (
              <div
                key={team.id}
                className={cn(
                  "flex items-center gap-3 p-4 transition-all hover:bg-zinc-50 dark:hover:bg-zinc-900/50",
                  index !== teams.length - 1 ? "border-b border-zinc-100 dark:border-zinc-800/50" : ""
                )}
              >
                <Avatar className="h-8 w-8 border border-zinc-200 dark:border-zinc-800 shadow-sm transition-transform hover:scale-105">
                  <AvatarFallback
                    className="text-[10px] font-bold bg-indigo-100 text-indigo-600"
                  >
                    {team.name.substring(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div className="flex flex-col flex-1 min-w-0">
                  <span className="text-[12px] font-bold text-zinc-950 dark:text-zinc-50">{team.name}</span>
                  <span className="text-[10px] font-medium text-zinc-500">{team.membersCount} members</span>
                </div>
                <div className="h-2 w-2 shrink-0 rounded-full bg-emerald-500" />
              </div>
            ))
          ) : (
            <div className="flex flex-col items-center justify-center p-8 text-center">
              <span className="text-xs text-zinc-500 italic">No teams in this project yet</span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
