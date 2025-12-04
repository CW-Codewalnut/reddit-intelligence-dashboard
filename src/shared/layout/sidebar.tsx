"use client";

import { Link, useLocation, useParams, useNavigate } from "react-router-dom";
import { LayoutDashboard, Hash, Bell, X, Menu, Users, ChevronDown, Lightbulb } from "lucide-react";
import { cn } from "@/lib/cn";
import { useMobile } from "@/shared/hooks/use-mobile";
import { Button } from "@/shared/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/shared/ui/tooltip";
import { useMemo } from "react";
import { useClients } from "@/shared/hooks/queries";
import type { Client } from "@/shared/types/database";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/shared/ui/dropdown-menu";

type SidebarProps = {
  isOpen: boolean;
  onToggle: () => void;
};

export function Sidebar({ isOpen, onToggle }: SidebarProps) {
  const location = useLocation();
  const isMobile = useMobile();
  const navigate = useNavigate();

  const params = useParams();
  const clientName = params.id;

  const { data: clients = [], isLoading: loading } = useClients(true);

  const currentClient = useMemo(() => {
    return clients.find((c) => c.name.toLowerCase() === clientName?.toLowerCase());
  }, [clients, clientName]);

  const handleClientChange = (client: Client) => {
    const currentPath = location.pathname;
    const pathSegments = currentPath.split("/").filter(Boolean);

    if (pathSegments.length > 0) {
      pathSegments[0] = client.name.toLowerCase();
      navigate(`/${pathSegments.join("/")}`);
    } else {
      navigate(`/${client.name.toLowerCase()}/`);
    }
  };

  const navigation = useMemo(() => {
    return [
      { name: "Dashboard", href: `/${clientName}/`, icon: LayoutDashboard },
      { name: "Keywords Alerts", href: `/${clientName}/keywords`, icon: Hash },
      { name: "Alerts", href: `/${clientName}/alerts`, icon: Bell },
      { name: "AI Suggestions", href: `/${clientName}/ai-suggestions`, icon: Lightbulb },
    ];
  }, [clientName]);

  if (isMobile) {
    return null;
  }

  return (
    <>
      <aside
        className={cn(
          "bg-background border-lw-neutral-cloud fixed top-20 left-0 z-40 h-[calc(100vh-5rem)] border-r transition-all duration-300",
          isOpen ? "w-64" : "w-16"
        )}
      >
        <div className="flex h-full flex-col gap-2 overflow-hidden p-2">
          {isOpen ? (
            <div className="flex items-center justify-between gap-2 px-2 py-2">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="hover:bg-lw-primary-pale dark:hover:bg-lw-primary-darker h-8 flex-1 justify-between gap-2 px-2 text-sm font-semibold"
                  >
                    <span className="truncate text-left">
                      {loading ? "Loading..." : currentClient?.name || "Select Client"}
                    </span>
                    <ChevronDown className="h-4 w-4 shrink-0 opacity-50" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start" className="w-56">
                  {clients.map((client) => (
                    <DropdownMenuItem
                      key={client.id}
                      onClick={() => handleClientChange(client)}
                      className={cn(
                        currentClient?.id === client.id &&
                          "bg-lw-primary-pale dark:bg-lw-primary-darker"
                      )}
                    >
                      {client.name}
                    </DropdownMenuItem>
                  ))}
                  {clients.length === 0 && !loading && (
                    <DropdownMenuItem disabled>No clients available</DropdownMenuItem>
                  )}
                </DropdownMenuContent>
              </DropdownMenu>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={onToggle}
                    className="h-8 w-8 shrink-0"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="right">
                  <p>Collapse sidebar</p>
                </TooltipContent>
              </Tooltip>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-2 px-2 py-2">
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={onToggle}
                    className="h-8 w-8 shrink-0"
                  >
                    <Menu className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="right">
                  <p>Expand sidebar</p>
                </TooltipContent>
              </Tooltip>
              <Tooltip>
                <TooltipTrigger asChild>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8 shrink-0">
                        <Users className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="start" side="right">
                      {clients.map((client) => (
                        <DropdownMenuItem
                          key={client.id}
                          onClick={() => handleClientChange(client)}
                          className={cn(
                            currentClient?.id === client.id &&
                              "bg-lw-primary-pale dark:bg-lw-primary-darker"
                          )}
                        >
                          {client.name}
                        </DropdownMenuItem>
                      ))}
                      {clients.length === 0 && !loading && (
                        <DropdownMenuItem disabled>No clients available</DropdownMenuItem>
                      )}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TooltipTrigger>
                <TooltipContent side="right">
                  <p>Select Client</p>
                </TooltipContent>
              </Tooltip>
            </div>
          )}

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
    </>
  );
}
