export default function Loading() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center px-4">
      <div className="text-center">
        <div className="mx-auto h-10 w-10 animate-spin rounded-full border-2 border-white/10 border-t-accent" />

        <p className="mt-4 font-display text-sm font-bold uppercase tracking-wide text-white/70">
          Loading workouts...
        </p>

        <p className="mt-1 text-xs text-white/40">
          Getting your workout library ready
        </p>
      </div>
    </div>
  )
}