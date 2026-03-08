"use client";

import { useEffect, useState } from "react";
import { getBarbers } from "../../lib/api";
import type { Barber } from "../../lib/types";
import Link from "next/link";

export default function BarbersPage() {
  const [barbers, setBarbers] = useState<Barber[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;
    (async () => {
      try {
        const data = await getBarbers();
        if (isMounted) {
          setBarbers(data);
        }
      } catch (err) {
        if (isMounted) {
          setError(err instanceof Error ? err.message : "Failed to load barbers");
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
      <h1 className="page-title">Barbers</h1>
      <p className="text-sm text-muted mb-6">
        Meet the team. Choose a barber whose style matches your vibe.
      </p>

      {loading && (
        <div className="grid gap-4 md:grid-cols-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="card p-5 animate-pulse space-y-4 bg-surface/80">
              <div className="h-16 w-16 rounded-2xl bg-surfaceAlt" />
              <div className="h-4 w-1/2 rounded bg-surfaceAlt" />
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
          {barbers.map(barber => (
            <div key={barber.id} className="card p-5 flex flex-col gap-3">
              <div className="flex items-center gap-3">
                <div className="h-14 w-14 rounded-2xl bg-gradient-to-tr from-accent/80 to-accentSoft/70 overflow-hidden">
                  {barber.photoUrl && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={barber.photoUrl}
                      alt={barber.name}
                      className="h-full w-full object-cover"
                    />
                  )}
                </div>
                <div>
                  <p className="text-sm font-semibold">{barber.name}</p>
                  <p className="text-xs text-muted">
                    {barber.experience} years experience
                  </p>
                </div>
              </div>
              <div className="mt-2">
                <Link
                  href={{
                    pathname: "/booking",
                    query: { barberId: barber.id }
                  }}
                  className="btn-primary w-full justify-center"
                >
                  Book with this barber
                </Link>
              </div>
            </div>
          ))}
          {barbers.length === 0 && (
            <p className="text-sm text-muted">
              No barbers configured yet. Add barbers from the admin dashboard.
            </p>
          )}
        </div>
      )}
    </div>
  );
}

