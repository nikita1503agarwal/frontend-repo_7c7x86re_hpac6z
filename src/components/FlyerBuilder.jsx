import { useState } from 'react'

const initialForm = {
  EVENT_TITLE: 'Annual Science Fair',
  EVENT_TYPE: 'Student Exhibition',
  LOCALITY: 'Springfield',
  MAIN_IMAGE_ID: 'img_main_001',
  SECONDARY_IMAGES_COUNT: 3,
  CUSTOM_FONT: 'Inter',
  CUSTOM_COLOR_SCHEME: 'Royal Blue #2643e9, White #ffffff, Silver #c0c6d9'
}

export default function FlyerBuilder() {
  const [form, setForm] = useState(initialForm)
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState(null)
  const [error, setError] = useState(null)

  const backend = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: name === 'SECONDARY_IMAGES_COUNT' ? Number(value) : value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    setResult(null)
    try {
      const res = await fetch(`${backend}/api/generate_flyer_prompt`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      })
      if (!res.ok) throw new Error(`Request failed: ${res.status}`)
      const data = await res.json()
      setResult(data)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="w-full max-w-5xl mx-auto">
      <div className="bg-white/5 border border-white/10 rounded-2xl p-6 md:p-8">
        <h2 className="text-2xl font-semibold text-white mb-4">Flyer Prompt Generator</h2>
        <p className="text-blue-200/80 mb-6">Enter the event details and generate a high-quality background prompt and precise editing tasks for your flyer.</p>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <label className="flex flex-col gap-1">
            <span className="text-sm text-blue-100">Event Title</span>
            <input name="EVENT_TITLE" value={form.EVENT_TITLE} onChange={handleChange} className="px-3 py-2 rounded bg-slate-900/60 border border-white/10 text-white" required />
          </label>
          <label className="flex flex-col gap-1">
            <span className="text-sm text-blue-100">Event Type</span>
            <input name="EVENT_TYPE" value={form.EVENT_TYPE} onChange={handleChange} className="px-3 py-2 rounded bg-slate-900/60 border border-white/10 text-white" required />
          </label>
          <label className="flex flex-col gap-1">
            <span className="text-sm text-blue-100">Locality</span>
            <input name="LOCALITY" value={form.LOCALITY} onChange={handleChange} className="px-3 py-2 rounded bg-slate-900/60 border border-white/10 text-white" required />
          </label>
          <label className="flex flex-col gap-1">
            <span className="text-sm text-blue-100">Main Image ID</span>
            <input name="MAIN_IMAGE_ID" value={form.MAIN_IMAGE_ID} onChange={handleChange} className="px-3 py-2 rounded bg-slate-900/60 border border-white/10 text-white" required />
          </label>
          <label className="flex flex-col gap-1">
            <span className="text-sm text-blue-100">Secondary Images Count</span>
            <input type="number" min="0" max="12" name="SECONDARY_IMAGES_COUNT" value={form.SECONDARY_IMAGES_COUNT} onChange={handleChange} className="px-3 py-2 rounded bg-slate-900/60 border border-white/10 text-white" required />
          </label>
          <label className="flex flex-col gap-1">
            <span className="text-sm text-blue-100">Custom Font</span>
            <input name="CUSTOM_FONT" value={form.CUSTOM_FONT} onChange={handleChange} className="px-3 py-2 rounded bg-slate-900/60 border border-white/10 text-white" required />
          </label>
          <label className="flex flex-col gap-1 md:col-span-2">
            <span className="text-sm text-blue-100">Custom Color Scheme</span>
            <input name="CUSTOM_COLOR_SCHEME" value={form.CUSTOM_COLOR_SCHEME} onChange={handleChange} className="px-3 py-2 rounded bg-slate-900/60 border border-white/10 text-white" required />
          </label>

          <div className="md:col-span-2 flex items-center gap-3 mt-2">
            <button disabled={loading} className="px-4 py-2 rounded bg-blue-600 hover:bg-blue-500 text-white font-semibold disabled:opacity-50">
              {loading ? 'Generating…' : 'Generate'}
            </button>
            {error && <span className="text-red-300">{error}</span>}
          </div>
        </form>

        {result && (
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-slate-900/60 border border-white/10 rounded-lg p-4">
              <h3 className="text-white font-semibold mb-2">Image Generation Prompt</h3>
              <p className="text-blue-100 whitespace-pre-line text-sm leading-6">{result.image_generation_prompt}</p>
            </div>
            <div className="bg-slate-900/60 border border-white/10 rounded-lg p-4">
              <h3 className="text-white font-semibold mb-2">Image Editing & Composition Tasks</h3>
              <ol className="list-decimal list-inside text-blue-100 text-sm leading-6 whitespace-pre-line">
                {result.image_editing_tasks.split('\n').map((line, idx) => (
                  <li key={idx}>{line.replace(/^\d+\)\s*/, '')}</li>
                ))}
              </ol>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
