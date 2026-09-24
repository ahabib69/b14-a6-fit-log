import Link from 'next/link'

export default function WorkoutCard({ workout }) {
  return (
    <Link
      href={`/workout/${workout.id}`}
      className="group flex h-full flex-col overflow-hidden rounded-xl border border-border bg-surface transition duration-300 hover:-translate-y-1 hover:border-accent/60"
    >
      <div className="aspect-video w-full overflow-hidden">
        <img
          src={workout.image}
          alt={workout.name}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
        />
      </div>

      <div className="flex flex-1 flex-col gap-2 p-4 sm:p-5">
        <div className="flex flex-wrap gap-2">
          {workout.muscleGroups.map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-white/10 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-white/70"
            >
              {tag}
            </span>
          ))}
        </div>

        <h3 className="font-display text-base font-bold uppercase leading-snug sm:text-lg">
          {workout.name}
        </h3>

        <p className="text-sm text-white/50">{workout.equipment}</p>

        <div className="mt-auto flex flex-wrap items-center gap-x-3 gap-y-1 pt-2 text-[11px] font-semibold text-white/60 sm:gap-4 sm:text-xs">
          <span>⏱ {workout.duration} min</span>
          <span>🔥 {workout.caloriesBurned} kcal</span>
          <span>⭐ {workout.rating}</span>
        </div>
      </div>
    </Link>
  )
}