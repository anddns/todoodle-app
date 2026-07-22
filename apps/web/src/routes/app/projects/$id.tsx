import { createFileRoute } from '@tanstack/react-router'
import { HashIcon } from 'lucide-react'

import { EmptyState } from '@/web/components/layout/empty-state'
import { PageContainer } from '@/web/components/layout/page-container'
import { useProject } from '@/web/features/projects'
import { TaskList } from '@/web/features/tasks/components/task-list'
import { useTasks } from '@/web/features/tasks/hooks/use-tasks'

export const Route = createFileRoute('/app/projects/$id')({
  component: RouteComponent,
})

function RouteComponent() {
  const { id } = Route.useParams()
  const { data: project, isLoading, isError } = useProject(id)
  const { data: tasksData } = useTasks({ projectId: id })

  const tasks = tasksData?.tasks ?? []
  const title = project?.name ?? (isLoading ? 'Loading...' : 'Project')

  if (!isLoading && (isError || !project)) {
    return (
      <PageContainer title="Project not found">
        <EmptyState
          icon={HashIcon}
          heading="Project not found"
          description="This project may have been deleted or the link is incorrect."
        />
      </PageContainer>
    )
  }

  return (
    <PageContainer title={title} description={project?.description ?? undefined}>
      <TaskList tasks={tasks} projectId={id} />
    </PageContainer>
  )
}
