"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useAuthStore, useWorkspaceStore } from "@/store"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { PlusCircle, Users, ArrowRight, Sparkles, Building2 } from "lucide-react"
import { colors } from "@/constants/color"
import Navbar from "@/components/marketing/Navbar"
import Footer from "@/components/marketing/Footer"

export default function OnboardingPage() {
  const router = useRouter()
  const { user, isAuthenticated, isLoading: authLoading } = useAuthStore()
  const { isLoading: workspaceLoading } = useWorkspaceStore()
  const [mounted, setMounted] = useState(false)
  const [redirecting, setRedirecting] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (mounted && !authLoading && !workspaceLoading && isAuthenticated && user?.hasTenants) {
      setRedirecting(true)
      router.push("/dashboard")
    }
  }, [user, isAuthenticated, authLoading, workspaceLoading, router, mounted])

  // Show loader if:
  // 1. Not mounted yet (SSR phase)
  // 2. Auth or Workspace is still loading
  // 3. We are in the process of redirecting
  // 4. User is authenticated but we haven't confirmed they lack tenants yet (or we know they HAVE tenants and are about to redirect)
  if (!mounted || authLoading || workspaceLoading || redirecting || (isAuthenticated && (user === null || user.hasTenants))) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-white">
        <div className="text-center space-y-4">
          <div className="h-12 w-12 border-4 border-yellow-400 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="text-slate-500 font-medium">Preparing your workspace...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen flex-col bg-white text-slate-900">
      <Navbar
        items={[
          { path: "/", label: "Home" },
          { path: "/docs", label: "Docs" },
        ]}
      />

      <main 
        style={{
          background: `radial-gradient(circle at top left, ${colors.accentSoft}66 0, transparent 55%), radial-gradient(circle at bottom right, ${colors.accentSoft}80 0, transparent 60%)`,
        }}
        className="flex-1 overflow-hidden"
      >
        <div className="mx-auto max-w-5xl px-6 py-20 sm:px-10 flex flex-col items-center justify-center min-h-[calc(100vh-160px)]">
          
          <div className="text-center space-y-4 mb-16 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <span className="inline-flex items-center gap-2 rounded-full border border-dashed border-slate-300 bg-white px-4 py-1.5 text-xs font-semibold text-slate-700 shadow-sm">
              <Sparkles className="h-3.5 w-3.5 text-amber-500 fill-amber-500" />
              Welcome to HiveSpace
            </span>
            <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl text-black">
              Let's get your team rolling.
            </h1>
            <p className="mx-auto max-w-xl text-lg text-slate-600">
              HiveSpace is designed for high-performance squads. First, you'll need a place to call home—an <span className="font-semibold text-slate-900 underline decoration-yellow-400 decoration-2 underline-offset-2">Organization</span>.
            </p>
          </div>

          <div className="grid w-full grid-cols-1 gap-8 md:grid-cols-2 max-w-4xl mx-auto">
            {/* Create Organization Option */}
            <Card 
              className="group relative overflow-hidden border-2 border-dashed border-slate-200 bg-white/50 backdrop-blur-sm transition-all hover:border-slate-900 hover:shadow-2xl hover:-translate-y-1 cursor-pointer animate-in fade-in slide-in-from-left-8 duration-700 delay-100"
              onClick={() => router.push("/onboarding/create")}
            >
              <div className="absolute top-0 right-0 p-4 opacity-10 transition-opacity group-hover:opacity-20 animate-pulse">
                <Building2 className="h-24 w-24 text-slate-900" />
              </div>
              
              <CardHeader className="relative z-10 space-y-4 pb-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-yellow-400 text-black shadow-lg transition-transform group-hover:scale-110 group-hover:rotate-3">
                  <PlusCircle className="h-7 w-7" />
                </div>
                <div>
                  <CardTitle className="text-2xl font-bold text-slate-900">Create a New Nest</CardTitle>
                  <CardDescription className="text-slate-600 text-base mt-2">
                    Start a fresh organization for your team, set up custom domains, and define your ship-cycle.
                  </CardDescription>
                </div>
              </CardHeader>
              <CardContent className="relative z-10 pt-4">
                <Button className="w-full h-12 rounded-xl bg-slate-900 text-white font-bold transition-all hover:bg-black group-hover:gap-4 flex items-center justify-center gap-2">
                  Start an Organization
                  <ArrowRight className="h-5 w-5" />
                </Button>
              </CardContent>
            </Card>

            {/* Join Organization Option */}
            <Card 
              className="group relative overflow-hidden border-2 border-dashed border-slate-200 bg-white/50 backdrop-blur-sm transition-all hover:border-slate-900 hover:shadow-2xl hover:-translate-y-1 cursor-pointer animate-in fade-in slide-in-from-right-8 duration-700 delay-100"
              onClick={() => router.push("/onboarding/join")}
            >
              <div className="absolute top-0 right-0 p-4 opacity-10 transition-opacity group-hover:opacity-20 animate-pulse">
                <Users className="h-24 w-24 text-slate-900" />
              </div>

              <CardHeader className="relative z-10 space-y-4 pb-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-900 text-white shadow-lg transition-transform group-hover:scale-110 group-hover:-rotate-3">
                  <Users className="h-7 w-7" />
                </div>
                <div>
                  <CardTitle className="text-2xl font-bold text-slate-900">Join a Squad</CardTitle>
                  <CardDescription className="text-slate-600 text-base mt-2">
                    Already have a team? Use an invite link or organization slug to jump right into the action.
                  </CardDescription>
                </div>
              </CardHeader>
              <CardContent className="relative z-10 pt-4">
                <Button variant="outline" className="w-full h-12 rounded-xl border-2 border-slate-900 text-slate-900 font-bold hover:bg-slate-900 hover:text-white group-hover:gap-4 flex items-center justify-center gap-2 transition-all">
                  Join with Code
                  <ArrowRight className="h-5 w-5" />
                </Button>
              </CardContent>
            </Card>
          </div>

          <p className="mt-12 text-sm text-slate-500 max-w-md text-center">
            Need help? Check out our <a href="/docs" className="font-semibold text-slate-900 underline underline-offset-4">Success Guide</a> for tips on setting up high-performance organizations.
          </p>

        </div>
      </main>

      <Footer />
    </div>
  )
}
