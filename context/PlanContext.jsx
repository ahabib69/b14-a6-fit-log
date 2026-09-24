'use client'

import { createContext, useContext, useEffect, useState } from 'react'

const Ctx = createContext(null)
const KEY = 'fitlog-v1'
const MAX_PLAN = 5

export function PlanProvider({ children }) {
  const [today, setToday] = useState([])
  const [later, setLater] = useState([])
  const [ready, setReady] = useState(false)
  const [msg, setMsg] = useState(null)

  useEffect(() => {
    try {
      const saved = localStorage.getItem(KEY)
      if (saved) {
        const parsed = JSON.parse(saved)
        setToday(parsed.today || [])
        setLater(parsed.later || [])
      }
    } catch {
      // ignore
    }
    setReady(true)
  }, [])

  useEffect(() => {
    if (!ready) return
    localStorage.setItem(KEY, JSON.stringify({ today, later }))
  }, [today, later, ready])

  const flash = (text) => {
    setMsg(null)
    // tiny delay so animation retriggers every time
    requestAnimationFrame(() => {
      setMsg(text)
      setTimeout(() => setMsg(null), 2200)
    })
  }

  const addToday = (item) => {
    setToday((prev) => {
      if (prev.find((x) => x.id === item.id)) {
        flash('Already added')
        return prev
      }
      if (prev.length >= MAX_PLAN) {
        flash('Max 5 workouts today')
        return prev
      }
      flash('Added to plan')
      return [...prev, { ...item, done: false }]
    })
  }

  const addLater = (item) => {
    setLater((prev) => {
      if (prev.find((x) => x.id === item.id)) {
        flash('Already saved')
        return prev
      }
      flash('Saved for later')
      return [...prev, item]
    })
  }

  const remove = (id, from) => {
    if (from === 'today') {
      setToday((p) => p.filter((x) => x.id !== id))
    } else {
      setLater((p) => p.filter((x) => x.id !== id))
    }
    flash('Removed')
  }

  const toggleDone = (id) => {
    setToday((p) =>
      p.map((x) => (x.id === id ? { ...x, done: !x.done } : x))
    )
    flash('Updated')
  }

  return (
    <Ctx.Provider
      value={{
        plan: today,
        saved: later,
        hydrated: ready,
        addToPlan: addToday,
        saveForLater: addLater,
        removeItem: remove,
        markDone: toggleDone,
        toast: msg,
        PLAN_CAP: MAX_PLAN,
      }}
    >
      {children}
    </Ctx.Provider>
  )
}

export function usePlan() {
  const v = useContext(Ctx)
  if (!v) throw new Error('wrap with PlanProvider first')
  return v
}
