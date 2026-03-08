export type Service = {
  id: number;
  name: string;
  price: number;
  durationMinutes: number;
};

export type Barber = {
  id: number;
  name: string;
  experience: number;
  photoUrl?: string | null;
};

export type BookingStatus = "PENDING" | "CONFIRMED" | "CANCELLED";

export type Booking = {
  id: number;
  userName: string;
  userPhone: string;
  barberId: number;
  barberName: string;
  serviceId: number;
  serviceName: string;
  bookingDate: string;
  bookingTime: string;
  status: BookingStatus;
};

export type CreateBookingPayload = {
  userName: string;
  userPhone: string;
  barberId: number;
  serviceId: number;
  bookingDate: string; // ISO date, e.g. "2026-03-08"
  bookingTime: string; // "HH:mm"
};

