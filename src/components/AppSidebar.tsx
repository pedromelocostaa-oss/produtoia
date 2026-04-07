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
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";

const navItems = [
  { title: "Início", path: "/", icon: Home },
  { title: "Módulo 1 — A Nova Era Profissional", path: "/modulo-1", icon: BookOpen },
  { title: "Módulo 2 — As Ferramentas", path: "/modulo-2", icon: Wrench },
  { title: "Módulo 3 — IA na Sua Área", path: "/modulo-3", icon: Target },
  { title: "Módulo 4 — Prompts Prontos", path: "/modulo-4", icon: MessageSquare },
];

export function AppSidebar() {
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  const isActive = (path: string) => {
    if (path === "/") return location.pathname === "/";
    return location.pathname.startsWith(path);
  };

  const sidebarContent = (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className="p-6 border-b border-border">
        <Link to="/" className="flex items-center gap-2.5" onClick={() => setMobileOpen(false)}>
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
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
              "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
              isActive(item.path)
                ? "bg-accent text-accent-foreground border-l-[3px] border-primary"
                : "text-muted-foreground hover:bg-muted hover:text-foreground"
            )}
          >
            <item.icon className="w-4 h-4 shrink-0" />
            <span className="truncate">{item.title}</span>
          </Link>
        ))}
      </nav>

      {/* Diagnostic CTA */}
      <div className="p-3 border-t border-border">
        <Link
          to="/diagnostico"
          onClick={() => setMobileOpen(false)}
          className={cn(
            "flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-semibold transition-all",
            "bg-primary text-primary-foreground hover:bg-primary/90 shadow-md"
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
        className="fixed top-4 left-4 z-50 lg:hidden p-2 rounded-lg bg-card border border-border shadow-sm"
        aria-label="Abrir menu"
      >
        <Menu className="w-5 h-5 text-foreground" />
      </button>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-foreground/20 backdrop-blur-sm" onClick={() => setMobileOpen(false)} />
          <div className="absolute left-0 top-0 bottom-0 w-72 bg-card border-r border-border shadow-xl">
            <button
              onClick={() => setMobileOpen(false)}
              className="absolute top-4 right-4 p-1.5 rounded-md hover:bg-muted"
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
