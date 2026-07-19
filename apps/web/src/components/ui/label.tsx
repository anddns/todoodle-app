import * as React from "react"

import { cn } from "@/web/lib/utils"

function Label({ className, ...props }: React.ComponentProps<"label">) {
  return (
    // biome-ignore lint/a11y/noLabelWithoutControl: generic wrapper — each call site supplies htmlFor or wraps its control as a child.
    <label
      data-slot="label"
      className={cn(
        "flex items-center gap-2 font-medium text-sm leading-none select-none peer-disabled:cursor-not-allowed peer-disabled:opacity-50",
        className
      )}
      {...props}
    />
  )
}

export { Label }
