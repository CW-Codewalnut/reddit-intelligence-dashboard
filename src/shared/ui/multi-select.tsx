import * as React from "react";
import { Check, ChevronDown, X } from "lucide-react";
import { cn } from "@/lib/cn";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";
import { Button } from "./button";
import { Badge } from "./badge";
import { Checkbox } from "./checkbox";

type MultiSelectProps = {
  options: string[];
  selected: string[];
  onChange: (selected: string[]) => void;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
  allOption?: boolean;
  formatOption?: (option: string) => string;
};

export function MultiSelect({
  options,
  selected,
  onChange,
  placeholder = "Select items...",
  className,
  disabled = false,
  allOption = false,
  formatOption = (opt) => opt,
}: MultiSelectProps) {
  const [open, setOpen] = React.useState(false);

  const handleToggle = (option: string) => {
    if (option === "all") {
      if (selected.includes("all") || selected.length === options.length) {
        // If "all" is selected or all options are selected, deselect everything
        onChange([]);
      } else {
        // Select all available options
        onChange([...options]);
      }
      return;
    }

    const withoutAll = selected.filter((s) => s !== "all");

    if (selected.includes(option)) {
      const updated = withoutAll.filter((s) => s !== option);
      onChange(updated.length === 0 ? [] : updated);
    } else {
      onChange([...withoutAll, option]);
    }
  };

  const handleRemove = (option: string, e?: React.MouseEvent) => {
    e?.stopPropagation();
    const updated = selected.filter((s) => s !== option);
    onChange(updated.length === 0 ? [] : updated);
  };

  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation();
    onChange([]);
  };

  const displayText = React.useMemo(() => {
    if (selected.length === 0) {
      return placeholder;
    }
    if (selected.includes("all") || (allOption && selected.length === options.length)) {
      return "All Subreddits";
    }
    return `${selected.length} selected`;
  }, [selected, placeholder, allOption, options.length]);

  const selectedItems = selected.filter((s) => s !== "all");
  const isAllSelected =
    selected.includes("all") || (allOption && selected.length === options.length);

  return (
    <div className="space-y-2">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className={cn(
              "w-full justify-between font-normal",
              selected.length === 0 && "text-muted-foreground",
              className
            )}
            disabled={disabled}
          >
            <span className="truncate">{displayText}</span>
            <ChevronDown className="ml-auto h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-full p-0" align="start">
          <div
            className="max-h-64 overflow-x-hidden overflow-y-auto p-2"
            onWheel={(e) => {
              e.stopPropagation();
            }}
            style={{ overscrollBehavior: "contain" }}
          >
            {allOption && (
              <div
                className="hover:bg-accent flex cursor-pointer items-center space-x-2 rounded-sm px-2 py-1.5"
                onClick={() => handleToggle("all")}
              >
                <Checkbox checked={isAllSelected} onCheckedChange={() => handleToggle("all")} />
                <span className="text-sm font-medium">All Subreddits</span>
              </div>
            )}
            {options.map((option) => (
              <div
                key={option}
                className="hover:bg-accent flex cursor-pointer items-center space-x-2 rounded-sm px-2 py-1.5"
                onClick={() => handleToggle(option)}
              >
                <Checkbox
                  checked={selected.includes(option)}
                  onCheckedChange={() => handleToggle(option)}
                />
                <span className="text-sm">{formatOption(option)}</span>
                {selected.includes(option) && !selected.includes("all") && (
                  <Check className="ml-auto h-4 w-4" />
                )}
              </div>
            ))}
            {options.length === 0 && (
              <div className="text-muted-foreground px-2 py-6 text-center text-sm">
                No options available
              </div>
            )}
          </div>
        </PopoverContent>
      </Popover>

      {selectedItems.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {selectedItems.map((item) => (
            <Badge
              key={item}
              variant="secondary"
              className="flex items-center gap-1 px-2 py-1 text-sm"
            >
              <span>{formatOption(item)}</span>
              <button
                type="button"
                onClick={(e) => handleRemove(item, e)}
                className="hover:bg-muted-foreground/20 ml-1 rounded-full focus:outline-none"
                disabled={disabled}
              >
                <X className="h-3 w-3" />
              </button>
            </Badge>
          ))}
        </div>
      )}
    </div>
  );
}
