import "./globals.css";
import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "@/components/ui/toaster";
import { Analytics } from "@vercel/analytics/react";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "planning pirates | X Marks the Spot: Planning Poker, Pirate Style!",
  description: "Planning poker with a pirate twist!",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={poppins.className}>
        <ClerkProvider>
          <div className="flex h-[calc(100dvh)] flex-col">
            <div className="flex flex-1">{children}</div>
          </div>
          <Toaster />
        </ClerkProvider>
        <Analytics />
      </body>
    </html>
  );
}
