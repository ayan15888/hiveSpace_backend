import type { ReactNode } from "react"
import { Sparkles, ListChecks, Clock } from "lucide-react"
import type { TagKey } from "./tags"

export const HOME_FEATURES: Array<{
  icon: ReactNode
  title: string
  copy: string
}> = [
  {
    icon: <Sparkles className="h-5 w-5 text-amber-500" />,
    title: "Organizations to teams",
    copy: "Model your hierarchy from organizations to workspaces, projects, and the teams that ship the work.",
  },
  {
    icon: <ListChecks className="h-5 w-5 text-sky-500" />,
    title: "Workspaces & projects",
    copy: "Group related projects inside focused workspaces so every squad sees just what they need.",
  },
  {
    icon: <Clock className="h-5 w-5 text-rose-500" />,
    title: "Team status tags",
    copy: "Track to do, pending, done, errors, and bugs with simple comic-style tags on every task.",
  },
]

export const HOME_TAGS: TagKey[] = ["To do", "Pending", "Done", "Error", "Bug"]

export const HOME_TAG_STYLES: Record<
  TagKey,
  {
    border: string
    bg: string
    dot: string
    text: string
  }
> = {
  "To do": {
    border: "border-black",
    bg: "bg-blue-500",
    dot: "bg-white border border-solid border-black",
    text: "text-white font-serif ",
  },
  Pending: {
    border: "border-black",
    bg: "bg-yellow-500",
    dot: "bg-white border border-solid border-black",
    text: "text-black font-serif ",
  },
  Done: {
    border: "border-black",
    bg: "bg-green-500",
    dot: "bg-white border border-solid border-black",
    text: "text-black font-serif ",
  },
  Error: {
    border: "border-black",
    bg: "bg-red-500",
    dot: "bg-white border border-solid border-black",
    text: "text-black font-serif ",
  },
  Bug: {
    border: "border-black",
    bg: "bg-purple-500",
    dot: "bg-white border border-solid border-black",
    text: "text-black font-serif ",
  },
}

export const HOME_BOARD_COLUMNS: Array<{
  name: string
  color: string
  items: string[]
}> = [
  {
    name: "To do",
    color: "bg-amber-50 border-amber-800",
    items: ["Plan sprint for Org Alpha", "Create workspace for Design", "Draft project roadmap"],
  },
  {
    name: "Pending / In review",
    color: "bg-sky-50 border-sky-800",
    items: ["Approve Team Orbit setup", "Review bug triage board"],
  },
  {
    name: "Done & bugs",
    color: "bg-emerald-50 border-emerald-800",
    items: ["Launch Org Beta workspace", "Fix login error bug"],
  },
]
