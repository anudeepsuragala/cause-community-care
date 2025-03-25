
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { AuthProvider } from "./contexts/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import Header from "./components/Header";
import Index from "./pages/Index";
import Chats from "./pages/Chats";
import Chat from "./pages/Chat"; // Add this import
import Actions from "./pages/Actions";
import Upload from "./pages/Upload";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";

// Page transition wrapper
const PageTransition = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);
  
  return <>{children}</>;
};

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={
              <ProtectedRoute>
                <>
                  <Header />
                  <PageTransition>
                    <Index />
                  </PageTransition>
                </>
              </ProtectedRoute>
            } />
            <Route path="/chats" element={
              <ProtectedRoute>
                <>
                  <Header />
                  <PageTransition>
                    <Chats />
                  </PageTransition>
                </>
              </ProtectedRoute>
            } />
            <Route path="/chat" element={
              <ProtectedRoute>
                <>
                  <Header />
                  <PageTransition>
                    <Chat />
                  </PageTransition>
                </>
              </ProtectedRoute>
            } />
            <Route path="/actions" element={
              <ProtectedRoute>
                <>
                  <Header />
                  <PageTransition>
                    <Actions />
                  </PageTransition>
                </>
              </ProtectedRoute>
            } />
            <Route path="/upload" element={
              <ProtectedRoute>
                <>
                  <Header />
                  <PageTransition>
                    <Upload />
                  </PageTransition>
                </>
              </ProtectedRoute>
            } />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
