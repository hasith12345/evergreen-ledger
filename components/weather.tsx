"use client"

import { useEffect, useState } from 'react'

type WeatherResp = {
  current_weather?: { temperature: number; windspeed: number; weathercode: number }
  daily?: { temperature_2m_max?: number[]; temperature_2m_min?: number[] }
  hourly?: { time?: string[]; relativehumidity_2m?: number[] }
}

function weatherCodeToLabel(code: number) {
  // simplified mapping from WMO weather interpretation codes
  if (code === 0) return { label: 'Clear', kind: 'clear' }
  if (code === 1 || code === 2) return { label: 'Partly cloudy', kind: 'partly' }
  if (code === 3) return { label: 'Overcast', kind: 'cloudy' }
  if (code >= 51 && code <= 67) return { label: 'Drizzle', kind: 'rain' }
  if (code >= 80 && code <= 86) return { label: 'Rain', kind: 'rain' }
  if (code >= 71 && code <= 77) return { label: 'Snow', kind: 'snow' }
  return { label: 'Unknown', kind: 'unknown' }
}

export default function WeatherWidget({
  latitude = 6.9271,
  longitude = 79.8612,
}: { latitude?: number; longitude?: number }) {
  const [loading, setLoading] = useState(true)
  const [temp, setTemp] = useState<number | null>(null)
  const [max, setMax] = useState<number | null>(null)
  const [min, setMin] = useState<number | null>(null)
  const [code, setCode] = useState<number | null>(null)
  const [label, setLabel] = useState<string>('')
  const [kind, setKind] = useState<string>('clear')
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let mounted = true
    setLoading(true)
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true&daily=temperature_2m_max,temperature_2m_min&timezone=auto&forecast_days=1`
    fetch(url)
      .then((r) => r.json() as Promise<WeatherResp>)
      .then((data) => {
        if (!mounted) return
        if (data.current_weather) {
          setTemp(Math.round(data.current_weather.temperature))
          setCode(data.current_weather.weathercode)
          const info = weatherCodeToLabel(data.current_weather.weathercode)
          setLabel(info.label)
          setKind(info.kind)
        }
        // try to read humidity from hourly data closest to current hour
        if (data.hourly && data.hourly.time && data.hourly.relativehumidity_2m) {
          try {
            const now = new Date()
            // find index with matching hour in hourly.time
            let idx = data.hourly.time.findIndex((t) => new Date(t).getHours() === now.getHours())
            if (idx === -1) idx = 0
            const hum = data.hourly.relativehumidity_2m[idx]
            if (hum !== undefined) {
              const humRounded = Math.round(Number(hum))
              // persist for other pages to read (procurement will pick this up)
              try {
                localStorage.setItem('evergreen_weather_humidity', String(humRounded))
              } catch (e) {
                // ignore storage errors (e.g., SSR or privacy settings)
              }
            }
          } catch (e) {
            // ignore parsing errors
          }
        }
        if (data.daily) {
          const dmax = data.daily.temperature_2m_max?.[0]
          const dmin = data.daily.temperature_2m_min?.[0]
          if (dmax !== undefined) setMax(Math.round(dmax))
          if (dmin !== undefined) setMin(Math.round(dmin))
        }
      })
      .catch((err) => {
        console.error('Weather fetch failed', err)
        if (!mounted) return
        setError('Unable to load weather')
      })
      .finally(() => {
        if (!mounted) return
        setLoading(false)
      })

    return () => {
      mounted = false
    }
  }, [latitude, longitude])

  return (
    <div className="px-3 py-3">
      <div className="bg-emerald-900/30 rounded-lg p-3 text-white flex items-center gap-3">
        <div className="w-16 h-12 flex items-center justify-center">
          {/* Animated weather icon */}
          <div className="relative w-12 h-10">
            {/* sun */}
            <div
              className={`absolute left-0 top-0 w-7 h-7 rounded-full bg-yellow-300 ${kind === 'clear' || kind === 'partly' ? 'animate-spin-slow' : ''} shadow-sm`}
              style={{ transformOrigin: 'center' }}
            />
            {/* cloud */}
            <svg className={`absolute bottom-0 right-0 w-12 h-7 ${kind === 'cloudy' || kind === 'rain' || kind === 'partly' ? 'opacity-100' : 'opacity-60'}`} viewBox="0 0 64 40" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M20 26c-6 0-10-5-10-9s4-8 10-8c1 0 3 0 4 1 1-4 4-6 8-6 5 0 9 4 9 9 0 .5 0 1 0 1 6 0 11 4 11 9 0 6-7 9-16 9H20z" fill="#e6eef0" />
            </svg>
            {/* rain drops for rainy */}
            {kind === 'rain' && (
              <div className="absolute bottom-0 left-0 w-full flex justify-center -translate-y-1">
                <div className="space-x-1 flex">
                  <span className="block w-0.5 h-3 bg-cyan-200 rounded animate-fall" />
                  <span className="block w-0.5 h-3 bg-cyan-200 rounded animate-fall animation-delay-150" />
                  <span className="block w-0.5 h-3 bg-cyan-200 rounded animate-fall animation-delay-300" />
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="flex-1">
          <div className="flex items-baseline gap-2">
            <div className="text-2xl font-semibold">{loading ? '—' : temp !== null ? `${temp}°C` : 'N/A'}</div>
            <div className="text-xs opacity-80">{loading ? 'Loading' : label}</div>
          </div>
          <div className="text-xs opacity-70 mt-1">
            {loading ? '' : max !== null && min !== null ? `Today: H ${max}° • L ${min}°` : error ?? ''}
          </div>
        </div>
      </div>

      <style>{` 
        @keyframes fall { to { transform: translateY(8px); opacity: 0 } }
        .animate-fall { animation: fall 0.8s linear infinite }
        .animation-delay-150 { animation-delay: 0.15s }
        .animation-delay-300 { animation-delay: 0.3s }
        .animate-spin-slow { animation: spin 4s linear infinite }
        @keyframes spin { to { transform: rotate(360deg) } }
      `}</style>
    </div>
  )
}
