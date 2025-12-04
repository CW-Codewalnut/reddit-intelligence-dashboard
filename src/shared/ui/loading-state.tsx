import { Card, CardContent } from "@/shared/ui/card";
import { Skeleton } from "@/shared/ui/skeleton";

type LoadingStateProps = {
  /** Number of skeleton items to show */
  items?: number;
  /** Height of each skeleton item */
  itemHeight?: string;
  /** Show header skeletons */
  showHeader?: boolean;
};

export function LoadingState({
  items = 5,
  itemHeight = "h-32",
  showHeader = true
}: LoadingStateProps) {
  return (
    <div className="space-y-4">
      {showHeader && (
        <div>
          <Skeleton className="mb-2 h-8 w-48" />
          <Skeleton className="h-4 w-96" />
        </div>
      )}
      <Card>
        <CardContent className="p-6">
          <div className="space-y-4">
            {[...Array(items)].map((_, i) => (
              <Skeleton key={i} className={`${itemHeight} w-full`} />
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
