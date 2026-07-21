import { PlusCircleIcon, PlusIcon } from 'lucide-react'

import { ItemGroup } from '@/web/components/ui/item'
import { cn } from '@/web/lib/utils'
import type { Task } from '../types'
import { useAddTaskDialog } from './add-task-dialog-provider'
import { TaskItem } from './task-item'

interface TaskListProps {
  tasks: Task[]
}

export function TaskList({ tasks }: TaskListProps) {
  return (
    <ItemGroup>
      {tasks.map((task) => (
        <TaskItem key={task.id} task={task} />
      ))}

      <AddTaskRow />
    </ItemGroup>
  )
}

function AddTaskRow({ className }: { className?: string }) {
  const { openAddTaskDialog } = useAddTaskDialog()

  return (
    <button
      type="button"
      onClick={openAddTaskDialog}
      className={cn(
        'group/add-task flex w-full items-center gap-3 rounded-md px-4 py-2 text-left text-sm text-muted-foreground outline-none transition-colors hover:text-primary focus-visible:ring-3 focus-visible:ring-ring/50',
        className,
      )}
    >
      {/* Icon swaps from a plain plus (rest) to a filled circle (hover) */}
      <span className="relative grid size-[18px] shrink-0 place-content-center text-primary">
        <PlusIcon
          className="col-start-1 row-start-1 size-[18px] transition-opacity group-hover/add-task:opacity-0"
          strokeWidth={2}
        />
        <PlusCircleIcon
          className="col-start-1 row-start-1 size-[18px] fill-primary text-background opacity-0 transition-opacity group-hover/add-task:opacity-100"
          strokeWidth={2}
        />
      </span>
      Add task
    </button>
  )
}
