import { motion } from 'framer-motion'

export default function Hero({ onCalmNow }) {
  return (
    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-sky-900/40 to-sky-800/30 p-8 md:p-12 shadow-[0_0_60px_rgba(2,132,199,0.35)] border border-white/10">
      <div className="absolute -top-24 -left-24 w-72 h-72 rounded-full bg-sky-500/20 blur-3xl" />
      <div className="absolute -bottom-20 -right-10 w-80 h-80 rounded-full bg-sky-400/10 blur-3xl" />

      <div className="flex flex-col md:flex-row items-center md:items-start gap-8 md:gap-12">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex-1"
        >
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur px-3 py-1 rounded-full border border-white/10 text-sky-200 text-sm mb-4 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-sky-400 animate-pulse" />
            Calm, gentle, and private
          </div>
          <h1 className="text-4xl md:text-5xl font-semibold text-sky-50 tracking-tight">Moodica</h1>
          <p className="text-sky-200/90 mt-3 max-w-xl">An all‑in‑one space to understand your emotions, release worries, build habits, meditate, and talk with a caring AI companion.</p>

          <div className="mt-6 flex flex-col sm:flex-row gap-3">
            <button onClick={onCalmNow} className="px-5 py-3 rounded-2xl bg-sky-600 text-white shadow-[0_8px_30px_rgba(2,132,199,0.55)] hover:shadow-[0_8px_40px_rgba(2,132,199,0.75)] transition-shadow">Calm Now</button>
            <a href="#mood" className="px-5 py-3 rounded-2xl bg-white/10 border border-white/10 text-sky-100 hover:bg-white/15">Start a mood check‑in</a>
          </div>

          <p className="text-xs text-sky-300/80 mt-4">This app does not diagnose or treat medical conditions. If you are in danger, contact emergency services. Moodica offers emotional wellness support, not medical advice.</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="flex-1 flex items-center justify-center"
        >
          <div className="relative w-56 h-56 md:w-64 md:h-64">
            <div className="absolute inset-0 rounded-[2rem] bg-gradient-to-br from-white/10 to-white/5 shadow-2xl border border-white/10" />
            <div className="absolute -inset-3 rounded-[2.2rem] bg-sky-400/20 blur-2xl" />
            <div className="absolute inset-4 rounded-[1.7rem] bg-gradient-to-br from-sky-900/30 to-sky-800/20 flex items-center justify-center">
              <motion.div
                className="w-28 h-20 rounded-full bg-white/80 shadow-[0_10px_40px_rgba(2,132,199,0.45)] border border-white/20"
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              >
                <div className="absolute -top-3 left-8 w-10 h-10 bg-white/80 rounded-full border border-white/20 shadow-md" />
                <div className="absolute -top-2 left-16 w-8 h-8 bg-white/80 rounded-full border border-white/20 shadow" />
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
