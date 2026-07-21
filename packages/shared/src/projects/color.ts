import * as z from 'zod'

export const PROJECT_COLORS = [
  '#DC4C3E',
  '#EB8909',
  '#F2B90D',
  '#59A800',
  '#159C6C',
  '#246FE0',
  '#8B3DFF',
  '#E32DA6',
  '#666666',
] as const
export const projectColorSchema = z.enum(PROJECT_COLORS)
export type ProjectColor = z.infer<typeof projectColorSchema>

export const PROJECT_COLOR_META: Record<ProjectColor, { label: string }> = {
  '#DC4C3E': { label: 'Red' },
  '#EB8909': { label: 'Orange' },
  '#F2B90D': { label: 'Yellow' },
  '#59A800': { label: 'Green' },
  '#159C6C': { label: 'Teal' },
  '#246FE0': { label: 'Blue' },
  '#8B3DFF': { label: 'Purple' },
  '#E32DA6': { label: 'Pink' },
  '#666666': { label: 'Gray' },
}

export const DEFAULT_PROJECT_COLOR: ProjectColor = '#246FE0'
