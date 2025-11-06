import { useEffect, useState } from "react";
import { getProcessedPosts } from "@/lib/utils/api";
import type { ProcessedPost } from "@/types/database";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
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
import { ExternalLink, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

export function PostList() {
  const [allPosts, setAllPosts] = useState<ProcessedPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const loadPosts = async () => {
    try {
      const data = await getProcessedPosts(100);
      setAllPosts(data);
    } catch (error) {
      console.error("Failed to load posts:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPosts();
  }, []);

  // Client-side pagination
  const totalPages = Math.ceil(allPosts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const posts = allPosts.slice(startIndex, endIndex);

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
        <div className="from-lw-primary/10 to-lw-amber/10 absolute inset-0 -z-10 rounded-xl bg-gradient-to-r"></div>
        <div className="px-6 py-6">
          <h1 className="text-3xl font-bold tracking-tight">Processed Posts</h1>
          <p className="text-muted-foreground">View all Reddit posts that have been processed</p>
        </div>
      </div>

      <Card className="border-lw-primary/20">
        <CardHeader>
          <CardTitle>All Posts</CardTitle>
          {/* <CardDescription>
            {posts.length} post{posts.length !== 1 ? "s" : ""} processed
          </CardDescription> */}
        </CardHeader>
        <CardContent>
          {posts.length === 0 ? (
            <div className="text-muted-foreground py-8 text-center">
              No posts found. Posts will appear here as they are processed.
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead>Author</TableHead>
                  <TableHead>Subreddit</TableHead>
                  <TableHead>Processed</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {posts.map((post) => (
                  <TableRow key={post.id}>
                    <TableCell className="max-w-md font-medium">
                      <div className="truncate">{post.title || "No title"}</div>
                    </TableCell>
                    <TableCell>
                      {post.author ? (
                        <div className="flex items-center gap-2">
                          <User className="text-muted-foreground h-4 w-4" />
                          <span className="text-sm">{post.author}</span>
                        </div>
                      ) : (
                        <span className="text-muted-foreground text-sm">Unknown</span>
                      )}
                    </TableCell>
                    <TableCell>
                      {post.subreddit && <Badge variant="amber">r/{post.subreddit}</Badge>}
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-col">
                        <span className="text-sm">{formatDateTime(post.processed_timestamp)}</span>
                        <span className="text-muted-foreground text-xs">
                          {formatRelativeTime(post.processed_timestamp)}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>
                      {post.url && (
                        <Button variant="ghost" size="icon" asChild>
                          <a href={post.url} target="_blank" rel="noopener noreferrer">
                            <ExternalLink className="h-4 w-4" />
                          </a>
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
        {!loading && allPosts.length > itemsPerPage && (
          <div className="border-t p-4">
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      setCurrentPage((p) => Math.max(1, p - 1));
                    }}
                    className={
                      currentPage === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"
                    }
                  />
                </PaginationItem>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <PaginationItem key={page}>
                    <PaginationLink
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        setCurrentPage(page);
                      }}
                      isActive={currentPage === page}
                      className="cursor-pointer"
                    >
                      {page}
                    </PaginationLink>
                  </PaginationItem>
                ))}
                <PaginationItem>
                  <PaginationNext
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      setCurrentPage((p) => Math.min(totalPages, p + 1));
                    }}
                    className={
                      currentPage === totalPages
                        ? "pointer-events-none opacity-50"
                        : "cursor-pointer"
                    }
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        )}
      </Card>
    </div>
  );
}
