"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Sparkles } from "lucide-react"
import Navbar from "@/components/marketing/Navbar"
import Footer from "@/components/marketing/Footer"
import { Label } from "@/components/ui/label"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { colors } from "@/constants/color"
import { useAuthStore } from "@/store"
import Link from "next/link"

const RegisterPage = () => {
  const router = useRouter()
  const { register, isLoading, error: apiError } = useAuthStore()
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const [localError, setLocalError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLocalError(null)

    if (username.length < 3) {
      setLocalError("Username must be at least 3 characters")
      return
    }

    if (password.length < 6) {
      setLocalError("Password must be at least 6 characters")
      return
    }

    try {
      await register({ username, email, password })
      router.push("/onboarding")
    } catch (err: any) {
      console.error("Registration failed:", err)
      setLocalError(err.message || "Registration failed. Please try again.")
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
          background: `radial-gradient(circle at top left, ${colors.accentSoft}66 0, transparent 55%),
                       radial-gradient(circle at bottom right, ${colors.accentSoft}80 0, transparent 60%)`,
        }}
        className="flex-1 bg-white text-slate-900"
      >
        <div className="mx-auto flex max-w-6xl xl:max-w-7xl 2xl:max-w-[1440px] flex-1 items-center justify-center px-6 py-10 sm:px-10">
          <div className="grid w-full gap-10 md:grid-cols-[1.1fr_1fr] md:items-center">
            {/* LEFT CONTENT */}
            <div className="space-y-4">
              <span className="inline-flex items-center gap-2 rounded-full border border-dashed border-slate-300 bg-white px-3 py-1 text-xs font-medium text-slate-700">
                <Sparkles className="h-3 w-3 text-amber-400" />
                Create your HiveSpace
              </span>

              <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl text-black">
                Register once, ship often.
              </h1>

              <p className="max-w-md text-sm text-slate-600 sm:text-base">
                Set up your workspace and start organizing issues with clarity.
              </p>
            </div>

            {/* REGISTER CARD */}
            <Card className="w-full max-w-md justify-self-end border-dashed border-slate-200 bg-white shadow-lg backdrop-blur">
              <CardHeader className="space-y-1">
                <CardTitle className="text-xl text-slate-900">
                  Create an account
                </CardTitle>
                <CardDescription className="text-slate-500">
                  Enter your details to spin up your first space.
                </CardDescription>
              </CardHeader>

              <CardContent>
                <form className="space-y-5" onSubmit={handleSubmit}>
                  {/* USERNAME */}
                  <div className="grid gap-2">
                    <Label htmlFor="username" className="text-slate-800">Username</Label>
                    <Input
                      id="username"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      placeholder="Ada Lovelace"
                      className="border-slate-200 bg-white text-slate-900 placeholder:text-slate-400 h-10"
                      required
                    />
                  </div>

                  {/* EMAIL */}
                  <div className="grid gap-2">
                    <Label htmlFor="email" className="text-slate-800">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@team.com"
                      className="border-slate-200 bg-white text-slate-900 placeholder:text-slate-400 h-10"
                      required
                    />
                  </div>

                  {/* PASSWORD */}
                  <div className="grid gap-2">
                    <Label htmlFor="password" className="text-slate-800">Password</Label>
                    <Input
                      id="password"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="border-slate-200 bg-white text-slate-900 placeholder:text-slate-400 h-10"
                      required
                    />
                  </div>

                  {/* ERROR */}
                  {(localError || apiError) && (
                    <p className="text-sm text-red-600 bg-red-50 p-2 rounded-md border border-red-100">
                      {localError || apiError}
                    </p>
                  )}

                  {/* SUBMIT */}
                  <Button
                    type="submit"
                    disabled={isLoading}
                    className="mt-2 w-full rounded-full bg-black text-white hover:bg-black h-11"
                  >
                    {isLoading ? "Creating account..." : "Register"}
                  </Button>

                  <p className="pt-2 text-center text-xs text-slate-500">
                    Already have an account?{" "}
                    <Link
                      href="/login"
                      className="font-medium text-slate-900 hover:underline"
                    >
                      Log in
                    </Link>
                  </p>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}

export default RegisterPage
