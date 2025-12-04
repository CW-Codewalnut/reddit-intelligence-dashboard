import { Card, CardContent } from "@/shared/ui/card";
import { Badge } from "@/shared/ui/badge";
import { Button } from "@/shared/ui/button";
import { ExternalLink, TrendingUp } from "lucide-react";
import { formatRelativeTime } from "@/lib/formatters";
import type { AiSuggestion } from "@/shared/types/database";
import { ResourcesList } from "./resources-list";

interface SuggestionCardProps {
  suggestion: AiSuggestion;
}

export function SuggestionCard({ suggestion }: SuggestionCardProps) {
  return (
    <Card className="border-lw-neutral-cloud hover:border-lw-primary-light dark:hover:border-lw-primary-dark transition-all">
      <CardContent className="p-4">
        <div className="space-y-3">
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
              <h3 className="text-foreground mb-2 text-lg font-semibold">
                {suggestion.post_title}
              </h3>
              <div className="flex flex-wrap items-center gap-2 text-sm">
                <Badge variant="outline" className="gap-1">
                  <span className="text-muted-foreground">r/{suggestion.subreddit}</span>
                </Badge>
                <Badge variant="accent" className="gap-1">
                  {suggestion.keyword}
                </Badge>
                <div className="flex items-center gap-1">
                  <TrendingUp className="text-lw-primary h-4 w-4" />
                  <span className="text-lw-primary text-sm font-medium">
                    {suggestion.relevance_score}/10
                  </span>
                </div>
              </div>
            </div>
            <Button variant="outline" size="sm" asChild>
              <a
                href={suggestion.post_url}
                target="_blank"
                rel="noopener noreferrer"
                className="gap-2"
              >
                <ExternalLink className="h-4 w-4" />
                View Post
              </a>
            </Button>
          </div>

          {suggestion.user_intent && (
            <div className="border-lw-neutral-cloud bg-muted/50 rounded-lg border p-3">
              <p className="text-muted-foreground text-sm font-medium">
                <span className="text-foreground font-semibold">User Intent: </span>
                {suggestion.user_intent}
              </p>
            </div>
          )}

          {suggestion.suggestion_text && (
            <div className="bg-lw-primary-pale dark:bg-lw-primary-darker rounded-lg p-3">
              <p className="text-lw-primary-dark dark:text-lw-primary-light text-sm font-medium">
                <span className="font-semibold">AI Suggestion: </span>
                {suggestion.suggestion_text}
              </p>
            </div>
          )}

          <ResourcesList resources={suggestion.resources} />

          <div className="text-muted-foreground flex items-center gap-4 border-t pt-3 text-xs">
            <div>
              <span className="font-medium">Author: </span>
              {suggestion.post_author}
            </div>
            <div>
              <span className="font-medium">Generated: </span>
              {formatRelativeTime(suggestion.generated_at)}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
