import { useState } from "react";
import { Outlet } from "react-router-dom";
import { Header } from "./header";
import { Sidebar } from "./sidebar";
import { useMobile } from "@/shared/hooks/use-mobile";
import { cn } from "@/lib/cn";

export function MainLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const isMobile = useMobile();

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <div className="flex flex-1">
        <Sidebar
          isOpen={isSidebarOpen}
          onToggle={() => setIsSidebarOpen(!isSidebarOpen)}
        />
        <main
          className={cn(
            "flex-1 p-4 transition-all duration-300 md:p-6",
            !isMobile ? (isSidebarOpen ? "md:ml-64" : "md:ml-16") : "md:ml-0"
          )}
        >
          <Outlet />
        </main>
      </div>
    </div>
  );
}
