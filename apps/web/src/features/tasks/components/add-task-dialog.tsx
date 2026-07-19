import { useId, useState } from 'react'
import { PRIORITY_LEVELS, PRIORITY_META, type Priority } from '@todoodle-app/shared'

import { Button } from '@/web/components/ui/button'
import { Checkbox } from '@/web/components/ui/checkbox'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/web/components/ui/dialog'
import { Input } from '@/web/components/ui/input'
import { Label } from '@/web/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/web/components/ui/select'
import { Textarea } from '@/web/components/ui/textarea'
import { projects } from '@/web/components/layout/projects-data'
import { slugify } from '@/web/lib/utils'

import { useCreateTask } from '../hooks/use-create-task'

const INBOX_LOCATION = 'inbox'

function locationLabel(value: string | null) {
  if (!value || value === INBOX_LOCATION) return 'Inbox'
  return projects.find((project) => slugify(project.name) === value)?.name ?? value
}

interface AddTaskDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function AddTaskDialog({ open, onOpenChange }: AddTaskDialogProps) {
  const formId = useId()
  const { mutate: createTask, isPending, isError, error } = useCreateTask()

  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  // Frontend-only: there is no project/task relationship in the API yet, so
  // this selection isn't sent with the create payload — see projects-data.ts.
  const [location, setLocation] = useState<string>(INBOX_LOCATION)
  const [priority, setPriority] = useState<string>('')
  const [dueOn, setDueOn] = useState('')
  const [dueAt, setDueAt] = useState('')
  const [isCompleted, setIsCompleted] = useState(false)

  const resetForm = () => {
    setTitle('')
    setDescription('')
    setLocation(INBOX_LOCATION)
    setPriority('')
    setDueOn('')
    setDueAt('')
    setIsCompleted(false)
  }

  const handleOpenChange = (nextOpen: boolean) => {
    onOpenChange(nextOpen)
    if (!nextOpen) resetForm()
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (!title.trim()) return

    createTask(
      {
        title: title.trim(),
        description: description.trim() || undefined,
        priority: priority ? (priority as Priority) : undefined,
        dueOn: dueOn ? new Date(dueOn).toISOString() : undefined,
        dueAt: dueAt ? new Date(dueAt).toISOString() : undefined,
        completedAt: isCompleted ? new Date().toISOString() : undefined,
      },
      {
        onSuccess: () => handleOpenChange(false),
      }
    )
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <DialogHeader>
            <DialogTitle>Add task</DialogTitle>
            <DialogDescription>
              Create a new task. It lands in the Inbox unless you pick a project below.
            </DialogDescription>
          </DialogHeader>

          <div className="flex flex-col gap-1.5">
            <Label htmlFor={`${formId}-title`}>Title</Label>
            <Input
              id={`${formId}-title`}
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              placeholder="What needs to be done?"
              autoFocus
              required
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <Label htmlFor={`${formId}-description`}>Description</Label>
            <Textarea
              id={`${formId}-description`}
              value={description}
              onChange={(event) => setDescription(event.target.value)}
              placeholder="Add more detail (optional)"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <Label>Location</Label>
              <Select value={location} onValueChange={(value) => setLocation(value ?? INBOX_LOCATION)}>
                <SelectTrigger>
                  <SelectValue>{locationLabel}</SelectValue>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value={INBOX_LOCATION}>Inbox</SelectItem>
                  {projects.map(({ name }) => (
                    <SelectItem key={name} value={slugify(name)}>
                      {name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex flex-col gap-1.5">
              <Label>Priority</Label>
              <Select value={priority} onValueChange={(value) => setPriority(value ?? '')}>
                <SelectTrigger>
                  <SelectValue placeholder="None" />
                </SelectTrigger>
                <SelectContent>
                  {PRIORITY_LEVELS.map((level) => (
                    <SelectItem key={level} value={level}>
                      {PRIORITY_META[level].label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <Label htmlFor={`${formId}-due-on`}>Due date</Label>
              <Input
                id={`${formId}-due-on`}
                type="date"
                value={dueOn}
                onChange={(event) => setDueOn(event.target.value)}
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <Label htmlFor={`${formId}-due-at`}>Due at</Label>
              <Input
                id={`${formId}-due-at`}
                type="datetime-local"
                value={dueAt}
                onChange={(event) => setDueAt(event.target.value)}
              />
            </div>
          </div>

          <Label className="w-fit">
            <Checkbox checked={isCompleted} onCheckedChange={setIsCompleted} />
            Mark as already completed
          </Label>

          {isError && (
            <p className="text-destructive text-sm">Failed to create task: {error.message}</p>
          )}

          <DialogFooter>
            <Button type="button" variant="ghost" onClick={() => handleOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={isPending || !title.trim()}>
              {isPending ? 'Adding...' : 'Add task'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
