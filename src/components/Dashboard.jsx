import { useEffect, useState } from 'react'

export default function Dashboard() {
  const [entries, setEntries] = useState([])
  const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

  useEffect(()=>{ (async ()=>{
    try {
      const res = await fetch(`${baseUrl}/mood`)
      const data = await res.json()
      setEntries(data)
    } catch (e) { console.error(e) }
  })() }, [])

  return (
    <div className="rounded-3xl bg-white/70 backdrop-blur border border-sky-100 p-6 shadow-[0_0_30px_rgba(56,189,248,0.15)]">
      <h3 className="text-sky-900 text-xl font-semibold mb-2">Mood wave</h3>
      <p className="text-sky-700/80 text-sm mb-4">Your recent moods</p>
      <div className="h-32 flex items-end gap-2">
        {entries.slice(0,24).reverse().map((e,i)=>{
          const level = e.mood || 5
          const h = 20 + (level/10)*80
          return <div key={i} className="flex-1">
            <div className="mx-auto w-full rounded-full bg-gradient-to-t from-sky-200 to-sky-400" style={{height: h}} />
          </div>
        })}
      </div>
    </div>
  )
}
