import { FormatTimeOptions, formatDayTimeString } from "@/lib/format-date";
import Tooltip from "./tooltip";
import React from "react";
import { cn } from "@/lib/utils";

export type TimeComponentProps  = {
	time: string;
	disableHoverInfo?: boolean;
	opts?: FormatTimeOptions;
} & React.ComponentProps<"div">;

export default function TimeComponent({ time, opts, disableHoverInfo = false, className, ...restProps}: TimeComponentProps) {
	const dateString = formatDayTimeString(time, opts);
	return (
		<Tooltip open={disableHoverInfo ? false : undefined}>
			<Tooltip.Content content={formatDayTimeString(time, { full: true })} />
			<Tooltip.Trigger>
				<div className={cn("!cursor-default", className)} {...restProps}>
					{dateString}
				</div>
			</Tooltip.Trigger>
		</Tooltip>
	)
}
