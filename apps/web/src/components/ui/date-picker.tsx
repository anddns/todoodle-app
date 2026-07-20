"use client"

import { format } from "date-fns"
import { CalendarIcon } from "lucide-react"

import { cn } from "@/web/lib/utils"
import { Button } from "@/web/components/ui/button"
import { Calendar } from "@/web/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/web/components/ui/popover"

interface DatePickerProps {
  value?: Date
  onChange: (date: Date | undefined) => void
  placeholder?: string
  className?: string
  id?: string
}

function DatePicker({
  value,
  onChange,
  placeholder = "Pick a date",
  className,
  id,
}: DatePickerProps) {
  return (
    <Popover>
      <PopoverTrigger
        render={
          <Button
            id={id}
            type="button"
            variant="outline"
            className={cn(
              "w-full justify-start font-normal",
              !value && "text-muted-foreground",
              className
            )}
          />
        }
      >
        <CalendarIcon className="opacity-60" />
        {value ? format(value, "PPP") : placeholder}
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar mode="single" selected={value} onSelect={onChange} autoFocus />
      </PopoverContent>
    </Popover>
  )
}

export { DatePicker }
