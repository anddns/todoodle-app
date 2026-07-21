import * as z from 'zod'

export const PRIORITY_LEVELS = ['p1', 'p2', 'p3', 'p4'] as const
export const prioritySchema = z.enum(PRIORITY_LEVELS)
export type Priority = z.infer<typeof prioritySchema>

export const PRIORITY_META: Record<Priority, { label: string; color: string }> = {
  p1: { label: 'Urgent', color: '#DC4C3E' },
  p2: { label: 'High', color: '#EB8909' },
  p3: { label: 'Medium', color: '#246FE0' },
  p4: { label: 'Low', color: '#666666' },
}
