"use client"

import { create } from "zustand"
import { apiClient } from "./api-client"

export type User = {
  id: string
  email: string
  username: string
  role: string
}

type AuthResponse = {
  token: string
  id: string
  email: string
  username: string
  role: string
}

interface AuthState {
  user: User | null
  token: string | null
  isAuthenticated: boolean
  isLoading: boolean
  error: string | null

  login: (credentials: { email: string; password: string }) => Promise<void>
  register: (data: { email: string; username: string; password: string }) => Promise<void>
  logout: () => void
  fetchProfile: () => Promise<void>
  initialize: () => void
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  token: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,

  initialize: () => {
    const token = localStorage.getItem("hs-token")
    if (token) {
      set({ token, isAuthenticated: true })
      // Auto fetch profile if token exists
      useAuthStore.getState().fetchProfile()
    }
  },

  login: async (credentials) => {
    set({ isLoading: true, error: null })
    try {
      const response = await apiClient.post<AuthResponse>("/api/auth/login", credentials)
      const { token, ...user } = response
      
      localStorage.setItem("hs-token", token)
      set({ 
        user, 
        token, 
        isAuthenticated: true, 
        isLoading: false 
      })
    } catch (err: any) {
      set({ error: err.message, isLoading: false })
      throw err
    }
  },

  register: async (data) => {
    set({ isLoading: true, error: null })
    try {
      const response = await apiClient.post<AuthResponse>("/api/auth/register", data)
      const { token, ...user } = response
      
      localStorage.setItem("hs-token", token)
      set({ 
        user, 
        token, 
        isAuthenticated: true, 
        isLoading: false 
      })
    } catch (err: any) {
      set({ error: err.message, isLoading: false })
      throw err
    }
  },

  logout: () => {
    localStorage.removeItem("hs-token")
    set({ 
      user: null, 
      token: null, 
      isAuthenticated: false, 
      error: null 
    })
  },

  fetchProfile: async () => {
    set({ isLoading: true })
    try {
      const user = await apiClient.get<User>("/api/profile")
      set({ user, isLoading: false })
    } catch (err: any) {
      // If profile fetch fails (e.g. invalid token), logout
      localStorage.removeItem("hs-token")
      set({ 
        user: null, 
        token: null, 
        isAuthenticated: false, 
        isLoading: false 
      })
    }
  }
}))
