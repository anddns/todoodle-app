import { PlusIcon } from 'lucide-react'

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
    <ItemGroup className="gap-1">
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
        'group/add-task relative z-0 flex w-full cursor-pointer items-center gap-3 rounded-md px-4 py-2 text-left text-sm text-muted-foreground outline-none transition-colors hover:z-10 hover:text-primary focus-visible:z-10 focus-visible:ring-3 focus-visible:ring-ring/50',
        className,
      )}
    >
      {/* Layered circle (like RadioIndicator): a primary fill that scales in on
          hover, and a plus tick that turns white once the circle fills. */}
      <span className="relative grid size-[18px] shrink-0 place-content-center">
        {/* Background fill: scales in on hover */}
        <span
          aria-hidden
          className="col-start-1 row-start-1 size-[18px] scale-0 rounded-full bg-primary opacity-0 transition-[transform,opacity] duration-200 ease-out motion-reduce:transition-none group-hover/add-task:scale-100 group-hover/add-task:opacity-100"
        />

        {/* Plus tick: primary at rest, white once the circle fills. `relative z-10`
            keeps it above the fill span, which creates its own stacking context
            once its hover transform (scale) kicks in — otherwise the filled circle
            paints over the plus and hides it. */}
        <span
          aria-hidden
          className="relative z-10 col-start-1 row-start-1 grid size-[18px] place-content-center"
        >
          <PlusIcon
            className="size-3.5 text-primary transition-colors duration-200 ease-out motion-reduce:transition-none group-hover/add-task:text-white"
            strokeWidth={3}
          />
        </span>
      </span>
      Add task
    </button>
  )
}
