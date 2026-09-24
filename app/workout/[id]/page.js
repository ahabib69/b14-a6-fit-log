import { notFound } from 'next/navigation'
import { getWorkoutById } from '@/lib/api'
import WorkoutActions from '@/components/WorkoutActions'

export default async function WorkoutDetailsPage({ params }) {
  const workout = await getWorkoutById(params.id)

  if (!workout) {
    notFound()
  }

  const specs = [
    ['Equipment', workout.equipment],
    ['Difficulty', workout.difficulty],
    ['Sets', workout.sets],
    ['Reps', workout.reps],
    ['Duration', `${workout.duration} min`],
    ['Calories', `${workout.caloriesBurned} kcal`],
    ['Rating', `⭐ ${workout.rating}`],
  ]

  return (
    <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 md:grid-cols-2">
      <div className="h-fit overflow-hidden rounded-2xl border border-border bg-surface">
        <img
          src={workout.image}
          alt={workout.name}
          className="aspect-square w-full object-cover transition duration-500 hover:scale-[1.02]"
        />
      </div>

      <div>
        <div className="mb-4 flex flex-wrap gap-2">
          {workout.muscleGroups.map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-white/10 px-3 py-1 text-xs font-bold uppercase tracking-wide text-white/70"
            >
              {tag}
            </span>
          ))}
        </div>

        <h1 className="font-display text-3xl font-bold uppercase leading-tight md:text-4xl">
          {workout.name}
        </h1>

        <p className="mt-4 leading-7 text-white/70">
          {workout.description}
        </p>

        <dl className="mt-7 grid grid-cols-2 gap-3 sm:grid-cols-3">
          {specs.map(([label, value]) => (
            <div
              key={label}
              className="rounded-xl border border-border bg-surface p-4 transition hover:border-accent/40"
            >
              <dt className="text-[11px] font-bold uppercase tracking-wide text-white/40">
                {label}
              </dt>
              <dd className="mt-1 font-semibold text-white">{value}</dd>
            </div>
          ))}
        </dl>

        <div className="mt-8">
          <h2 className="font-display text-lg font-bold uppercase">
            Instructions
          </h2>

          <ol className="mt-4 space-y-3">
            {workout.instructions.map((step, i) => (
              <li
                key={i}
                className="flex gap-3 rounded-lg border border-white/5 bg-white/[0.02] p-3 text-sm leading-6 text-white/80"
              >
                <span className="shrink-0 font-display font-bold text-accent">
                  {String(i + 1).padStart(2, '0')}
                </span>

                <span>{step}</span>
              </li>
            ))}
          </ol>
        </div>

        <WorkoutActions workout={workout} />
      </div>
    </div>
  )
}