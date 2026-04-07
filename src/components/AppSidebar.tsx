import { Link, useLocation } from "react-router-dom";
import {
  Home,
  BookOpen,
  Wrench,
  Target,
  MessageSquare,
  Zap,
  Menu,
  X,
  CheckCircle2,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";

const navItems = [
  { title: "Início", path: "/", icon: Home },
  { title: "Módulo 1 — A Nova Era Profissional", path: "/modulo-1", icon: BookOpen, key: "modulo-1" },
  { title: "Módulo 2 — As Ferramentas", path: "/modulo-2", icon: Wrench, key: "modulo-2" },
  { title: "Módulo 3 — IA na Sua Área", path: "/modulo-3", icon: Target, key: "modulo-3" },
  { title: "Módulo 4 — Prompts Prontos", path: "/modulo-4", icon: MessageSquare, key: "modulo-4" },
];

export function AppSidebar() {
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [visited, setVisited] = useState<string[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem("virada-visited");
    if (stored) setVisited(JSON.parse(stored));
  }, [location.pathname]);

  const isActive = (path: string) => {
    if (path === "/") return location.pathname === "/";
    return location.pathname.startsWith(path);
  };

  const sidebarContent = (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className="p-6 border-b border-border">
        <Link to="/" className="flex items-center gap-2.5 group" onClick={() => setMobileOpen(false)}>
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center group-hover:shadow-md transition-shadow">
            <Zap className="w-4 h-4 text-primary-foreground" />
          </div>
          <span className="text-lg font-bold text-foreground tracking-tight">Virada IA</span>
        </Link>
      </div>

      {/* Nav Items */}
      <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
        {navItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            onClick={() => setMobileOpen(false)}
            className={cn(
              "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200",
              isActive(item.path)
                ? "bg-accent text-accent-foreground border-l-[3px] border-primary shadow-sm"
                : "text-muted-foreground hover:bg-muted hover:text-foreground hover:translate-x-0.5"
            )}
          >
            <item.icon className="w-4 h-4 shrink-0" />
            <span className="truncate flex-1">{item.title}</span>
            {item.key && (
              visited.includes(item.key) ? (
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
              ) : (
                <span className="text-[9px] font-bold text-muted-foreground/50 bg-muted px-1.5 py-0.5 rounded-full uppercase tracking-wider shrink-0">
                  pendente
                </span>
              )
            )}
          </Link>
        ))}
      </nav>

      {/* Progress summary */}
      <div className="px-4 pb-2">
        <div className="flex items-center justify-between text-[10px] text-muted-foreground mb-1">
          <span>Progresso</span>
          <span className="font-semibold">{visited.length}/4 módulos</span>
        </div>
        <div className="w-full h-1 bg-muted rounded-full overflow-hidden">
          <div
            className="h-full bg-primary rounded-full transition-all duration-500"
            style={{ width: `${(visited.length / 4) * 100}%` }}
          />
        </div>
      </div>

      {/* Diagnostic CTA */}
      <div className="p-3 border-t border-border">
        <Link
          to="/diagnostico"
          onClick={() => setMobileOpen(false)}
          className={cn(
            "flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-semibold transition-all duration-200",
            "bg-primary text-primary-foreground hover:bg-primary/90 shadow-md hover:shadow-lg hover:-translate-y-0.5"
          )}
        >
          <Zap className="w-5 h-5 shrink-0" />
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <span>Diagnóstico IA</span>
              <span className="text-[10px] font-bold bg-primary-foreground/20 px-1.5 py-0.5 rounded-full uppercase tracking-wider">
                Exclusivo
              </span>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile trigger */}
      <button
        onClick={() => setMobileOpen(true)}
        className="fixed top-4 left-4 z-50 lg:hidden p-2 rounded-lg bg-card border border-border shadow-sm hover:shadow-md transition-shadow active:scale-95"
        aria-label="Abrir menu"
      >
        <Menu className="w-5 h-5 text-foreground" />
      </button>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-foreground/20 backdrop-blur-sm animate-fade-in"
            onClick={() => setMobileOpen(false)}
          />
          <div className="absolute left-0 top-0 bottom-0 w-72 bg-card border-r border-border shadow-xl animate-slide-in-right">
            <button
              onClick={() => setMobileOpen(false)}
              className="absolute top-4 right-4 p-1.5 rounded-md hover:bg-muted transition-colors"
              aria-label="Fechar menu"
            >
              <X className="w-4 h-4 text-muted-foreground" />
            </button>
            {sidebarContent}
          </div>
        </div>
      )}

      {/* Desktop sidebar */}
      <aside className="hidden lg:flex lg:flex-col lg:w-72 lg:shrink-0 border-r border-border bg-card h-screen sticky top-0">
        {sidebarContent}
      </aside>
    </>
  );
}
