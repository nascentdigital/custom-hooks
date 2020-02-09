import { useState, useEffect, useReducer, useMemo } from 'react'

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
 * @param {Object[]} fields
 * @param {string} fields[].name
 * @param {*} [fields[].initialValue]
 * @param {Boolean} [fields[].required]
 * @param {Function} [fields[].validate]
 * @param {Object} [options]
 * @param {Function} [options.customReducer]
 * @param {Function} [options.customInit]
 * @param {Number} [options.debounceValidation]
 * @returns {Array}
 */
export function useForm(fields, options = {}) {
  const { customReducer, customInit, debounceValidation = 0 } = options

  const validationsMap = useMemo(() => getValidationsMap(fields), [fields])
  const [formValues, valuesDispatch] = useReducer(
    customReducer || reducer,
    fields,
    customInit || init
  )
  const [isValid, setIsValid] = useState(false)
  const [formErrors, setFormErrors] = useState({})

  const debouncedFormValues = useDebounce(formValues, debounceValidation)
  useEffect(() => {
    const errors = {}
    if (validationsMap.size > 0) {
      validationsMap.forEach((validationFunc, field) => {
        const value = debouncedFormValues[field]
        const { pass, errorMessage } = validationFunc(
          value,
          debouncedFormValues
        )
        if (!pass) {
          errors[field] = errorMessage
        }
      })
      setIsValid(Object.keys(errors).length === 0)
      setFormErrors(errors)
    }
  }, [debouncedFormValues, validationsMap])

  return [formValues, valuesDispatch, isValid, formErrors]
}

const getValidationsMap = fields => {
  const map = new Map()
  fields.forEach(field => {
    const { name, required, validate } = field
    let validationFunc = validate
    if (required && validate === undefined) {
      validationFunc = value => {
        const pass = value != null && value !== ''
        return {
          pass,
          errorMessage: 'This field is required.'
        }
      }
    }
    if (validationFunc) {
      map.set(name, validationFunc)
    }
  })
  return map
}

const reducer = (state, action) => {
  switch (action.type) {
    case 'UPDATE_FIELD': {
      const { name, value } = action
      return { ...state, [name]: value }
    }
    default:
      throw new Error('invalid action type for reducer')
  }
}

const init = fields => {
  const state = {}
  fields.forEach(field => {
    const { name, initialValue } = field
    state[name] = initialValue !== undefined ? initialValue : ''
  })
  return state
}
