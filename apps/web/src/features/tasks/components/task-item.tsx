import { PRIORITY_LEVELS, PRIORITY_META } from '@todoodle-app/shared'
import { CalendarIcon, PencilIcon, Trash2Icon } from 'lucide-react'
import { useState } from 'react'

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/web/components/ui/alert-dialog'
import { Button } from '@/web/components/ui/button'
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
} from '@/web/components/ui/item'
import { RadioIndicator } from '@/web/components/ui/radio-indicator'
import { cn } from '@/web/lib/utils'
import { useDeleteTask } from '../hooks/use-delete-task'
import { useToggleTask } from '../hooks/use-toggle-task'
import type { Task } from '../types'
import { EditTaskDialog } from './edit-task-dialog'

function formatDueAt(dueAt: string, isAllDay: boolean) {
  const date = new Date(dueAt)
  const datePart = date.toLocaleDateString(undefined, { month: 'short', day: 'numeric' })
  if (isAllDay) return datePart

  const timePart = date.toLocaleTimeString(undefined, { hour: 'numeric', minute: '2-digit' })
  return `${datePart}, ${timePart}`
}

const LOWEST_PRIORITY = PRIORITY_LEVELS[PRIORITY_LEVELS.length - 1]

interface TaskItemProps {
  task: Task
}

export function TaskItem({ task }: TaskItemProps) {
  const { mutate: toggleTask, isPending: isToggling } = useToggleTask()
  const { mutate: deleteTask, isPending: isDeleting } = useDeleteTask()
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)

  const isCompleted = !!task.completedAt
  const priorityMeta = task.priority ? PRIORITY_META[task.priority] : undefined
  const hasElevatedPriority = !!task.priority && task.priority !== LOWEST_PRIORITY

  const handleDelete = () => {
    deleteTask(task.id, {
      onSuccess: () => setIsDeleteDialogOpen(false),
    })
  }

  return (
    <>
      <Item
        variant="default"
        role="button"
        tabIndex={0}
        onClick={() => setIsEditDialogOpen(true)}
        onKeyDown={(event) => {
          if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault()
            setIsEditDialogOpen(true)
          }
        }}
        className={cn(
          'group/task-item cursor-pointer focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50',
          isDeleting && 'opacity-50',
        )}
      >
        {/* Interactive controls stop propagation so they don't also open the edit
          dialog that the surrounding row click triggers. */}
        <ItemMedia onClick={(event) => event.stopPropagation()}>
          <RadioIndicator
            checked={isCompleted}
            disabled={isToggling}
            onCheckedChange={() => toggleTask(task)}
            color={priorityMeta?.color}
            emphasized={hasElevatedPriority}
            aria-label={isCompleted ? 'Mark task as not completed' : 'Mark task as completed'}
          />
        </ItemMedia>

        <ItemContent>
          <ItemTitle className={isCompleted ? 'text-muted-foreground line-through' : undefined}>
            {task.title}
          </ItemTitle>

          {task.description && <ItemDescription>{task.description}</ItemDescription>}

          {task.dueAt && (
            <div className="flex items-center gap-3 text-muted-foreground text-xs">
              <span className="flex items-center gap-1">
                <CalendarIcon className="size-3.5" />
                {formatDueAt(task.dueAt, !!task.isAllDay)}
              </span>
            </div>
          )}
        </ItemContent>

        <ItemActions
          onClick={(event) => event.stopPropagation()}
          className="opacity-0 transition-opacity group-hover/task-item:opacity-100"
        >
          <Button
            type="button"
            variant="ghost"
            size="icon-sm"
            aria-label="Edit task"
            onClick={() => setIsEditDialogOpen(true)}
          >
            <PencilIcon />
          </Button>

          <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
            <AlertDialogTrigger
              render={
                <Button
                  type="button"
                  variant="ghost"
                  size="icon-sm"
                  disabled={isDeleting}
                  aria-label="Delete task"
                />
              }
            >
              <Trash2Icon />
            </AlertDialogTrigger>

            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Delete task?</AlertDialogTitle>
                <AlertDialogDescription>
                  “{task.title}” will be permanently deleted. This action cannot be undone.
                </AlertDialogDescription>
              </AlertDialogHeader>

              <AlertDialogFooter>
                <AlertDialogCancel disabled={isDeleting}>Cancel</AlertDialogCancel>
                <AlertDialogAction
                  variant="destructive"
                  disabled={isDeleting}
                  onClick={handleDelete}
                >
                  {isDeleting ? 'Deleting...' : 'Delete'}
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </ItemActions>
      </Item>

      <EditTaskDialog task={task} open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen} />
    </>
  )
}
