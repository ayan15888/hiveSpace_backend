"use client"

import { Sparkles } from "lucide-react"
import { useEffect, useState } from "react"

const Footer = () => {
  const [year, setYear] = useState<number | null>(null)

  useEffect(() => {
    setYear(new Date().getFullYear())
  }, [])

  return (
    <footer style={{ background: "#000000", color: "#F9FAFB", borderColor: "#000000" }} className="border-t">
      <div className="mx-auto flex max-w-6xl xl:max-w-7xl 2xl:max-w-[1440px] flex-col gap-3 px-6 py-6 text-xs sm:flex-row sm:items-center sm:justify-between sm:text-sm">
        <div className="flex items-center gap-2">
          <span className="flex h-7 w-7 items-center justify-center rounded-full border border-dashed border-slate-500 bg-white/10 text-[10px] font-semibold uppercase tracking-wide text-slate-100">
            HS
          </span>
          <div className="space-y-0.5">
            <p className="font-medium text-slate-50">HiveSpace</p>
            <p className="text-[11px] text-slate-400">
              A comic-light Jira-style board for focused teams.
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3 text-[11px] sm:justify-end sm:text-xs">
          <div className="inline-flex items-center gap-1 rounded-full border border-dashed border-slate-600 bg-white/5 px-3 py-1 text-slate-200">
            <Sparkles className="h-3 w-3 text-amber-400" />
            <span>Made for playful productivity</span>
          </div>
          <span className="text-slate-500">© {year ?? ""} HiveSpace</span>
        </div>
      </div>
    </footer>
  )
}

export default Footer
