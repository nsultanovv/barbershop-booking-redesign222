"use client"

export default function BarbersPage() {

  const barbers = [
    {
      id: 1,
      name: "John Barber",
      experience: 5,
      photo_url: "https://i.pravatar.cc/150?img=3"
    },
    {
      id: 2,
      name: "Mike Fade",
      experience: 7,
      photo_url: "https://i.pravatar.cc/150?img=4"
    },
    {
      id: 3,
      name: "Alex Style",
      experience: 4,
      photo_url: "https://i.pravatar.cc/150?img=5"
    }
  ]

  return (
    <div className="min-h-screen bg-[#08080f] text-white py-24 px-6">

      <h1 className="text-4xl font-bold text-center mb-12">
        Our Barbers
      </h1>

      <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8">

        {barbers.map((b) => (
          <div
            key={b.id}
            className="p-6 rounded-xl text-center border border-gray-700"
          >

            <img
              src={b.photo_url}
              alt={b.name}
              className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
            />

            <h3 className="text-lg font-semibold">
              {b.name}
            </h3>

            <p className="text-gray-400">
              {b.experience} years experience
            </p>

            <button className="mt-4 px-4 py-2 rounded-lg bg-orange-500">
              Book
            </button>

          </div>
        ))}

      </div>

    </div>
  )
}