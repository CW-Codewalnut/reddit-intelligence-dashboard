import { useNavigate } from "react-router-dom";
import { LandingHeader } from "./landing-header";
import { LandingHero } from "./landing-hero";
import { LandingFeatures } from "./landing-features";
import { LandingCapabilities } from "./landing-capabilities";
import { LandingMonitoring } from "./landing-monitoring";
import { LandingFooter } from "./landing-footer";
import { useClients } from "@/shared/hooks/queries";

export function LandingPage() {
  const navigate = useNavigate();

  const { data: clients = [], isLoading: loadingClients } = useClients(true);

  const handleViewDashboard = () => {
    if (clients.length > 0) {
      navigate(`/${clients[0].name.toLowerCase()}`);
    } else {
      alert("No active clients found. Please contact administrator.");
    }
  };

  return (
    <div className="from-background to-muted/30 min-h-screen bg-linear-to-b">
      <LandingHeader />
      <LandingHero onViewDashboard={handleViewDashboard} isLoading={loadingClients} />
      <LandingFeatures />
      <LandingCapabilities />
      <LandingMonitoring />
      <LandingFooter />
    </div>
  );
}
