import { useEffect, useState } from "react";
import { getKeywords } from "@/lib/utils/api";
import type { KeywordWithClient } from "@/types/database";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Plus, Edit, Trash2, Hash, Mail } from "lucide-react";
import { formatDate, formatSubreddit } from "@/lib/utils/formatters";
import { KeywordDialog } from "./keyword-dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useParams } from "react-router-dom";

export function KeywordList() {
  const params = useParams();
  const clientName = params.id;
  const [allKeywords, setAllKeywords] = useState<KeywordWithClient[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingKeyword, setEditingKeyword] = useState<KeywordWithClient | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const loadKeywords = async () => {
    try {
      const data = await getKeywords(clientName ?? "");
      setAllKeywords(data);
    } catch (error) {
      console.error("Failed to load keywords:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadKeywords();
  }, []);

  // Client-side pagination
  const totalPages = Math.ceil(allKeywords.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const keywords = allKeywords.slice(startIndex, endIndex);

  // Calculate unique keywords (case-insensitive)
  const uniqueKeywordsCount = new Set(allKeywords.map((k) => k.keyword.toLowerCase())).size;

  const handleEdit = (keyword: KeywordWithClient) => {
    setEditingKeyword(keyword);
    setDialogOpen(true);
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this keyword?")) return;
    // TODO: Implement delete functionality
    console.log("Delete keyword:", id);
  };

  if (loading) {
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <Skeleton className="mb-2 h-8 w-48" />
            <Skeleton className="h-4 w-96" />
          </div>
          <Skeleton className="h-10 w-32" />
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
        <div className="from-lw-amber/10 to-lw-primary/10 absolute inset-0 -z-10 rounded-xl bg-gradient-to-r"></div>
        <div className="px-6 py-6">
          <h1 className="text-3xl font-bold tracking-tight">Keywords</h1>
          <p className="text-muted-foreground">Manage keywords to monitor on Reddit</p>
        </div>
      </div>

      <Card className="border-lw-amber/20">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>All Keywords</CardTitle>
              <CardDescription>
                {allKeywords.length} active keyword{allKeywords.length !== 1 ? "s" : ""} configured
                {allKeywords.length > 0 && allKeywords.length !== uniqueKeywordsCount && (
                  <span className="text-muted-foreground/70"> ({uniqueKeywordsCount} unique)</span>
                )}
              </CardDescription>
            </div>
            <Button variant="gradient" onClick={() => setDialogOpen(true)}>
              <Plus className="mr-2 h-4 w-4" />
              Add Keyword
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {keywords.length === 0 ? (
            <div className="text-muted-foreground py-8 text-center">
              No keywords found. Create your first keyword to start monitoring.
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Keyword</TableHead>
                  <TableHead>Subreddit</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Created</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {keywords.map((keyword) => (
                  <TableRow key={keyword.id}>
                    <TableCell className="font-medium">
                      <div className="flex items-center gap-2">
                        <Hash className="text-muted-foreground h-4 w-4" />
                        {keyword.keyword}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="amber">{formatSubreddit(keyword.subreddit)}</Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Mail className="text-muted-foreground h-4 w-4" />
                        {keyword.email}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant={keyword.active ? "success" : "outline"}>
                        {keyword.active ? "Active" : "Inactive"}
                      </Badge>
                    </TableCell>
                    <TableCell>{formatDate(keyword.created_at)}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button variant="ghost" size="icon" onClick={() => handleEdit(keyword)}>
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleDelete(keyword.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
        {!loading && allKeywords.length > itemsPerPage && (
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

      <KeywordDialog
        open={dialogOpen}
        onOpenChange={(open: boolean) => {
          setDialogOpen(open);
          if (!open) {
            setEditingKeyword(null);
          }
        }}
        keyword={editingKeyword}
        onSuccess={loadKeywords}
      />
    </div>
  );
}
