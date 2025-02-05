import { Analytics } from "@vercel/analytics/react"
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { cookies } from "next/headers"

import { SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "ReddTok",
    template: "%s | ReddTok",
  },
  description: "the latest, trending videos tailored for you",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies()
  const defaultOpen = cookieStore.get("sidebar:state")?.value === "true"

  return (
    <html lang="en" className='h-screen overflow-hidden'>
      <head>
        {process.env.NODE_ENV === 'development' ? (
          <script src="https://unpkg.com/react-scan/dist/auto.global.js" async></script>
        ) : null}
      </head>
      <Analytics />
      <body
        className={`${geistSans.variable} ${geistMono.variable} bg-black h-screen overflow-scroll snap-y snap-mandatory scrollbar-none antialiased dark`}
      >
        <SidebarProvider defaultOpen={defaultOpen}>
          <AppSidebar />
          {children}
        </SidebarProvider>
      </body>
    </html>
  );
}
