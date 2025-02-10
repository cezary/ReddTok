'use client';

import Alert from "@/components/alert";
import CommentsDrawer from "@/components/comments-drawer";

export default function App({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Alert />
      {children}
      <CommentsDrawer />
    </>
  )
}