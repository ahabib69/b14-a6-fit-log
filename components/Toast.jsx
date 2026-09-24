'use client'

import { usePlan } from '@/context/PlanContext'

export default function Toast() {
  const { toast } = usePlan()
  if (!toast) return null

  return (
    <div className="toast-slide fixed bottom-6 right-6 z-50 rounded-full bg-accent px-5 py-2.5 text-sm font-semibold text-black shadow-lg">
      {toast}
    </div>
  )
}
