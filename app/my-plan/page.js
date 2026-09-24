'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePlan } from '@/context/PlanContext'

export default function MyPlanPage() {
  const { plan, saved, hydrated, removeItem, markDone } = usePlan()
  const [view, setView] = useState('plan')

  const items = view === 'plan' ? plan : saved
  const totalMin = plan.reduce((a, b) => a + b.duration, 0)
  const totalCal = plan.reduce((a, b) => a + b.caloriesBurned, 0)

  if (!hydrated) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <p className="text-white/60">Loading...</p>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-12">
      <h1 className="font-display text-3xl font-bold uppercase">My Plan</h1>
      <p className="mt-1 text-white/60">
        Max 5 workouts for the day. Finish them, then add more if you want.
      </p>

      <div className="mt-6 grid grid-cols-3 gap-3">
        {[
          ['Exercises', plan.length],
          ['Minutes', totalMin],
          ['Calories', totalCal],
        ].map(([t, n]) => (
          <div
            key={t}
            className="rounded-xl border border-border bg-surface p-4 text-center"
          >
            <p className="text-2xl font-bold text-accent">{n}</p>
            <p className="text-xs uppercase text-white/50">{t}</p>
          </div>
        ))}
      </div>

      <div className="mt-8 flex gap-2 border-b border-border">
        {[
          ['plan', `Today (${plan.length})`],
          ['saved', `Saved (${saved.length})`],
        ].map(([k, label]) => (
          <button
            key={k}
            onClick={() => setView(k)}
            className={`px-4 py-2 text-sm font-bold uppercase ${
              view === k
                ? 'border-b-2 border-accent text-accent'
                : 'text-white/50'
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      <div className="mt-6 space-y-4">
        {items.length === 0 ? (
          <div className="rounded-xl border border-dashed border-border py-16 text-center">
            <p className="font-display text-xl font-bold uppercase">
              Empty for now
            </p>
            <p className="mt-2 text-white/60">
              Go grab something from the library.
            </p>
            <Link
              href="/"
              className="mt-5 inline-block rounded-full bg-accent px-6 py-2.5 text-sm font-bold uppercase text-black"
            >
              Browse workouts
            </Link>
          </div>
        ) : (
          items.map((item, i) => (
            <div
              key={`${view}-${item.id}`}
              className={`plan-slide flex flex-col gap-4 rounded-xl border border-border bg-surface p-4 sm:flex-row sm:items-center ${
                item.done ? 'opacity-50' : ''
              }`}
              style={{ animationDelay: `${i * 80}ms` }}
            >
              <img
                src={item.image}
                alt={item.name}
                className="h-20 w-20 rounded-lg object-cover"
              />
              <div className="flex-1">
                <h3 className="font-display font-bold uppercase">{item.name}</h3>
                <p className="text-sm text-white/50">{item.equipment}</p>
                <div className="mt-1 flex gap-3 text-xs text-white/60">
                  <span>⏱ {item.duration} min</span>
                  <span>🔥 {item.caloriesBurned} kcal</span>
                  <span>⭐ {item.rating}</span>
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                <Link
                  href={`/workout/${item.id}`}
                  className="rounded-full border border-white/30 px-4 py-1.5 text-xs font-bold uppercase"
                >
                  Details
                </Link>
                {view === 'plan' && (
                  <button
                    onClick={() => markDone(item.id)}
                    className="rounded-full bg-accent px-4 py-1.5 text-xs font-bold uppercase text-black"
                  >
                    ✓ Done
                  </button>
                )}
                <button
                  onClick={() =>
                    removeItem(item.id, view === 'plan' ? 'today' : 'saved')
                  }
                  className="rounded-full border border-white/30 px-3 py-1.5 text-xs font-bold text-white/70"
                >
                  ✕
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
