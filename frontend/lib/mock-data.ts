export interface Organization {
  id: string;
  name: string;
  slug: string;
  avatar: string;
}

export interface Workspace {
  id: string;
  name: string;
  color: string;
  active?: boolean;
}

export interface Project {
  id: string;
  name: string;
  color: string;
  active?: boolean;
}

export interface Channel {
  id: string;
  name: string;
  badge?: number;
}

export interface User {
  id: string;
  name: string;
  initials: string;
  role: string;
  avatar?: string;
  status: "online" | "away" | "offline";
}

export interface Metric {
  label: string;
  value: string | number;
  subtext: string;
  trend: "neutral" | "up" | "down" | "warning";
}

export interface Task {
  id: string;
  title: string;
  status: "todo" | "in-progress" | "done";
  priority: "low" | "medium" | "high";
  tag: string;
  assignee: string; // initials
  assigneeColor: string;
  assigneeTextColor: string;
}

export interface Activity {
  id: string;
  user: string;
  userInitials: string;
  userColor: string;
  userTextColor: string;
  action: string;
  target: string;
  time: string;
}

export interface Sprint {
  label: string;
  percentage: number;
  color: string;
}

export interface TeamMember {
  id: string;
  name: string;
  initials: string;
  tasks: number;
  status: "online" | "away" | "offline";
  color: string;
  textColor: string;
}

export const MOCK_ORG: Organization = {
  id: "org-1",
  name: "HiveSpace",
  slug: "hivespace",
  avatar: "HS",
};

export const MOCK_USER: User = {
  id: "user-1",
  name: "Ayan K.",
  initials: "AK",
  role: "Admin",
  status: "online",
};

export const MOCK_WORKSPACES: Workspace[] = [
  { id: "ws-1", name: "Engineering", color: "#534AB7", active: true },
  { id: "ws-2", name: "Design", color: "#1D9E75" },
  { id: "ws-3", name: "Marketing", color: "#D85A30" },
];

export const MOCK_PROJECTS: Project[] = [
  { id: "p-1", name: "HiveSpace v2", color: "#378ADD", active: true },
  { id: "p-2", name: "Auth redesign", color: "#EF9F27" },
  { id: "p-3", name: "API gateway", color: "#D4537E" },
];

export const MOCK_CHANNELS: Channel[] = [
  { id: "c-1", name: "general", badge: 24 },
  { id: "c-2", name: "engineering", badge: 2 },
  { id: "c-3", name: "releases" },
];

export const MOCK_METRICS: Metric[] = [
  { label: "Open tasks", value: 24, subtext: "+4 since yesterday", trend: "warning" },
  { label: "Closed this week", value: 11, subtext: "+3 vs last week", trend: "neutral" },
  { label: "Sprint progress", value: "68%", subtext: "Sprint 4 · 3 days left", trend: "neutral" },
  { label: "Overdue", value: 3, subtext: "Needs attention", trend: "warning" },
];

export const MOCK_TASKS: Task[] = [
  {
    id: "t-1",
    title: "Set up WebSocket server",
    status: "todo",
    priority: "high",
    tag: "feature",
    assignee: "AK",
    assigneeColor: "#E6F1FB",
    assigneeTextColor: "#185FA5",
  },
  {
    id: "t-2",
    title: "Design invite email template",
    status: "todo",
    priority: "medium",
    tag: "design",
    assignee: "SR",
    assigneeColor: "#FBEAF0",
    assigneeTextColor: "#993556",
  },
  {
    id: "t-3",
    title: "Write migration script for v2 schema",
    status: "todo",
    priority: "low",
    tag: "docs",
    assignee: "MN",
    assigneeColor: "#E1F5EE",
    assigneeTextColor: "#0F6E56",
  },
  {
    id: "t-4",
    title: "Kanban drag-and-drop implementation",
    status: "in-progress",
    priority: "high",
    tag: "feature",
    assignee: "AK",
    assigneeColor: "#E6F1FB",
    assigneeTextColor: "#185FA5",
  },
  {
    id: "t-5",
    title: "Fix 401 token refresh loop",
    status: "in-progress",
    priority: "high",
    tag: "bug",
    assignee: "RJ",
    assigneeColor: "#FAEEDA",
    assigneeTextColor: "#854F0B",
  },
  {
    id: "t-6",
    title: "Auth register + login endpoints",
    status: "done",
    priority: "medium",
    tag: "feature",
    assignee: "AK",
    assigneeColor: "#E6F1FB",
    assigneeTextColor: "#185FA5",
  },
  {
    id: "t-7",
    title: "Tenant creation API",
    status: "done",
    priority: "medium",
    tag: "feature",
    assignee: "MN",
    assigneeColor: "#E1F5EE",
    assigneeTextColor: "#0F6E56",
  },
  {
    id: "t-8",
    title: "Landing page deployment",
    status: "done",
    priority: "low",
    tag: "docs",
    assignee: "SR",
    assigneeColor: "#FBEAF0",
    assigneeTextColor: "#993556",
  },
];

export const MOCK_ACTIVITY: Activity[] = [
  {
    id: "a-1",
    user: "Ayan",
    userInitials: "AK",
    userColor: "#E6F1FB",
    userTextColor: "#185FA5",
    action: "moved",
    target: "Kanban drag-and-drop to In Progress",
    time: "2 min ago",
  },
  {
    id: "a-2",
    user: "Raj",
    userInitials: "RJ",
    userColor: "#FAEEDA",
    userTextColor: "#854F0B",
    action: "commented on",
    target: "Fix 401 token refresh loop",
    time: "18 min ago",
  },
  {
    id: "a-3",
    user: "Meera",
    userInitials: "MN",
    userColor: "#E1F5EE",
    userTextColor: "#0F6E56",
    action: "closed",
    target: "Tenant creation API",
    time: "1 hr ago",
  },
  {
    id: "a-4",
    user: "Sara",
    userInitials: "SR",
    userColor: "#FBEAF0",
    userTextColor: "#993556",
    action: "created",
    target: "task Design invite email template",
    time: "2 hr ago",
  },
  {
    id: "a-5",
    user: "Ayan",
    userInitials: "AK",
    userColor: "#E6F1FB",
    userTextColor: "#185FA5",
    action: "assigned",
    target: "Set up WebSocket server to themselves",
    time: "3 hr ago",
  },
];

export const MOCK_SPRINT: Sprint[] = [
  { label: "Sprint 4", percentage: 68, color: "#534AB7" },
  { label: "Feature", percentage: 55, color: "#378ADD" },
  { label: "Bug fixes", percentage: 80, color: "#E24B4A" },
  { label: "Design", percentage: 40, color: "#D4537E" },
];

export const MOCK_TEAM: TeamMember[] = [
  { id: "tm-1", name: "Ayan K.", initials: "AK", tasks: 7, status: "online", color: "#E6F1FB", textColor: "#185FA5" },
  { id: "tm-2", name: "Raj J.", initials: "RJ", tasks: 5, status: "online", color: "#FAEEDA", textColor: "#854F0B" },
  { id: "tm-3", name: "Meera N.", initials: "MN", tasks: 4, status: "away", color: "#E1F5EE", textColor: "#0F6E56" },
  { id: "tm-4", name: "Sara R.", initials: "SR", tasks: 3, status: "offline", color: "#FBEAF0", textColor: "#993556" },
];
