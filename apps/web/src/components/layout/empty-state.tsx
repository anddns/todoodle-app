import { SparklesIcon, type LucideIcon } from 'lucide-react'

import { Button } from '@/web/components/ui/button'

interface EmptyStateProps {
  icon: LucideIcon
  heading: string
  description: string
  cta?: {
    label: string
    icon?: LucideIcon
    onClick?: () => void
  }
}

export function EmptyState({ icon: Icon, heading, description, cta }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center gap-4 py-16 text-center">
      <div className="relative flex size-20 items-center justify-center rounded-full bg-primary/10">
        <Icon className="size-9 text-primary" strokeWidth={1.5} />
        <SparklesIcon
          className="-top-1 -right-1 absolute size-5 text-primary/70"
          strokeWidth={1.5}
        />
      </div>

      <div className="space-y-1.5">
        <h2 className="font-semibold text-lg">{heading}</h2>
        <p className="mx-auto max-w-sm text-muted-foreground text-sm">{description}</p>
      </div>

      {cta && (
        <Button onClick={cta.onClick} className="mt-2">
          {cta.icon && <cta.icon className="size-4" />}
          {cta.label}
        </Button>
      )}
    </div>
  )
}
