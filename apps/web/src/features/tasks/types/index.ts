export interface Task {
  id: string
  title: string
  description: string | null
  completedAt: string | null
  updatedAt: string
  createdAt: string
}

export interface CreateTaskPayload {
  title: string
  description?: string
}

export interface UpdateTaskPayload {
  title?: string
  description?: string
  completedAt?: string | null
}
