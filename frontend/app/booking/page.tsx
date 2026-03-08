'use client'

import { useSearchParams } from 'next/navigation'

export const dynamic = "force-dynamic";

export default function BookingPage() {
  const searchParams = useSearchParams()
  const barber = searchParams.get("barber")
/* const barber = searchParams.get("barber") */

  return (
    <div>
      <h1>Book Appointment</h1>
      {barber && <p>Selected barber: {barber}</p>}
    </div>
  )
}