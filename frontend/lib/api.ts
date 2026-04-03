"use client"

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080"

type RequestOptions = RequestInit & {
  params?: Record<string, string>
}

class ApiClient {
  private async request<T>(endpoint: string, options: RequestOptions = {}): Promise<T> {
    const token = typeof window !== 'undefined' ? localStorage.getItem('hs-token') : null
    
    const url = new URL(`${BASE_URL}${endpoint}`)
    if (options.params) {
      Object.keys(options.params).forEach(key => 
        url.searchParams.append(key, options.params![key])
      )
    }

    const headers = new Headers(options.headers)
    headers.set('Content-Type', 'application/json')
    if (token) {
      headers.set('Authorization', `Bearer ${token}`)
    }

    const response = await fetch(url.toString(), {
      ...options,
      headers
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      throw new Error(errorData.message || `Request failed with status ${response.status}`)
    }

    if (response.status === 204) return {} as T

    return response.json()
  }

  get<T>(endpoint: string, options?: RequestOptions) {
    return this.request<T>(endpoint, { ...options, method: 'GET' })
  }

  post<T>(endpoint: string, body?: any, options?: RequestOptions) {
    return this.request<T>(endpoint, { 
      ...options, 
      method: 'POST', 
      body: JSON.stringify(body) 
    })
  }

  put<T>(endpoint: string, body?: any, options?: RequestOptions) {
    return this.request<T>(endpoint, { 
      ...options, 
      method: 'PUT', 
      body: JSON.stringify(body) 
    })
  }

  delete<T>(endpoint: string, options?: RequestOptions) {
    return this.request<T>(endpoint, { ...options, method: 'DELETE' })
  }
  
  async checkHealth(): Promise<boolean> {
    try {
      await fetch(`${BASE_URL}/api/health`)
      return true
    } catch {
      return false
    }
  }
}

export const apiClient = new ApiClient()
