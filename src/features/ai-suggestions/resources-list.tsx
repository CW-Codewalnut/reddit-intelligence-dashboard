import { ExternalLink, BookOpen } from "lucide-react";
import type { Resource } from "@/shared/types/database";

interface ResourcesListProps {
  resources: Resource[];
}

export function ResourcesList({ resources }: ResourcesListProps) {
  if (!resources || resources.length === 0) {
    return null;
  }

  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2 text-sm font-semibold">
        <BookOpen className="h-4 w-4" />
        <span>Resources:</span>
      </div>
      <div className="space-y-2">
        {resources.map((resource, idx) => (
          <a
            key={idx}
            href={resource.url}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:bg-muted/50 flex items-start gap-2 rounded-md border p-2 transition-colors"
          >
            <ExternalLink className="text-lw-primary mt-1 h-4 w-4 shrink-0" />
            <div className="flex-1">
              <p className="text-foreground text-sm font-medium">{resource.title}</p>
              {resource.snippet && (
                <p className="text-muted-foreground text-xs">{resource.snippet}</p>
              )}
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}
