export interface ProjectItem {
  name: string
  color: string
}

/**
 * Placeholder data — there is no `projects` table, API route, or shared schema yet.
 * Shared between the sidebar (nav-projects.tsx) and the per-project route
 * (routes/app/projects/$slug.tsx), so both resolve the same name -> slug mapping.
 */
export const projects: ProjectItem[] = [
  { name: 'Getting Started', color: 'bg-sky-500' },
  { name: 'Work', color: 'bg-amber-500' },
  { name: 'Personal', color: 'bg-violet-500' },
]
