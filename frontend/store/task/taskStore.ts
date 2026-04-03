"use client"

import { create } from "zustand"

export type TaskStatus = 'todo' | 'in-progress' | 'done'
export type Priority = 'low' | 'medium' | 'high'

export interface Task {
  id: string
  title: string
  description?: string
  status: TaskStatus
  priority: Priority
  tag: string
  assignee: string
  assigneeColor?: string
  assigneeTextColor?: string
  createdAt: string
  updatedAt: string
}

interface TaskState {
  tasks: Task[]
  isLoading: boolean
  error: string | null
  
  setTasks: (tasks: Task[]) => void
  addTask: (task: Task) => void
  updateTask: (taskId: string, updates: Partial<Task>) => void
  removeTask: (taskId: string) => void
  moveTask: (taskId: string, newStatus: TaskStatus) => void
}

export const useTaskStore = create<TaskState>((set) => ({
  tasks: [],
  isLoading: false,
  error: null,

  setTasks: (tasks) => set({ tasks }),
  
  addTask: (task) => set((state) => ({ 
    tasks: [...state.tasks, task] 
  })),

  updateTask: (taskId, updates) => set((state) => ({
    tasks: state.tasks.map((task) => 
      task.id === taskId ? { ...task, ...updates } : task
    )
  })),

  removeTask: (taskId) => set((state) => ({
    tasks: state.tasks.filter((task) => task.id !== taskId)
  })),

  moveTask: (taskId, newStatus) => set((state) => ({
    tasks: state.tasks.map((task) =>
      task.id === taskId ? { ...task, status: newStatus } : task
    )
  }))
}))
