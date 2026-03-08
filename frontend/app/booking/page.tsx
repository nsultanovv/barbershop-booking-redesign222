"use client";

import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { getBarbers, getServices, createBooking } from "../../lib/api";
import type { Barber, Service } from "../../lib/types";

type FormState = {
  userName: string;
  userPhone: string;
  serviceId: string;
  barberId: string;
  bookingDate: string;
  bookingTime: string;
};

const initialForm: FormState = {
  userName: "",
  userPhone: "",
  serviceId: "",
  barberId: "",
  bookingDate: "",
  bookingTime: ""
};

export default function BookingPage() {
  const searchParams = useSearchParams();
  const [services, setServices] = useState<Service[]>([]);
  const [barbers, setBarbers] = useState<Barber[]>([]);
  const [form, setForm] = useState<FormState>(initialForm);
  const [loadingOptions, setLoadingOptions] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;
    (async () => {
      try {
        const [svc, brb] = await Promise.all([getServices(), getBarbers()]);
        if (!isMounted) return;

        setServices(svc);
        setBarbers(brb);

        const preselectedService = searchParams.get("serviceId");
        const preselectedBarber = searchParams.get("barberId");

        setForm(prev => ({
          ...prev,
          serviceId: preselectedService ?? prev.serviceId,
          barberId: preselectedBarber ?? prev.barberId,
          bookingDate: prev.bookingDate || new Date().toISOString().slice(0, 10)
        }));
      } catch (err) {
        if (isMounted) {
          setError(
            err instanceof Error ? err.message : "Failed to load booking options"
          );
        }
      } finally {
        if (isMounted) {
          setLoadingOptions(false);
        }
      }
    })();
    return () => {
      isMounted = false;
    };
  }, [searchParams]);

  const availableTimes = useMemo(
    () => [
      "09:00",
      "09:30",
      "10:00",
      "10:30",
      "11:00",
      "11:30",
      "12:00",
      "13:00",
      "13:30",
      "14:00",
      "14:30",
      "15:00",
      "16:00",
      "17:00"
    ],
    []
  );

  function handleChange(
    field: keyof FormState,
    value: string
  ) {
    setForm(prev => ({ ...prev, [field]: value }));
  }

  function validate(): string | null {
    if (!form.userName.trim()) return "Please enter your name.";
    if (!form.userPhone.trim()) return "Please enter your phone number.";
    if (!form.serviceId) return "Please select a service.";
    if (!form.barberId) return "Please select a barber.";
    if (!form.bookingDate) return "Please choose a date.";
    if (!form.bookingTime) return "Please choose a time.";
    return null;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    const validationError = validate();
    if (validationError) {
      setError(validationError);
      return;
    }

    setSubmitting(true);
    try {
      const payload = {
        userName: form.userName.trim(),
        userPhone: form.userPhone.trim(),
        barberId: Number(form.barberId),
        serviceId: Number(form.serviceId),
        bookingDate: form.bookingDate,
        bookingTime: form.bookingTime
      };

      const booking = await createBooking(payload);
      setSuccess(
        `Booking confirmed with ${booking.barberName} on ${booking.bookingDate} at ${booking.bookingTime}.`
      );
      setForm(prev => ({
        ...prev,
        bookingTime: "",
        bookingDate: prev.bookingDate
      }));
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to create booking. Please try again."
      );
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="max-w-xl">
      <h1 className="page-title">Book an appointment</h1>
      <p className="text-sm text-muted mb-6">
        Choose your service, barber, and time. You’ll receive instant confirmation.
      </p>

      {loadingOptions && (
        <div className="card p-5 animate-pulse space-y-4 bg-surface/80">
          <div className="h-4 w-1/2 rounded bg-surfaceAlt" />
          <div className="h-4 w-full rounded bg-surfaceAlt" />
          <div className="h-4 w-3/4 rounded bg-surfaceAlt" />
          <div className="h-9 w-full rounded-full bg-surfaceAlt mt-2" />
        </div>
      )}

      {!loadingOptions && (
        <form onSubmit={handleSubmit} className="card p-6 space-y-4">
          {error && (
            <div className="rounded-xl border border-red-500/60 bg-red-950/30 px-3 py-2 text-xs text-red-200">
              {error}
            </div>
          )}
          {success && (
            <div className="rounded-xl border border-emerald-500/60 bg-emerald-950/30 px-3 py-2 text-xs text-emerald-200">
              {success}
            </div>
          )}

          <div className="grid gap-3">
            <label className="text-xs font-medium text-muted">
              Full name
              <input
                className="input mt-1"
                value={form.userName}
                onChange={e => handleChange("userName", e.target.value)}
                placeholder="John Fade"
              />
            </label>
            <label className="text-xs font-medium text-muted">
              Phone number
              <input
                className="input mt-1"
                value={form.userPhone}
                onChange={e => handleChange("userPhone", e.target.value)}
                placeholder="+1 (555) 123-4567"
              />
            </label>
          </div>

          <div className="grid md:grid-cols-2 gap-3">
            <label className="text-xs font-medium text-muted">
              Service
              <select
                className="select mt-1"
                value={form.serviceId}
                onChange={e => handleChange("serviceId", e.target.value)}
              >
                <option value="">Select a service</option>
                {services.map(service => (
                  <option key={service.id} value={service.id}>
                    {service.name} · {service.durationMinutes} min
                  </option>
                ))}
              </select>
            </label>
            <label className="text-xs font-medium text-muted">
              Barber
              <select
                className="select mt-1"
                value={form.barberId}
                onChange={e => handleChange("barberId", e.target.value)}
              >
                <option value="">Choose a barber</option>
                {barbers.map(barber => (
                  <option key={barber.id} value={barber.id}>
                    {barber.name} · {barber.experience} yrs
                  </option>
                ))}
              </select>
            </label>
          </div>

          <div className="grid md:grid-cols-[1.1fr,0.9fr] gap-3">
            <label className="text-xs font-medium text-muted">
              Date
              <input
                type="date"
                className="input mt-1"
                value={form.bookingDate}
                onChange={e => handleChange("bookingDate", e.target.value)}
              />
            </label>
            <label className="text-xs font-medium text-muted">
              Time
              <select
                className="select mt-1"
                value={form.bookingTime}
                onChange={e => handleChange("bookingTime", e.target.value)}
              >
                <option value="">Select time</option>
                {availableTimes.map(time => (
                  <option key={time} value={time}>
                    {time}
                  </option>
                ))}
              </select>
            </label>
          </div>

          <button
            type="submit"
            className="btn-primary w-full justify-center mt-2"
            disabled={submitting}
          >
            {submitting ? "Booking..." : "Confirm booking"}
          </button>
        </form>
      )}
    </div>
  );
}

