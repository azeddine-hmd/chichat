import { format, isToday, isYesterday } from "date-fns";

export type FormatTimeOptions = {
  onlyDayTime?: boolean;
  full?: boolean;
  short?: boolean;
}

export function formatDayTimeString(time: string, opts?: FormatTimeOptions): string {
  if (opts?.onlyDayTime) {
    return format(time, "h:mm a");
  }
  if (opts?.full) {
    return format(time, "EEEE, MMMM d, yyyy h:mm a");
  }
  if (opts?.short) {
    return format(time, "MMMM d, yyyy");
  }
  if (isToday(time)) {
    return format(time, "'Today' 'at' h:mm a");
  } 
  if (isYesterday(time)) {
    return format(time, "'Yesterday' 'at' h:mm a");
  }
  return format(time, "MM/dd/yyyy h:mm a");
}
