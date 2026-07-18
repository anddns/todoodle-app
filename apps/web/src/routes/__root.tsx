import type { QueryClient } from '@tanstack/react-query'
import { createRootRouteWithContext, Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'

import { AppSidebar } from '@/web/components/layout/app-sidebar'
import { SidebarInset, SidebarProvider, SidebarTrigger } from '@/web/components/ui/sidebar'
import { TooltipProvider } from '@/web/components/ui/tooltip'

interface RouterContext {
  queryClient: QueryClient
}

export const Route = createRootRouteWithContext<RouterContext>()({
  component: () => (
    <TooltipProvider>
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
          {/* Re-expands the sidebar once it has slid offcanvas. */}
          <header className="flex h-12 shrink-0 items-center gap-2 px-4">
            <SidebarTrigger className="[&_svg]:size-4.5!" />
          </header>
          <Outlet />
        </SidebarInset>
      </SidebarProvider>
      <TanStackRouterDevtools />
    </TooltipProvider>
  ),
})
