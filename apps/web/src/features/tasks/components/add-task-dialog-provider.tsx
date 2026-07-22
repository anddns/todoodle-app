import { createContext, useContext, useState } from 'react'

import { AddTaskDialog } from './add-task-dialog'

interface AddTaskDialogContextValue {
  openAddTaskDialog: (projectId?: string) => void
}

const AddTaskDialogContext = createContext<AddTaskDialogContextValue | null>(null)

export function useAddTaskDialog() {
  const context = useContext(AddTaskDialogContext)

  if (!context) {
    throw new Error('useAddTaskDialog must be used within an AddTaskDialogProvider')
  }

  return context
}

/**
 * Renders the dialog once, at the layout level, so both the sidebar's "Add
 * Task" button and the Inbox/project pages' "Add Task" buttons — unrelated
 * branches of the component tree — can trigger the same dialog instance via
 * context.
 */
export function AddTaskDialogProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false)
  const [defaultProjectId, setDefaultProjectId] = useState<string | undefined>(undefined)

  const openAddTaskDialog = (projectId?: string) => {
    setDefaultProjectId(projectId)
    setIsOpen(true)
  }

  return (
    <AddTaskDialogContext.Provider value={{ openAddTaskDialog }}>
      {children}
      <AddTaskDialog open={isOpen} onOpenChange={setIsOpen} defaultProjectId={defaultProjectId} />
    </AddTaskDialogContext.Provider>
  )
}
