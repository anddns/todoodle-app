import { createFileRoute, Link, Outlet, useLocation } from '@tanstack/react-router'

import { AppSidebar } from '@/web/components/layout/app-sidebar'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/web/components/ui/breadcrumb'
import { projects } from '@/web/components/layout/projects-data'
import { Separator } from '@/web/components/ui/separator'
import { SidebarInset, SidebarProvider, SidebarTrigger } from '@/web/components/ui/sidebar'
import { AddTaskDialogProvider } from '@/web/features/tasks/components/add-task-dialog-provider'
import { slugify } from '@/web/lib/utils'

const pageTitles: Record<string, string> = {
  '/app/inbox': 'Inbox',
  '/app/today': 'Today',
  '/app/upcoming': 'Upcoming',
  '/app/filters-labels': 'Filters & Labels',
  '/app/reporting': 'Reporting',
  '/app/projects': 'My Projects',
}

function resolveBreadcrumb(pathname: string): { label: string; showProjectsParent: boolean } {
  const projectSlugPrefix = '/app/projects/'

  if (pathname.startsWith(projectSlugPrefix)) {
    const slug = pathname.slice(projectSlugPrefix.length)
    const project = projects.find((candidate) => slugify(candidate.name) === slug)
    return { label: project?.name ?? 'Project', showProjectsParent: true }
  }

  return { label: pageTitles[pathname] ?? 'Inbox', showProjectsParent: false }
}

export const Route = createFileRoute('/app')({
  component: () => {
    const pathname = useLocation({ select: (location) => location.pathname })
    const { label: currentPageLabel, showProjectsParent } = resolveBreadcrumb(pathname)

    return (
      <AddTaskDialogProvider>
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
                    {showProjectsParent && (
                      <>
                        <BreadcrumbItem className="hidden md:block">
                          <BreadcrumbLink render={<Link to="/app/projects" />}>
                            My Projects
                          </BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator className="hidden md:block" />
                      </>
                    )}
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
      </AddTaskDialogProvider>
    )
  },
})
