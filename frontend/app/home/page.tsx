"use client";

import { HeroSection } from "../components/HeroSection";
import Link from "next/link";

export default function HomePage() {
  return (
    <div className="space-y-12">
      <HeroSection />
      <section className="grid gap-6 md:grid-cols-3">
        <div className="card p-5 flex flex-col gap-2">
          <p className="text-sm font-semibold">Online booking</p>
          <p className="text-xs text-muted">
            Let clients reserve their spot in a couple of taps. No calls, no spreadsheets.
          </p>
        </div>
        <div className="card p-5 flex flex-col gap-2">
          <p className="text-sm font-semibold">Smart schedule</p>
          <p className="text-xs text-muted">
            Double-booking protection and a clear overview of the day for each barber.
          </p>
        </div>
        <div className="card p-5 flex flex-col gap-2">
          <p className="text-sm font-semibold">Admin control</p>
          <p className="text-xs text-muted">
            Manage services, barbers, and bookings from a clean, focused dashboard.
          </p>
        </div>
      </section>
      <section className="card p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <p className="text-sm font-semibold mb-1">Ready to modernize your shop?</p>
          <p className="text-xs text-muted">
            Start by setting up your services and barbers in the admin dashboard.
          </p>
        </div>
        <div className="flex gap-3">
          <Link href="/admin" className="btn-primary">
            Open admin dashboard
          </Link>
          <Link href="/booking" className="btn-secondary">
            Try a test booking
          </Link>
        </div>
      </section>
    </div>
  );
}

