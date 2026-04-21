import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { AppSidebar } from "@/components/AppSidebar";
import { ScrollToTop } from "@/components/ScrollToTop";
import { ReadingProgress } from "@/components/ReadingProgress";
import { useAuth } from "@/contexts/AuthContext";
import { Loader2 } from "lucide-react";

const PUBLIC_ROUTES = ["/login", "/cadastro", "/esqueci-senha", "/resetar-senha"];

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const isPublic = PUBLIC_ROUTES.includes(location.pathname);

  useEffect(() => {
    if (loading) return;
    if (!user && !isPublic) {
      navigate("/login", { state: { from: location.pathname }, replace: true });
    }
  }, [user, loading, isPublic, location.pathname, navigate]);

  // Auth pages render without sidebar
  if (isPublic) {
    return <>{children}</>;
  }

  // Show spinner while checking auth
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="w-8 h-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  // Not logged in — redirect happening
  if (!user) return null;

  return (
    <div className="flex min-h-screen w-full bg-background">
      <ReadingProgress />
      <ScrollToTop />
      <AppSidebar />
      <main className="flex-1 min-w-0 pt-14 lg:pt-0">
        {children}
      </main>
    </div>
  );
}
