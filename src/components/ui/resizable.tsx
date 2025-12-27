"use client";

import * as React from "react";
import { GripVerticalIcon } from "lucide-react";
import {
  PanelGroup,
  Panel,
  PanelResizeHandle,
} from "react-resizable-panels"; // ✅ correct named imports
import { cn } from "./utils .js";

// ---- Types ----
type PanelGroupProps = React.ComponentProps<typeof PanelGroup>;
type PanelProps = React.ComponentProps<typeof Panel>;
type HandleProps = React.ComponentProps<typeof PanelResizeHandle> & {
  withHandle?: boolean;
};

// ---- Components ----
export function ResizablePanelGroup({ className, ...props }: PanelGroupProps) {
  return (
    <PanelGroup
      data-slot="resizable-panel-group"
      className={cn(
        "flex h-full w-full data-[panel-group-direction=vertical]:flex-col",
        className
      )}
      {...props}
    />
  );
}

export function ResizablePanel(props: PanelProps) {
  return <Panel data-slot="resizable-panel" {...props} />;
}

export function ResizableHandle({
  withHandle,
  className,
  ...props
}: HandleProps) {
  return (
    <PanelResizeHandle
      data-slot="resizable-handle"
      className={cn(
        "bg-border relative flex w-px items-center justify-center " +
          "data-[panel-group-direction=vertical]:h-px data-[panel-group-direction=vertical]:w-full",
        className
      )}
      {...props}
    >
      {withHandle && (
        <div className="bg-border z-10 flex h-4 w-3 items-center justify-center rounded-xs border">
          <GripVerticalIcon className="size-2.5" />
        </div>
      )}
    </PanelResizeHandle>
  );
}
