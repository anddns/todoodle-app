import { createFileRoute } from '@tanstack/react-router'
import { FolderIcon } from 'lucide-react'

import { EmptyState } from '@/web/components/layout/empty-state'
import { PageContainer } from '@/web/components/layout/page-container'

export const Route = createFileRoute('/app/projects/')({
  component: () => (
    <PageContainer title="My Projects">
      <EmptyState
        icon={FolderIcon}
        heading="No projects yet"
        description="Group related tasks into projects to keep bigger efforts organized."
      />
    </PageContainer>
  ),
})
