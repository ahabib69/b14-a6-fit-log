'use client'

import { usePlan } from '@/context/PlanContext'

export default function WorkoutActions({ workout }) {
  const { plan, saved, addToPlan, saveForLater, removeItem, PLAN_CAP } = usePlan()
  const alreadyInPlan = plan.some((item) => item.id === workout.id)
  const alreadySaved = saved.some((item) => item.id === workout.id)
  const planFull = plan.length >= PLAN_CAP

  return (
    <>
      <div className="mt-8 flex flex-wrap gap-3">
        <button
          onClick={() => addToPlan(workout)}
          disabled={alreadyInPlan || planFull}
          className="rounded-full bg-accent px-6 py-3 text-sm font-bold uppercase text-black transition hover:scale-[1.02] hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:scale-100"
        >
          + {alreadyInPlan
            ? "Already in today's plan"
            : planFull
              ? 'Plan is full'
              : "Add to today's plan"}
        </button>

        <button
          onClick={() => saveForLater(workout)}
          disabled={alreadySaved}
          className="rounded-full border border-white/40 px-6 py-3 text-sm font-bold uppercase text-white transition hover:border-accent hover:text-accent disabled:cursor-not-allowed disabled:opacity-40"
        >
          ☆ {alreadySaved ? 'Saved' : 'Save for later'}
        </button>
      </div>

      {plan.length > 0 && (
        <aside className="fixed right-5 top-24 z-40 hidden w-80 max-w-[calc(100vw-2rem)] rounded-2xl border border-border bg-surface/95 p-5 shadow-2xl backdrop-blur-md lg:block">
          <div className="mb-5 flex items-center justify-between">
            <div>
              <p className="font-display text-lg font-bold uppercase">
                Today's Plan
              </p>
              <p className="text-xs text-white/50">
                {plan.length}/{PLAN_CAP} workouts added
              </p>
            </div>

            <span className="rounded-full bg-accent px-3 py-1 text-xs font-bold text-black">
              {plan.length}/{PLAN_CAP}
            </span>
          </div>

          <div className="max-h-[65vh] space-y-3 overflow-y-auto pr-1">
            {plan.map((item, index) => (
              <div
                key={item.id}
                className="rounded-xl border border-white/10 bg-white/[0.04] p-3"
              >
                <div className="flex gap-3">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="h-14 w-14 shrink-0 rounded-lg object-cover"
                  />

                  <div className="min-w-0 flex-1">
                    <p className="font-display truncate text-sm font-bold uppercase">
                      {index + 1}. {item.name}
                    </p>

                    <p className="mt-1 text-xs text-white/50">
                      {item.duration} min · {item.caloriesBurned} kcal
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => removeItem(item.id, 'today')}
                  className="mt-3 w-full rounded-lg border border-white/10 py-1.5 text-[11px] font-bold uppercase text-white/50 transition hover:border-red-400/50 hover:text-red-400"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        </aside>
      )}
    </>
  )
}
