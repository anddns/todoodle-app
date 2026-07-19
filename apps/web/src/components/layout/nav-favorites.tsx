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
  Trash2Icon,
  UserRoundPlus,
} from 'lucide-react'

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
import { cn } from '@/web/lib/utils'

/**
 * Revealed on header hover (and whenever focus is inside the header, so the
 * control is reachable by keyboard). Kept visible on touch, where there is
 * no hover to reveal it.
 */
const revealOnHover =
  'opacity-0 transition-opacity group-hover/section:opacity-100 group-focus-within/section:opacity-100 max-md:opacity-100'

interface FavoriteItem {
  name: string
}

/**
 * Placeholder data — there is no favorites table, API route, or shared schema yet.
 */
const favorites: FavoriteItem[] = [
  { name: 'Getting Started' },
  { name: 'Work' },
  { name: 'Personal' },
]

export function NavFavorites() {
  const { isMobile } = useSidebar()

  return (
    <Collapsible defaultOpen className="group/collapsible">
      <SidebarGroup className="group-data-[collapsible=icon]:hidden">
        {/*
          `group/section` scopes the header's hover state to this row only —
          without it, hovering a favorite below would light up the header. The
          label itself is inert (no hover/active state, not a button); only the
          chevron reveals on hover, since it's the sole interactive control here.
        */}
        <div className="group/section relative">
          <SidebarGroupLabel className="pr-8 w-full">
            <span className="font-semibold text-sm leading-normal">Favorites</span>
          </SidebarGroupLabel>

          <SidebarGroupAction
            render={<CollapsibleTrigger />}
            className={cn('top-0.75 right-1', revealOnHover)}
            aria-label="Toggle Favorites"
          >
            <ChevronDownIcon
              strokeWidth={2}
              className="group-data-open/collapsible:rotate-180 transition-transform duration-200"
            />
          </SidebarGroupAction>
        </div>

        <CollapsibleContent className="h-(--collapsible-panel-height) overflow-hidden transition-[height] duration-200 ease-out data-ending-style:h-0 data-starting-style:h-0">
          <SidebarMenu>
            {favorites.map(({ name }) => (
              <SidebarMenuItem key={name}>
                <SidebarMenuButton className="items-center gap-2" tooltip={name}>
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
            ))}
          </SidebarMenu>
        </CollapsibleContent>
      </SidebarGroup>
    </Collapsible>
  )
}
