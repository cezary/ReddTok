'use client';

import Alert from "@/components/alert";
import CommentsDrawer from "@/components/comments-drawer";
import AppHeader from "./app-header";

export default function App({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Alert />
      {children}
      <AppHeader />
      <CommentsDrawer />
    </>
  )
}