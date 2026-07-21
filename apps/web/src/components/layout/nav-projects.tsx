import { Link, useLocation } from '@tanstack/react-router'
import {
  ChevronDownIcon,
  CircleArrowRightIcon,
  CopyIcon,
  EllipsisIcon,
  HashIcon,
  HeartIcon,
  LinkIcon,
  LucideArrowDownFromLine,
  LucideArrowUpFromLine,
  PencilIcon,
  PlusIcon,
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
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/web/components/ui/collapsible'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/web/components/ui/dropdown-menu'
import {
  SidebarGroup,
  SidebarGroupAction,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '@/web/components/ui/sidebar'
import {
  EditProjectDialog,
  type Project,
  useAddProjectDialog,
  useDeleteProject,
  useProjects,
} from '@/web/features/projects'
import { cn } from '@/web/lib/utils'

/**
 * Revealed on header hover (and whenever something inside the header has
 * *keyboard* focus, so the controls stay reachable by keyboard — `:focus-visible`
 * rather than `:focus-within`, so a mouse click that leaves an element focused
 * doesn't keep the controls stuck visible after the mouse moves away). Kept
 * visible on touch, where there is no hover to reveal them.
 */
const revealOnHover =
  'opacity-0 transition-opacity group-hover/section:opacity-100 group-has-[:focus-visible]/section:opacity-100 max-md:opacity-100'

/**
 * Matches the green tint the header label gets when "My Projects" is the
 * active route — `SidebarGroupAction`'s own default hover/press colors stay
 * neutral (shared with "Favorites", which never gets this tint), so the two
 * buttons here opt in explicitly instead.
 */
const primaryActionTint =
  'hover:bg-sidebar-primary/10 hover:text-sidebar-primary active:bg-sidebar-primary/20'

export function NavProjects() {
  const pathname = useLocation({ select: (location) => location.pathname })
  const isActive = pathname === '/app/projects'
  const { data } = useProjects()
  const { openAddProjectDialog } = useAddProjectDialog()

  const projects = data?.projects ?? []

  return (
    <Collapsible defaultOpen className="group/collapsible">
      <SidebarGroup className="group-data-[collapsible=icon]:hidden">
        {/*
          `group/section` scopes the header's hover state to this row only —
          without it, hovering a project below would light up the header. It
          also means hovering the + or the caret keeps the header highlighted,
          since both live inside the group.
        */}
        <div className="group/section relative">
          <SidebarGroupLabel
            render={<Link to="/app/projects" />}
            isActive={isActive}
            className="not-data-active:group-hover/section:bg-sidebar-accent pr-16 w-full cursor-pointer not-data-active:group-hover/section:text-sidebar-accent-foreground"
          >
            <span className="font-semibold text-sm leading-normal">My Projects</span>
          </SidebarGroupLabel>

          <SidebarGroupAction
            className={cn('top-0.75 right-8.5', revealOnHover, primaryActionTint)}
            aria-label="Add project"
            onClick={openAddProjectDialog}
          >
            <PlusIcon strokeWidth={2} />
          </SidebarGroupAction>

          <SidebarGroupAction
            render={<CollapsibleTrigger />}
            className={cn('top-0.75 right-1', revealOnHover, primaryActionTint)}
            aria-label="Toggle My Projects"
          >
            <ChevronDownIcon
              strokeWidth={2}
              className="group-data-open/collapsible:rotate-180 transition-transform duration-200"
            />
          </SidebarGroupAction>
        </div>

        <CollapsibleContent className="h-(--collapsible-panel-height) overflow-hidden transition-[height] duration-200 ease-out data-ending-style:h-0 data-starting-style:h-0">
          <SidebarMenu>
            {projects.map((project) => (
              <ProjectRow key={project.id} project={project} pathname={pathname} />
            ))}
          </SidebarMenu>
        </CollapsibleContent>
      </SidebarGroup>
    </Collapsible>
  )
}

function ProjectRow({ project, pathname }: { project: Project; pathname: string }) {
  const { isMobile } = useSidebar()
  const { mutate: deleteProject, isPending: isDeleting } = useDeleteProject()
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)

  const projectPath = `/app/projects/${project.id}`

  const handleDelete = () => {
    deleteProject(project.id, {
      onSuccess: () => setIsDeleteDialogOpen(false),
    })
  }

  return (
    <SidebarMenuItem>
      <SidebarMenuButton
        className="items-center gap-2"
        tooltip={project.name}
        isActive={pathname === projectPath}
        render={<Link to="/app/projects/$id" params={{ id: project.id }} />}
      >
        <div className="place-items-center grid size-6">
          <HashIcon
            strokeWidth={1}
            className="col-start-1 row-start-1 size-4"
            style={{ color: project.color }}
          />
        </div>

        <span className="font-normal text-sm leading-4">{project.name}</span>
      </SidebarMenuButton>

      <DropdownMenu>
        <DropdownMenuTrigger render={<SidebarMenuAction showOnHover />}>
          <EllipsisIcon strokeWidth={2.5} />
          <span className="sr-only">More</span>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          className="w-fit"
          side={isMobile ? 'bottom' : 'right'}
          align={isMobile ? 'end' : 'start'}
        >
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
    </SidebarMenuItem>
  )
}
