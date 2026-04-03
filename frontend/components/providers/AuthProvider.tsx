"use client"

import { useEffect } from "react"
import { useAuthStore } from "@/lib/auth-store"
import { useDataStore } from "@/lib/data-store"

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { initialize, user } = useAuthStore()
  const fetchTenants = useDataStore((state) => state.fetchTenants)

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
