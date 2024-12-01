"use client";
import React from "react";
import { Inter_Tight } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Providers } from "./providers";
import { Toaster } from 'sonner';
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";

const interTight = Inter_Tight({
  subsets: ['latin'],
  variable: '--font-inter-tight',
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${interTight.variable} font-sans antialiased`}>
        <Toaster />
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Providers>
            <div className="min-h-screen bg-[#141414] flex">
              <Sidebar />
              <div className="flex-1 flex flex-col">
                <Navbar className="fixed top-0 left-0 right-0 z-50" />
                <main className="flex-1 py-12">
                  {children}
                </main>
              </div>
            </div>
          </Providers>
        </ThemeProvider>
      </body>
    </html>
  );
}
