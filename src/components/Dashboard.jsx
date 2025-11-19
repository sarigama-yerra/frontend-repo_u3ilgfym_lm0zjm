import { useEffect, useState } from 'react'

export default function Dashboard() {
  const [entries, setEntries] = useState([])
  const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

  const load = async () => {
    try {
      const res = await fetch(`${baseUrl}/mood`)
      if (!res.ok) return
      const data = await res.json()
      setEntries(Array.isArray(data) ? data : [])
    } catch (e) { console.error(e) }
  }

  useEffect(()=>{ load() }, [])

  return (
    <div className="rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 p-6 shadow-[0_0_30px_rgba(2,132,199,0.25)]">
      <h3 className="text-sky-100 text-xl font-semibold mb-2">Mood wave</h3>
      <p className="text-sky-300/80 text-sm mb-4">Your recent moods</p>
      <div className="h-32 flex items-end gap-2">
        {entries.slice(0,24).reverse().map((e,i)=>{
          const level = e.mood || 5
          const h = 20 + (level/10)*80
          return <div key={i} className="flex-1">
            <div className="mx-auto w-full rounded-full bg-gradient-to-t from-sky-700 to-sky-400" style={{height: h}} />
          </div>
        })}
      </div>
    </div>
  )
}
