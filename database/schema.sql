-- PostgreSQL schema for Barber Shop Booking System
-- This script defines core tables, constraints, and indexes.

CREATE TABLE IF NOT EXISTS users (
    id              BIGSERIAL PRIMARY KEY,
    name            VARCHAR(100) NOT NULL,
    phone           VARCHAR(20) NOT NULL UNIQUE,
    created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS barbers (
    id              BIGSERIAL PRIMARY KEY,
    name            VARCHAR(100) NOT NULL,
    experience      INTEGER NOT NULL CHECK (experience >= 0),
    photo_url       TEXT,
    created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS services (
    id                  BIGSERIAL PRIMARY KEY,
    name                VARCHAR(100) NOT NULL UNIQUE,
    price               NUMERIC(10, 2) NOT NULL CHECK (price >= 0),
    duration_minutes    INTEGER NOT NULL CHECK (duration_minutes > 0),
    created_at          TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS bookings (
    id              BIGSERIAL PRIMARY KEY,
    user_id         BIGINT NOT NULL,
    barber_id       BIGINT NOT NULL,
    service_id      BIGINT NOT NULL,
    booking_date    DATE NOT NULL,
    booking_time    TIME NOT NULL,
    status          VARCHAR(20) NOT NULL DEFAULT 'PENDING',
    created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),

    CONSTRAINT fk_bookings_user
        FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE,
    CONSTRAINT fk_bookings_barber
        FOREIGN KEY (barber_id) REFERENCES barbers (id) ON DELETE CASCADE,
    CONSTRAINT fk_bookings_service
        FOREIGN KEY (service_id) REFERENCES services (id) ON DELETE RESTRICT
);

-- Prevent double booking for the same barber at the same date & time
-- for active bookings (PENDING or CONFIRMED).
CREATE UNIQUE INDEX IF NOT EXISTS ux_bookings_barber_datetime_active
ON bookings (barber_id, booking_date, booking_time)
WHERE status IN ('PENDING', 'CONFIRMED');

-- Useful indexes for queries
CREATE INDEX IF NOT EXISTS idx_bookings_date
    ON bookings (booking_date);

CREATE INDEX IF NOT EXISTS idx_bookings_user
    ON bookings (user_id);

CREATE INDEX IF NOT EXISTS idx_bookings_barber
    ON bookings (barber_id);

