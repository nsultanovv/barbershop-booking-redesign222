'use client'

import { Suspense } from 'react'
import { useSearchParams } from 'next/navigation'

function BookingContent() {
  const searchParams = useSearchParams()
  const barber = searchParams.get("barber")

  return (
    <div>
      <h1>Book Appointment</h1>
      {barber && <p>Selected barber: {barber}</p>}
    </div>
  )
}

export default function BookingPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <BookingContent />
    </Suspense>
  )
}