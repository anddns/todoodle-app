import { CheckSquareIcon } from '@phosphor-icons/react'

import { SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/web/components/ui/sidebar'

/**
 * Occupies sidebar-07's TeamSwitcher slot. Todoodle has no teams or workspaces,
 * so this is the same shape without a dropdown — there is nothing to switch.
 */
export function BrandHeader() {
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <SidebarMenuButton size="lg">
          <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
            <CheckSquareIcon className="size-4" />
          </div>
          <div className="grid flex-1 text-left text-sm leading-tight">
            <span className="truncate font-medium">Todoodle</span>
            <span className="truncate text-xs">Task manager</span>
          </div>
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}
