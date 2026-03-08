"use client";

import { FormEvent, useEffect, useState } from "react";
import {
  cancelBooking,
  getBarbers,
  getBookings,
  getServices
} from "../../lib/api";
import type { Barber, Booking, Service } from "../../lib/types";

export default function AdminPage() {
  const [services, setServices] = useState<Service[]>([]);
  const [barbers, setBarbers] = useState<Barber[]>([]);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [barberForm, setBarberForm] = useState({
    name: "",
    experience: "",
    photoUrl: ""
  });
  const [serviceForm, setServiceForm] = useState({
    name: "",
    price: "",
    durationMinutes: ""
  });

  const [submittingBarber, setSubmittingBarber] = useState(false);
  const [submittingService, setSubmittingService] = useState(false);
  const [updatingBookings, setUpdatingBookings] = useState(false);

  useEffect(() => {
    let isMounted = true;
    (async () => {
      try {
        const [svc, brb, bks] = await Promise.all([
          getServices(),
          getBarbers(),
          getBookings()
        ]);
        if (!isMounted) return;
        setServices(svc);
        setBarbers(brb);
        setBookings(bks);
      } catch (err) {
        if (isMounted) {
          setError(
            err instanceof Error ? err.message : "Failed to load admin data"
          );
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    })();
    return () => {
      isMounted = false;
    };
  }, []);

  async function handleAddBarber(e: FormEvent) {
    e.preventDefault();
    setError(null);
    if (!barberForm.name.trim()) {
      setError("Barber name is required.");
      return;
    }
    setSubmittingBarber(true);
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8080"}/api/barbers`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: barberForm.name.trim(),
            experience: Number(barberForm.experience) || 0,
            photoUrl: barberForm.photoUrl || undefined
          })
        }
      );
      if (!res.ok) {
        const data = await res.json().catch(() => null);
        throw new Error(data?.message || "Failed to create barber");
      }
      const created: Barber = await res.json();
      setBarbers(prev => [...prev, created]);
      setBarberForm({ name: "", experience: "", photoUrl: "" });
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to create barber. Try again."
      );
    } finally {
      setSubmittingBarber(false);
    }
  }

  async function handleAddService(e: FormEvent) {
    e.preventDefault();
    setError(null);
    if (!serviceForm.name.trim()) {
      setError("Service name is required.");
      return;
    }
    setSubmittingService(true);
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8080"}/api/services`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: serviceForm.name.trim(),
            price: Number(serviceForm.price) || 0,
            durationMinutes: Number(serviceForm.durationMinutes) || 30
          })
        }
      );
      if (!res.ok) {
        const data = await res.json().catch(() => null);
        throw new Error(data?.message || "Failed to create service");
      }
      const created: Service = await res.json();
      setServices(prev => [...prev, created]);
      setServiceForm({ name: "", price: "", durationMinutes: "" });
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to create service. Try again."
      );
    } finally {
      setSubmittingService(false);
    }
  }

  async function handleCancelBooking(id: number) {
    setUpdatingBookings(true);
    setError(null);
    try {
      await cancelBooking(id);
      setBookings(prev =>
        prev.map(b =>
          b.id === id ? { ...b, status: "CANCELLED" } : b
        )
      );
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to cancel booking."
      );
    } finally {
      setUpdatingBookings(false);
    }
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="page-title">Admin dashboard</h1>
        <p className="text-sm text-muted">
          Manage barbers, services, and upcoming bookings.
        </p>
      </div>

      {loading && (
        <div className="card p-5 animate-pulse space-y-4 bg-surface/80">
          <div className="h-4 w-1/2 rounded bg-surfaceAlt" />
          <div className="h-4 w-1/3 rounded bg-surfaceAlt" />
          <div className="h-40 w-full rounded-xl bg-surfaceAlt" />
        </div>
      )}

      {error && (
        <div className="card p-4 border-red-500/60 text-xs text-red-200">
          {error}
        </div>
      )}

      {!loading && (
        <>
          <section className="grid md:grid-cols-2 gap-6">
            <form onSubmit={handleAddBarber} className="card p-5 space-y-3">
              <div className="flex items-center justify-between">
                <h2 className="text-sm font-semibold">Add barber</h2>
              </div>
              <label className="text-xs font-medium text-muted">
                Name
                <input
                  className="input mt-1"
                  value={barberForm.name}
                  onChange={e =>
                    setBarberForm(prev => ({ ...prev, name: e.target.value }))
                  }
                  placeholder="Barber name"
                />
              </label>
              <label className="text-xs font-medium text-muted">
                Experience (years)
                <input
                  type="number"
                  className="input mt-1"
                  value={barberForm.experience}
                  onChange={e =>
                    setBarberForm(prev => ({
                      ...prev,
                      experience: e.target.value
                    }))
                  }
                  min={0}
                />
              </label>
              <label className="text-xs font-medium text-muted">
                Photo URL (optional)
                <input
                  className="input mt-1"
                  value={barberForm.photoUrl}
                  onChange={e =>
                    setBarberForm(prev => ({
                      ...prev,
                      photoUrl: e.target.value
                    }))
                  }
                  placeholder="https://..."
                />
              </label>
              <button
                type="submit"
                className="btn-primary w-full justify-center mt-1"
                disabled={submittingBarber}
              >
                {submittingBarber ? "Saving..." : "Add barber"}
              </button>
            </form>

            <form onSubmit={handleAddService} className="card p-5 space-y-3">
              <div className="flex items-center justify-between">
                <h2 className="text-sm font-semibold">Add service</h2>
              </div>
              <label className="text-xs font-medium text-muted">
                Name
                <input
                  className="input mt-1"
                  value={serviceForm.name}
                  onChange={e =>
                    setServiceForm(prev => ({ ...prev, name: e.target.value }))
                  }
                  placeholder="Fade, shave, etc."
                />
              </label>
              <div className="grid grid-cols-2 gap-3">
                <label className="text-xs font-medium text-muted">
                  Price
                  <input
                    type="number"
                    className="input mt-1"
                    value={serviceForm.price}
                    onChange={e =>
                      setServiceForm(prev => ({
                        ...prev,
                        price: e.target.value
                      }))
                    }
                    min={0}
                    step={0.5}
                  />
                </label>
                <label className="text-xs font-medium text-muted">
                  Duration (min)
                  <input
                    type="number"
                    className="input mt-1"
                    value={serviceForm.durationMinutes}
                    onChange={e =>
                      setServiceForm(prev => ({
                        ...prev,
                        durationMinutes: e.target.value
                      }))
                    }
                    min={1}
                    step={5}
                  />
                </label>
              </div>
              <button
                type="submit"
                className="btn-primary w-full justify-center mt-1"
                disabled={submittingService}
              >
                {submittingService ? "Saving..." : "Add service"}
              </button>
            </form>
          </section>

          <section className="card p-5">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-sm font-semibold">Bookings</h2>
              <span className="text-[11px] text-muted">
                {bookings.length} total
              </span>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full text-xs">
                <thead>
                  <tr className="text-muted border-b border-border">
                    <th className="py-2 pr-2 text-left font-medium">Client</th>
                    <th className="py-2 px-2 text-left font-medium">Service</th>
                    <th className="py-2 px-2 text-left font-medium">Barber</th>
                    <th className="py-2 px-2 text-left font-medium">When</th>
                    <th className="py-2 pl-2 text-left font-medium">Status</th>
                    <th className="py-2 pl-2 text-right font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {bookings.map(booking => (
                    <tr
                      key={booking.id}
                      className="border-b border-border/60 last:border-0"
                    >
                      <td className="py-2 pr-2">
                        <div className="font-medium text-[11px]">
                          {booking.userName}
                        </div>
                        <div className="text-[11px] text-muted">
                          {booking.userPhone}
                        </div>
                      </td>
                      <td className="py-2 px-2 text-[11px]">
                        {booking.serviceName}
                      </td>
                      <td className="py-2 px-2 text-[11px]">
                        {booking.barberName}
                      </td>
                      <td className="py-2 px-2 text-[11px]">
                        {booking.bookingDate} · {booking.bookingTime}
                      </td>
                      <td className="py-2 px-2 text-[11px]">
                        <span
                          className={`rounded-full px-2 py-0.5 text-[10px] ${
                            booking.status === "CONFIRMED"
                              ? "bg-emerald-500/10 text-emerald-300 border border-emerald-500/40"
                              : booking.status === "PENDING"
                              ? "bg-amber-500/10 text-amber-300 border border-amber-500/40"
                              : "bg-red-500/10 text-red-300 border border-red-500/40"
                          }`}
                        >
                          {booking.status}
                        </span>
                      </td>
                      <td className="py-2 pl-2 text-right">
                        {booking.status !== "CANCELLED" && (
                          <button
                            type="button"
                            className="btn-secondary !px-3 !py-1 text-[11px]"
                            disabled={updatingBookings}
                            onClick={() => handleCancelBooking(booking.id)}
                          >
                            Cancel
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                  {bookings.length === 0 && (
                    <tr>
                      <td
                        colSpan={6}
                        className="py-6 text-center text-xs text-muted"
                      >
                        No bookings yet. Once clients book from the public site,
                        they will show up here.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </section>
        </>
      )}
    </div>
  );
}

