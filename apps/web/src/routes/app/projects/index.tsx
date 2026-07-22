import { createFileRoute } from '@tanstack/react-router'
import { FolderIcon, PlusIcon } from 'lucide-react'

import { EmptyState } from '@/web/components/layout/empty-state'
import { PageContainer } from '@/web/components/layout/page-container'
import { ProjectList, useAddProjectDialog, useProjects } from '@/web/features/projects'

export const Route = createFileRoute('/app/projects/')({
  component: RouteComponent,
})

function RouteComponent() {
  const { openAddProjectDialog } = useAddProjectDialog()
  const { data } = useProjects()

  const projects = data?.projects ?? []

  return (
    <PageContainer title="My Projects">
      {projects.length > 0 ? (
        <ProjectList projects={projects} />
      ) : (
        <EmptyState
          icon={FolderIcon}
          heading="No projects yet"
          description="Group related tasks into projects to keep bigger efforts organized."
          cta={{ label: 'New Project', icon: PlusIcon, onClick: openAddProjectDialog }}
        />
      )}
    </PageContainer>
  )
}
