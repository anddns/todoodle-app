import { createFileRoute, Link } from '@tanstack/react-router'
import { FolderIcon, PlusIcon } from 'lucide-react'

import { EmptyState } from '@/web/components/layout/empty-state'
import { PageContainer } from '@/web/components/layout/page-container'
import { ItemGroup } from '@/web/components/ui/item'
import { useAddProjectDialog, useProjects } from '@/web/features/projects'

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
        <ItemGroup className="gap-1">
          {projects.map((project) => (
            <Link
              key={project.id}
              to="/app/projects/$id"
              params={{ id: project.id }}
              className="flex items-center gap-3 rounded-md px-4 py-2 text-sm hover:bg-accent"
            >
              <span
                aria-hidden
                className="size-3 shrink-0 rounded-full"
                style={{ backgroundColor: project.color }}
              />
              {project.name}
            </Link>
          ))}
        </ItemGroup>
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
