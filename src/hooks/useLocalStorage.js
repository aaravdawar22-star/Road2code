import { useEffect, useState } from 'react'

// Works like useState, but the value is also saved in localStorage under `key`,
// so it survives a page refresh. `initialValue` can be a value or a function.
export function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    const saved = localStorage.getItem(key)
    if (saved !== null) return JSON.parse(saved)
    return typeof initialValue === 'function' ? initialValue() : initialValue
  })

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value))
  }, [key, value])

  return [value, setValue]
}
