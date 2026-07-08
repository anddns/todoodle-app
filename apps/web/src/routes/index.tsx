import { useQuery } from '@tanstack/react-query'
import { createFileRoute } from '@tanstack/react-router'

import { eden } from '@/web/lib/eden'

export const Route = createFileRoute('/')({
  component: Index,
})

function Index() {
  const { data, isPending, error } = useQuery({
    queryKey: ['tasks'],
    queryFn: async () => {
      const { data, error } = await eden.api.v1.tasks.get({
        query: {
          status: 'all',
          sortBy: 'createdAt',
          sortOrder: 'desc',
          limit: 20,
          offset: 0,
        },
      })

      if (error) throw error

      return data
    },
  })

  if (isPending) return <p>Loading...</p>
  if (error) return <p>Something went wrong.</p>

  return (
    <div>
      <h1>Todoodle</h1>
      <p>{data.total} task(s)</p>
      <ul>
        {data.data.map((task) => (
          <li key={task.id}> {task.title}</li>
        ))}
      </ul>
    </div>
  )
}
