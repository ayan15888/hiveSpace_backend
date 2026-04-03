"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store";
import { DashboardHeader } from "@/components/layout/Topbar";
import { DashboardMetrics } from "@/components/dashboard-metrics";
import { DashboardKanban } from "@/features/kanban/components/KanbanBoard";
import { ActivityFeed } from "@/components/activity-feed";
import { SprintStatus, TeamWorkload } from "@/components/dashboard-widgets";

export default function DashboardPage() {
  const router = useRouter();
  const { user, isAuthenticated, isLoading: authLoading } = useAuthStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted && !authLoading && isAuthenticated && user && !user.hasTenants) {
      router.push("/onboarding");
    }
  }, [user, isAuthenticated, authLoading, router, mounted]);

  // Show a blank or loading state while checking redirection
  if (!mounted || authLoading || (isAuthenticated && user?.hasTenants === false)) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-zinc-50 dark:bg-zinc-950">
        <div className="h-8 w-8 border-4 border-slate-900 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen w-full flex-col font-sans selection:bg-indigo-100 selection:text-indigo-900 dark:selection:bg-indigo-900/30 dark:selection:text-indigo-200">
      <DashboardHeader />
      
      <main className="flex-1 overflow-y-auto px-6 py-6">
        <div className="flex w-full flex-col gap-5">
          {/* Top Row: Metrics */}
          <section className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <DashboardMetrics />
          </section>

          {/* Middle Row: Kanban & Activity */}
          <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
            <section className="lg:col-span-2 flex flex-col animate-in fade-in slide-in-from-bottom-4 duration-500 delay-100 fill-mode-both">
              <DashboardKanban />
            </section>
            
            <section className="flex flex-col animate-in fade-in slide-in-from-bottom-4 duration-500 delay-200 fill-mode-both">
              <ActivityFeed />
            </section>
          </div>

          {/* Bottom Row: Sprint & Team */}
          <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
            <section className="flex flex-col animate-in fade-in slide-in-from-bottom-4 duration-500 delay-300 fill-mode-both">
              <SprintStatus />
            </section>
            
            <section className="flex flex-col animate-in fade-in slide-in-from-bottom-4 duration-500 delay-400 fill-mode-both">
              <TeamWorkload />
            </section>
          </div>
        </div>
      </main>
    </div>
  );
}
