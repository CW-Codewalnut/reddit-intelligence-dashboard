import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getClients } from "@/lib/api";
import type { Client } from "@/shared/types/database";
import { LandingHeader } from "./landing-header";
import { LandingHero } from "./landing-hero";
import { LandingFeatures } from "./landing-features";
import { LandingCapabilities } from "./landing-capabilities";
import { LandingMonitoring } from "./landing-monitoring";
import { LandingFooter } from "./landing-footer";

export function LandingPage() {
  const [clients, setClients] = useState<Client[]>([]);
  const [loadingClients, setLoadingClients] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    async function loadClients() {
      try {
        const data = await getClients(true);
        setClients(data);
      } catch (error) {
        console.error("Failed to load clients:", error);
      } finally {
        setLoadingClients(false);
      }
    }
    loadClients();
  }, []);

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
