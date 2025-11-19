import { useState } from 'react'
import Hero from './components/Hero'
import MoodCheckin from './components/MoodCheckin'
import WorryRelease from './components/WorryRelease'
import CalmNow from './components/CalmNow'
import Dashboard from './components/Dashboard'

function App() {
  const [calmOpen, setCalmOpen] = useState(false)

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-100 via-white to-sky-50 text-sky-900">
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(80%_50%_at_50%_0%,rgba(186,230,253,0.6),transparent_60%)]" />

      <div className="relative max-w-5xl mx-auto px-6 py-10 space-y-8">
        <Hero onCalmNow={() => setCalmOpen(true)} />

        <div className="grid md:grid-cols-3 gap-6">
          <div className="md:col-span-2 space-y-6">
            <MoodCheckin onSaved={()=>{}} />
            <Dashboard />
          </div>
          <div className="space-y-6">
            <WorryRelease />
            <div className="rounded-3xl bg-white/70 backdrop-blur border border-sky-100 p-6 shadow-[0_0_30px_rgba(56,189,248,0.15)]">
              <h3 className="text-sky-900 text-xl font-semibold mb-2">AI companion</h3>
              <p className="text-sky-700/80 text-sm">Coming next: supportive chat, insights, reframes, and daily emotional report.</p>
            </div>
          </div>
        </div>
      </div>

      <CalmNow open={calmOpen} onClose={() => setCalmOpen(false)} />
    </div>
  )
}

export default App
