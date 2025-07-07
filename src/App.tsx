
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import AppLayout from "./components/AppLayout";
import NotFound from "./pages/NotFound";
import Companies from "./pages/Companies";
import AddCompanyPage from "./pages/AddCompany";
import AdminsPage from "./pages/Admins";
import AddAdminPage from "./pages/AddAdminPage";
import ProfileSettings from "./pages/ProfileSettings";
import GlobalSearchPage from "./pages/GlobalSearch";
import AnalyticsPage from "./pages/Analytics";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route element={<AppLayout />}>
            <Route path="/home" element={<Dashboard />} />
            <Route path="/companies" element={<Companies />} />
            <Route path="/companies/add" element={<AddCompanyPage />} />
            <Route path="/admins" element={<AdminsPage />} />
            <Route path="/admins/add" element={<AddAdminPage />} />
            <Route path="/settings" element={<ProfileSettings />} />
            <Route path="/search" element={<GlobalSearchPage />} />
            <Route path="/analytics" element={<AnalyticsPage />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
