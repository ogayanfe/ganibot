import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import ThemeContextProvider from "@/providers/theme-context";
import GaniSessionProvider from "@/providers/session";
import "./globals.css";
import AiContextProvider from "@/providers/ai-context";
import QueryProvider from "@/providers/query";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Gani",
  description: "AI assistant for native hausa speakers",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <GaniSessionProvider>
        <QueryProvider>
          <ThemeContextProvider>
            <AiContextProvider>
              <body className={`${geistMono.style} ${geistSans.style} w-screen h-screen antialiased bg-[#F9FAFB] text-gray-900 dark:bg-[#0B0F19] dark:text-gray-200`}>
                {children}
              </body>
            </AiContextProvider>
          </ThemeContextProvider>
        </QueryProvider>
      </GaniSessionProvider>
    </html>
  );
}
