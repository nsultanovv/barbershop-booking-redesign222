"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/home", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/barbers", label: "Barbers" },
  { href: "/booking", label: "Booking" },
  { href: "/admin", label: "Admin" }
];

export function Navbar() {
  const pathname = usePathname();

  return (
    <header className="border-b border-border/60 bg-background/80 backdrop-blur">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/home" className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-accent text-black font-bold tracking-tight">
            BS
          </div>
          <div className="flex flex-col leading-tight">
            <span className="text-sm font-semibold">Barber Studio</span>
            <span className="text-[11px] text-muted">Premium cuts & grooming</span>
          </div>
        </Link>
        <nav className="hidden md:flex items-center gap-6 text-sm">
          {links.map(link => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`transition-colors ${
                  active ? "text-accent" : "text-muted hover:text-white"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}

