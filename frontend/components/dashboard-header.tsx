"use client";

import { Bell, Search, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

export function DashboardHeader() {
  return (
    <header className="flex h-16 w-full items-center justify-between border-b border-zinc-200 bg-white px-6 dark:border-zinc-800 dark:bg-zinc-950">
      <div className="flex items-center gap-4">
        <h1 className="text-sm font-medium text-zinc-900 dark:text-zinc-50">
          Overview — Engineering
        </h1>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative w-64 group">
          <Search className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-zinc-400" />
          <Input 
            placeholder="Search tasks, messages..." 
            className="h-9 pl-9 pr-4 text-xs bg-zinc-50 border-zinc-200 dark:bg-zinc-900 dark:border-zinc-800 focus-visible:ring-1 focus-visible:ring-indigo-500 transition-all"
          />
        </div>

        <button className="relative flex h-9 w-9 items-center justify-center rounded-lg border border-zinc-200 bg-zinc-50 hover:bg-zinc-100 transition-colors dark:border-zinc-800 dark:bg-zinc-900 dark:hover:bg-zinc-800">
          <Bell className="h-4 w-4 text-zinc-600 dark:text-zinc-400" />
          <span className="absolute top-2.5 right-2.5 h-1.5 w-1.5 rounded-full bg-rose-500 border border-white dark:border-zinc-950" />
        </button>

        <Button className="h-9 rounded-lg bg-[#534AB7] px-4 text-xs font-semibold text-white hover:bg-[#3C3489] transition-all">
          <Plus className="mr-2 h-3.5 w-3.5" />
          New task
        </Button>
      </div>
    </header>
  );
}
