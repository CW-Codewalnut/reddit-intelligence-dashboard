import { Logo } from "@/shared/ui/logo";

export function LandingHeader() {
  return (
    <header className="bg-background/80 sticky top-0 z-50 border-b backdrop-blur-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Logo size="md" className="h-12 w-auto" />
          </div>
        </div>
      </div>
    </header>
  );
}
