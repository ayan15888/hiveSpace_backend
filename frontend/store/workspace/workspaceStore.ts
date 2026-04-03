"use client"

import { create } from "zustand"
import { apiClient } from "@/lib/api"

export type Tenant = {
  id: string
  name: string
  slug: string
  ownerEmail: string
  plan: string
  active: boolean
}

export type Workspace = {
  id: string
  name: string
  description?: string
  plan: string
  tenantId: string
  color?: string
}

export type Project = {
  id: string
  name: string
  description?: string
  status: string
  workspaceId: string
  active?: boolean
  color?: string
}

export type Team = {
  id: string
  name: string
  description: string
  membersCount: number
  projectId: string
  createdAt: string
  updatedAt: string
}

interface WorkspaceState {
  tenants: Tenant[]
  workspaces: Workspace[]
  projects: Project[]
  teams: Team[]
  
  activeTenant: Tenant | null
  activeWorkspace: Workspace | null
  activeProject: Project | null
  
  isLoading: boolean
  error: string | null

  fetchTenants: (userId: string) => Promise<void>
  fetchWorkspaces: (tenantId: string) => Promise<void>
  fetchProjects: (tenantSlug: string, workspaceId: string) => Promise<void>
  fetchTeams: (projectId: string) => Promise<void>
  
  setActiveTenant: (tenant: Tenant) => void
  setActiveWorkspace: (workspace: Workspace) => void
  setActiveProject: (project: Project) => void
}

export const useWorkspaceStore = create<WorkspaceState>((set, get) => ({
  tenants: [],
  workspaces: [],
  projects: [],
  teams: [],
  
  activeTenant: null,
  activeWorkspace: null,
  activeProject: null,
  
  isLoading: false,
  error: null,

  fetchTenants: async (userId) => {
    set({ isLoading: true, error: null })
    try {
      const response = await apiClient.get<Tenant[]>(`/api/tenants/user/${userId}`)
      set({ tenants: response, isLoading: false })
      
      if (response.length > 0 && !get().activeTenant) {
        get().setActiveTenant(response[0])
      }
    } catch (err: any) {
      set({ error: err.message, isLoading: false })
    }
  },

  fetchWorkspaces: async (tenantId) => {
    set({ isLoading: true, error: null })
    try {
      const response = await apiClient.get<Workspace[]>(`/api/workspaces/tenant/${tenantId}`)
      
      const colors = ["#534AB7", "#1D9E75", "#D85A30", "#378ADD", "#EF9F27"]
      const enhancedWorkspaces = response.map((ws, i) => ({
        ...ws,
        color: colors[i % colors.length]
      }))

      set({ workspaces: enhancedWorkspaces, isLoading: false })
      
      if (enhancedWorkspaces.length > 0) {
        get().setActiveWorkspace(enhancedWorkspaces[0])
      } else {
        set({ activeWorkspace: null, projects: [] })
      }
    } catch (err: any) {
      set({ error: err.message, isLoading: false })
    }
  },

  fetchProjects: async (tenantSlug, workspaceId) => {
    set({ isLoading: true, error: null })
    try {
      const response = await apiClient.get<Project[]>(`/api/${tenantSlug}/workspaces/${workspaceId}/projects`)
      
      const colors = ["#378ADD", "#EF9F27", "#D4537E", "#1D9E75"]
      const enhancedProjects = response.map((p, i) => ({
        ...p,
        color: colors[i % colors.length]
      }))

      set({ projects: enhancedProjects, isLoading: false })

      if (enhancedProjects.length > 0) {
        get().setActiveProject(enhancedProjects[0])
      } else {
        set({ activeProject: null, teams: [] })
      }
    } catch (err: any) {
      set({ error: err.message, isLoading: false })
    }
  },

  fetchTeams: async (projectId) => {
    set({ isLoading: true, error: null })
    try {
      const response = await apiClient.get<Team[]>(`/api/p/${projectId}/teams`)
      set({ teams: response, isLoading: false })
    } catch (err: any) {
      set({ error: err.message, isLoading: false })
    }
  },

  setActiveTenant: (tenant) => {
    set({ activeTenant: tenant })
    get().fetchWorkspaces(tenant.id)
  },

  setActiveWorkspace: (workspace) => {
    const { activeTenant } = get()
    set({ activeWorkspace: workspace })
    if (activeTenant) {
      get().fetchProjects(activeTenant.slug, workspace.id)
    }
  },

  setActiveProject: (project) => {
    set({ activeProject: project })
    get().fetchTeams(project.id)
  }
}))
