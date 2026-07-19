import {
  BetweenHorizontalEndIcon,
  BetweenHorizontalStartIcon,
  ChevronDownIcon,
  CircleArrowRightIcon,
  CopyIcon,
  EllipsisIcon,
  FolderIcon,
  HashIcon,
  HeartIcon,
  LinkIcon,
  LucideArrowDownFromLine,
  LucideArrowUpFromLine,
  PanelBottomClose,
  PanelTopClose,
  PencilIcon,
  PlusIcon,
  Share2Icon,
  Trash2Icon,
  UserRoundPlus,
} from 'lucide-react'
import { Link, useLocation } from '@tanstack/react-router'

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
import { cn, slugify } from '@/web/lib/utils'

import { projects } from './projects-data'

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
const primaryActionTint = 'hover:bg-sidebar-primary/10 hover:text-sidebar-primary active:bg-sidebar-primary/20'

export function NavProjects() {
  const { isMobile } = useSidebar()
  const pathname = useLocation({ select: (location) => location.pathname })
  const isActive = pathname === '/app/projects'

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
            {projects.map(({ name, color }) => {
              const slug = slugify(name)
              const projectPath = `/app/projects/${slug}`

              return (
                <SidebarMenuItem key={name}>
                  <SidebarMenuButton
                    className="items-center gap-2"
                    tooltip={name}
                    isActive={pathname === projectPath}
                    render={<Link to="/app/projects/$slug" params={{ slug }} />}
                  >
                    <div className="place-items-center grid size-6">
                      <HashIcon strokeWidth={1} className="col-start-1 row-start-1 size-4" />
                    </div>

                    <span className="font-normal text-sm leading-4">{name}</span>
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
                      <DropdownMenuItem>
                        <LucideArrowUpFromLine />
                        <span>Add project above</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <LucideArrowDownFromLine />
                        <span>Add project below</span>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>
                        <PencilIcon />
                        <span>Edit</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <HeartIcon />
                        <span>Add to favorites</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <CircleArrowRightIcon />
                        <span>Move</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <CopyIcon />
                        <span>Duplicate</span>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>
                        <UserRoundPlus />
                        <span>Share</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <LinkIcon />
                        <span>Copy link to project</span>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem variant="destructive">
                        <Trash2Icon />
                        <span>Delete</span>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </SidebarMenuItem>
              )
            })}
          </SidebarMenu>
        </CollapsibleContent>
      </SidebarGroup>
    </Collapsible>
  )
}
