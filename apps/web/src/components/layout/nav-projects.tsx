import { CaretDownIcon, PlusIcon } from '@phosphor-icons/react'
import { useState } from 'react'

import { Collapsible, CollapsibleContent } from '@/web/components/ui/collapsible'
import {
  SidebarGroup,
  SidebarGroupAction,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/web/components/ui/sidebar'
import { cn } from '@/web/lib/utils'

interface Project {
  name: string
  color: string
}

/**
 * Placeholder data — there is no `projects` table, API route, or shared schema
 * yet, so these exist to exercise the section's collapse behaviour.
 */
const projects: Project[] = [
  { name: 'Getting Started', color: 'bg-sky-500' },
  { name: 'Work', color: 'bg-amber-500' },
  { name: 'Personal', color: 'bg-violet-500' },
]

export function NavProjects() {
  // Controlled rather than `defaultOpen` so both the label and the caret button
  // can drive the same state, and so the caret's rotation depends on state we
  // own rather than on a `data-panel-open` attribute surviving Base UI's
  // `render` prop merging.
  const [isOpen, setIsOpen] = useState(true)

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen}>
      <SidebarGroup>
        {/*
          The label is itself a collapse trigger, so the whole header row is
          clickable. The two action buttons are absolutely positioned siblings
          rather than children — nesting buttons inside a button is invalid HTML
          and would make the plus button un-clickable.
        */}
        <SidebarGroupLabel
          render={<button type="button" />}
          className="w-full cursor-pointer pr-14 font-semibold text-sidebar-foreground"
          aria-expanded={isOpen}
          onClick={() => setIsOpen((open) => !open)}
        >
          My Projects
        </SidebarGroupLabel>

        <SidebarGroupAction className="top-2.5 right-9" aria-label="Add project">
          <PlusIcon />
        </SidebarGroupAction>

        <SidebarGroupAction
          className="top-2.5"
          aria-label={isOpen ? 'Collapse My Projects' : 'Expand My Projects'}
          aria-expanded={isOpen}
          onClick={() => setIsOpen((open) => !open)}
        >
          <CaretDownIcon
            className={cn('transition-transform duration-200', isOpen && 'rotate-180')}
          />
        </SidebarGroupAction>

        <CollapsibleContent>
          <SidebarGroupContent>
            <SidebarMenu>
              {projects.map(({ name, color }) => (
                <SidebarMenuItem key={name}>
                  <SidebarMenuButton tooltip={name}>
                    <span className={cn('size-2 shrink-0 rounded-full', color)} />
                    <span>{name}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </CollapsibleContent>
      </SidebarGroup>
    </Collapsible>
  )
}
