import { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/card";
import { Lightbulb } from "lucide-react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/shared/ui/pagination";
import { useParams } from "react-router-dom";
import { SuggestionCard } from "./suggestion-card";
import { LoadingState } from "@/shared/ui/loading-state";
import { EmptyState } from "@/shared/ui/empty-state";
import { useClients, useAiSuggestions } from "@/shared/hooks/queries";

export function AiSuggestions() {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const params = useParams();
  const clientName = params.id;

  const { data: clients } = useClients();
  const client = useMemo(
    () => clients?.find((c) => c.name.toLowerCase() === clientName?.toLowerCase()),
    [clients, clientName]
  );

  const { data: allSuggestions = [], isLoading: loading } = useAiSuggestions({
    client_id: client?.id,
  });

  const totalPages = Math.ceil(allSuggestions.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const suggestions = allSuggestions.slice(startIndex, endIndex);

  if (loading) {
    return <LoadingState />;
  }

  return (
    <div className="space-y-4">
      <div className="relative">
        <div className="from-lw-purple/10 to-lw-crimson/10 absolute inset-0 -z-10 rounded-xl bg-linear-to-r"></div>
        <div className="px-6 py-6">
          <div className="flex items-center gap-3">
            <Lightbulb className="text-lw-primary h-8 w-8" />
            <div>
              <h1 className="text-3xl font-bold tracking-tight">AI Suggestions</h1>
              <p className="text-muted-foreground">
                AI-generated suggestions for Reddit posts matching your keywords
              </p>
            </div>
          </div>
        </div>
      </div>

      <Card className="border-lw-purple/20">
        <CardHeader>
          <CardTitle>
            All Suggestions
            <span className="text-muted-foreground ml-2 text-sm font-normal">
              ({allSuggestions.length} total)
            </span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {suggestions.length === 0 ? (
            <EmptyState
              message="No AI suggestions found. Suggestions will appear here when posts match your keywords."
              icon={Lightbulb}
            />
          ) : (
            <div className="space-y-4">
              {suggestions.map((suggestion) => (
                <SuggestionCard key={suggestion.id} suggestion={suggestion} />
              ))}
            </div>
          )}
        </CardContent>

        {!loading && allSuggestions.length > itemsPerPage && (
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
