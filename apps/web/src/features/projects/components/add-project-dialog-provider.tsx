import { createContext, useContext, useState } from 'react'

import { AddProjectDialog } from './add-project-dialog'

interface AddProjectDialogContextValue {
  openAddProjectDialog: () => void
}

const AddProjectDialogContext = createContext<AddProjectDialogContextValue | null>(null)

export function useAddProjectDialog() {
  const context = useContext(AddProjectDialogContext)

  if (!context) {
    throw new Error('useAddProjectDialog must be used within an AddProjectDialogProvider')
  }

  return context
}

/**
 * Renders the dialog once, at the layout level, so both the sidebar's "Add
 * project" action and the Projects index page can trigger the same dialog
 * instance via context.
 */
export function AddProjectDialogProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <AddProjectDialogContext.Provider value={{ openAddProjectDialog: () => setIsOpen(true) }}>
      {children}
      <AddProjectDialog open={isOpen} onOpenChange={setIsOpen} />
    </AddProjectDialogContext.Provider>
  )
}
