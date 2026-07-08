import { useQuery } from '@tanstack/react-query'
import { createFileRoute } from '@tanstack/react-router'
import { eden } from '@/web/lib/eden'
import { Button } from '../components/ui/button'

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
      <h1 className="mb-4 font-bold text-blue-600 text-3xl">Todoodle</h1>
      <Button onClick={() => alert('shadcn/ui works!')}>Click me</Button>
      <p>{data.total} task(s)</p>
      <ul>
        {data.data.map((task) => (
          <li key={task.id}> {task.title}</li>
        ))}
      </ul>
    </div>
  )
}
