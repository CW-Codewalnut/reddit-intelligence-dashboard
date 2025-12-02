import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Logo } from "@/components/ui/logo";
import {
  Search,
  Bell,
  Target,
  TrendingUp,
  MessageSquare,
  Activity,
  Eye,
  Filter,
  Clock,
  Zap,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

export function Landing() {
  const FEATURES = [
    {
      icon: Search,
      title: "Keyword Monitoring",
      description:
        "Track specific keywords across Reddit to identify relevant discussions and opportunities in real-time.",
    },
    {
      icon: Target,
      title: "Intelligent Targeting",
      description:
        "Focus on the most relevant subreddits and threads that match your business interests and criteria.",
    },
    {
      icon: Bell,
      title: "Smart Alerts",
      description:
        "Get instant notifications when important threads or discussions are detected based on your keywords.",
    },
    {
      icon: MessageSquare,
      title: "Thread Analysis",
      description:
        "Deep dive into Reddit threads with detailed analytics, sentiment analysis, and engagement metrics.",
    },
    {
      icon: TrendingUp,
      title: "Performance Tracking",
      description:
        "Monitor your reach, engagement, and alert performance with comprehensive dashboard statistics.",
    },
    {
      icon: Activity,
      title: "Real-Time Updates",
      description:
        "Stay informed with live data updates and continuous monitoring of Reddit conversations.",
    },
  ];

  const CAPABILITIES = [
    {
      icon: Eye,
      title: "View All Activity",
      description:
        "Access comprehensive lists of posts, comments, and alerts across all monitored channels.",
    },
    {
      icon: Filter,
      title: "Advanced Filtering",
      description:
        "Filter and sort through data to find exactly what you're looking for with powerful search tools.",
    },
    {
      icon: Clock,
      title: "Historical Data",
      description:
        "Review past alerts, threads, and engagement patterns to refine your strategy over time.",
    },
    {
      icon: Zap,
      title: "Actionable Insights",
      description:
        "Turn Reddit intelligence into actionable business opportunities with detailed recommendations.",
    },
  ];

  const navigate = useNavigate();

  return (
    <div className="from-background to-muted/30 min-h-screen bg-linear-to-b">
      <header className="bg-background/80 sticky top-0 z-50 border-b backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Logo size="md" className="h-12 w-auto" />
            </div>
          </div>
        </div>
      </header>

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

      <Button className="mx-auto block" onClick={() => navigate("/dashboard")}>
        View Dashboard
      </Button>

      <section className="container mx-auto px-4 py-16">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold">Core Features</h2>
          <p className="text-muted-foreground text-lg">
            Everything you need to monitor and engage with Reddit effectively
          </p>
        </div>
        <div className="mx-auto grid max-w-6xl gap-6 md:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((feature, index) => (
            <Card
              key={index}
              className="hover:border-lw-primary/50 border-2 transition-all duration-300 hover:shadow-lg"
            >
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="bg-lw-primary/10 rounded-lg p-2">
                    <feature.icon className="text-lw-primary h-6 w-6" />
                  </div>
                  <CardTitle className="text-lg">{feature.title}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">{feature.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="bg-muted/30 container mx-auto my-16 rounded-3xl px-4 py-16">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold">Dashboard Capabilities</h2>
          <p className="text-muted-foreground text-lg">
            Powerful tools to manage and analyze your Reddit presence
          </p>
        </div>
        <div className="mx-auto grid max-w-6xl gap-6 md:grid-cols-2 lg:grid-cols-4">
          {CAPABILITIES.map((capability, index) => (
            <Card key={index} className="text-center transition-all duration-300 hover:shadow-md">
              <CardHeader>
                <div className="bg-lw-accent/10 mx-auto mb-3 w-fit rounded-full p-3">
                  <capability.icon className="text-lw-accent h-8 w-8" />
                </div>
                <CardTitle className="text-lg">{capability.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>{capability.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

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

      <footer className="mt-16 border-t">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col items-center justify-center gap-4 md:flex-row">
            <p className="text-muted-foreground text-center text-sm">
              Monitoring Reddit conversations for better business insights
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

function Hash({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <line x1="4" y1="9" x2="20" y2="9" />
      <line x1="4" y1="15" x2="20" y2="15" />
      <line x1="10" y1="3" x2="8" y2="21" />
      <line x1="16" y1="3" x2="14" y2="21" />
    </svg>
  );
}
