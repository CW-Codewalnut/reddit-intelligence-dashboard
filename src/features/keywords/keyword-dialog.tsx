import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/shared/ui/dialog";
import { Button } from "@/shared/ui/button";
import { Input } from "@/shared/ui/input";
import { Label } from "@/shared/ui/label";
import { Switch } from "@/shared/ui/switch";
import { useCreateKeyword, useUpdateKeyword } from "@/shared/hooks/mutations";
import type { KeywordWithClient } from "@/shared/types/database";

interface KeywordDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  keyword?: KeywordWithClient | null;
  clientId: number | null;
  onSuccess?: () => void;
}

export function KeywordDialog({
  open,
  onOpenChange,
  keyword,
  clientId,
  onSuccess,
}: KeywordDialogProps) {
  const [keywordText, setKeywordText] = useState("");
  const [subreddit, setSubreddit] = useState("all");
  const [email, setEmail] = useState("");
  const [includeComments, setIncludeComments] = useState(false);
  const [useRegex, setUseRegex] = useState(false);
  const [active, setActive] = useState(true);

  const createKeywordMutation = useCreateKeyword();
  const updateKeywordMutation = useUpdateKeyword();

  const loading = createKeywordMutation.isPending || updateKeywordMutation.isPending;

  useEffect(() => {
    if (keyword) {
      setKeywordText(keyword.keyword);
      setSubreddit(keyword.subreddit);
      setEmail(keyword.email);
      setIncludeComments(keyword.include_comments);
      setUseRegex(keyword.use_regex);
      setActive(keyword.active);
    } else {
      setKeywordText("");
      setSubreddit("all");
      setEmail("");
      setIncludeComments(false);
      setUseRegex(false);
      setActive(true);
    }
  }, [keyword, open]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (keyword) {
        await updateKeywordMutation.mutateAsync({
          id: keyword.id,
          updates: {
            keyword: keywordText,
            subreddit,
            email,
            include_comments: includeComments,
            use_regex: useRegex,
            active,
          },
        });
      } else {
        if (!clientId) {
          throw new Error("Client ID is required");
        }
        await createKeywordMutation.mutateAsync({
          clientId,
          keyword: {
            keyword: keywordText,
            subreddit,
            email,
            include_comments: includeComments,
            use_regex: useRegex,
            active,
          },
        });
      }
      onSuccess?.();
      onOpenChange(false);
    } catch (error) {
      console.error("Failed to save keyword:", error);
      alert("Failed to save keyword. Please try again.");
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>{keyword ? "Edit Keyword" : "Create New Keyword"}</DialogTitle>
            <DialogDescription>
              {keyword
                ? "Update keyword monitoring settings"
                : "Add a new keyword to monitor on Reddit"}
            </DialogDescription>
          </DialogHeader>
          <div className="max-h-[60vh] space-y-4 overflow-y-auto py-4">
            <div className="space-y-2">
              <Label htmlFor="keyword">Keyword *</Label>
              <Input
                id="keyword"
                value={keywordText}
                onChange={(e) => setKeywordText(e.target.value)}
                required
                placeholder="Enter keyword or phrase"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="subreddit">Subreddit</Label>
              <Input
                id="subreddit"
                value={subreddit}
                onChange={(e) => setSubreddit(e.target.value)}
                placeholder="all"
              />
              <p className="text-muted-foreground text-xs">
                Leave as "all" to monitor all subreddits
              </p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email *</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="alert@example.com"
              />
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="comments">Include Comments</Label>
                <p className="text-muted-foreground text-xs">
                  Monitor comments in addition to posts
                </p>
              </div>
              <Switch
                id="comments"
                checked={includeComments}
                onCheckedChange={setIncludeComments}
              />
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="regex">Use Regex</Label>
                <p className="text-muted-foreground text-xs">
                  Treat keyword as a regular expression
                </p>
              </div>
              <Switch id="regex" checked={useRegex} onCheckedChange={setUseRegex} />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="active">Active</Label>
              <Switch id="active" checked={active} onCheckedChange={setActive} />
            </div>
          </div>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              className="cursor-pointer"
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>
            <Button type="submit" className="cursor-pointer" disabled={loading}>
              {loading ? "Saving..." : keyword ? "Update" : "Create"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
