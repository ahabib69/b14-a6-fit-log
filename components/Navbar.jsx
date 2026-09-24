'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { usePlan } from '@/context/PlanContext'

export default function Navbar() {
  const path = usePathname()
  const { plan, saved } = usePlan()

  const style = (href) =>
    `relative text-sm font-semibold uppercase tracking-wide transition-colors ${
      path === href
        ? 'text-accent'
        : 'text-white/70 hover:text-white'
    }`

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-bg/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:py-4">
        {/* Logo */}
        <Link
          href="/"
          className="shrink-0 font-display text-xl font-bold tracking-wide transition-opacity hover:opacity-80"
        >
          FIT<span className="text-accent">LOG</span>
        </Link>

        {/* Navigation */}
        <nav className="hidden items-center gap-8 md:flex">
          <Link href="/" className={style('/')}>
            Workouts
            {path === '/' && (
              <span className="absolute -bottom-2 left-0 h-0.5 w-full bg-accent" />
            )}
          </Link>

          <Link href="/my-plan" className={style('/my-plan')}>
            My Plan
            {path === '/my-plan' && (
              <span className="absolute -bottom-2 left-0 h-0.5 w-full bg-accent" />
            )}
          </Link>
        </nav>

        {/* Plan counters */}
        <div className="flex items-center gap-2 sm:gap-3">
          <Link
            href="/my-plan"
            className="rounded-full bg-accent px-3 py-1.5 text-[11px] font-bold text-black transition hover:scale-105"
          >
            Plan {plan.length}
          </Link>

          <Link
            href="/my-plan"
            className="hidden rounded-full border border-white/25 px-3 py-1.5 text-[11px] font-bold text-white/80 transition hover:border-white/50 hover:text-white sm:block"
          >
            Saved {saved.length}
          </Link>
        </div>
      </div>
    </header>
  )
}