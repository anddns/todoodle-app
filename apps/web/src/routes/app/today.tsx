import { createFileRoute } from '@tanstack/react-router'
import { CalendarIcon } from 'lucide-react'

import { EmptyState } from '@/web/components/layout/empty-state'
import { PageContainer } from '@/web/components/layout/page-container'

export const Route = createFileRoute('/app/today')({
  component: () => (
    <PageContainer title="Today">
      <EmptyState
        icon={CalendarIcon}
        heading="Nothing due today"
        description="Tasks scheduled for today will show up here once you start adding due dates."
      />
    </PageContainer>
  ),
})
