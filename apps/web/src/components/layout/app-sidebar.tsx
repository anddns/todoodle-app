import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from '@/web/components/ui/sidebar'

import { BrandHeader } from './brand-header'
import { NavFavorites } from './nav-favorites'
import { NavMain } from './nav-main'
import { NavProjects } from './nav-projects'
import { NavUser } from './nav-user'

export function AppSidebar() {
  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <BrandHeader />
      </SidebarHeader>
      <SidebarContent>
        <NavMain />
        <NavFavorites />
        <NavProjects />
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
