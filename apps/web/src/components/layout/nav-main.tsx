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
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
} from '@/web/components/ui/sidebar'

interface NavItem {
  label: string
  icon: Icon
}

/**
 * Actions rather than destinations, so they sit above the navigation list.
 */
const actionItems: NavItem[] = [
  { label: 'Add Task', icon: PlusIcon },
  { label: 'Search', icon: MagnifyingGlassIcon },
]

const navItems: NavItem[] = [
  { label: 'Inbox', icon: TrayIcon },
  { label: 'Today', icon: CalendarIcon },
  { label: 'Upcoming', icon: CalendarDotsIcon },
  { label: 'Filters & Labels', icon: SquaresFourIcon },
  { label: 'Reporting', icon: ChartLineIcon },
]

export function NavMain() {
  return (
    <SidebarGroup>
      <SidebarGroupContent>
        <SidebarMenu>
          {actionItems.map(({ label, icon: ItemIcon }) => {
            const isAddTask = label === 'Add Task'

            return (
              <SidebarMenuItem key={label}>
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

        <SidebarSeparator className="my-2" />

        <SidebarMenu>
          {navItems.map(({ label, icon: ItemIcon }) => (
            <SidebarMenuItem key={label}>
              <SidebarMenuButton tooltip={label}>
                <ItemIcon />
                <span>{label}</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  )
}
