import { DotsThreeOutlineIcon, FolderIcon, ShareFatIcon, TrashIcon } from '@phosphor-icons/react'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/web/components/ui/dropdown-menu'
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '@/web/components/ui/sidebar'
import { cn } from '@/web/lib/utils'

interface Project {
  name: string
  color: string
}

/**
 * Placeholder data — there is no `projects` table, API route, or shared schema yet.
 */
const projects: Project[] = [
  { name: 'Getting Started', color: 'bg-sky-500' },
  { name: 'Work', color: 'bg-amber-500' },
  { name: 'Personal', color: 'bg-violet-500' },
]

export function NavProjects() {
  const { isMobile } = useSidebar()

  return (
    <SidebarGroup className="group-data-[collapsible=icon]:hidden">
      <SidebarGroupLabel>My Projects</SidebarGroupLabel>
      <SidebarMenu>
        {projects.map(({ name, color }) => (
          <SidebarMenuItem key={name}>
            <SidebarMenuButton tooltip={name}>
              <span className={cn('size-2 shrink-0 rounded-full', color)} />
              <span>{name}</span>
            </SidebarMenuButton>

            <DropdownMenu>
              <DropdownMenuTrigger
                render={<SidebarMenuAction showOnHover className="aria-expanded:bg-muted" />}
              >
                <DotsThreeOutlineIcon />
                <span className="sr-only">More</span>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="w-fit"
                side={isMobile ? 'bottom' : 'right'}
                align={isMobile ? 'end' : 'start'}
              >
                <DropdownMenuItem>
                  <FolderIcon />
                  <span>View Project</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <ShareFatIcon />
                  <span>Share Project</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem variant="destructive">
                  <TrashIcon />
                  <span>Delete Project</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        ))}

        <SidebarMenuItem>
          <SidebarMenuButton className="text-sidebar-foreground/70">
            <DotsThreeOutlineIcon className="text-sidebar-foreground/70" />
            <span>More</span>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarGroup>
  )
}
