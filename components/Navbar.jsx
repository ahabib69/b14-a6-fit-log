'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { usePlan } from '@/context/PlanContext'

export default function Navbar() {
  const path = usePathname()
  const { plan, saved } = usePlan()

  const style = (href) =>
    `text-sm font-semibold uppercase tracking-wide transition-colors ${
      path === href ? 'text-accent' : 'text-white/70 hover:text-white'
    }`

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-bg/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
        <Link href="/" className="font-display text-xl font-bold tracking-wide">
          FIT<span className="text-accent">LOG</span>
        </Link>

        <nav className="hidden gap-8 md:flex">
          <Link href="/" className={style('/')}>
            Workouts
          </Link>
          <Link href="/my-plan" className={style('/my-plan')}>
            Plan
          </Link>
        </nav>

        <div className="flex items-center gap-3">
          <Link
            href="/my-plan"
            className="rounded-full bg-accent px-3 py-1 text-xs font-bold text-black"
          >
            Plan {plan.length}
          </Link>
          <Link
            href="/my-plan"
            className="rounded-full border border-white/40 px-3 py-1 text-xs font-bold text-white"
          >
            Saved {saved.length}
          </Link>
        </div>
      </div>
    </header>
  )
}
