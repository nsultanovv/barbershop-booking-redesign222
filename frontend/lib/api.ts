import type { Barber, Service, Booking, CreateBookingPayload } from "./types";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8080";

async function request<T>(path: string, options?: RequestInit): Promise<T> {
  const url = `${API_BASE_URL}${path}`;
  const res = await fetch(url, {
    headers: {
      "Content-Type": "application/json"
    },
    ...options,
    cache: "no-store"
  });

  if (!res.ok) {
    let message = `Request failed with status ${res.status}`;
    try {
      const data = await res.json();
      if (data?.message) {
        message = data.message;
      }
    } catch {
      // ignore json parse errors
    }
    throw new Error(message);
  }

  if (res.status === 204) {
    // no content
    return undefined as unknown as T;
  }

  return (await res.json()) as T;
}

export async function getServices(): Promise<Service[]> {
  return request<Service[]>("/api/services");
}

export async function getBarbers(): Promise<Barber[]> {
  return request<Barber[]>("/api/barbers");
}

export async function createBooking(
  payload: CreateBookingPayload
): Promise<Booking> {
  return request<Booking>("/api/bookings", {
    method: "POST",
    body: JSON.stringify(payload)
  });
}

export async function getBookings(): Promise<Booking[]> {
  return request<Booking[]>("/api/bookings");
}

export async function cancelBooking(id: number): Promise<void> {
  await request<void>(`/api/bookings/${id}`, { method: "DELETE" });
}

