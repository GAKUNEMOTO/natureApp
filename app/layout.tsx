import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { AuthProvider } from "@/context/AuthContext";
import { Suspense } from "react";
import { NatureProvider } from "@/context/NatureContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "NatureHub",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={cn(inter.className, 'min-h-dvh')}>
        <AuthProvider>
          <NatureProvider>
            <Suspense>
              {children}
            </Suspense>
          </NatureProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
