import {
  CalendarDotsIcon,
  CalendarIcon,
  ChartLineIcon,
  type Icon,
  MagnifyingGlassIcon,
  PlusIcon,
  SquaresFourIcon,
  TrayIcon,
} from '@phosphor-icons/react'

import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/web/components/ui/sidebar'

interface NavItem {
  label: string
  icon: Icon
}

const navItems: NavItem[] = [
  { label: 'Add Task', icon: PlusIcon },
  { label: 'Search', icon: MagnifyingGlassIcon },
  { label: 'Inbox', icon: TrayIcon },
  { label: 'Today', icon: CalendarIcon },
  { label: 'Upcoming', icon: CalendarDotsIcon },
  { label: 'Filters & Labels', icon: SquaresFourIcon },
  { label: 'Reporting', icon: ChartLineIcon },
]

export function NavMain() {
  return (
    <SidebarGroup>
      <SidebarGroupLabel>Menu</SidebarGroupLabel>
      <SidebarMenu>
        {navItems.map(({ label, icon: ItemIcon }) => {
          const isAddTask = label === 'Add Task'

          return (
            <SidebarMenuItem key={label}>
              {/*
                No sub-items exist, so these stay plain buttons — sidebar-07's
                Collapsible/SidebarMenuSub machinery has nothing to nest here.
              */}
              <SidebarMenuButton
                tooltip={label}
                className={isAddTask ? 'font-semibold text-primary' : undefined}
              >
                <ItemIcon weight={isAddTask ? 'bold' : 'regular'} />
                <span>{label}</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          )
        })}
      </SidebarMenu>
    </SidebarGroup>
  )
}
