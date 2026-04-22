import { Link, useLocation, useNavigate } from "react-router-dom";
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
  Share2,
  Lightbulb,
  ChevronRight,
  Brain,
  TrendingUp,
  Users,
  BarChart3,
  LogOut,
  User,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";

export function AppSidebar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, signOut } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [visited, setVisited] = useState<string[]>([]);
  const [mod1Open, setMod1Open] = useState(false);

  const displayName = user?.user_metadata?.full_name || user?.email?.split("@")[0] || "Usuário";
  const displayEmail = user?.email ?? "";

  async function handleSignOut() {
    await signOut();
    navigate("/login");
  }

  useEffect(() => {
    const stored = localStorage.getItem("virada-visited");
    if (stored) setVisited(JSON.parse(stored));
  }, [location.pathname]);

  useEffect(() => {
    if (location.pathname.startsWith("/modulo-1")) setMod1Open(true);
  }, [location.pathname]);

  const isActive = (path: string) => {
    if (path === "/") return location.pathname === "/";
    return location.pathname.startsWith(path);
  };

  const close = () => setMobileOpen(false);

  const sidebarContent = (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className="px-5 pt-6 pb-5">
        <Link to="/" className="flex items-center gap-2.5 group" onClick={close}>
          <div className="w-9 h-9 rounded-xl bg-primary flex items-center justify-center shadow-sm group-hover:shadow-md transition-shadow">
            <Zap className="w-4.5 h-4.5 text-primary-foreground" />
          </div>
          <div>
            <span className="text-base font-bold text-foreground tracking-tight block leading-tight">Virada</span>
            <span className="text-[10px] font-semibold text-muted-foreground uppercase tracking-widest">Profissional</span>
          </div>
        </Link>
      </div>

      <div className="h-px bg-border mx-4" />

      {/* Diagnóstico IA — slot destacado */}
      <div className="px-3 py-3">
        <Link
          to="/diagnostico"
          onClick={close}
          className="flex items-center gap-3 px-4 py-3 rounded-xl text-white font-bold text-sm transition-all hover:opacity-90 hover:scale-[0.99]"
          style={{
            background: "linear-gradient(135deg, #1E3A8A 0%, #1D4ED8 60%, #2563EB 100%)",
            boxShadow: "0 2px 8px rgba(37,99,235,0.25)",
          }}
        >
          <Zap className="w-4 h-4 shrink-0" />
          <span className="flex-1">Diagnóstico IA</span>
          <span className="text-[9px] font-bold bg-white/20 px-2 py-0.5 rounded-full uppercase tracking-wider">
            Novo
          </span>
        </Link>
      </div>

      <div className="h-px bg-border mx-4" />

      {/* Nav */}
      <nav className="flex-1 px-3 pt-3 pb-2 space-y-0.5 overflow-y-auto">
        {/* Início */}
        <NavItem icon={Home} label="Início" path="/" active={isActive("/")} onClick={close} />

        {/* Jornada de Aprendizado */}
        <p className="px-3 pt-3 pb-1 text-[10px] font-semibold text-muted-foreground uppercase tracking-widest">
          Jornada de Aprendizado
        </p>

        {/* Módulo 1 — expandable */}
        <div>
          <button
            onClick={() => { setMod1Open((o) => !o); }}
            className={cn(
              "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-[13px] font-medium transition-all duration-200 group",
              isActive("/modulo-1")
                ? "bg-primary/8 text-foreground"
                : "text-muted-foreground hover:bg-muted hover:text-foreground"
            )}
          >
            <BookOpen className="w-4 h-4 shrink-0" />
            <span className="flex-1 text-left truncate">Módulo 1 — A Nova Era</span>
            <StatusBadge visited={visited.includes("modulo-1")} />
            <ChevronRight className={cn("w-3.5 h-3.5 shrink-0 text-muted-foreground/50 transition-transform duration-200", mod1Open && "rotate-90")} />
          </button>

          {mod1Open && (
            <div className="mt-0.5 ml-5 pl-3 border-l-2 border-border space-y-0.5">
              <SubNavItem icon={Brain} label="Conheça mais sobre IA" path="/modulo-1?step=1" active={isActive("/modulo-1") && (!location.search || location.search.includes("step=1"))} onClick={close} />
              <SubNavItem icon={TrendingUp} label="A nova era profissional" path="/modulo-1?step=2" active={location.search.includes("step=2")} onClick={close} />
            </div>
          )}
        </div>

        {/* Módulo 2 */}
        <NavItem icon={Wrench} label="Módulo 2 — As Ferramentas" path="/modulo-2" active={isActive("/modulo-2")} onClick={close} badge={<StatusBadge visited={visited.includes("modulo-2")} />} />

        {/* Módulo 3 */}
        <NavItem icon={Target} label="Módulo 3 — IA na Sua Área" path="/modulo-3" active={isActive("/modulo-3")} onClick={close} badge={<StatusBadge visited={visited.includes("modulo-3")} />} />

        {/* Módulo 4 */}
        <NavItem icon={MessageSquare} label="Módulo 4 — Prompts Prontos" path="/modulo-4" active={isActive("/modulo-4")} onClick={close} badge={<StatusBadge visited={visited.includes("modulo-4")} />} />

        {/* Explorar */}
        <div className="h-px bg-border my-1.5" />
        <p className="px-3 pt-2 pb-1 text-[10px] font-semibold text-muted-foreground uppercase tracking-widest">
          Explorar
        </p>

        {/* Qual IA Usar? — sem badge */}
        <NavItem icon={BarChart3} label="Qual IA Usar?" path="/comparativo" active={isActive("/comparativo")} onClick={close} />

        {/* Comunidade — sem badge "Novo" */}
        <NavItem icon={Users} label="Comunidade" path="/comunidade" active={isActive("/comunidade")} onClick={close} />

        {/* Ferramentas */}
        <div className="h-px bg-border my-1.5" />
        <p className="px-3 pt-2 pb-1 text-[10px] font-semibold text-muted-foreground uppercase tracking-widest">
          Ferramentas
        </p>

        <NavItem icon={Lightbulb} label="Dicas de Conteúdo" path="/dicas-de-conteudo" active={isActive("/dicas-de-conteudo")} onClick={close} />
        <NavItem icon={Share2} label="Guia Social Media" path="/social-media" active={isActive("/social-media")} onClick={close} />
      </nav>

      {/* Progress */}
      <div className="px-5 py-3">
        <div className="flex items-center justify-between text-[10px] text-muted-foreground mb-1.5">
          <span className="font-medium">Progresso</span>
          <span className="font-bold tabular-nums">{visited.length}/4</span>
        </div>
        <div className="w-full h-1.5 bg-muted rounded-full overflow-hidden">
          <div className="h-full bg-blue-600 rounded-full transition-all duration-500" style={{ width: `${(visited.length / 4) * 100}%` }} />
        </div>
      </div>

      {/* User info + logout */}
      {user && (
        <div className="px-3 pb-2">
          <div className="flex items-center gap-3 px-3 py-2.5 rounded-xl bg-muted/60 border border-border">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center shrink-0">
              <User className="w-4 h-4 text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-semibold text-foreground truncate">{displayName}</p>
              <p className="text-[10px] text-muted-foreground truncate">{displayEmail}</p>
            </div>
            <button
              onClick={handleSignOut}
              className="p-1.5 rounded-lg hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
              title="Sair"
            >
              <LogOut className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}
    </div>
  );

  return (
    <>
      {/* Mobile trigger */}
      <button
        onClick={() => setMobileOpen(true)}
        className="fixed top-4 left-4 z-50 lg:hidden p-2.5 rounded-xl bg-card border border-border shadow-md hover:shadow-lg transition-shadow active:scale-95"
        aria-label="Abrir menu"
      >
        <Menu className="w-5 h-5 text-foreground" />
      </button>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-foreground/20 backdrop-blur-sm animate-fade-in" onClick={close} />
          <div className="absolute left-0 top-0 bottom-0 w-[280px] bg-card border-r border-border shadow-2xl animate-slide-in-right">
            <button onClick={close} className="absolute top-5 right-4 p-1.5 rounded-lg hover:bg-muted transition-colors" aria-label="Fechar">
              <X className="w-4 h-4 text-muted-foreground" />
            </button>
            {sidebarContent}
          </div>
        </div>
      )}

      {/* Desktop sidebar */}
      <aside className="hidden lg:flex lg:flex-col lg:w-[272px] lg:shrink-0 border-r border-border bg-card h-screen sticky top-0">
        {sidebarContent}
      </aside>
    </>
  );
}

