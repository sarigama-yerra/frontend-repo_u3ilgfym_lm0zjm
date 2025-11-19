import { useState } from 'react'
import Hero from './components/Hero'
import MoodCheckin from './components/MoodCheckin'
import WorryRelease from './components/WorryRelease'
import CalmNow from './components/CalmNow'
import Dashboard from './components/Dashboard'
import ChatCompanion from './components/ChatCompanion'

function App() {
  const [calmOpen, setCalmOpen] = useState(false)

  return (
    <div className="min-h-screen bg-[radial-gradient(120%_100%_at_50%_-10%,#0a2540,transparent_60%)] from-sky-950 via-sky-950 to-sky-900 text-sky-100">
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(80%_50%_at_50%_0%,rgba(14,165,233,0.15),transparent_60%)]" />

      <div className="relative max-w-5xl mx-auto px-6 py-10 space-y-8">
        <Hero onCalmNow={() => setCalmOpen(true)} />

        <div className="grid md:grid-cols-3 gap-6">
          <div className="md:col-span-2 space-y-6">
            <MoodCheckin onSaved={()=>{}} />
            <Dashboard />
          </div>
          <div className="space-y-6">
            <WorryRelease />
            <ChatCompanion />
          </div>
        </div>
      </div>

      <CalmNow open={calmOpen} onClose={() => setCalmOpen(false)} />
    </div>
  )
}

export default App
