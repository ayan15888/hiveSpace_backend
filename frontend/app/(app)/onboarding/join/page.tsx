"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useAuthStore, useWorkspaceStore } from "@/store"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ChevronLeft, Users, ShieldCheck, Ticket, KeyRound, ArrowRight } from "lucide-react"
import { colors } from "@/constants/color"
import Navbar from "@/components/marketing/Navbar"
import Footer from "@/components/marketing/Footer"

export default function JoinOrganizationPage() {
  const router = useRouter()
  const { user, isAuthenticated, isLoading: authLoading } = useAuthStore()
  const { joinTeam, isLoading, error: apiError } = useWorkspaceStore()
  const [mounted, setMounted] = useState(false)
  const [inviteCode, setInviteCode] = useState("")

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (mounted && !authLoading && isAuthenticated && user?.hasTenants) {
      router.push("/dashboard")
    }
  }, [user, isAuthenticated, authLoading, router, mounted])

  // Stay on loading state until we confirm redirect is unnecessary
  if (!mounted || authLoading || (isAuthenticated && (user === null || user.hasTenants))) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-white">
        <div className="h-12 w-12 border-4 border-yellow-400 border-t-transparent rounded-full animate-spin"></div>
      </div>
    )
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await joinTeam(inviteCode)
      // Success! Redirect to dashboard (which will now see the joined tenant component)
      router.push("/dashboard")
    } catch (err) {
      console.error("Failed to join organization:", err)
    }
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
          background: `radial-gradient(circle at top left, ${colors.accentSoft}44 0, transparent 45%), 
                      radial-gradient(circle at bottom right, ${colors.accentSoft}66 0, transparent 50%)`,
        }}
        className="flex-1 px-6 py-12 sm:px-10"
      >
        <div className="mx-auto max-w-2xl">
          <Button 
            variant="ghost" 
            className="mb-8 p-0 hover:bg-transparent text-slate-500 hover:text-slate-900 transition-colors"
            onClick={() => router.push("/onboarding")}
          >
            <ChevronLeft className="mr-2 h-4 w-4" />
            Back to options
          </Button>

          <Card className="border-2 border-dashed border-slate-200 bg-white/80 backdrop-blur-md shadow-xl animate-in fade-in slide-in-from-bottom-8 duration-700">
            <CardHeader className="space-y-2 pb-6 border-b border-dashed border-slate-100">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-900 text-white shadow-inner shadow-white/20">
                  <Ticket className="h-5 w-5" />
                </div>
                <CardTitle className="text-2xl font-bold tracking-tight">Join Your Squad</CardTitle>
              </div>
              <CardDescription className="text-slate-500 text-lg">
                Enter your invitation code to access your team's organization and workspaces.
              </CardDescription>
            </CardHeader>

            <form onSubmit={handleSubmit}>
              <CardContent className="space-y-6 pt-8 pb-4">
                {/* Invite Code */}
                <div className="space-y-4">
                  <div className="flex flex-col items-center justify-center py-6 px-4 rounded-2xl bg-slate-50 border border-slate-100 border-dashed animate-pulse duration-2000">
                    <KeyRound className="h-10 w-10 text-slate-300 mb-2" />
                    <Label htmlFor="code" className="text-xs font-bold uppercase tracking-widest text-slate-400">Invitation Secret</Label>
                  </div>
                  
                  <Input 
                    id="code" 
                    placeholder="HS-XXXX-XXXX" 
                    className="h-16 text-center text-2xl font-mono tracking-[0.2em] border-2 border-slate-200 bg-white shadow-sm focus:border-slate-900 focus:ring-slate-900 transition-all placeholder:text-slate-200 uppercase"
                    required
                    maxLength={14}
                    value={inviteCode}
                    onChange={(e) => setInviteCode(e.target.value.toUpperCase())}
                  />
                  
                  <div className="flex items-start gap-3 rounded-xl bg-yellow-50 p-4 border border-yellow-100">
                    <Users className="h-5 w-5 text-yellow-600 shrink-0 mt-0.5" />
                    <p className="text-xs leading-relaxed text-yellow-800">
                      <strong>Check your inbox:</strong> Invite codes are sent by Slack or Email from your organization's administrators. If you don't have one, ask your manager for access.
                    </p>
                  </div>
                </div>

                {apiError && (
                  <div className="rounded-lg bg-red-50 p-3 text-sm text-red-600 border border-red-100 flex items-center gap-2 animate-in shake">
                    <ShieldCheck className="h-4 w-4 rotate-180" />
                    {apiError}
                  </div>
                )}
              </CardContent>

              <CardFooter className="pb-8 pt-4">
                <Button 
                  type="submit" 
                  className="w-full h-14 rounded-2xl bg-black text-white font-black text-lg hover:bg-slate-900 hover:scale-[1.01] transition-all disabled:opacity-50 disabled:hover:scale-100 shadow-xl flex items-center justify-center gap-2 group"
                  disabled={isLoading || inviteCode.length < 5}
                >
                  {isLoading ? "Validating Session..." : "Join Organization"}
                  {!isLoading && <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />}
                </Button>
              </CardFooter>
            </form>
          </Card>

          <div className="mt-8 flex flex-col items-center gap-2 text-slate-400">
            <p className="text-xs">No invite code? Ask your admin to generate one from their dashboard.</p>
            <div className="h-px w-20 bg-slate-200"></div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
