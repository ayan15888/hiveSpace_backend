"use client"

import { create } from "zustand"
import { apiClient } from "@/lib/api"
import { useAuthStore } from "@/store/auth/authStore"

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
  activeTeam: Team | null
  
  isLoading: boolean
  error: string | null

  fetchTenants: (userId: string) => Promise<void>
  fetchWorkspaces: (tenantId: string) => Promise<void>
  fetchProjects: (workspaceId: string) => Promise<void>
  fetchTeams: (projectId: string) => Promise<void>
  
  createTenant: (data: { name: string, slug: string, plan?: string, description?: string }) => Promise<void>
  createWorkspace: (data: { name: string, description?: string, plan: string, tenantId: string }) => Promise<void>
  createProject: (data: { name: string, description?: string, status: string, workspaceId: string }) => Promise<void>
  createTeam: (data: { name: string, description?: string, projectId: string }) => Promise<void>
  
  generateInvite: (teamId: string, recipientUsername: string) => Promise<string>
  joinTeam: (inviteCode: string) => Promise<void>
  
  setActiveTenant: (tenant: Tenant) => void
  setActiveWorkspace: (workspace: Workspace) => void
  setActiveProject: (project: Project) => void
  setActiveTeam: (team: Team | null) => void
}

export const useWorkspaceStore = create<WorkspaceState>((set, get) => ({
  tenants: [],
  workspaces: [],
  projects: [],
  teams: [],
  
  activeTenant: null,
  activeWorkspace: null,
  activeProject: null,
  activeTeam: null,
  
  isLoading: false,
  error: null,

  fetchTenants: async (userId) => {
    set({ isLoading: true, error: null })
    try {
      const response = await apiClient.get<Tenant[]>(`/api/tenants/u/${userId}`)
      set({ tenants: response, isLoading: false })
      
      if (response.length > 0) {
        useAuthStore.getState().setHasTenants(true)
        if (!get().activeTenant) {
          get().setActiveTenant(response[0])
        }
      }
    } catch (err: any) {
      set({ error: err.message, isLoading: false })
    }
  },

  fetchWorkspaces: async (tenantId) => {
    set({ isLoading: true, error: null })
    try {
      const response = await apiClient.get<Workspace[]>(`/api/workspaces/t/${tenantId}`)
      
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

  fetchProjects: async (workspaceId) => {
    set({ isLoading: true, error: null })
    try {
      const response = await apiClient.get<Project[]>(`/api/workspaces/${workspaceId}/projects`)
      
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
      // NOTE: API_REFERENCE.md doesn't explicitly list "Get Teams", keeping current implementation
      const response = await apiClient.get<Team[]>(`/api/p/${projectId}/teams`)
      set({ teams: response, isLoading: false })
    } catch (err: any) {
      set({ error: err.message, isLoading: false })
    }
  },
  
  createTenant: async (data) => {
    set({ isLoading: true, error: null })
    try {
      await apiClient.post<Tenant>("/api/tenants", data)
      // Refresh tenants list after creation
      const { user, setHasTenants } = useAuthStore.getState()
      if (user) {
        setHasTenants(true)
        await get().fetchTenants(user.id)
      }
      set({ isLoading: false })
    } catch (err: any) {
      set({ error: err.message, isLoading: false })
      throw err
    }
  },

  createWorkspace: async (data) => {
    set({ isLoading: true, error: null })
    try {
      await apiClient.post<Workspace>("/api/workspaces", data)
      // Refresh workspaces list
      if (get().activeTenant) await get().fetchWorkspaces(get().activeTenant!.id)
      set({ isLoading: false })
    } catch (err: any) {
      set({ error: err.message, isLoading: false })
      throw err
    }
  },

  createProject: async (data) => {
    set({ isLoading: true, error: null })
    try {
      await apiClient.post<Project>(`/api/workspaces/${data.workspaceId}/projects`, data)
      // Refresh projects list
      if (get().activeWorkspace) await get().fetchProjects(get().activeWorkspace!.id)
      set({ isLoading: false })
    } catch (err: any) {
      set({ error: err.message, isLoading: false })
      throw err
    }
  },

  createTeam: async (data) => {
    set({ isLoading: true, error: null })
    try {
      const { projectId, ...body } = data
      await apiClient.post<Team>(`/api/p/${projectId}/teams`, body)
      // Refresh teams list
      if (get().activeProject) await get().fetchTeams(get().activeProject!.id)
      set({ isLoading: false })
    } catch (err: any) {
      set({ error: err.message, isLoading: false })
      throw err
    }
  },

  generateInvite: async (teamId, recipientUsername) => {
    set({ isLoading: true, error: null })
    try {
      const response = await apiClient.post<{ code: string }>("/api/i/generate", { teamId, recipientUsername })
      set({ isLoading: false })
      return response.code
    } catch (err: any) {
      set({ error: err.message, isLoading: false })
      throw err
    }
  },

  joinTeam: async (inviteCode) => {
    set({ isLoading: true, error: null })
    try {
      await apiClient.post("/api/i/join", { inviteCode })
      useAuthStore.getState().setHasTenants(true)
      // Refresh teams if an active project exists
      if (get().activeProject) await get().fetchTeams(get().activeProject!.id)
      set({ isLoading: false })
    } catch (err: any) {
      set({ error: err.message, isLoading: false })
      throw err
    }
  },

  setActiveTenant: (tenant) => {
    set({ activeTenant: tenant })
    get().fetchWorkspaces(tenant.id)
  },

  setActiveWorkspace: (workspace) => {
    set({ activeWorkspace: workspace })
    get().fetchProjects(workspace.id)
  },

  setActiveProject: (project) => {
    set({ activeProject: project, activeTeam: null })
    get().fetchTeams(project.id)
  },

  setActiveTeam: (team) => {
    set({ activeTeam: team })
  }
}))
