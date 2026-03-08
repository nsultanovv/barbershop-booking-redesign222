"use client"

import Link from "next/link"
import { useEffect, useState } from "react"

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <nav
      className={`fixed w-full z-50 transition-all ${
        scrolled
          ? "backdrop-blur bg-black/40 border-b border-white/10"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <h1 className="text-xl font-bold bg-gradient-to-r from-orange-400 to-red-500 bg-clip-text text-transparent">
          BarberBook
        </h1>

        <div className="flex gap-6 text-sm">
          <Link href="/home">Home</Link>
          <Link href="/services">Services</Link>
          <Link href="/barbers">Barbers</Link>
          <Link href="/booking">Booking</Link>
        </div>

        <Link
          href="/booking"
          className="px-4 py-2 rounded-lg bg-gradient-to-r from-orange-500 to-red-500 hover:scale-105 transition"
        >
          Book Now
        </Link>
      </div>
    </nav>
  )
}