import { useState, useEffect, useCallback } from 'react'

function useMedia(queries: string[], values: string[], defaultValue: string) {
  const mediaQueryLists = queries.map((q) => window.matchMedia(q))

  const getValue = useCallback(() => {
    const index = mediaQueryLists.findIndex((mql) => mql.matches)

    return typeof values[index] !== 'undefined' ? values[index] : defaultValue
  }, [])

  const [value, setValue] = useState(getValue)

  useEffect(() => {
    const handler = () => setValue(getValue)
    mediaQueryLists.forEach((mql) => mql.addListener(handler))
    return () => mediaQueryLists.forEach((mql) => mql.removeListener(handler))
  }, [])

  return value
}

export default useMedia
