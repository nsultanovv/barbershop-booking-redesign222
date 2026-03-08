"use client";

import { useEffect, useState } from "react";
import { getServices } from "../../lib/api";
import type { Service } from "../../lib/types";
import Link from "next/link";

export default function ServicesPage() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;
    (async () => {
      try {
        const data = await getServices();
        if (isMounted) {
          setServices(data);
        }
      } catch (err) {
        if (isMounted) {
          setError(err instanceof Error ? err.message : "Failed to load services");
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    })();
    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div>
      <h1 className="page-title">Services</h1>
      <p className="text-sm text-muted mb-6">
        Choose from a curated list of cuts, shaves, and grooming services.
      </p>

      {loading && (
        <div className="grid gap-4 md:grid-cols-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <div
              key={i}
              className="card p-5 animate-pulse space-y-4 bg-surface/80"
            >
              <div className="h-4 w-2/3 rounded bg-surfaceAlt" />
              <div className="h-3 w-1/3 rounded bg-surfaceAlt" />
              <div className="h-9 w-full rounded-full bg-surfaceAlt mt-2" />
            </div>
          ))}
        </div>
      )}

      {error && (
        <div className="card p-4 border-red-500/60 text-sm text-red-300 mb-4">
          {error}
        </div>
      )}

      {!loading && !error && (
        <div className="grid gap-5 md:grid-cols-3">
          {services.map(service => (
            <div key={service.id} className="card p-5 flex flex-col gap-3">
              <div>
                <p className="text-sm font-semibold">{service.name}</p>
                <p className="text-xs text-muted">
                  {service.durationMinutes} min · ${service.price.toFixed(2)}
                </p>
              </div>
              <div className="mt-2">
                <Link
                  href={{
                    pathname: "/booking",
                    query: { serviceId: service.id }
                  }}
                  className="btn-primary w-full justify-center"
                >
                  Book now
                </Link>
              </div>
            </div>
          ))}
          {services.length === 0 && (
            <p className="text-sm text-muted">
              No services configured yet. Add services from the admin dashboard.
            </p>
          )}
        </div>
      )}
    </div>
  );
}

