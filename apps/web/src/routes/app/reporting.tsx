import { createFileRoute } from '@tanstack/react-router'
import { PieChart } from 'lucide-react'

import { EmptyState } from '@/web/components/layout/empty-state'
import { PageContainer } from '@/web/components/layout/page-container'

export const Route = createFileRoute('/app/reporting')({
  component: () => (
    <PageContainer title="Reporting">
      <EmptyState
        icon={PieChart}
        heading="No data to report yet"
        description="Complete a few tasks and your productivity trends will show up here."
      />
    </PageContainer>
  ),
})
