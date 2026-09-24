'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePlan } from '@/context/PlanContext'

export default function MyPlanPage() {
  const { plan, saved, hydrated, removeItem, markDone } = usePlan()
  const [view, setView] = useState('plan')

  const items = view === 'plan' ? plan : saved

  const totalMin = plan.reduce(
    (total, item) => total + Number(item.duration || 0),
    0
  )

  const totalCal = plan.reduce(
    (total, item) => total + Number(item.caloriesBurned || 0),
    0
  )

  if (!hydrated) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <div className="flex items-center gap-2 text-sm text-white/60">
          <span className="h-2 w-2 animate-pulse rounded-full bg-accent" />
          Loading your plan...
        </div>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-12">
      {/* Header */}
      <div className="max-w-2xl">
        <p className="text-xs font-bold uppercase tracking-[0.25em] text-accent">
          FitLog
        </p>

        <h1 className="mt-2 font-display text-3xl font-bold uppercase md:text-4xl">
          My Plan
        </h1>

        <p className="mt-2 text-sm leading-6 text-white/60">
          Max 5 workouts for the day. Finish them, then add more if you want.
        </p>
      </div>

      {/* Stats */}
      <div className="mt-7 grid grid-cols-1 gap-3 sm:grid-cols-3">
        {[
          ['Exercises', plan.length],
          ['Minutes', totalMin],
          ['Calories', totalCal],
        ].map(([title, value]) => (
          <div
            key={title}
            className="rounded-xl border border-border bg-surface p-4 text-center transition hover:border-accent/40"
          >
            <p className="text-2xl font-bold text-accent">{value}</p>

            <p className="mt-1 text-xs font-bold uppercase tracking-wide text-white/40">
              {title}
            </p>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div className="mt-8 flex gap-6 border-b border-border">
        {[
          ['plan', `Today (${plan.length})`],
          ['saved', `Saved (${saved.length})`],
        ].map(([key, label]) => (
          <button
            key={key}
            onClick={() => setView(key)}
            className={`relative pb-3 text-sm font-bold uppercase transition ${
              view === key
                ? 'text-accent'
                : 'text-white/40 hover:text-white/70'
            }`}
          >
            {label}

            {view === key && (
              <span className="absolute inset-x-0 -bottom-px h-0.5 bg-accent" />
            )}
          </button>
        ))}
      </div>

      {/* Workout List */}
      <div className="mt-6 space-y-4">
        {items.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-border bg-surface/40 px-5 py-16 text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-white/5 text-2xl text-white/40">
              +
            </div>

            <p className="mt-5 font-display text-xl font-bold uppercase">
              Empty for now
            </p>

            <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-white/50">
              Go grab something from the workout library and build your plan.
            </p>

            <Link
              href="/"
              className="mt-6 inline-block rounded-full bg-accent px-6 py-2.5 text-sm font-bold uppercase text-black transition hover:scale-[1.02] hover:opacity-90"
            >
              Browse workouts
            </Link>
          </div>
        ) : (
          items.map((item, index) => (
            <div
              key={`${view}-${item.id}`}
              className={`plan-slide rounded-2xl border border-border bg-surface p-4 transition hover:border-accent/40 ${
                item.done ? 'opacity-50' : ''
              }`}
              style={{
                animationDelay: `${index * 80}ms`,
              }}
            >
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                {/* Image */}
                <img
                  src={item.image}
                  alt={item.name}
                  className="h-20 w-full rounded-xl object-cover sm:h-20 sm:w-20"
                />

                {/* Information */}
                <div className="min-w-0 flex-1">
                  <h3 className="font-display font-bold uppercase">
                    {item.name}
                  </h3>

                  <p className="mt-1 text-sm text-white/50">
                    {item.equipment}
                  </p>

                  <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-xs text-white/60">
                    <span>⏱ {item.duration} min</span>
                    <span>🔥 {item.caloriesBurned} kcal</span>
                    <span>⭐ {item.rating}</span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex flex-wrap gap-2">
                  <Link
                    href={`/workout/${item.id}`}
                    className="rounded-full border border-white/20 px-4 py-2 text-xs font-bold uppercase transition hover:border-accent hover:text-accent"
                  >
                    Details
                  </Link>

                  {view === 'plan' && (
                    <button
                      onClick={() => markDone(item.id)}
                      className="rounded-full bg-accent px-4 py-2 text-xs font-bold uppercase text-black transition hover:opacity-90"
                    >
                      {item.done ? 'Undo' : '✓ Done'}
                    </button>
                  )}

                  <button
                    onClick={() =>
                      removeItem(
                        item.id,
                        view === 'plan' ? 'today' : 'saved'
                      )
                    }
                    className="rounded-full border border-white/20 px-3 py-2 text-xs font-bold text-white/60 transition hover:border-red-400/50 hover:text-red-400"
                    aria-label={`Remove ${item.name}`}
                  >
                    ✕
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}