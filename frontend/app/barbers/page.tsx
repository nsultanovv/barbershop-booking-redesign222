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

      <h1 className="text-4xl font-bold text-center mb-12 bg-gradient-to-r from-orange-400 to-red-500 bg-clip-text text-transparent">
        Our Barbers
      </h1>

      <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8">

        {barbers.map((b) => (
          <div
            key={b.id}
            className="glass p-6 rounded-xl text-center transition duration-300 hover:scale-105 hover:shadow-xl"
          >

            <img
              src={b.photo_url}
              alt={b.name}
              className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
            />

            <h3 className="text-lg font-semibold mt-2">
              {b.name}
            </h3>

            <p className="text-gray-400 text-sm">
              {b.experience} years experience
            </p>

            <button
              className="mt-4 px-5 py-2 rounded-lg bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-400 hover:to-red-400 transition duration-300"
            >
              Book with this barber
            </button>

          </div>
        ))}

      </div>

    </div>
  )
}