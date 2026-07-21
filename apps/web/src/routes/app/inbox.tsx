import { createFileRoute } from '@tanstack/react-router'
import { InboxIcon, PlusIcon } from 'lucide-react'

import { EmptyState } from '@/web/components/layout/empty-state'
import { PageContainer } from '@/web/components/layout/page-container'
import { useAddTaskDialog } from '@/web/features/tasks/components/add-task-dialog-provider'
import { TaskList } from '@/web/features/tasks/components/task-list'
import { useTasks } from '@/web/features/tasks/hooks/use-tasks'

export const Route = createFileRoute('/app/inbox')({
  component: RouteComponent,
})

function RouteComponent() {
  const { openAddTaskDialog } = useAddTaskDialog()
  const { data } = useTasks()

  const tasks = data?.tasks ?? []

  return (
    <PageContainer title="Inbox">
      {tasks.length > 0 ? (
        <TaskList tasks={tasks} />
      ) : (
        <EmptyState
          icon={InboxIcon}
          heading="Capture now, plan later"
          description="Inbox is your go-to spot for quick task entry. Clear your mind now, organize when you're ready."
          cta={{ label: 'Add Task', icon: PlusIcon, onClick: openAddTaskDialog }}
        />
      )}
    </PageContainer>
  )
}
