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
import type { LucideIcon } from "lucide-react";

export interface Feature {
  icon: LucideIcon;
  title: string;
  description: string;
}

export const FEATURES: Feature[] = [
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

export const CAPABILITIES: Feature[] = [
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
