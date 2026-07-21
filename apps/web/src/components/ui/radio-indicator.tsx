'use client'

import { CheckIcon } from 'lucide-react'
import type * as React from 'react'

import { cn } from '@/web/lib/utils'

interface RadioIndicatorProps extends Omit<React.ComponentProps<'button'>, 'onChange'> {
  checked: boolean
  onCheckedChange?: (checked: boolean) => void
  /** CSS color used for the ring/fill when checked. Defaults to the theme's primary color. */
  color?: string
  /**
   * Emphasizes the indicator: thicker (2px) border, and a background tint
   * derived from `color` while unchecked (subtle at rest, stronger on hover).
   * Defaults to a plain 1px border with no tint.
   */
  emphasized?: boolean
}

function RadioIndicator({
  checked,
  onCheckedChange,
  disabled,
  className,
  color,
  emphasized = false,
  style,
  ...props
}: RadioIndicatorProps) {
  return (
    // biome-ignore lint/a11y/useSemanticElements: layered grid visual (ring/fill/tick) can't be built from a native radio input
    <button
      type="button"
      role="radio"
      aria-checked={checked}
      aria-disabled={disabled}
      data-slot="radio-indicator"
      data-state={checked ? 'checked' : 'unchecked'}
      data-emphasized={emphasized}
      onClick={() => {
        if (disabled) return
        onCheckedChange?.(!checked)
      }}
      style={
        { '--radio-indicator-color': color ?? 'var(--primary)', ...style } as React.CSSProperties
      }
      className={cn(
        'group/radio-indicator relative grid size-[18px] shrink-0 place-content-center rounded-full opacity-100 outline-none transition-opacity duration-200 ease-out motion-reduce:transition-none data-[state=checked]:opacity-60 aria-disabled:pointer-events-none aria-disabled:opacity-50 focus-visible:ring-3 focus-visible:ring-ring/50',
        className,
      )}
      {...props}
    >
      {/* Border ring */}
      <span
        aria-hidden
        className="col-start-1 row-start-1 size-[18px] rounded-full border-2 border-muted-foreground/40 transition-[color,border-color] duration-200 ease-out motion-reduce:transition-none group-data-[emphasized=true]/radio-indicator:border-(--radio-indicator-color) group-data-[state=checked]/radio-indicator:border-(--radio-indicator-color)"
      />

      {/* Background fill: subtle priority tint at rest, stronger on hover (both while
          unchecked + emphasized), full fill once checked */}
      <span
        aria-hidden
        className="col-start-1 row-start-1 size-[18px] scale-0 rounded-full bg-(--radio-indicator-color) opacity-0 transition-[transform,opacity] duration-200 ease-out motion-reduce:transition-none group-[[data-emphasized=true][data-state=unchecked]]/radio-indicator:scale-100 group-[[data-emphasized=true][data-state=unchecked]]/radio-indicator:opacity-10 group-[[data-emphasized=true][data-state=unchecked]:hover]/radio-indicator:opacity-20 group-data-[state=checked]/radio-indicator:scale-100 group-data-[state=checked]/radio-indicator:opacity-100"
      />

      {/* Checkmark tick: border-colored preview on hover (unchecked), white once checked */}
      <span
        aria-hidden
        className="col-start-1 row-start-1 grid size-[18px] scale-0 place-content-center opacity-0 transition-all duration-200 ease-out motion-reduce:transition-none group-data-[state=checked]/radio-indicator:scale-100 group-data-[state=checked]/radio-indicator:opacity-100 group-[[data-state=unchecked]:hover]/radio-indicator:scale-100 group-[[data-state=unchecked]:hover]/radio-indicator:opacity-40"
      >
        <CheckIcon
          className="size-3.5 text-(--radio-indicator-color) transition-colors duration-200 ease-out motion-reduce:transition-none group-data-[state=checked]/radio-indicator:text-white"
          strokeWidth={3}
        />
      </span>
    </button>
  )
}

export { RadioIndicator }
