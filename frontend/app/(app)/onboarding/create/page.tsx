"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useAuthStore, useWorkspaceStore } from "@/store"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ChevronLeft, Rocket, ShieldCheck, Globe, Info } from "lucide-react"
import { colors } from "@/constants/color"
import Navbar from "@/components/marketing/Navbar"
import Footer from "@/components/marketing/Footer"

export default function CreateOrganizationPage() {
  const router = useRouter()
  const { user, isAuthenticated, isLoading: authLoading } = useAuthStore()
  const { createTenant, isLoading, error: apiError } = useWorkspaceStore()
  const [mounted, setMounted] = useState(false)
  const [name, setName] = useState("")
  const [slug, setSlug] = useState("")
  const [description, setDescription] = useState("")
  const [plan, setPlan] = useState("FREE")

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

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newName = e.target.value
    setName(newName)
    // Simple slug generation: lowercase and replace spaces/special chars with hyphens
    setSlug(newName.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, ""))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await createTenant({
        name,
        slug,
        description,
        plan
      })
      // Success! Redirect to dashboard (which will now see the new tenant)
      router.push("/dashboard")
    } catch (err) {
      console.error("Failed to create organization:", err)
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
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-yellow-400 text-black shadow-inner shadow-black/10">
                  <Rocket className="h-5 w-5" />
                </div>
                <CardTitle className="text-2xl font-bold tracking-tight">Launch your Organization</CardTitle>
              </div>
              <CardDescription className="text-slate-500 text-lg">
                Tell us about your team. This will be the root of all your workspaces and projects.
              </CardDescription>
            </CardHeader>

            <form onSubmit={handleSubmit}>
              <CardContent className="space-y-6 pt-8">
                {/* Name */}
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-sm font-bold text-slate-700">Organization Name</Label>
                  <Input 
                    id="name" 
                    placeholder="Acme Corp" 
                    className="h-12 border-slate-200 bg-white text-lg focus:border-yellow-400 focus:ring-yellow-400"
                    required
                    value={name}
                    onChange={handleNameChange}
                  />
                  <p className="text-xs text-slate-500 flex items-center gap-1.5 pt-1">
                    <Info className="h-3 w-3" />
                    Ideally your company or collective name.
                  </p>
                </div>

                {/* Slug */}
                <div className="space-y-2">
                  <Label htmlFor="slug" className="text-sm font-bold text-slate-700">URL Identifier (Slug)</Label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none text-slate-400 text-sm">
                      hivespace.io/
                    </div>
                    <Input 
                      id="slug" 
                      placeholder="acme-corp" 
                      className="h-12 pl-[90px] border-slate-200 bg-white font-mono text-sm focus:border-yellow-400 focus:ring-yellow-400"
                      required
                      value={slug}
                      onChange={(e) => setSlug(e.target.value.toLowerCase().replace(/[^a-z0-9-]+/g, ""))}
                    />
                  </div>
                  <p className="text-xs text-slate-500 flex items-center gap-1.5 pt-1">
                    <Globe className="h-3 w-3" />
                    Used in your organization's unique URL.
                  </p>
                </div>

                {/* Description */}
                <div className="space-y-2">
                  <Label htmlFor="description" className="text-sm font-bold text-slate-700">Description (Optional)</Label>
                  <Input 
                    id="description" 
                    placeholder="We ship fast and break nothing." 
                    className="h-12 border-slate-200 bg-white text-slate-900 focus:border-yellow-400 focus:ring-yellow-400"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </div>

                {/* Plan Selection */}
                <div className="space-y-3">
                  <Label className="text-sm font-bold text-slate-700">Select a Launch Plan</Label>
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                    {["FREE", "PRO", "ENTERPRISE"].map((p) => (
                      <div 
                        key={p}
                        className={`relative flex flex-col items-center justify-center rounded-xl border-2 p-4 cursor-pointer transition-all ${
                          plan === p 
                            ? "border-slate-900 bg-slate-50 ring-2 ring-slate-900 ring-offset-2" 
                            : "border-slate-100 bg-white hover:border-slate-200"
                        }`}
                        onClick={() => setPlan(p)}
                      >
                        <span className={`text-sm font-black ${plan === p ? "text-slate-900" : "text-slate-500"}`}>
                          {p}
                        </span>
                        {p === "PRO" && (
                          <span className="absolute -top-2 rounded-full bg-yellow-400 px-2 py-0.5 text-[10px] font-black text-black">
                            POPULAR
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                  <p className="text-[11px] text-slate-500 text-center italic">
                    You can switch plans anytime as your squad grows.
                  </p>
                </div>

                {apiError && (
                  <div className="rounded-lg bg-red-50 p-3 text-sm text-red-600 border border-red-100 flex items-center gap-2">
                    <ShieldCheck className="h-4 w-4 rotate-180" />
                    {apiError}
                  </div>
                )}
              </CardContent>

              <CardFooter className="pb-8 pt-4">
                <Button 
                  type="submit" 
                  className="w-full h-14 rounded-2xl bg-slate-900 text-white font-black text-lg hover:bg-black hover:scale-[1.01] transition-all disabled:opacity-50 disabled:hover:scale-100 shadow-xl"
                  disabled={isLoading || !name || !slug}
                >
                  {isLoading ? "Provisioning..." : "Launch Organization"}
                </Button>
              </CardFooter>
            </form>
          </Card>

          <p className="mt-8 text-center text-xs text-slate-400">
            By launching, you agree to HiveSpace's <span className="underline underline-offset-2">Terms of Service</span> and <span className="underline underline-offset-2">Community Guidelines</span>.
          </p>
        </div>
      </main>

      <Footer />
    </div>
  )
}
