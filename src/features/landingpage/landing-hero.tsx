import { Button } from "@/shared/ui/button";

interface LandingHeroProps {
  onViewDashboard: () => void;
  isLoading: boolean;
}

export function LandingHero({ onViewDashboard, isLoading }: LandingHeroProps) {
  return (
    <>
      <section className="container mx-auto px-4 py-16 md:py-24">
        <div className="mx-auto max-w-4xl space-y-6 text-center">
          <div className="inline-block">
            <div className="bg-lw-primary/10 text-lw-primary mb-6 rounded-full px-4 py-2 text-sm font-medium">
              Powered by Advanced Reddit Monitoring
            </div>
          </div>
          <h1 className="text-4xl font-bold tracking-tight md:text-6xl">
            Transform Reddit Conversations into{" "}
            <span className="text-lw-primary">Business Opportunities</span>
          </h1>
          <p className="text-muted-foreground mx-auto max-w-2xl text-xl">
            Monitor keywords, track discussions, and receive intelligent alerts from Reddit
            communities relevant to your business. Stay ahead with real-time insights.
          </p>
        </div>
      </section>

      <Button
        className="mx-auto block cursor-pointer"
        onClick={onViewDashboard}
        disabled={isLoading}
      >
        {isLoading ? "Loading..." : "View Dashboard"}
      </Button>
    </>
  );
}
