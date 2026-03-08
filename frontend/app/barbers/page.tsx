<div className="grid md:grid-cols-3 gap-8">

{barbers.map((b)=>(
<div
key={b.id}
className="glass p-6 rounded-xl text-center hover:scale-105 transition"
>

<img
src={b.photo_url}
className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
/>

<h3 className="text-lg font-semibold">
{b.name}
</h3>

<p className="text-gray-400">
{b.experience} years experience
</p>

<button className="mt-4 px-4 py-2 rounded-lg bg-gradient-to-r from-orange-500 to-red-500">
Book
</button>

</div>
))}

</div>