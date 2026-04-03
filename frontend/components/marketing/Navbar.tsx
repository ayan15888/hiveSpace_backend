"use client"

import Link from "next/link"
import { Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"

type NavItem = {
  path: string
  label: string
}

type NavbarProps = {
  items: NavItem[]
}

import { useAuthStore } from "@/store"

const Navbar = ({ items }: NavbarProps) => {
  const { isAuthenticated, logout } = useAuthStore()

  return (
    <header className="sticky top-0 z-40 border-b border-dashed border-slate-200 bg-white/80 backdrop-blur">
      <div className="mx-auto flex max-w-6xl xl:max-w-7xl 2xl:max-w-[1440px] items-center justify-between px-6 py-3 sm:px-10">
        <Link href="/" className="flex items-center gap-2 text-slate-900 no-underline">
          <span className="flex h-8 w-8 items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-amber-100 font-semibold uppercase tracking-wide text-slate-900">
            HS
          </span>
          <div className="flex flex-col leading-tight">
            <span className="text-sm font-bold tracking-tight text-slate-900">HiveSpace</span>
            <span className="text-[11px] text-slate-500 flex items-center gap-1">
              <Sparkles className="h-3 w-3 text-amber-400" />
              Jira, but lighter
            </span>
          </div>
        </Link>

        <nav className="flex items-center gap-4 sm:gap-6 text-sm">
          <div className="hidden items-center gap-4 sm:flex">
            {items.map((item) => (
              <Link
                key={item.path}
                href={item.path}
                className="rounded-full px-3 py-1 text-slate-700 hover:bg-slate-100 hover:text-black transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-2">
            {isAuthenticated ? (
              <>
                <Button
                  asChild
                  size="sm"
                  variant="outline"
                  className="rounded-full border-dashed border-slate-300 bg-white px-4 font-medium text-slate-900 hover:bg-slate-50 h-9"
                >
                  <Link href="/dashboard">Dashboard</Link>
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  className="rounded-full px-4 font-medium text-slate-600 hover:text-red-500 h-9"
                  onClick={() => logout()}
                >
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Button
                  asChild
                  size="sm"
                  variant="outline"
                  className="hidden rounded-full border-dashed border-slate-300 bg-white px-4 font-medium text-slate-900 hover:bg-slate-50 sm:inline-flex h-9"
                >
                  <Link href="/login">Login</Link>
                </Button>
                <Button
                  asChild
                  size="sm"
                  className="rounded-full bg-black px-4 font-medium text-white hover:bg-black h-9"
                >
                  <Link href="/register">Register</Link>
                </Button>
              </>
            )}
          </div>
        </nav>
      </div>
    </header>
  )
}

export default Navbar
