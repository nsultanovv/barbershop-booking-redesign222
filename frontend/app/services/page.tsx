import ScrollReveal from "../components/ScrollReveal"

export default function Services(){

const services=[
{name:"Haircut",price:"$20",duration:"30 min"},
{name:"Beard Trim",price:"$15",duration:"20 min"},
{name:"Hair + Beard",price:"$30",duration:"45 min"}
]

return(

<div className="min-h-screen bg-[#08080f] text-white px-6 py-24">

<h1 className="text-4xl font-bold text-center mb-12 gradient-text">
Our Services
</h1>

<div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">

{services.map((s,i)=>(
<ScrollReveal key={i}>

<div className="glass p-6 rounded-xl hover:scale-105 transition">

<h3 className="text-xl font-semibold mb-2">{s.name}</h3>

<p className="text-gray-400">{s.duration}</p>

<p className="text-lg mt-2">{s.price}</p>

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