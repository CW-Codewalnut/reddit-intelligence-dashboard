import { useEffect, useState, useMemo } from "react";
import { getKeywords, deleteKeyword, getClients } from "@/lib/utils/api";
import type { KeywordWithClient } from "@/types/database";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Plus, Edit, Trash2, Hash } from "lucide-react";
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
import { useParams } from "react-router-dom";

export function KeywordList() {
  const params = useParams();
  const clientName = params.id;
  const [allKeywords, setAllKeywords] = useState<KeywordWithClient[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingKeyword, setEditingKeyword] = useState<KeywordWithClient | null>(null);
  const [clientId, setClientId] = useState<number | null>(null);

  const loadKeywords = async () => {
    try {
      if (!clientName) return;

      // Resolve client ID if not already set
      let currentClientId = clientId;
      if (!currentClientId) {
        const clients = await getClients();
        const client = clients.find((c) => c.name.toLowerCase() === clientName.toLowerCase());
        if (client) {
          currentClientId = client.id;
          setClientId(client.id);
        }
      }

      const data = await getKeywords(clientName);
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

  const groupedKeywords = useMemo(() => {
    const groups = new Map<string, KeywordWithClient[]>();
    allKeywords.forEach((keyword) => {
      const subreddit = keyword.subreddit;
      if (!groups.has(subreddit)) {
        groups.set(subreddit, []);
      }
      groups.get(subreddit)!.push(keyword);
    });
    return Array.from(groups.entries()).sort(([a], [b]) => a.localeCompare(b));
  }, [allKeywords]);

  const handleEdit = (keyword: KeywordWithClient) => {
    setEditingKeyword(keyword);
    setDialogOpen(true);
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this keyword?")) return;
    try {
      await deleteKeyword(id);
      loadKeywords();
    } catch (error) {
      console.error("Failed to delete keyword:", error);
    }
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
          <h1 className="text-3xl font-bold tracking-tight">Keywords Alerts</h1>
          <p className="text-muted-foreground">Manage keywords Alerts to monitor on Reddit</p>
        </div>
      </div>

      <Card className="border-lw-amber/20">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <CardTitle>All Keywords Alerts</CardTitle>
            </div>
            <Button variant="gradient" onClick={() => setDialogOpen(true)}>
              <Plus className="mr-2 h-4 w-4" />
              Add Keyword
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {groupedKeywords.length === 0 ? (
            <div className="text-muted-foreground py-8 text-center">
              No keywords found. Create your first keyword to start monitoring.
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Subreddit</TableHead>
                  <TableHead>Keyword</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Created</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {groupedKeywords.map(([subreddit, keywords]) => (
                  <>
                    {keywords.map((keyword, index) => (
                      <TableRow key={keyword.id}>
                        {index === 0 ? (
                          <TableCell
                            rowSpan={keywords.length}
                            className="bg-muted/30 border-r align-top font-semibold"
                          >
                            <Badge variant="amber" className="text-sm">
                              {formatSubreddit(subreddit)}
                            </Badge>
                            <div className="text-muted-foreground mt-1 text-xs">
                              {keywords.length} keyword{keywords.length !== 1 ? "s" : ""}
                            </div>
                          </TableCell>
                        ) : null}
                        <TableCell className="font-medium">
                          <div className="flex items-center gap-2">
                            <Hash className="text-muted-foreground h-4 w-4" />
                            {keyword.keyword}
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant={keyword.active ? "success" : "outline"}>
                            {keyword.active ? "Active" : "Inactive"}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-muted-foreground text-sm">
                          {formatDate(keyword.created_at)}
                        </TableCell>
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
                  </>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
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
        clientId={clientId}
        onSuccess={loadKeywords}
      />
    </div>
  );
}
