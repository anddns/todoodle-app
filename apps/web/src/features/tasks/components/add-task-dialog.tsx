import { PRIORITY_LEVELS, PRIORITY_META, type Priority } from '@todoodle-app/shared'
import { FlagIcon, HashIcon, InboxIcon } from 'lucide-react'
import { useId, useState } from 'react'
import { projects } from '@/web/components/layout/projects-data'
import { Button } from '@/web/components/ui/button'
import { DatePicker } from '@/web/components/ui/date-picker'
import {
  Dialog,
  DialogContent,
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
import { Separator } from '@/web/components/ui/separator'
import { TaskTimePicker } from '@/web/components/ui/task-time-picker'
import { Textarea } from '@/web/components/ui/textarea'
import { slugify } from '@/web/lib/utils'
import { useCreateTask } from '../hooks/use-create-task'

const INBOX_LOCATION = 'inbox'

function locationLabel(value: string | null) {
  if (!value || value === INBOX_LOCATION) return 'Inbox'
  return projects.find((project) => slugify(project.name) === value)?.name ?? value
}

function ProjectIcon({ value }: { value: string | null }) {
  if (!value || value === INBOX_LOCATION) return <InboxIcon className="size-4" />
  return <HashIcon className="size-4" />
}

const LOWEST_PRIORITY = PRIORITY_LEVELS[PRIORITY_LEVELS.length - 1]

function PriorityFlag({ level }: { level: Priority }) {
  const isLowest = level === LOWEST_PRIORITY
  return (
    <FlagIcon
      className="size-4"
      style={{ color: PRIORITY_META[level].color }}
      fill={isLowest ? 'none' : PRIORITY_META[level].color}
    />
  )
}

function combineDateAndTime(date: Date, time: string) {
  const [hoursText, minutesText] = time.split(':')
  const combined = new Date(date)
  combined.setHours(Number(hoursText ?? 0), Number(minutesText ?? 0), 0, 0)
  return combined
}

function currentTimeString() {
  const now = new Date()
  return `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`
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
  const [priority, setPriority] = useState<string>('p4')
  const [isAllDay, setIsAllDay] = useState<boolean>(true)
  const [dueAt, setDueAt] = useState<Date | undefined>(new Date())
  const [time, setTime] = useState<string>(currentTimeString())
  const [isCompleted, setIsCompleted] = useState<boolean>(false)

  const resetForm = () => {
    setTitle('')
    setDescription('')
    setLocation(INBOX_LOCATION)
    setPriority('p4')
    setIsAllDay(true)
    setDueAt(new Date())
    setTime(currentTimeString())
    setIsCompleted(false)
  }

  const handleOpenChange = (nextOpen: boolean) => {
    onOpenChange(nextOpen)
    if (!nextOpen) resetForm()
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (!title.trim()) return

    const resolvedDueAt = dueAt && !isAllDay && time ? combineDateAndTime(dueAt, time) : dueAt

    createTask(
      {
        title: title.trim(),
        description: description.trim() || undefined,
        priority: priority ? (priority as Priority) : undefined,
        isAllDay: isAllDay,
        dueAt: resolvedDueAt ? resolvedDueAt.toISOString() : undefined,
        completedAt: isCompleted ? new Date().toISOString() : undefined,
      },
      {
        onSuccess: () => handleOpenChange(false),
      },
    )
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <DialogHeader>
            <DialogTitle>Add task</DialogTitle>
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

          <div className="gap-4 grid grid-cols-2">
            <div className="flex flex-col gap-1.5">
              <Label htmlFor={`${formId}-due-at`}>Date</Label>
              <DatePicker id={`${formId}-due-at`} value={dueAt} onChange={setDueAt} />
            </div>

            <div className="flex flex-col gap-1.5">
              <Label htmlFor={`${formId}-time`}>Time</Label>
              <TaskTimePicker
                id={`${formId}-time`}
                time={time}
                onTimeChange={setTime}
                isAllDay={isAllDay}
                onAllDayChange={setIsAllDay}
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <Label>Priority</Label>
              <Select value={priority} onValueChange={(value) => setPriority(value ?? 'p4')}>
                <SelectTrigger>
                  <SelectValue>
                    {(value: string) => {
                      const level = value as Priority
                      const meta = PRIORITY_META[level]
                      if (!meta) return null
                      return (
                        <span className="flex items-center gap-2">
                          <PriorityFlag level={level} />
                          {meta.label}
                        </span>
                      )
                    }}
                  </SelectValue>
                </SelectTrigger>
                <SelectContent alignItemWithTrigger={false}>
                  {PRIORITY_LEVELS.map((level) => (
                    <SelectItem key={level} value={level}>
                      <span className="flex items-center gap-2">
                        <PriorityFlag level={level} />
                        {PRIORITY_META[level].label}
                      </span>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex flex-col gap-1.5">
              <Label htmlFor={`${formId}-project`}>Project</Label>
              <Select
                value={location}
                onValueChange={(value) => setLocation(value ?? INBOX_LOCATION)}
              >
                <SelectTrigger id={`${formId}-project`}>
                  <SelectValue>
                    {(value: string | null) => (
                      <span className="flex items-center gap-2">
                        <ProjectIcon value={value} />
                        {locationLabel(value)}
                      </span>
                    )}
                  </SelectValue>
                </SelectTrigger>
                <SelectContent alignItemWithTrigger={false}>
                  <SelectItem value={INBOX_LOCATION}>
                    <span className="flex items-center gap-2">
                      <InboxIcon className="size-4" />
                      Inbox
                    </span>
                  </SelectItem>
                  <Separator />
                  {projects.map(({ name }) => (
                    <SelectItem key={name} value={slugify(name)}>
                      <span className="flex items-center gap-2">
                        <HashIcon className="size-4" />
                        {name}
                      </span>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {isError && (
            <p className="text-destructive text-sm">Failed to create task: {error.message}</p>
          )}

          <Separator />

          <DialogFooter>
            <Button type="button" variant="secondary" onClick={() => handleOpenChange(false)}>
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
