import { Link, useLocation, useParams } from "react-router-dom";
import { Menu, LayoutDashboard, Hash, Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/ui/logo";
import { useMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useState, useMemo } from "react";

export function Header() {
  const location = useLocation();
  const isMobile = useMobile();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const params = useParams();
  const clientName = params.id;

  const navigation = useMemo(
    () => [
      { name: "Dashboard", href: `/${clientName}`, icon: LayoutDashboard },
      { name: "Keywords Alerts", href: `/${clientName}/keywords`, icon: Hash },
      { name: "Alerts", href: `/${clientName}/alerts`, icon: Bell },
    ],
    [clientName]
  );

  return (
    <header className="bg-background/95 border-lw-neutral-cloud supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50 flex h-20 items-center gap-4 border-b px-4 shadow-sm backdrop-blur md:px-6">
      <div className="from-lw-primary to-lw-accent-dark absolute top-0 left-0 h-1 w-full bg-linear-to-r"></div>

      <Logo size="md" className="h-12 w-auto" />

      {isMobile && (
        <>
          <div className="flex-1" />
          <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] p-0">
              <div className="flex h-full flex-col gap-4 p-4">
                <div className="bg-lw-primary-pale dark:bg-lw-primary-darker flex items-center justify-center rounded-lg py-4">
                  <Logo size="lg" />
                </div>
                <nav className="flex-1 space-y-1">
                  {navigation.map((item) => {
                    const isActive = location.pathname === item.href;
                    return (
                      <Link
                        key={item.name}
                        to={item.href}
                        onClick={() => setMobileMenuOpen(false)}
                        className={cn(
                          "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-all",
                          isActive
                            ? "bg-lw-primary shadow-lw-primary/30 text-white shadow-md"
                            : "text-muted-foreground hover:bg-lw-primary-pale hover:text-lw-primary-dark"
                        )}
                      >
                        <item.icon className="h-5 w-5" />
                        {item.name}
                      </Link>
                    );
                  })}
                </nav>
              </div>
            </SheetContent>
          </Sheet>
        </>
      )}
    </header>
  );
}
