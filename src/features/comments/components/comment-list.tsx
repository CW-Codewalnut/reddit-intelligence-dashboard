import { useEffect, useState } from "react";
import { getProcessedComments } from "@/lib/utils/api";
import type { ProcessedComment } from "@/types/database";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { formatDateTime, formatRelativeTime } from "@/lib/utils/formatters";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";
import { User } from "lucide-react";

export function CommentList() {
  const [comments, setComments] = useState<ProcessedComment[]>([]);
  const [loading, setLoading] = useState(true);

  const loadComments = async () => {
    try {
      const data = await getProcessedComments(100);
      setComments(data);
    } catch (error) {
      console.error("Failed to load comments:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadComments();
  }, []);

  if (loading) {
    return (
      <div className="space-y-4">
        <div>
          <Skeleton className="mb-2 h-8 w-48" />
          <Skeleton className="h-4 w-96" />
        </div>
        <Card>
          <CardContent className="p-6">
            <div className="space-y-4">
              {[...Array(5)].map((_, i) => (
                <Skeleton key={i} className="h-12 w-full" />
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="relative">
        <div className="from-lw-accent/10 to-lw-purple/10 absolute inset-0 -z-10 rounded-xl bg-gradient-to-r"></div>
        <div className="px-6 py-6">
          <h1 className="text-3xl font-bold tracking-tight">Processed Comments</h1>
          <p className="text-muted-foreground">View all Reddit comments that have been processed</p>
        </div>
      </div>

      <Card className="border-lw-accent/20">
        <CardHeader>
          <CardTitle>All Comments</CardTitle>
          <CardDescription>
            {comments.length} comment{comments.length !== 1 ? "s" : ""} processed
          </CardDescription>
        </CardHeader>
        <CardContent>
          {comments.length === 0 ? (
            <div className="text-muted-foreground py-8 text-center">
              No comments found. Comments will appear here as they are processed.
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Comment</TableHead>
                  <TableHead>Author</TableHead>
                  <TableHead>Post ID</TableHead>
                  <TableHead>Processed</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {comments.map((comment) => (
                  <TableRow key={comment.id}>
                    <TableCell className="max-w-md">
                      <div className="truncate">{comment.body || "No content"}</div>
                    </TableCell>
                    <TableCell>
                      {comment.author ? (
                        <div className="flex items-center gap-2">
                          <User className="text-muted-foreground h-4 w-4" />
                          <span className="text-sm">{comment.author}</span>
                        </div>
                      ) : (
                        <span className="text-muted-foreground text-sm">Unknown</span>
                      )}
                    </TableCell>
                    <TableCell>
                      <code className="bg-lw-neutral-pearl dark:bg-lw-neutral-cloud text-lw-neutral-charcoal dark:text-lw-neutral-pearl rounded px-2 py-1 text-xs">
                        {comment.post_id.substring(0, 8)}...
                      </code>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-col">
                        <span className="text-sm">
                          {formatDateTime(comment.processed_timestamp)}
                        </span>
                        <span className="text-muted-foreground text-xs">
                          {formatRelativeTime(comment.processed_timestamp)}
                        </span>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
