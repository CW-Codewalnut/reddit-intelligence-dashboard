import { BrowserRouter, Routes, Route } from "react-router-dom";
import { MainLayout } from "@/shared/layout/main-layout";
import { Dashboard } from "@/features/dashboard/dashboard";
import { LandingPage } from "@/features/landingpage/landing-page";
import { KeywordList } from "@/features/keywords/keyword-list";
import { AlertList } from "@/features/alerts/alert-list";
import { AiSuggestions } from "@/features/ai-suggestions/ai-suggestions";

export const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/:id" element={<MainLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="keywords" element={<KeywordList />} />
          <Route path="alerts" element={<AlertList />} />
          <Route path="ai-suggestions" element={<AiSuggestions />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
