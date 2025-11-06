import { Link, useLocation, useParams } from "react-router-dom";
import { LayoutDashboard, Hash, Bell, X, Menu } from "lucide-react";
import { cn } from "@/lib/utils";
import { useSidebar } from "@/contexts/sidebar-context";
import { useMobile } from "@/hooks/use-mobile";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { useMemo } from "react";

export function Sidebar() {
  const location = useLocation();
  const { isOpen, toggle } = useSidebar();
  const isMobile = useMobile();

  const params = useParams();
  const clientName = params.id;
  const navigation = useMemo(() => {
    return [
      { name: "Dashboard", href: `/${clientName}/`, icon: LayoutDashboard },
      // { name: "Clients", href: `/${userId}/clients`, icon: Users },
      { name: "Keywords", href: `/${clientName}/keywords`, icon: Hash },
      { name: "Alerts", href: `/${clientName}/alerts`, icon: Bell },
    ];
  }, [params.id]);

  if (isMobile) {
    return null;
  }

  return (
    <aside
      className={cn(
        "bg-background border-lw-neutral-cloud fixed top-20 left-0 z-40 h-[calc(100vh-5rem)] border-r transition-all duration-300",
        isOpen ? "w-64" : "w-16"
      )}
    >
      <div className="flex h-full flex-col gap-2 overflow-hidden p-2">
        <div
          className={cn(
            "flex items-center px-2 py-2",
            isOpen ? "justify-between" : "justify-center"
          )}
        >
          {isOpen && <span className="text-sm font-semibold">Navigation</span>}
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon" onClick={toggle} className="h-8 w-8 shrink-0">
                {isOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
              </Button>
            </TooltipTrigger>
            {!isOpen && (
              <TooltipContent side="right">
                <p>Expand sidebar</p>
              </TooltipContent>
            )}
          </Tooltip>
        </div>

        <nav className="flex-1 space-y-1 overflow-y-auto">
          <TooltipProvider delayDuration={0}>
            {navigation.map((item) => {
              const isActive = location.pathname === item.href;
              const linkContent = (
                <Link
                  key={item.name}
                  to={item.href}
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-all",
                    isActive
                      ? "bg-lw-primary shadow-lw-primary/30 text-white shadow-md"
                      : "text-muted-foreground hover:bg-lw-primary-pale hover:text-lw-primary-dark dark:hover:bg-lw-primary-darker dark:hover:text-lw-primary-light",
                    !isOpen && "justify-center"
                  )}
                >
                  <item.icon className="h-5 w-5 shrink-0" />
                  {isOpen && <span>{item.name}</span>}
                </Link>
              );

              if (!isOpen) {
                return (
                  <Tooltip key={item.name}>
                    <TooltipTrigger asChild>{linkContent}</TooltipTrigger>
                    <TooltipContent side="right">
                      <p>{item.name}</p>
                    </TooltipContent>
                  </Tooltip>
                );
              }

              return linkContent;
            })}
          </TooltipProvider>
        </nav>
      </div>
    </aside>
  );
}
