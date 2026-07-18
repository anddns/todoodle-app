import { createFileRoute } from '@tanstack/react-router'

import { tasksQueryOptions } from '../features/tasks'
import { TaskForm } from '../features/tasks/components/task-form'
import { TaskList } from '../features/tasks/components/task-list'

export const Route = createFileRoute('/')({
  loader: ({ context }) => {
    return context.queryClient.ensureQueryData(tasksQueryOptions())
  },
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div className="w-full max-w-2xl px-6 pb-6">
      <h1 className="mb-6 font-bold text-3xl">Todoodle</h1>
      <TaskForm />
      <TaskList />
    </div>
  )
}
