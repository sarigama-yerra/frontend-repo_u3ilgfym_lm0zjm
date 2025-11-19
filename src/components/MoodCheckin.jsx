import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function MoodCheckin({ onSaved }) {
  const [mood, setMood] = useState(5)
  const [note, setNote] = useState('')
  const [saving, setSaving] = useState(false)
  const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

  const save = async () => {
    try {
      setSaving(true)
      const res = await fetch(`${baseUrl}/mood`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ mood: Number(mood), note })
      })
      if (!res.ok) throw new Error('Failed to save')
      onSaved?.()
      setNote('')
      setMood(5)
    } catch (e) {
      console.error(e)
    } finally {
      setSaving(false)
    }
  }

  return (
    <div id="mood" className="rounded-3xl bg-white/70 backdrop-blur border border-sky-100 p-6 shadow-[0_0_30px_rgba(56,189,248,0.15)]">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sky-900 text-xl font-semibold">Daily mood check‑in</h3>
        <span className="text-sky-600 text-sm">How are you feeling?</span>
      </div>

      <div className="flex items-center gap-3">
        {[1,2,3,4,5,6,7,8,9,10].map(v => (
          <button key={v} onClick={() => setMood(v)} className={`w-8 h-8 rounded-full transition-all ${mood===v ? 'bg-sky-500 text-white shadow-[0_8px_24px_rgba(56,189,248,0.45)]' : 'bg-sky-100 text-sky-700 hover:bg-sky-200'}`}>{v}</button>
        ))}
      </div>

      <textarea value={note} onChange={e=>setNote(e.target.value)} placeholder="Add a short note"
        className="mt-4 w-full rounded-2xl border border-sky-100 bg-white/70 p-3 outline-none focus:ring-2 focus:ring-sky-300 text-sky-900 placeholder:text-sky-400" />

      <div className="mt-4 flex justify-end">
        <button onClick={save} disabled={saving} className="px-4 py-2 rounded-2xl bg-sky-500 text-white disabled:opacity-50 shadow-[0_8px_24px_rgba(56,189,248,0.45)]">
          {saving ? 'Saving…' : 'Save mood'}
        </button>
      </div>

      <AnimatePresence>
        {saving && (
          <motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} className="mt-2 text-sky-600 text-sm">Saving your entry…</motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
