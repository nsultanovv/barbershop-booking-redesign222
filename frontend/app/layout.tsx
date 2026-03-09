import "./globals.css";
import type { Metadata } from "next";
import { ReactNode } from "react";
import Navbar from "./components/Navbar";   // ✅ TO‘G‘RISI

export const metadata: Metadata = {
  title: "Barber Studio | Online Booking",
  description: "Modern barbershop booking experience with online scheduling and admin dashboard."
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-background text-white">
        <div className="relative min-h-screen">
          <div className="pointer-events-none fixed inset-0 opacity-40">
            <div className="absolute -top-32 left-32 h-64 w-64 rounded-full bg-accent blur-3xl" />
            <div className="absolute bottom-0 right-0 h-72 w-72 rounded-full bg-accentSoft blur-3xl" />
          </div>

          <div className="relative">
            <Navbar />
            <main className="container py-10">{children}</main>
          </div>

        </div>
      </body>
    </html>
  );
}