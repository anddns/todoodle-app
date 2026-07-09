import { createFileRoute } from '@tanstack/react-router'

import { tasksQueryOptions } from '../features/tasks'
import { TaskForm } from '../features/tasks/components/task-form'
import { TaskList } from '../features/tasks/components/task-list'
import { queryClient } from '../lib/query-client'

export const Route = createFileRoute('/')({
  loader: () => {
    return queryClient.ensureQueryData(tasksQueryOptions())
  },
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div className="mx-auto p-6 max-w-2xl">
      <h1 className="mb-6 font-bold text-3xl">Todoodle</h1>
      <TaskForm />
      <TaskList />
    </div>
  )
}
