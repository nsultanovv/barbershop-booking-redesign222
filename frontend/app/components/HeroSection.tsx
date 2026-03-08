"use client";

import Link from "next/link";

export function HeroSection() {
  return (
    <section className="pt-10 pb-16 grid gap-10 md:grid-cols-[1.2fr,0.8fr] items-center">
      <div>
        <p className="text-xs uppercase tracking-[0.25em] text-accentSoft mb-3">
          Modern Barbershop Experience
        </p>
        <h1 className="text-4xl md:text-5xl font-semibold tracking-tight mb-4">
          Book your next cut{" "}
          <span className="bg-gradient-to-r from-accent to-accentSoft bg-clip-text text-transparent">
            in seconds.
          </span>
        </h1>
        <p className="text-sm md:text-base text-muted max-w-xl mb-8">
          Real-time availability, handpicked barbers, and premium services. Built for shops that
          care about first impressions and smooth operations.
        </p>
        <div className="flex flex-wrap gap-3">
          <Link href="/booking" className="btn-primary">
            Book an appointment
          </Link>
          <Link href="/services" className="btn-secondary">
            Explore services
          </Link>
        </div>
        <div className="mt-10 flex gap-6 text-xs text-muted">
          <div>
            <p className="font-semibold text-white">Live availability</p>
            <p>No double bookings, ever.</p>
          </div>
          <div>
            <p className="font-semibold text-white">Admin dashboard</p>
            <p>Manage barbers, services & bookings.</p>
          </div>
        </div>
      </div>
      <div className="relative">
        <div className="card p-6 flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-muted">Featured Barber</span>
            <span className="rounded-full bg-accent/10 px-3 py-1 text-[11px] text-accent">
              Same‑day bookings
            </span>
          </div>
          <div className="flex items-center gap-4">
            <div className="h-14 w-14 rounded-2xl bg-gradient-to-tr from-accent/80 to-accentSoft/70" />
            <div>
              <p className="text-sm font-semibold">Alex “Fade Master”</p>
              <p className="text-xs text-muted">8+ years experience · Precision fades</p>
            </div>
          </div>
          <div className="mt-2 grid grid-cols-3 gap-3 text-xs">
            <div className="rounded-2xl bg-surfaceAlt/60 border border-border/60 p-3">
              <p className="text-[11px] text-muted">Avg. duration</p>
              <p className="text-sm font-semibold">45 min</p>
            </div>
            <div className="rounded-2xl bg-surfaceAlt/60 border border-border/60 p-3">
              <p className="text-[11px] text-muted">Customer rating</p>
              <p className="text-sm font-semibold">4.9 / 5</p>
            </div>
            <div className="rounded-2xl bg-surfaceAlt/60 border border-border/60 p-3">
              <p className="text-[11px] text-muted">This week</p>
              <p className="text-sm font-semibold">32 bookings</p>
            </div>
          </div>
          <Link href="/booking" className="btn-primary mt-2 w-full justify-center">
            Book with Alex
          </Link>
        </div>
      </div>
    </section>
  );
}

