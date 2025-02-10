'use client';

import AppDialog from "@/components/app-dialog";
import CommentsDrawer from "@/components/comments-drawer";

export default function App({ children }: { children: React.ReactNode }) {
  return (
    <>
      <AppDialog />
      {children}
      <CommentsDrawer />
    </>
  )
}