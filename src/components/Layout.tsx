import { Link, useLocation } from "react-router-dom";
import { Package, ArrowLeftRight, LayoutDashboard, QrCode } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  const location = useLocation();

  const navItems = [
    { path: "/", label: "Dashboard", icon: LayoutDashboard },
    { path: "/materials", label: "Materiais", icon: Package },
    { path: "/movements", label: "Movimentações", icon: ArrowLeftRight },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card sticky top-0 z-10">
        <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold tracking-tight text-foreground">
                Gestão de Estoque
              </h1>
              <p className="mt-0.5 text-xs text-muted-foreground">
                Controle completo do seu inventário
              </p>
            </div>
            <Button className="gap-2">
              <QrCode className="h-4 w-4" />
              Escanear QR Code
            </Button>
          </div>

          {/* Navigation */}
          <nav className="mt-4 flex gap-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              return (
                <Link key={item.path} to={item.path}>
                  <Button
                    variant={isActive ? "default" : "ghost"}
                    size="sm"
                    className={cn("gap-2", !isActive && "text-muted-foreground")}
                  >
                    <Icon className="h-4 w-4" />
                    {item.label}
                  </Button>
                </Link>
              );
            })}
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {children}
      </main>
    </div>
  );
};
