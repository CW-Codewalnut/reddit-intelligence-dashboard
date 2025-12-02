import { BrowserRouter, Routes, Route } from "react-router-dom";
import { MainLayout } from "@/components/layout/main-layout";
import { Dashboard } from "@/pages/dashboard";
import { Landing } from "@/pages/landing";
import { KeywordList } from "@/features/keywords/keyword-list";
import { AlertList } from "@/features/alerts/alert-list";

import { SidebarProvider } from "@/contexts/sidebar-context";

export const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />

        <Route
          path="/:id"
          element={
            <SidebarProvider>
              <MainLayout />
            </SidebarProvider>
          }
        >
          <Route index element={<Dashboard />} />

          <Route path="keywords" element={<KeywordList />} />
          <Route path="alerts" element={<AlertList />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
