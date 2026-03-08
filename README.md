## Barber Shop Booking System

Modern SaaS-style barber shop booking system built as a monorepo with a Next.js frontend and Spring Boot backend. Customers can book appointments online, and admins can manage barbers, services, and bookings with a focused admin dashboard.

### Features

- **Online bookings**: Customers can browse services and barbers, then book appointments with real-time conflict protection.
- **Admin dashboard**: Manage barbers, services, and bookings from a clean, dark UI.
- **Double-booking protection**: Business rule enforced at both application and database levels.
- **Production-ready stack**: Next.js (App Router), TailwindCSS, Spring Boot, PostgreSQL, and Docker-based deployment.

### Monorepo Structure

- **frontend**: Next.js (App Router) application with React and TailwindCSS. Implements the public site (`/home`, `/services`, `/barbers`, `/booking`) and the admin dashboard (`/admin`).
- **backend**: Java Spring Boot REST API using Spring Web, Spring Data JPA, PostgreSQL, and Lombok. Encapsulates all business logic and data access.
- **database**: PostgreSQL schema and migration script(s) for local development and deployment.
- **docs**: Additional documentation (architecture, API reference, deployment notes, and design decisions).

### Tech Stack

- **Frontend**: Next.js 14 (App Router), React 18, TailwindCSS 3
- **Backend**: Spring Boot 3, Spring Web, Spring Data JPA, Jakarta Validation, Lombok
- **Database**: PostgreSQL
- **Deployment**: Vercel (frontend), Render (backend) or any Docker-compatible platform

### Getting Started (Development)

#### 1. Database

1. Create a PostgreSQL database, e.g. `barbershop`.
2. Apply the schema:
   ```bash
   psql -d barbershop -f database/schema.sql
   ```

#### 2. Backend (Spring Boot)

From the `backend` folder:

```bash
mvn clean package
mvn spring-boot:run
```

Environment variables (with sensible defaults in `application.properties`):

- **`DATABASE_URL`** (e.g. `jdbc:postgresql://localhost:5432/barbershop`)
- **`DATABASE_USERNAME`**
- **`DATABASE_PASSWORD`**
- **`PORT`** (defaults to `8080`)

The backend exposes JSON APIs under `/api`:

- `GET /api/barbers`, `POST /api/barbers`, `DELETE /api/barbers/{id}`
- `GET /api/services`, `POST /api/services`
- `POST /api/bookings`, `GET /api/bookings`, `GET /api/bookings/date/{date}`, `DELETE /api/bookings/{id}`

#### 3. Frontend (Next.js)

From the `frontend` folder:

```bash
npm install
npm run dev
```

Configure the backend URL via:

- **`NEXT_PUBLIC_API_BASE_URL`** (e.g. `http://localhost:8080`)

Key routes:

- `/home`: Landing page and system overview.
- `/services`: Service catalog with “Book now” CTA.
- `/barbers`: Barber profiles with “Book with this barber”.
- `/booking`: Booking form (service, barber, date, time).
- `/admin`: Admin dashboard for managing barbers, services, and bookings.

### Deployment Guide

#### Backend → Render (Docker)

1. Build is defined by the Dockerfile in `backend/Dockerfile`.
2. Create a new **Web Service** on Render:
   - **Environment**: Docker
   - **Dockerfile path**: `backend/Dockerfile`
3. Configure environment variables:
   - `DATABASE_URL` – Render PostgreSQL connection string.
   - `DATABASE_USERNAME`, `DATABASE_PASSWORD` – if not encoded in URL.
   - `PORT` – usually `10000` (Render sets and passes this in).
4. Ensure the database has the schema from `database/schema.sql`.

#### Frontend → Vercel

1. Connect the repository to Vercel and select the `frontend` directory as the project root.
2. Vercel will detect Next.js automatically (`npm run build` / `npm run start`).
3. Set environment variables:
   - `NEXT_PUBLIC_API_BASE_URL` – the public URL of the Render backend (e.g. `https://your-backend.onrender.com`).
4. Deploy; Vercel will handle build and CDN distribution.

### Screenshots (Suggested)

Capture and place screenshots (e.g. in `docs/`) for:

- **Landing / home** page (`/home`)
- **Services** list (`/services`)
- **Barbers** gallery (`/barbers`)
- **Booking form** (`/booking`)
- **Admin dashboard** (`/admin`)

Then link them from this section as needed.


