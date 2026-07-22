import { PlusIcon } from 'lucide-react'

import { ItemGroup } from '@/web/components/ui/item'
import { cn } from '@/web/lib/utils'
import type { Project } from '../types'
import { useAddProjectDialog } from './add-project-dialog-provider'
import { ProjectItem } from './project-item'

interface ProjectListProps {
  projects: Project[]
}

export function ProjectList({ projects }: ProjectListProps) {
  return (
    <ItemGroup className="-mx-4 gap-1">
      {projects.map((project) => (
        <ProjectItem key={project.id} project={project} />
      ))}

      <AddProjectRow />
    </ItemGroup>
  )
}

function AddProjectRow({ className }: { className?: string }) {
  const { openAddProjectDialog } = useAddProjectDialog()

  return (
    <button
      type="button"
      onClick={openAddProjectDialog}
      className={cn(
        'group/add-project relative z-0 flex w-full cursor-pointer items-center gap-3.5 rounded-md px-4 py-2 text-left text-sm text-muted-foreground outline-none transition-colors hover:z-10 hover:text-primary focus-visible:z-10 focus-visible:ring-3 focus-visible:ring-ring/50',
        className,
      )}
    >
      <span className="relative grid size-6 shrink-0 place-content-center">
        <span
          aria-hidden
          className="col-start-1 row-start-1 size-[18px] scale-0 rounded-full bg-primary opacity-0 transition-[transform,opacity] duration-200 ease-out motion-reduce:transition-none group-hover/add-project:scale-100 group-hover/add-project:opacity-100"
        />

        <span
          aria-hidden
          className="relative z-10 col-start-1 row-start-1 grid size-[18px] place-content-center"
        >
          <PlusIcon
            className="size-3.5 text-primary transition-colors duration-200 ease-out motion-reduce:transition-none group-hover/add-project:text-white"
            strokeWidth={3}
          />
        </span>
      </span>
      Add project
    </button>
  )
}
