import { createFileRoute } from '@tanstack/react-router'
import { CalendarDaysIcon } from 'lucide-react'

import { EmptyState } from '@/web/components/layout/empty-state'
import { PageContainer } from '@/web/components/layout/page-container'

export const Route = createFileRoute('/app/upcoming')({
  component: () => (
    <PageContainer title="Upcoming">
      <EmptyState
        icon={CalendarDaysIcon}
        heading="Nothing on the horizon"
        description="Tasks with future due dates will appear here so you can plan ahead."
      />
    </PageContainer>
  ),
})
