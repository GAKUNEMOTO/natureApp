import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/utils/utils";
import { AuthProvider } from "@/context/AuthContext";
import { NatureProvider } from "@/context/NatureContext";
import Header from "./components/header";
import Footer from "./components/footer";

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
    <html lang="ja">
      <body className={cn(inter.className, 'min-h-dvh bg-gradient-to-b from-sky-300 via-green-200 to-yellow-200 w-screen min-h-screen')}>
        <AuthProvider>
          <NatureProvider>
            <Header />  
              {children}
            <Footer/>
          </NatureProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
