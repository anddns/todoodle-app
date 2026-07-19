import { SquareCheckBigIcon } from 'lucide-react'

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
          <div className="flex justify-center items-center bg-primary rounded-lg size-8 aspect-square text-sidebar-primary-foreground">
            <SquareCheckBigIcon className="size-4" />
          </div>
          <div className="flex-1 grid text-sm text-left leading-tight">
            <span className="font-medium truncate">Todoodle</span>
            <span className="text-xs truncate">Task Manager</span>
          </div>
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}
