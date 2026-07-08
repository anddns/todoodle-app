// import { Trash, Trash2 } from '@hugeicons/core-free-icons'
import { TrashIcon } from '@phosphor-icons/react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { createFileRoute } from '@tanstack/react-router'

import { useState } from 'react'
import { eden } from '@/web/lib/eden'
import { Button } from '../components/ui/button'
import { Card, CardContent } from '../components/ui/card'
import { Checkbox } from '../components/ui/checkbox'
import { Input } from '../components/ui/input'

export const Route = createFileRoute('/')({
  component: Index,
})

function Index() {
  const queryClient = useQueryClient()
  const [newTitle, setNewTitle] = useState('')

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

  const createMutation = useMutation({
    mutationFn: async (title: string) => {
      const { data, error } = await eden.api.v1.tasks.post({
        title,
      })

      if (error) throw error

      return data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] })
      setNewTitle('')
    },
  })

  const toggleMutation = useMutation({
    mutationFn: async ({
      id,
      completedAt,
    }: {
      id: string
      completedAt: string | null
    }) => {
      const { data, error } = await eden.api.v1.tasks({ id }).patch({ completedAt })

      if (error) throw error

      return data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] })
    },
  })

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await eden.api.v1.tasks({ id }).delete()

      if (error) throw error
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] })
    },
  })

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault()

    if (!newTitle.trim()) return

    createMutation.mutate(newTitle.trim())
  }

  const handleToggle = (id: string, currentCompletedAt: string | null) => {
    toggleMutation.mutate({
      id,
      completedAt: currentCompletedAt ? null : new Date().toISOString(),
    })
  }

  const handleDelete = (id: string) => {
    deleteMutation.mutate(id)
  }

  return (
    <div className="mx-auto p-6 max-w-2xl">
      <h1 className="mb-6 font-bold text-3xl">Todoodle</h1>

      {/* Formulário de criação */}
      <form onSubmit={handleCreate} className="flex gap-2 mb-6">
        <Input
          type="text"
          placeholder="What needs to be done?"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          disabled={createMutation.isPending}
          className="flex-1"
        />
        <Button type="submit" disabled={createMutation.isPending}>
          {createMutation.isPending ? 'Adding...' : 'Add'}
        </Button>
      </form>

      {/* Conteúdo da lista */}
      {isPending ? (
        <p className="text-muted-foreground">Loading tasks...</p>
      ) : error ? (
        <p className="text-destructive">Failed to load tasks.</p>
      ) : !data || data.data.length === 0 ? (
        <p className="text-muted-foreground">No tasks yet. Add one above!</p>
      ) : (
        <ul className="space-y-3">
          {data.data.map((task) => {
            const isCompleted = !!task.completedAt
            return (
              <li key={task.id}>
                <Card>
                  <CardContent className="flex items-center gap-3 p-4">
                    <Checkbox
                      checked={isCompleted}
                      onCheckedChange={() => handleToggle(task.id, task.completedAt)}
                      disabled={toggleMutation.isPending}
                    />
                    <span
                      className={`flex-1 ${
                        isCompleted ? 'line-through text-muted-foreground' : ''
                      }`}
                    >
                      {task.title}
                    </span>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDelete(task.id)}
                      disabled={deleteMutation.isPending}
                    >
                      <TrashIcon className="w-4 h-4" />
                    </Button>
                  </CardContent>
                </Card>
              </li>
            )
          })}
        </ul>
      )}
    </div>
  )
}
