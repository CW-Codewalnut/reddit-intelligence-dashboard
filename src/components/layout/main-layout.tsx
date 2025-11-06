import { Outlet } from "react-router-dom";
import { Header } from "./header";
import { Sidebar } from "./sidebar";
import { useSidebar } from "@/contexts/sidebar-context";
import { useMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";

export function MainLayout() {
  const { isOpen } = useSidebar();
  const isMobile = useMobile();

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <div className="flex flex-1">
        <Sidebar />
        <main
          className={cn(
            "flex-1 p-4 transition-all duration-300 md:p-6",
            !isMobile ? (isOpen ? "md:ml-64" : "md:ml-16") : "md:ml-0"
          )}
        >
          <Outlet />
        </main>
      </div>
    </div>
  );
}
