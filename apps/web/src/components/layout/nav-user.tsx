import { CaretDownIcon, GearSixIcon, SignOutIcon, UserCircleIcon } from '@phosphor-icons/react'

import { Avatar, AvatarFallback, AvatarImage } from '@/web/components/ui/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/web/components/ui/dropdown-menu'
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
} from '@/web/components/ui/sidebar'
import { Skeleton } from '@/web/components/ui/skeleton'
import { getInitials, useCurrentUser } from '@/web/features/auth'

export function NavUser() {
  const { data: user, isPending } = useCurrentUser()

  return (
    <SidebarMenu>
      <SidebarMenuItem className="flex items-center gap-1">
        {isPending || !user ? (
          <div className="flex flex-1 items-center gap-2 p-2">
            <Skeleton className="size-6 shrink-0 rounded-full" />
            <Skeleton className="h-3 w-24" />
          </div>
        ) : (
          <DropdownMenu>
            <DropdownMenuTrigger render={<SidebarMenuButton className="flex-1" />}>
              <Avatar size="sm">
                {user.avatarUrl && <AvatarImage src={user.avatarUrl} alt={user.name} />}
                <AvatarFallback>{getInitials(user.name)}</AvatarFallback>
              </Avatar>
              <span className="truncate font-semibold">{user.name}</span>
              <CaretDownIcon className="ml-auto opacity-60" />
            </DropdownMenuTrigger>

            <DropdownMenuContent align="start" className="min-w-56">
              <DropdownMenuItem>
                <UserCircleIcon />
                Account
              </DropdownMenuItem>
              <DropdownMenuItem>
                <GearSixIcon />
                Settings
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <SignOutIcon />
                Log out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}

        {/*
          Collapses the sidebar. In offcanvas mode this button goes offscreen
          with it, so the re-expand trigger lives in the page header.
        */}
        {/*
          Button's `icon-sm` variant pins icons via `[&_svg:not([class*='size-'])]:size-3`, whose
          `:not()` outranks a plain `[&_svg]` override — hence `!` to match the nav icon size.
        */}
        <SidebarTrigger className="shrink-0 [&_svg]:size-4.5!" />
      </SidebarMenuItem>
    </SidebarMenu>
  )
}
