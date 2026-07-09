import { useState } from 'react'
import { Button } from '@/web/components/ui/button'
import { Input } from '@/web/components/ui/input'
import { useCreateTask } from '../hooks/use-create-task'

export function TaskForm() {
  const [title, setTitle] = useState('')
  const { mutate: createTask, isPending } = useCreateTask()

  const handleOnSubmit = (event: React.SubmitEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (!title.trim()) return

    createTask(
      { title: title.trim() },
      {
        onSuccess: () => {
          setTitle('')
        },
      },
    )
  }

  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault()

    setTitle(event.target.value)
  }

  return (
    <form onSubmit={handleOnSubmit} className="flex gap-2 mb-6">
      <Input
        type="text"
        placeholder="What needs to be done?"
        value={title}
        onChange={handleOnChange}
        disabled={isPending}
        className="flex-1"
      />
      <Button type="submit" disabled={isPending}>
        {isPending ? 'Adding...' : 'Add'}
      </Button>
    </form>
  )
}
