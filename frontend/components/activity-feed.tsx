"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { MOCK_ACTIVITY } from "@/lib/mock-data";
import { ScrollArea } from "@/components/ui/scroll-area";

export function ActivityFeed() {
  return (
    <Card className="flex h-full flex-col border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-950 overflow-hidden group">
      <CardHeader className="flex flex-row items-center justify-between border-b border-zinc-100 bg-zinc-50/50 px-4 py-3 dark:border-zinc-800 dark:bg-zinc-900/50 transition-colors group-hover:bg-zinc-100/50 dark:group-hover:bg-zinc-800/50">
        <CardTitle className="text-sm font-semibold text-zinc-900 dark:text-zinc-50 font-heading tracking-wide">
          Activity feed
        </CardTitle>
        <span className="cursor-pointer text-[11px] font-medium text-indigo-600 hover:text-indigo-500 transition-colors">
          View all
        </span>
      </CardHeader>
      
      <CardContent className="flex-1 p-0">
        <ScrollArea className="h-[432px]">
          <div className="flex flex-col">
            {MOCK_ACTIVITY.map((activity, index) => (
              <div
                key={activity.id}
                className={`flex flex-col gap-2 p-4 transition-all hover:bg-zinc-50 dark:hover:bg-zinc-900/50 ${
                  index !== MOCK_ACTIVITY.length - 1 ? "border-b border-zinc-100 dark:border-zinc-800/50" : ""
                }`}
              >
                <div className="flex items-start gap-3">
                  <Avatar className="h-7 w-7 border border-zinc-200 dark:border-zinc-800 shadow-sm">
                    <AvatarFallback
                      className="text-[10px] font-bold"
                      style={{ backgroundColor: activity.userColor, color: activity.userTextColor }}
                    >
                      {activity.userInitials}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col gap-1 flex-1 min-w-0">
                    <p className="text-[11px] leading-relaxed text-zinc-800 dark:text-zinc-300">
                      <span className="font-bold text-zinc-950 dark:text-zinc-100">{activity.user}</span>
                      {" "}
                      {activity.action}
                      {" "}
                      <span className="font-medium text-zinc-950 dark:text-zinc-100">{activity.target}</span>
                    </p>
                    <span className="text-[10px] font-medium text-zinc-400 dark:text-zinc-500">
                      {activity.time}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