/* ── Helper Components ── */

function NavItem({ icon: Icon, label, path, active, onClick, badge }: {
  icon: React.ElementType; label: string; path: string; active: boolean; onClick: () => void; badge?: React.ReactNode;
}) {
  return (
    <Link
      to={path}
      onClick={onClick}
      className={cn(
        "flex items-center gap-3 px-3 py-2.5 rounded-lg text-[13px] font-medium transition-all duration-200",
        active
          ? "bg-primary/10 text-primary font-semibold"
          : "text-muted-foreground hover:bg-muted hover:text-foreground"
      )}
    >
      <Icon className={cn("w-4 h-4 shrink-0", active && "text-primary")} />
      <span className="truncate flex-1">{label}</span>
      {badge}
    </Link>
  );
}

function SubNavItem({ icon: Icon, label, path, active, onClick }: {
  icon: React.ElementType; label: string; path: string; active: boolean; onClick: () => void;
}) {
  return (
    <Link
      to={path}
      onClick={onClick}
      className={cn(
        "flex items-center gap-2.5 px-2.5 py-2 rounded-md text-xs font-medium transition-all duration-200",
        active
          ? "bg-primary/10 text-primary font-semibold"
          : "text-muted-foreground hover:bg-muted hover:text-foreground"
      )}
    >
      <Icon className={cn("w-3.5 h-3.5 shrink-0", active && "text-primary")} />
      <span className="truncate">{label}</span>
    </Link>
  );
}

function StatusBadge({ visited }: { visited: boolean }) {
  if (visited) return <CheckCircle2 className="w-3.5 h-3.5 text-primary shrink-0" />;
  return (
    <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground/30 shrink-0" />
  );
}
