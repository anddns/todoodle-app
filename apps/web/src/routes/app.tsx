import { createFileRoute, Outlet, useLocation } from '@tanstack/react-router'

import { AppSidebar } from '@/web/components/layout/app-sidebar'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/web/components/ui/breadcrumb'
import { Separator } from '@/web/components/ui/separator'
import { SidebarInset, SidebarProvider, SidebarTrigger } from '@/web/components/ui/sidebar'

const pageTitles: Record<string, string> = {
  '/app/inbox': 'Inbox',
  '/app/today': 'Today',
  '/app/upcoming': 'Upcoming',
  '/app/filters-labels': 'Filters & Labels',
  '/app/reporting': 'Reporting',
  '/app/projects': 'My Projects',
}

export const Route = createFileRoute('/app')({
  component: () => {
    const pathname = useLocation({ select: (location) => location.pathname })
    const currentPageLabel = pageTitles[pathname] ?? 'Inbox'

    return (
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
          <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
            <div className="flex items-center gap-2 px-4">
              <SidebarTrigger className="-ml-1" />
              <Separator
                orientation="vertical"
                className="mr-2 data-[orientation=vertical]:h-4 data-[orientation=vertical]:self-center"
              />
              <Breadcrumb>
                <BreadcrumbList>
                  <BreadcrumbItem className="hidden md:block">
                    <BreadcrumbLink href="#">Todoodle</BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator className="hidden md:block" />
                  <BreadcrumbItem>
                    <BreadcrumbPage>{currentPageLabel}</BreadcrumbPage>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
            </div>
          </header>
          <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
            <Outlet />
          </div>
        </SidebarInset>
      </SidebarProvider>
    )
  },
})
