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
import { MultiSelect } from "@/shared/ui/multi-select";
import { useCreateKeyword, useUpdateKeyword } from "@/shared/hooks/mutations";
import { useClientSubreddits } from "@/shared/hooks/queries";
import type { KeywordWithClient } from "@/shared/types/database";

type KeywordDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  keyword?: KeywordWithClient | null;
  clientId: number | null;
  onSuccess?: () => void;
};

export function KeywordDialog({
  open,
  onOpenChange,
  keyword,
  clientId,
  onSuccess,
}: KeywordDialogProps) {
  const [keywordText, setKeywordText] = useState("");
  const [selectedSubreddits, setSelectedSubreddits] = useState<string[]>([]);
  const [email, setEmail] = useState("");
  const [includeComments, setIncludeComments] = useState(false);
  const [useRegex, setUseRegex] = useState(false);
  const [active, setActive] = useState(true);

  const createKeywordMutation = useCreateKeyword();
  const updateKeywordMutation = useUpdateKeyword();
  const { data: subreddits = [], isLoading: isLoadingSubreddits } = useClientSubreddits(
    clientId,
    !keyword
  );

  const loading = createKeywordMutation.isPending || updateKeywordMutation.isPending;

  useEffect(() => {
    if (keyword) {
      setKeywordText(keyword.keyword);
      setSelectedSubreddits([keyword.subreddit]);
      setEmail(keyword.email);
      setIncludeComments(keyword.include_comments);
      setUseRegex(keyword.use_regex);
      setActive(keyword.active);
    } else {
      setKeywordText("");
      setSelectedSubreddits([]);
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
            subreddit: selectedSubreddits[0] || "all",
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

        const keywords = keywordText
          .split(",")
          .map((k) => k.trim())
          .filter((k) => k.length > 0);

        if (keywords.length === 0) {
          throw new Error("Please enter at least one keyword");
        }

        if (selectedSubreddits.length === 0) {
          throw new Error("Please select at least one subreddit");
        }

        // Create keyword for each combination of keyword and subreddit
        const createPromises = [];
        for (const kw of keywords) {
          for (const subreddit of selectedSubreddits) {
            createPromises.push(
              createKeywordMutation.mutateAsync({
                clientId,
                keyword: {
                  keyword: kw,
                  subreddit,
                  email,
                  include_comments: includeComments,
                  use_regex: useRegex,
                  active,
                },
              })
            );
          }
        }

        await Promise.all(createPromises);
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
          <div className="max-h-[60vh] space-y-4 overflow-x-hidden overflow-y-auto px-1 py-4">
            <div className="space-y-2">
              <Label htmlFor="keyword">Keyword *</Label>
              <Input
                id="keyword"
                value={keywordText}
                onChange={(e) => setKeywordText(e.target.value)}
                required
                placeholder={keyword ? "Enter keyword or phrase" : "keyword1, keyword2, keyword3"}
                className="text-sm"
              />
              {!keyword && (
                <p className="text-muted-foreground text-xs">
                  You can enter multiple keywords separated by commas
                </p>
              )}
            </div>
            {keyword ? (
              <div className="space-y-2">
                <Label htmlFor="subreddit">Subreddit</Label>
                <Input
                  id="subreddit"
                  value={selectedSubreddits[0] || "all"}
                  onChange={(e) => setSelectedSubreddits([e.target.value || "all"])}
                  placeholder="all"
                  className="text-sm"
                />
                <p className="text-muted-foreground text-xs">
                  Leave as "all" to monitor all subreddits
                </p>
              </div>
            ) : (
              <div className="space-y-2">
                <Label>Subreddits *</Label>
                <MultiSelect
                  options={subreddits}
                  selected={selectedSubreddits}
                  onChange={setSelectedSubreddits}
                  placeholder="Select subreddits..."
                  disabled={isLoadingSubreddits}
                  allOption={true}
                  formatOption={(opt) => `r/${opt}`}
                />
                <p className="text-muted-foreground text-xs">
                  Select subreddits to monitor. Choose "All Subreddits" to monitor all.
                </p>
              </div>
            )}
            <div className="space-y-2">
              <Label htmlFor="email">Email *</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="alert@example.com"
                className="text-sm"
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
