import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function WorryRelease() {
  const [text, setText] = useState('')
  const [clouds, setClouds] = useState([])
  const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

  const release = async () => {
    if (!text.trim()) return
    const id = crypto.randomUUID()
    const newCloud = { id, text, x: Math.random()*40-20, delay: Math.random()*0.6 }
    setClouds(c => [...c, newCloud])
    setText('')
    try {
      await fetch(`${baseUrl}/worry`, { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({ text }) })
    } catch (e) { console.error(e) }
  }

  return (
    <div className="rounded-3xl bg-gradient-to-br from-white to-sky-50 border border-sky-100 p-6 shadow-[0_0_30px_rgba(56,189,248,0.15)]">
      <h3 className="text-sky-900 text-xl font-semibold mb-2">Worry release</h3>
      <p className="text-sky-700/80 text-sm mb-3">Type a worry and watch it drift away.</p>
      <div className="flex gap-2">
        <input value={text} onChange={e=>setText(e.target.value)} placeholder="What's on your mind?" className="flex-1 rounded-2xl border border-sky-100 bg-white/70 p-3 outline-none focus:ring-2 focus:ring-sky-300 text-sky-900 placeholder:text-sky-400" />
        <button onClick={release} className="px-4 py-2 rounded-2xl bg-sky-500 text-white shadow-[0_8px_24px_rgba(56,189,248,0.45)]">Release</button>
      </div>

      <div className="relative mt-6 h-40 rounded-2xl bg-gradient-to-b from-sky-50 to-white overflow-hidden">
        <AnimatePresence>
          {clouds.map(c => (
            <motion.div key={c.id} initial={{opacity:0, y:10}} animate={{opacity:[0,1,1,0], y:[10,-40,-80,-160], x:c.x}} transition={{duration:8, ease:'easeInOut', delay:c.delay}} className="absolute left-1/2 -translate-x-1/2">
              <div className="relative">
                <div className="w-28 h-20 bg-white rounded-full shadow-md border border-sky-100" />
                <div className="absolute -top-3 left-8 w-10 h-10 bg-white rounded-full border border-sky-100 shadow" />
                <div className="absolute -top-1 left-16 w-8 h-8 bg-white rounded-full border border-sky-100" />
                <div className="absolute inset-0 flex items-center justify-center text-sky-700/70 text-xs px-3 text-center">{c.text}</div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <div className="mt-4 flex items-center gap-2 text-sky-700/80 text-sm">
        <span className="w-2 h-2 rounded-full bg-sky-400 animate-pulse" />
        Try a calming breath
      </div>
      <div className="mt-2 h-2 rounded-full bg-sky-100 overflow-hidden">
        <motion.div className="h-full bg-sky-300" animate={{ width: ['0%','100%','0%'] }} transition={{ duration: 8, repeat: Infinity }} />
      </div>
    </div>
  )
}
