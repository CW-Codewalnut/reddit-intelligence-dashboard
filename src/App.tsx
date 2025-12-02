import { BrowserRouter, Routes, Route } from "react-router-dom";
import { MainLayout } from "@/shared/layout/main-layout";
import { Dashboard } from "@/features/dashboard/dashboard";
import { Landing } from "@/features/landingpage/landing";
import { KeywordList } from "@/features/keywords/keyword-list";
import { AlertList } from "@/features/alerts/alert-list";

export const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />

        <Route
          path="/:id"
          element={
            <>
              <MainLayout />
            </>
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
