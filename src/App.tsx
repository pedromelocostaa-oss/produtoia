import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider } from "@/contexts/AuthContext";
import { Layout } from "@/components/Layout";
import Index from "./pages/Index";
import Module1 from "./pages/Module1";
import Module2 from "./pages/Module2";
import Module3 from "./pages/Module3";
import Module4 from "./pages/Module4";
import Comparison from "./pages/Comparison";
import SocialMedia from "./pages/SocialMedia";
import Diagnostic from "./pages/Diagnostic";
import ContentTips from "./pages/ContentTips";
import Community from "./pages/Community";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <Layout>
            <Routes>
              {/* Public routes */}
              <Route path="/login" element={<Login />} />
              <Route path="/cadastro" element={<Register />} />
              <Route path="/esqueci-senha" element={<ForgotPassword />} />
              <Route path="/resetar-senha" element={<ResetPassword />} />

              {/* Protected routes */}
              <Route path="/" element={<Index />} />
              <Route path="/modulo-1" element={<Module1 />} />
              <Route path="/modulo-2" element={<Module2 />} />
              <Route path="/modulo-3" element={<Module3 />} />
              <Route path="/modulo-4" element={<Module4 />} />
              <Route path="/comparativo" element={<Comparison />} />
              <Route path="/social-media" element={<SocialMedia />} />
              <Route path="/diagnostico" element={<Diagnostic />} />
              <Route path="/dicas-de-conteudo" element={<ContentTips />} />
              <Route path="/comunidade" element={<Community />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Layout>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
