import {
  CalendarDaysIcon,
  CalendarIcon,
  ChartLineIcon,
  InboxIcon,
  LayoutGridIcon,
  type LucideIcon,
  PieChart,
  PlusIcon,
  SearchIcon,
} from 'lucide-react'
import { Link, useLocation } from '@tanstack/react-router'

import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/web/components/ui/sidebar'

type NavPath =
  | '/app/inbox'
  | '/app/today'
  | '/app/upcoming'
  | '/app/filters-labels'
  | '/app/reporting'

interface NavItem {
  label: string
  icon: LucideIcon
  path?: NavPath
}

const navItems: NavItem[] = [
  { label: 'Add Task', icon: PlusIcon },
  { label: 'Search', icon: SearchIcon },
  { label: 'Inbox', icon: InboxIcon, path: '/app/inbox' },
  { label: 'Today', icon: CalendarIcon, path: '/app/today' },
  { label: 'Upcoming', icon: CalendarDaysIcon, path: '/app/upcoming' },
  { label: 'Filters & Labels', icon: LayoutGridIcon, path: '/app/filters-labels' },
  { label: 'Reporting', icon: PieChart, path: '/app/reporting' },
]

export function NavMain() {
  const pathname = useLocation({ select: (location) => location.pathname })

  return (
    <SidebarGroup>
      <SidebarMenu>
        {navItems.map(({ label, icon: ItemIcon, path }) => {
          const isAddTask = label === 'Add Task'

          if (isAddTask) {
            return (
              <SidebarMenuItem key={label}>
                <SidebarMenuButton
                  tooltip={label}
                  className="inline-flex items-center font-semibold text-primary hover:text-primary active:text-primary active:translate-y-px cursor-pointer group-data-[collapsible=icon]:p-1!"
                >
                  <div className="place-items-center grid shrink-0 bg-primary rounded-full size-6">
                    <ItemIcon
                      strokeWidth={2.5}
                      className="col-start-1 row-start-1 size-4 text-white"
                    />
                  </div>

                  <span className="group-data-[collapsible=icon]:hidden">{label}</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            )
          }

          return (
            <SidebarMenuItem key={label}>
              <SidebarMenuButton
                tooltip={label}
                isActive={path !== undefined && pathname === path}
                render={path ? <Link to={path} /> : undefined}
                className="cursor-pointer group-data-[collapsible=icon]:p-1!"
              >
                <div className="place-items-center grid shrink-0 size-6">
                  <ItemIcon strokeWidth={1} className="col-start-1 row-start-1 size-4" />
                </div>

                <span className="group-data-[collapsible=icon]:hidden">{label}</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          )
        })}
      </SidebarMenu>
    </SidebarGroup>
  )
}
