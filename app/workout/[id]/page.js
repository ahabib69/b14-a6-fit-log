import { notFound } from 'next/navigation'
import { getWorkoutById } from '@/lib/api'
import WorkoutActions from '@/components/WorkoutActions'

export default async function WorkoutDetailsPage({ params }) {
  const workout = await getWorkoutById(params.id)
  if (!workout) notFound()

  const specs = [
    ['Equipment', workout.equipment],
    ['Difficulty', workout.difficulty],
    ['Sets', workout.sets],
    ['Reps', workout.reps],
    ['Duration', `${workout.duration} min`],
    ['Calories', `${workout.caloriesBurned} kcal`],
    ['Rating', workout.rating],
  ]

  return (
    <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 md:grid-cols-2">
      <div className="aspect-square w-full overflow-hidden rounded-2xl md:aspect-auto">
        <img
          src={workout.image}
          alt={workout.name}
          className="h-full w-full object-cover"
        />
      </div>

      <div>
        <div className="mb-3 flex flex-wrap gap-2">
          {workout.muscleGroups.map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-white/10 px-3 py-1 text-xs font-bold uppercase text-white/70"
            >
              {tag}
            </span>
          ))}
        </div>

        <h1 className="font-display text-3xl font-bold uppercase md:text-4xl">
          {workout.name}
        </h1>
        <p className="mt-3 text-white/70">{workout.description}</p>

        <dl className="mt-6 grid grid-cols-2 gap-x-6 gap-y-3 rounded-xl border border-border bg-surface p-4 sm:grid-cols-3">
          {specs.map(([label, value]) => (
            <div key={label}>
              <dt className="text-[11px] font-bold uppercase tracking-wide text-white/40">
                {label}
              </dt>
              <dd className="font-semibold">{value}</dd>
            </div>
          ))}
        </dl>

        <div className="mt-8">
          <h2 className="font-display text-lg font-bold uppercase">
            Instructions
          </h2>
          <ol className="mt-3 space-y-2">
            {workout.instructions.map((step, i) => (
              <li key={i} className="flex gap-3 text-sm text-white/80">
                <span className="font-display text-accent">{i + 1}.</span>
                {step}
              </li>
            ))}
          </ol>
        </div>

        <WorkoutActions workout={workout} />
      </div>
    </div>
  )
}
