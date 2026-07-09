import { useTasks } from '../hooks/use-tasks'
import { TaskItem } from './task-item'

export function TaskList() {
  const { data: tasks, isPending, isError, error } = useTasks()

  if (isPending) {
    return <p className="text-muted-foreground">Loading tasks...</p>
  }

  if (isError) {
    return <p className="text-destructive">Failed to load tasks: ${error.message}</p>
  }

  if (!tasks || tasks.data.length === 0) {
    return <p className="text-muted-foreground">No tasks found.</p>
  }

  return (
    <ul className="space-y-3">
      {tasks.data.map((task) => (
        <TaskItem key={task.id} task={task} />
      ))}
    </ul>
  )
}
