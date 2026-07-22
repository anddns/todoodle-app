import { PROJECT_COLOR_META, PROJECT_COLORS } from '@todoodle-app/shared'
import { useEffect, useId, useState } from 'react'

import { Button } from '@/web/components/ui/button'
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
import { Textarea } from '@/web/components/ui/textarea'
import { useUpdateProject } from '../hooks/use-update-project'
import type { Project } from '../types'

interface EditProjectDialogProps {
  project: Project
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function EditProjectDialog({ project, open, onOpenChange }: EditProjectDialogProps) {
  const formId = useId()
  const { mutate: updateProject, isPending, isError, error } = useUpdateProject()

  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [color, setColor] = useState<string>(project.color)

  // Re-hydrate the form from the project whenever the dialog opens, so edits
  // always start from the project's current values.
  useEffect(() => {
    if (!open) return

    setName(project.name)
    setDescription(project.description ?? '')
    setColor(project.color)
  }, [open, project])

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (!name.trim()) return

    updateProject(
      {
        id: project.id,
        payload: {
          name: name.trim(),
          description: description.trim() || undefined,
          color: color as (typeof PROJECT_COLORS)[number],
        },
      },
      { onSuccess: () => onOpenChange(false) },
    )
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <DialogHeader>
            <DialogTitle>Edit project</DialogTitle>
          </DialogHeader>

          <div className="flex flex-col gap-1.5">
            <Label htmlFor={`${formId}-name`}>Name</Label>
            <Input
              id={`${formId}-name`}
              value={name}
              onChange={(event) => setName(event.target.value)}
              placeholder="Project name"
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
              placeholder="Add details or notes..."
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <Label htmlFor={`${formId}-color`}>Color</Label>
            <Select value={color} onValueChange={(value) => setColor(value ?? project.color)}>
              <SelectTrigger id={`${formId}-color`}>
                <SelectValue>
                  {(value: string) => (
                    <span className="flex items-center gap-2">
                      <span
                        aria-hidden
                        className="size-3 rounded-full"
                        style={{ backgroundColor: value }}
                      />
                      {PROJECT_COLOR_META[value as (typeof PROJECT_COLORS)[number]]?.label}
                    </span>
                  )}
                </SelectValue>
              </SelectTrigger>
              <SelectContent alignItemWithTrigger={false}>
                {PROJECT_COLORS.map((swatch) => (
                  <SelectItem key={swatch} value={swatch}>
                    <span className="flex items-center gap-2">
                      <span
                        aria-hidden
                        className="size-3 rounded-full"
                        style={{ backgroundColor: swatch }}
                      />
                      {PROJECT_COLOR_META[swatch].label}
                    </span>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {isError && (
            <p className="text-destructive text-sm">Failed to update project: {error.message}</p>
          )}

          <DialogFooter>
            <Button type="button" variant="secondary" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={isPending || !name.trim()}>
              {isPending ? 'Saving...' : 'Save changes'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
