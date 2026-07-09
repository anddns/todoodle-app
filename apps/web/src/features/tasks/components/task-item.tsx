import { TrashIcon } from '@phosphor-icons/react'

import { Button } from '@/web/components/ui/button'
import { Card, CardContent } from '@/web/components/ui/card'
import { Checkbox } from '@/web/components/ui/checkbox'
import { useDeleteTask } from '../hooks/use-delete-task'
import { useToggleTask } from '../hooks/use-toggle-task'
import type { Task } from '../types'

interface TaskItemProps {
  task: Task
}

export function TaskItem({ task }: TaskItemProps) {
  const {
    mutate: toggleTask,
    isPending: isToggling,
    isError: toggleError,
    error: toggleErrorObj,
  } = useToggleTask()
  const {
    mutate: deleteTask,
    isPending: isDeleting,
    isError: deleteError,
    error: deleteErrorObj,
  } = useDeleteTask()

  const isCompleted = !!task.completedAt

  const handleToggle = (task: Task) => {
    toggleTask(task)
  }

  const handleDelete = (taskId: string) => {
    deleteTask(taskId)
  }

  return (
    <li>
      <Card>
        <CardContent className="flex items-center gap-3 p-4">
          <Checkbox
            checked={isCompleted}
            onCheckedChange={() => handleToggle(task)}
            disabled={isToggling}
            aria-label={`Mark "${task.title}" as ${isCompleted ? 'incomplete' : 'completed'}`}
          />
          <span
            className={`flex-1 transition-all ${isCompleted ? 'line-through text-muted-foreground' : ''}`}
          >
            {task.title}
          </span>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => handleDelete(task.id)}
            disabled={isDeleting}
          >
            <TrashIcon className="w-4 h-4" />
          </Button>

          {deleteError && (
            <p className="mt-1 text-destructive text-xs">
              Failed to delete: {deleteErrorObj?.message}
            </p>
          )}
          {toggleError && (
            <p className="mt-1 text-destructive text-xs">
              Failed to update: {toggleErrorObj?.message}
            </p>
          )}
        </CardContent>
      </Card>
    </li>
  )
}
