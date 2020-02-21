import { useState, useEffect } from 'react'

/**
 * useDebounce hook - returns debounced version of given value
 * @param {Any} value
 * @param {Number} delay - in miliseconds
 * @returns {Any}
 */
export function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value)

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)

    return () => {
      clearTimeout(handler)
    }
  }, [value, delay])

  return debouncedValue
}

/**
 * useForm hook - manages form state and validation
 */
export function useForm() {
  // ...
}
