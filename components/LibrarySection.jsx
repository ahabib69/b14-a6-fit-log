'use client'

import { useMemo, useState } from 'react'
import WorkoutCard from './WorkoutCard'

const SORTS = [
  { key: 'duration', name: 'Duration' },
  { key: 'caloriesBurned', name: 'Calories' },
  { key: 'rating', name: 'Rating' },
]

export default function LibrarySection({ workouts }) {
  const [activeSort, setActiveSort] = useState('duration')

  const list = useMemo(() => {
    const copy = [...workouts]
    copy.sort((x, y) => y[activeSort] - x[activeSort])
    return copy
  }, [workouts, activeSort])

  return (
    <section id="library" className="mx-auto max-w-6xl px-4 py-16">
      <div className="mb-8 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <h2 className="font-display text-3xl font-bold uppercase">
            All Workouts
          </h2>
          <p className="mt-1 text-white/60">
            12 lifts. Sort them however you like.
          </p>
        </div>

        <label className="flex items-center gap-2 text-sm">
          Sort
          <select
            value={activeSort}
            onChange={(e) => setActiveSort(e.target.value)}
            className="rounded-full border border-border bg-surface px-3 py-1.5 text-sm text-white outline-none"
          >
            {SORTS.map((s) => (
              <option key={s.key} value={s.key}>
                {s.name}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {list.map((w) => (
          <WorkoutCard key={w.id} workout={w} />
        ))}
      </div>
    </section>
  )
}
