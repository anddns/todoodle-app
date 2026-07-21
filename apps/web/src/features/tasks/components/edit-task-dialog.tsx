import { PRIORITY_LEVELS, PRIORITY_META, type Priority } from '@todoodle-app/shared'
import { FlagIcon, HashIcon, InboxIcon } from 'lucide-react'
import { useEffect, useId, useState } from 'react'
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
import { useProjects } from '@/web/features/projects'
import { useUpdateTask } from '../hooks/use-update-task'
import type { Task } from '../types'

const INBOX_LOCATION = 'inbox'

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

function timeStringFromDate(date: Date) {
  return `${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`
}

interface EditTaskDialogProps {
  task: Task
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function EditTaskDialog({ task, open, onOpenChange }: EditTaskDialogProps) {
  const formId = useId()
  const { mutate: updateTask, isPending, isError, error } = useUpdateTask()
  const { data: projectsData } = useProjects()
  const projects = projectsData?.projects ?? []

  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [priority, setPriority] = useState<string>('p4')
  const [isAllDay, setIsAllDay] = useState<boolean>(true)
  const [dueAt, setDueAt] = useState<Date | undefined>(undefined)
  const [time, setTime] = useState<string>('09:00')
  const [location, setLocation] = useState<string>(INBOX_LOCATION)

  // Re-hydrate the form from the task whenever the dialog opens, so edits always
  // start from the task's current values (and discarded edits don't persist).
  useEffect(() => {
    if (!open) return

    const taskDueAt = task.dueAt ? new Date(task.dueAt) : undefined

    setTitle(task.title)
    setDescription(task.description ?? '')
    setPriority(task.priority ?? 'p4')
    setIsAllDay(task.isAllDay ?? true)
    setDueAt(taskDueAt)
    setTime(taskDueAt ? timeStringFromDate(taskDueAt) : '09:00')
    setLocation(task.projectId ?? INBOX_LOCATION)
  }, [open, task])

  const handleDueAtChange = (nextDueAt: Date | undefined) => {
    setDueAt(nextDueAt)
    if (!nextDueAt) setIsAllDay(true)
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (!title.trim()) return

    const resolvedDueAt = dueAt && !isAllDay && time ? combineDateAndTime(dueAt, time) : dueAt

    updateTask(
      {
        id: task.id,
        payload: {
          title: title.trim(),
          description: description.trim() || undefined,
          priority: priority ? (priority as Priority) : undefined,
          isAllDay: isAllDay,
          dueAt: resolvedDueAt ? resolvedDueAt.toISOString() : undefined,
          projectId: location === INBOX_LOCATION ? null : location,
        },
      },
      {
        onSuccess: () => onOpenChange(false),
      },
    )
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <DialogHeader>
            <DialogTitle>Edit task</DialogTitle>
          </DialogHeader>

          <div className="flex flex-col gap-1.5">
            <Label htmlFor={`${formId}-title`}>Name</Label>
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
              placeholder="Add details, notes, or sub-steps..."
            />
          </div>

          <div className="gap-4 grid grid-cols-2">
            <div className="flex flex-col gap-1.5">
              <Label htmlFor={`${formId}-due-at`}>Date</Label>
              <DatePicker id={`${formId}-due-at`} value={dueAt} onChange={handleDueAtChange} />
            </div>

            <div className="flex flex-col gap-1.5">
              <Label htmlFor={`${formId}-time`}>Time</Label>
              <TaskTimePicker
                id={`${formId}-time`}
                time={time}
                onTimeChange={setTime}
                isAllDay={isAllDay}
                onAllDayChange={setIsAllDay}
                disabled={!dueAt}
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
                        {value === INBOX_LOCATION || !value
                          ? 'Inbox'
                          : (projects.find((project) => project.id === value)?.name ?? 'Inbox')}
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
                  {projects.map((project) => (
                    <SelectItem key={project.id} value={project.id}>
                      <span className="flex items-center gap-2">
                        <span
                          aria-hidden
                          className="size-3 rounded-full"
                          style={{ backgroundColor: project.color }}
                        />
                        {project.name}
                      </span>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {isError && (
            <p className="text-destructive text-sm">Failed to update task: {error.message}</p>
          )}

          <Separator />

          <DialogFooter>
            <Button type="button" variant="secondary" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={isPending || !title.trim()}>
              {isPending ? 'Saving...' : 'Save changes'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
