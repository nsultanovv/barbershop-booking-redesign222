import Image from "next/image"

<div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8">

{barbers.map((b)=>(
<div
key={b.id}
className="glass p-6 rounded-xl text-center transition duration-300 hover:scale-105 hover:shadow-xl"
>

<Image
src={b.photo_url}
alt={b.name}
width={96}
height={96}
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