import { createFileRoute } from '@tanstack/react-router'
import { InboxIcon } from 'lucide-react'

import { EmptyState } from '@/web/components/layout/empty-state'
import { PageContainer } from '@/web/components/layout/page-container'

export const Route = createFileRoute('/app/inbox')({
  component: () => (
    <PageContainer title="Inbox">
      <EmptyState
        icon={InboxIcon}
        heading="Capture now, plan later"
        description="Inbox is your go-to spot for quick task entry. Clear your mind now, organize when you're ready."
      />
    </PageContainer>
  ),
})
