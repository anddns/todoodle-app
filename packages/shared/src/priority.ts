import * as z from 'zod'

export const PRIORITY_LEVELS = ['p1', 'p2', 'p3', 'p4'] as const
export const prioritySchema = z.enum(PRIORITY_LEVELS)
export type Priority = z.infer<typeof prioritySchema>

export const PRIORITY_META: Record<Priority, { label: string; color: string }> = {
  p1: { label: 'Urgent', color: '#E53E3E' },
  p2: { label: 'High', color: '#DD6B20' },
  p3: { label: 'Medium', color: '#3182CE' },
  p4: { label: 'Low', color: '#718096' },
}
