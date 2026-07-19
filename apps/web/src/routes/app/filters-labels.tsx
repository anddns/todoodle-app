import { createFileRoute } from '@tanstack/react-router'
import { LayoutGridIcon } from 'lucide-react'

import { EmptyState } from '@/web/components/layout/empty-state'
import { PageContainer } from '@/web/components/layout/page-container'

export const Route = createFileRoute('/app/filters-labels')({
  component: () => (
    <PageContainer title="Filters & Labels">
      <EmptyState
        icon={LayoutGridIcon}
        heading="No filters or labels yet"
        description="Create filters and labels to organize and quickly find your tasks."
      />
    </PageContainer>
  ),
})
