import type { ReactNode } from "react";
import type { LucideIcon } from "lucide-react";

type EmptyStateProps = {
  /** Custom message to display */
  message?: string;
  /** Optional icon to display above the message */
  icon?: LucideIcon;
  /** Optional additional content or action buttons */
  children?: ReactNode;
};

export function EmptyState({ message = "No data found", icon: Icon, children }: EmptyStateProps) {
  return (
    <div className="text-muted-foreground flex flex-col items-center justify-center py-12 text-center">
      {Icon && <Icon className="mb-4 h-12 w-12 opacity-50" />}
      <p className="text-sm">{message}</p>
      {children && <div className="mt-4">{children}</div>}
    </div>
  );
}
