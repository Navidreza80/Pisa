"use client";

import { useState } from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { cn } from "@/lib/utils";

export function DateTimePicker() {
  const [date, setDate] = useState<Date>();
  const [hour, setHour] = useState<string>("12");
  const [minute, setMinute] = useState<string>("00");
  const [amPm, setAmPm] = useState<"AM" | "PM">("AM");

  const handleDateSelect = (selectedDate: Date | undefined) => {
    if (!selectedDate) return;
    
    // Combine with existing time if available
    if (date) {
      const hours = amPm === "PM" ? parseInt(hour) + 12 : parseInt(hour);
      selectedDate.setHours(hours, parseInt(minute));
    }
    
    setDate(selectedDate);
  };

  const getDateTimeString = () => {
    if (!date) return "No date selected";
    
    const hours = amPm === "PM" ? parseInt(hour) + 12 : parseInt(hour);
    const dateWithTime = new Date(date);
    dateWithTime.setHours(hours, parseInt(minute));
    
    return format(dateWithTime, "yyyy-MM-dd HH:mm:ss");
  };

  const getDateTimeISO = () => {
    if (!date) return null;
    
    const hours = amPm === "PM" ? parseInt(hour) + 12 : parseInt(hour);
    const dateWithTime = new Date(date);
    dateWithTime.setHours(hours, parseInt(minute));
    
    return dateWithTime.toISOString();
  };

  return (
    <div className="space-y-4">
      {/* Date Picker */}
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant={"outline"}
            className={cn(
              "w-full justify-start text-left font-normal",
              !date && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date ? format(date, "PPP") : <span>Pick a date</span>}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0">
          <Calendar
            mode="single"
            selected={date}
            onSelect={handleDateSelect}
            initialFocus
          />
        </PopoverContent>
      </Popover>

      {/* Time Picker */}
      <div className="flex space-x-2">
        <Select value={hour} onValueChange={setHour}>
          <SelectTrigger className="w-20">
            <SelectValue placeholder="Hour" />
          </SelectTrigger>
          <SelectContent>
            {Array.from({ length: 12 }, (_, i) => (
              <SelectItem key={i} value={(i + 1).toString().padStart(2, '0')}>
                {(i + 1).toString().padStart(2, '0')}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={minute} onValueChange={setMinute}>
          <SelectTrigger className="w-20">
            <SelectValue placeholder="Min" />
          </SelectTrigger>
          <SelectContent>
            {Array.from({ length: 60 }, (_, i) => (
              <SelectItem key={i} value={i.toString().padStart(2, '0')}>
                {i.toString().padStart(2, '0')}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={amPm} onValueChange={(val: "AM" | "PM") => setAmPm(val)}>
          <SelectTrigger className="w-20">
            <SelectValue placeholder="AM/PM" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="AM">AM</SelectItem>
            <SelectItem value="PM">PM</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Output */}
      <div className="mt-4 p-4 bg-muted rounded-md">
        <p className="text-sm text-muted-foreground">Selected DateTime:</p>
        <p className="font-medium">{getDateTimeString()}</p>
        <p className="text-sm text-muted-foreground mt-2">ISO Format:</p>
        <p className="font-mono text-sm">{getDateTimeISO() || "null"}</p>
      </div>
    </div>
  );
}