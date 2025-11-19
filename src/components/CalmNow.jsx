import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function CalmNow({ open, onClose }) {
  const [visible, setVisible] = useState(open)
  useEffect(()=>setVisible(open),[open])
  if (!visible) return null

  return (
    <AnimatePresence>
      {visible && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-sky-950/70 backdrop-blur-md" onClick={onClose} />
          <motion.div initial={{opacity:0, y:10}} animate={{opacity:1, y:0}} exit={{opacity:0}} className="relative w-[90%] max-w-md rounded-3xl p-8 bg-gradient-to-br from-sky-900/70 to-sky-800/70 border border-white/10 shadow-[0_0_50px_rgba(2,132,199,0.55)]">
            <h3 className="text-sky-100 text-xl font-semibold text-center">Calm Now</h3>
            <p className="text-sky-300/90 text-sm text-center mt-1">Breathe with the cloud. In for 4, hold 4, out for 6.</p>
            <div className="mt-6 flex items-center justify-center">
              <motion.div className="relative w-40 h-40"
                animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}>
                <div className="absolute inset-0 rounded-full bg-white/80 border border-white/20 shadow-[0_10px_50px_rgba(2,132,199,0.55)]" />
                <div className="absolute -top-2 left-10 w-12 h-12 bg-white/80 rounded-full border border-white/20" />
                <div className="absolute -top-1 left-24 w-10 h-10 bg-white/80 rounded-full border border-white/20" />
              </motion.div>
            </div>
            <audio autoPlay loop>
              <source src="https://cdn.pixabay.com/download/audio/2022/03/10/audio_b2a7c7f2f0.mp3?filename=calm-meditation-112191.mp3" type="audio/mpeg" />
            </audio>
            <div className="mt-6 flex justify-center">
              <button onClick={onClose} className="px-5 py-2 rounded-2xl bg-sky-600 text-white shadow-[0_8px_24px_rgba(2,132,199,0.45)]">I'm calmer</button>
            </div>
            <p className="mt-4 text-center text-[11px] text-sky-300/80">This is supportive guidance, not medical advice. If you’re in danger, call emergency services.</p>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
