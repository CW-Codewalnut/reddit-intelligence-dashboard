import { BrowserRouter, Routes, Route } from "react-router-dom";
import { MainLayout } from "@/components/layout/main-layout";
import { Dashboard } from "@/pages/dashboard";
// import { ClientList } from "@/features/clients/components/client-list"; // Commented out - not needed
import { KeywordList } from "@/features/keywords/components/keyword-list";
import { AlertList } from "@/features/alerts/components/alert-list";
import { PostList } from "@/features/posts/components/post-list";
import { CommentList } from "@/features/comments/components/comment-list";
import { SidebarProvider } from "@/contexts/sidebar-context";

export const App = () => {
  return (
    <BrowserRouter>
      <SidebarProvider>
        <Routes>
          <Route path="/:id" element={<MainLayout />}>
            <Route index element={<Dashboard />} />
            {/* <Route path="clients" element={<ClientList />} /> */}
            {/* Commented out - not needed */}
            <Route path="keywords" element={<KeywordList />} />
            <Route path="alerts" element={<AlertList />} />
            <Route path="posts" element={<PostList />} />
            <Route path="comments" element={<CommentList />} />
          </Route>
        </Routes>
      </SidebarProvider>
    </BrowserRouter>
  );
};
