import FlyerBuilder from './components/FlyerBuilder'

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,rgba(59,130,246,0.15),transparent_40%),radial-gradient(circle_at_80%_90%,rgba(99,102,241,0.15),transparent_40%)]" />

      <div className="relative min-h-screen flex items-center justify-center p-8">
        <div className="max-w-6xl w-full">
          <div className="text-center mb-10">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-3 tracking-tight">Admin Portal · Flyer Prompt Studio</h1>
            <p className="text-blue-200">Convert structured event metadata into high-quality generation prompts and editing tasks.</p>
          </div>

          <FlyerBuilder />

          <div className="text-center mt-8">
            <p className="text-sm text-blue-300/60">Optimized for text-to-image engines and print-ready composition workflows.</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
