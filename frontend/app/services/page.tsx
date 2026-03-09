import ScrollReveal from "../components/ScrollReveal"

type Service = {
  id: number
  name: string
  price: number
  durationMinutes: number
}

async function getServices(): Promise<Service[]> {
  const res = await fetch("http://localhost:8080/api/services", {
    cache: "no-store"
  })
  return res.json()
}

export default async function Services() {

const services: Service[] = await getServices()

return(

<div className="min-h-screen bg-[#08080f] text-white px-6 py-24">

<h1 className="text-4xl font-bold text-center mb-12 gradient-text">
Our Services
</h1>

<div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">

{services.map((s: Service, i: number)=>(

<ScrollReveal key={i}>

<div className="glass p-6 rounded-xl hover:scale-105 transition">

<h3 className="text-xl font-semibold mb-2">{s.name}</h3>

<p className="text-gray-400">{s.durationMinutes} min</p>

<p className="text-lg mt-2">${s.price}</p>

<button className="mt-4 w-full py-2 rounded-lg bg-gradient-to-r from-orange-500 to-red-500">
Book Now
</button>

</div>

</ScrollReveal>

))}

</div>

</div>

)

}