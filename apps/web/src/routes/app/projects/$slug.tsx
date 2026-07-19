import { createFileRoute } from '@tanstack/react-router'
import { HashIcon } from 'lucide-react'

import { EmptyState } from '@/web/components/layout/empty-state'
import { PageContainer } from '@/web/components/layout/page-container'
import { projects } from '@/web/components/layout/projects-data'
import { slugify } from '@/web/lib/utils'

export const Route = createFileRoute('/app/projects/$slug')({
  component: RouteComponent,
})

function RouteComponent() {
  const { slug } = Route.useParams()
  const project = projects.find((candidate) => slugify(candidate.name) === slug)
  const title = project?.name ?? 'Project'

  return (
    <PageContainer title={title}>
      <EmptyState
        icon={HashIcon}
        heading="No tasks yet"
        description={`Tasks added to ${title} will show up here.`}
      />
    </PageContainer>
  )
}
