'use client'

export default function Error({ error, reset }) {
  return (
    <div className="mx-auto flex min-h-[60vh] max-w-xl flex-col items-center justify-center px-4 text-center">
      <p className="font-display text-4xl font-bold text-accent">Oops</p>
      <h1 className="mt-4 font-display text-2xl font-bold uppercase">
        Something went wrong
      </h1>
      <p className="mt-2 text-white/60">
        Couldn&apos;t load the workouts right now. Check your connection and
        try again.
      </p>
      <button
        onClick={reset}
        className="mt-6 rounded-full bg-accent px-6 py-3 text-sm font-bold uppercase text-black"
      >
        Try again
      </button>
    </div>
  )
}