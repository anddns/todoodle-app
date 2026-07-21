import { DEFAULT_PROJECT_COLOR, PROJECT_COLOR_META, PROJECT_COLORS } from '@todoodle-app/shared'
import { useId, useState } from 'react'

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
import { useCreateProject } from '../hooks/use-create-project'

interface AddProjectDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function AddProjectDialog({ open, onOpenChange }: AddProjectDialogProps) {
  const formId = useId()
  const { mutate: createProject, isPending, isError, error } = useCreateProject()

  const [name, setName] = useState('')
  const [color, setColor] = useState<string>(DEFAULT_PROJECT_COLOR)

  const resetForm = () => {
    setName('')
    setColor(DEFAULT_PROJECT_COLOR)
  }

  const handleOpenChange = (nextOpen: boolean) => {
    onOpenChange(nextOpen)
    if (!nextOpen) resetForm()
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (!name.trim()) return

    createProject(
      { name: name.trim(), color: color as (typeof PROJECT_COLORS)[number] },
      { onSuccess: () => handleOpenChange(false) },
    )
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <DialogHeader>
            <DialogTitle>Add project</DialogTitle>
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
            <Label htmlFor={`${formId}-color`}>Color</Label>
            <Select
              value={color}
              onValueChange={(value) => setColor(value ?? DEFAULT_PROJECT_COLOR)}
            >
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
            <p className="text-destructive text-sm">Failed to create project: {error.message}</p>
          )}

          <DialogFooter>
            <Button type="button" variant="secondary" onClick={() => handleOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={isPending || !name.trim()}>
              {isPending ? 'Adding...' : 'Add project'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
