import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/card";
import { Hash, MessageSquare, Bell, TrendingUp } from "lucide-react";

export function LandingMonitoring() {
  return (
    <section className="container mx-auto px-4 py-16">
      <div className="mx-auto max-w-4xl">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold">What You Can Monitor</h2>
          <p className="text-muted-foreground text-lg">
            Comprehensive tracking across multiple data points
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          <Card className="border-l-lw-primary border-l-4">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Hash className="text-lw-primary h-5 w-5" />
                Keywords & Phrases
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Add and manage custom keywords to monitor across Reddit. Track brand mentions,
                product names, industry terms, and competitor discussions.
              </p>
            </CardContent>
          </Card>

          <Card className="border-l-lw-accent border-l-4">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="text-lw-accent h-5 w-5" />
                Posts & Comments
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                View all Reddit posts and comments that match your keywords. Get detailed insights
                including upvotes, timestamps, and engagement metrics.
              </p>
            </CardContent>
          </Card>

          <Card className="border-l-lw-purple border-l-4">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="text-lw-purple h-5 w-5" />
                Alert History
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Track all alerts sent based on keyword matches. Review recommendations and monitor
                response effectiveness over time.
              </p>
            </CardContent>
          </Card>

          <Card className="border-l-lw-amber border-l-4">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="text-lw-amber h-5 w-5" />
                Analytics & Stats
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Visualize your monitoring performance with key metrics. Track unique keywords,
                alerts sent, and threads found over time.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
