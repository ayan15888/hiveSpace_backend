"use client"

import { useEffect } from "react"
import { useAuthStore } from "@/store/auth/authStore"
import { useWorkspaceStore } from "@/store/workspace/workspaceStore"

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { initialize, user } = useAuthStore()
  const fetchTenants = useWorkspaceStore((state) => state.fetchTenants)

  useEffect(() => {
    initialize()
  }, [initialize])

  useEffect(() => {
    if (user?.id) {
      fetchTenants(user.id)
    }
  }, [user?.id, fetchTenants])

  return <>{children}</>
}
