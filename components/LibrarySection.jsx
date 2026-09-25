'use client'

import { useMemo, useState } from 'react'
import WorkoutCard from './WorkoutCard'

const SORT_OPTIONS = [
  { value: 'duration', label: 'Duration' },
  { value: 'caloriesBurned', label: 'Calories' },
  { value: 'rating', label: 'Rating' },
]

export default function LibrarySection({ workouts }) {
  const [sortBy, setSortBy] = useState('duration')
  const [query, setQuery] = useState('')

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return workouts
    return workouts.filter((w) => w.name.toLowerCase().includes(q))
  }, [workouts, query])

  const sorted = useMemo(() => {
    return [...filtered].sort((a, b) => b[sortBy] - a[sortBy])
  }, [filtered, sortBy])

  return (
    <section id="library" className="mx-auto max-w-6xl px-4 py-16">
      <div className="mb-8 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <h2 className="font-display text-3xl font-bold uppercase">
            The Library
          </h2>
          <p className="mt-1 text-white/60">
            Twelve lifts covering every major muscle group.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search workouts..."
            className="w-48 rounded-full border border-border bg-surface px-4 py-1.5 text-sm text-white placeholder:text-white/40 outline-none focus:border-accent"
          />

          <label className="flex items-center gap-2 text-sm">
            Sort By
            <span className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="appearance-none rounded-full border border-border bg-surface py-1.5 pl-3 pr-8 text-sm text-white outline-none"
              >
                {SORT_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
              <span
                aria-hidden
                className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-xs text-white/50"
              >
                ▾
              </span>
            </span>
          </label>
        </div>
      </div>

      {sorted.length === 0 ? (
        <p className="py-16 text-center text-white/50">
          No workouts match &quot;{query}&quot;.
        </p>
      ) : (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {sorted.map((workout) => (
            <WorkoutCard key={workout.id} workout={workout} />
          ))}
        </div>
      )}
    </section>
  )
}