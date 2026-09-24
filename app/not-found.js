import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-[60vh] max-w-xl flex-col items-center justify-center px-4 text-center">
      <p className="font-display text-6xl font-bold text-accent">404</p>
      <h1 className="mt-4 font-display text-2xl font-bold uppercase">
        Page not found
      </h1>
      <p className="mt-2 text-white/60">
        This page doesn&apos;t exist or the link is wrong.
      </p>
      <Link
        href="/"
        className="mt-6 rounded-full bg-accent px-6 py-3 text-sm font-bold uppercase text-black"
      >
        Back to workouts
      </Link>
    </div>
  )
}
