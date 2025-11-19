import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function ChatCompanion() {
  const [messages, setMessages] = useState([
    { role: 'assistant', content: "I'm Moodica, your gentle companion. How are you feeling right now?" }
  ])
  const [input, setInput] = useState('')
  const [sending, setSending] = useState(false)
  const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'
  const endRef = useRef(null)

  useEffect(()=>{ endRef.current?.scrollIntoView({ behavior:'smooth' }) }, [messages, sending])

  const send = async () => {
    const text = input.trim()
    if (!text) return
    const userMsg = { role:'user', content: text }
    setMessages(m => [...m, userMsg])
    setInput('')
    try {
      setSending(true)
      const res = await fetch(`${baseUrl}/chat`, { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify(userMsg) })
      const data = await res.json()
      if (data?.messages) {
        setMessages(m => [...m, ...data.messages.filter(x=>x.role==='assistant')])
      }
    } catch (e) { console.error(e) }
    finally { setSending(false) }
  }

  const onKey = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      send()
    }
  }

  return (
    <div className="rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 p-6 shadow-[0_0_30px_rgba(2,132,199,0.25)]">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sky-100 text-xl font-semibold">AI Emotional Companion</h3>
        <div className="text-[10px] text-sky-300/70">Private & on-device UI</div>
      </div>

      <div className="h-64 overflow-y-auto rounded-2xl bg-white/5 border border-white/10 p-3 space-y-2">
        {messages.map((m, i)=> (
          <motion.div key={i} initial={{opacity:0, y:6}} animate={{opacity:1, y:0}} className={`max-w-[85%] px-3 py-2 rounded-2xl ${m.role==='user' ? 'bg-sky-500/20 text-sky-50 ml-auto rounded-br-sm' : 'bg-white/10 text-sky-50 rounded-bl-sm'}`}>
            {m.content}
          </motion.div>
        ))}
        {sending && <div className="text-sky-300/70 text-sm">Thinking…</div>}
        <div ref={endRef} />
      </div>

      <div className="mt-3 flex gap-2">
        <textarea value={input} onChange={e=>setInput(e.target.value)} onKeyDown={onKey} placeholder="Share what's on your mind…" rows={2}
          className="flex-1 resize-none rounded-2xl border border-white/10 bg-white/5 p-3 outline-none focus:ring-2 focus:ring-sky-600 text-sky-100 placeholder:text-sky-400" />
        <button onClick={send} disabled={sending} className="px-4 py-2 h-[44px] self-end rounded-2xl bg-sky-600 text-white disabled:opacity-50 shadow-[0_8px_24px_rgba(2,132,199,0.45)]">Send</button>
      </div>

      <div className="mt-3 text-[11px] text-sky-300/70">
        This is supportive guidance, not medical advice. If you’re in danger, contact local emergency services.
      </div>
    </div>
  )
}
