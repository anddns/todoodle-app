import { Link } from '@tanstack/react-router'
import {
  CircleArrowRightIcon,
  CopyIcon,
  EllipsisIcon,
  HashIcon,
  HeartIcon,
  LinkIcon,
  LucideArrowDownFromLine,
  LucideArrowUpFromLine,
  PencilIcon,
  Trash2Icon,
  UserRoundPlus,
} from 'lucide-react'
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
} from '@/web/components/ui/alert-dialog'
import { Button } from '@/web/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/web/components/ui/dropdown-menu'
import { Item, ItemActions, ItemContent, ItemMedia, ItemTitle } from '@/web/components/ui/item'
import { useDeleteProject } from '../hooks/use-delete-project'
import type { Project } from '../types'
import { EditProjectDialog } from './edit-project-dialog'

interface ProjectItemProps {
  project: Project
}

export function ProjectItem({ project }: ProjectItemProps) {
  const { mutate: deleteProject, isPending: isDeleting } = useDeleteProject()
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)

  const handleDelete = () => {
    deleteProject(project.id, {
      onSuccess: () => setIsDeleteDialogOpen(false),
    })
  }

  return (
    <>
      <Item
        variant="default"
        render={<Link to="/app/projects/$id" params={{ id: project.id }} />}
        className="group/project-item h-[52px] cursor-pointer [a]:hover:bg-transparent"
      >
        <ItemMedia>
          <div className="place-items-center grid size-6">
            <HashIcon
              strokeWidth={1}
              className="col-start-1 row-start-1 size-4"
              style={{ color: project.color }}
            />
          </div>
        </ItemMedia>

        <ItemContent>
          <ItemTitle>{project.name}</ItemTitle>
        </ItemContent>

        <ItemActions
          onClick={(event) => {
            event.preventDefault()
            event.stopPropagation()
          }}
          className="opacity-0 group-hover/project-item:opacity-100"
        >
          <DropdownMenu>
            <DropdownMenuTrigger
              render={
                <Button type="button" variant="ghost" size="icon-sm" aria-label="More" />
              }
            >
              <EllipsisIcon strokeWidth={2.5} />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-fit" side="bottom" align="end">
              {/*
                The items below (add above/below, favorites, move, duplicate,
                share, copy link) are intentionally left without handlers — each
                implies a feature that doesn't exist yet (ordering/position,
                favorites, hierarchy, or multi-user sharing). They're kept visible
                as a known, deliberate gap rather than removed, so the affordance
                isn't a surprise once those features land.
              */}
              <DropdownMenuItem disabled>
                <LucideArrowUpFromLine />
                <span>Add project above</span>
              </DropdownMenuItem>
              <DropdownMenuItem disabled>
                <LucideArrowDownFromLine />
                <span>Add project below</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => setIsEditDialogOpen(true)}>
                <PencilIcon />
                <span>Edit</span>
              </DropdownMenuItem>
              <DropdownMenuItem disabled>
                <HeartIcon />
                <span>Add to favorites</span>
              </DropdownMenuItem>
              <DropdownMenuItem disabled>
                <CircleArrowRightIcon />
                <span>Move</span>
              </DropdownMenuItem>
              <DropdownMenuItem disabled>
                <CopyIcon />
                <span>Duplicate</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem disabled>
                <UserRoundPlus />
                <span>Share</span>
              </DropdownMenuItem>
              <DropdownMenuItem disabled>
                <LinkIcon />
                <span>Copy link to project</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem variant="destructive" onClick={() => setIsDeleteDialogOpen(true)}>
                <Trash2Icon />
                <span>Delete</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </ItemActions>
      </Item>

      <EditProjectDialog
        project={project}
        open={isEditDialogOpen}
        onOpenChange={setIsEditDialogOpen}
      />

      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete project?</AlertDialogTitle>
            <AlertDialogDescription>
              “{project.name}” will be deleted. Its tasks will move to Inbox, not be deleted.
            </AlertDialogDescription>
          </AlertDialogHeader>

          <AlertDialogFooter>
            <AlertDialogCancel disabled={isDeleting}>Cancel</AlertDialogCancel>
            <AlertDialogAction variant="destructive" disabled={isDeleting} onClick={handleDelete}>
              {isDeleting ? 'Deleting...' : 'Delete'}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}
