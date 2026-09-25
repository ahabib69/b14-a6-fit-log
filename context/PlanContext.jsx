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

        setToday(Array.isArray(parsed.today) ? parsed.today : [])
        setLater(Array.isArray(parsed.later) ? parsed.later : [])
      }
    } catch {
      setToday([])
      setLater([])
    }

    setReady(true)
  }, [])

  useEffect(() => {
    if (!ready) return

    try {
      localStorage.setItem(
        KEY,
        JSON.stringify({
          today,
          later,
        })
      )
    } catch {
      // Ignore localStorage errors
    }
  }, [today, later, ready])

  const flash = (text) => {
    setMsg(null)

    requestAnimationFrame(() => {
      setMsg(text)

      setTimeout(() => {
        setMsg(null)
      }, 2200)
    })
  }

  const addToday = (item) => {
    setToday((prev) => {
      if (prev.some((x) => x.id === item.id)) {
        flash('Already added')
        return prev
      }

      if (prev.length >= MAX_PLAN) {
        flash('Max 5 workouts today')
        return prev
      }

      flash("Added to today's plan")

      return [
        ...prev,
        {
          ...item,
          done: false,
        },
      ]
    })
  }

  const addLater = (item) => {
    setLater((prev) => {
      if (prev.some((x) => x.id === item.id)) {
        flash('Already saved')
        return prev
      }

      flash('Saved for later')

      return [...prev, item]
    })
  }

  const remove = (id, from) => {
    if (from === 'today') {
      setToday((prev) => prev.filter((item) => item.id !== id))
    } else {
      setLater((prev) => prev.filter((item) => item.id !== id))
    }

    flash('Removed')
  }

  const toggleDone = (id) => {
    setToday((prev) => {
      const item = prev.find((entry) => entry.id === id)
      flash(item?.done ? 'Marked as not done' : 'Marked as done')

      return prev.map((entry) =>
        entry.id === id
          ? {
              ...entry,
              done: !entry.done,
            }
          : entry
      )
    })
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
  const value = useContext(Ctx)

  if (!value) {
    throw new Error('usePlan must be used inside PlanProvider')
  }

  return value
}