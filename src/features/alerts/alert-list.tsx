import { useEffect, useState } from "react";
import { getAllAlerts, getClients } from "@/lib/api";
import type { Alert } from "@/shared/types/database";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/card";
import { Badge } from "@/shared/ui/badge";
import { formatDateTime, formatRelativeTime } from "@/lib/formatters";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/shared/ui/table";
import { Skeleton } from "@/shared/ui/skeleton";
import { ExternalLink, Hash } from "lucide-react";
import { Button } from "@/shared/ui/button";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/shared/ui/pagination";
import { useParams } from "react-router-dom";
export function AlertList() {
  const [allAlerts, setAllAlerts] = useState<Alert[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const params = useParams();
  const clientName = params.id;
  const loadAlerts = async () => {
    if (!clientName) {
      setLoading(false);
      return;
    }

    setLoading(true);

    try {
      const clients = await getClients();
      const client = clients.find((c) => c.name.toLowerCase() === clientName.toLowerCase());
      if (client) {
        const data = await getAllAlerts({ client_id: client.id });
        setAllAlerts(data);
      }
    } catch (error) {
      console.error("Failed to load alerts:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAlerts();
  }, [clientName]);

  const totalPages = Math.ceil(allAlerts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const alerts = allAlerts.slice(startIndex, endIndex);

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
        <div className="from-lw-purple/10 to-lw-crimson/10 absolute inset-0 -z-10 rounded-xl bg-linear-to-r"></div>
        <div className="px-6 py-6">
          <div className="flex items-center gap-3">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Alerts</h1>
              <p className="text-muted-foreground">View all alerts sent to clients</p>
            </div>
          </div>
        </div>
      </div>

      <Card className="border-lw-purple/20">
        <CardHeader>
          <CardTitle>All Alerts</CardTitle>
        </CardHeader>
        <CardContent>
          {alerts.length === 0 ? (
            <div className="text-muted-foreground py-8 text-center">
              No alerts found. Alerts will appear here when keywords are matched.
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Sent At</TableHead>
                  <TableHead>Keyword</TableHead>
                  <TableHead>Reddit Thread Title</TableHead>
                  <TableHead>Reddit Thread URL</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {alerts.map((alert) => (
                  <TableRow key={alert.id}>
                    <TableCell>
                      <div className="flex flex-col">
                        <span className="text-sm">{formatDateTime(alert.sent_at)}</span>
                        <span className="text-muted-foreground text-xs">
                          {formatRelativeTime(alert.sent_at)}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="accent">
                        <Hash className="mr-1 h-3 w-3" />
                        {alert.matched_keyword}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="max-w-md truncate">{alert.post_title || "No title"}</div>
                    </TableCell>

                    <TableCell>
                      {alert.post_url && (
                        <Button variant="ghost" size="icon" asChild>
                          <a href={alert.post_url} target="_blank" rel="noopener noreferrer">
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
        {!loading && allAlerts.length > itemsPerPage && (
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
