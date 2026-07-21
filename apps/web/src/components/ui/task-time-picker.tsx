'use client'

import { ClockIcon, XIcon } from 'lucide-react'
import * as React from 'react'
import { Button } from '@/web/components/ui/button'
import { ButtonGroup } from '@/web/components/ui/button-group'
import { Label } from '@/web/components/ui/label'
import { Popover, PopoverContent, PopoverTrigger } from '@/web/components/ui/popover'
import { Separator } from '@/web/components/ui/separator'
import { Switch } from '@/web/components/ui/switch'
import { cn } from '@/web/lib/utils'

type Period = 'AM' | 'PM'

const HOURS = [12, ...Array.from({ length: 11 }, (_, i) => i + 1)]
const MINUTES = Array.from({ length: 60 }, (_, i) => i)
const PERIODS: Period[] = ['AM', 'PM']

function to12Hour(hour24: number) {
  const period: Period = hour24 >= 12 ? 'PM' : 'AM'
  const hour12 = hour24 % 12 || 12
  return { hour12, period }
}

function to24Hour(hour12: number, period: Period) {
  const wrapped = hour12 % 12
  return period === 'PM' ? wrapped + 12 : wrapped
}

function parseTime(time: string) {
  const [hoursText, minutesText] = time.split(':')
  const { hour12, period } = to12Hour(Number(hoursText ?? 0))
  return { hour12, minute: Number(minutesText ?? 0), period }
}

function formatTime24(hour12: number, minute: number, period: Period) {
  const hour24 = to24Hour(hour12, period)
  return `${String(hour24).padStart(2, '0')}:${String(minute).padStart(2, '0')}`
}

function formatDisplayTime(time: string) {
  const { hour12, minute, period } = parseTime(time)
  return `${String(hour12).padStart(2, '0')}:${String(minute).padStart(2, '0')} ${period}`
}

interface TaskTimePickerProps {
  time: string
  onTimeChange: (time: string) => void
  isAllDay: boolean
  onAllDayChange: (isAllDay: boolean) => void
  disabled?: boolean
  className?: string
  id?: string
}

function TaskTimePicker({
  time,
  onTimeChange,
  isAllDay,
  onAllDayChange,
  disabled = false,
  className,
  id,
}: TaskTimePickerProps) {
  const switchId = React.useId()
  const { hour12, minute, period } = parseTime(time)

  return (
    <ButtonGroup className={cn('w-full', className)}>
      <Popover>
        <PopoverTrigger
          render={
            <Button
              id={id}
              type="button"
              variant="outline"
              disabled={disabled}
              className="min-w-0 flex-1 justify-start font-normal"
            />
          }
        >
          <ClockIcon className="opacity-60" />
          {isAllDay ? 'All day' : formatDisplayTime(time)}
        </PopoverTrigger>

        <PopoverContent className="gap-0 p-3 w-56" align="start">
          <div className="flex justify-center items-center gap-2">
            <Label htmlFor={switchId} className="font-normal">
              All day
            </Label>
            <Switch id={switchId} checked={isAllDay} onCheckedChange={onAllDayChange} />
          </div>

          <Separator className="my-3" />

          <div className="flex justify-center gap-1">
            <TimeColumn
              options={HOURS}
              value={hour12}
              format={(hour) => String(hour).padStart(2, '0')}
              onSelect={(nextHour) => {
                onTimeChange(formatTime24(nextHour, minute, period))
                onAllDayChange(false)
              }}
            />
            <TimeColumn
              options={MINUTES}
              value={minute}
              format={(nextMinute) => String(nextMinute).padStart(2, '0')}
              onSelect={(nextMinute) => {
                onTimeChange(formatTime24(hour12, nextMinute, period))
                onAllDayChange(false)
              }}
            />
            <TimeColumn
              options={PERIODS}
              value={period}
              onSelect={(nextPeriod) => {
                onTimeChange(formatTime24(hour12, minute, nextPeriod))
                onAllDayChange(false)
              }}
            />
          </div>
        </PopoverContent>
      </Popover>

      {!isAllDay && (
        <Button
          type="button"
          variant="outline"
          size="icon"
          className="active:translate-y-0!"
          aria-label="Clear time"
          onClick={() => onAllDayChange(true)}
        >
          <XIcon />
        </Button>
      )}
    </ButtonGroup>
  )
}

interface TimeColumnProps<T extends string | number> {
  options: T[]
  value: T
  format?: (option: T) => string
  onSelect: (option: T) => void
}

function TimeColumn<T extends string | number>({
  options,
  value,
  format,
  onSelect,
}: TimeColumnProps<T>) {
  const selectedRef = React.useRef<HTMLButtonElement>(null)
  const isFirstRender = React.useRef(true)

  React.useEffect(() => {
    selectedRef.current?.scrollIntoView({
      block: 'center',
      behavior: isFirstRender.current ? 'auto' : 'smooth',
    })
    isFirstRender.current = false
  }, [value])

  return (
    <div
      className={cn(
        '[&::-webkit-scrollbar]:hidden flex flex-col w-14 h-48 [-ms-overflow-style:none] overflow-y-auto [scrollbar-width:none] [transform:translateZ(0)]',
        // Pads each end by half the viewport (minus half an item) so edge
        // options (e.g. the first/last hour) can still scroll to true center.
        'py-20',
      )}
    >
      {options.map((option) => {
        const selected = option === value
        return (
          <button
            key={option}
            ref={selected ? selectedRef : undefined}
            type="button"
            onClick={() => onSelect(option)}
            className={cn(
              'hover:bg-muted px-2 py-1.5 rounded-md text-sm text-center transition-colors shrink-0',
              selected && 'bg-primary text-primary-foreground hover:bg-primary/90',
            )}
          >
            {format ? format(option) : option}
          </button>
        )
      })}
    </div>
  )
}

export { TaskTimePicker }
