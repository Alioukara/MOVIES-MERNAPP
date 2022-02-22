import { useEffect, useState } from 'react'

const PREFIX = 'forum-'

export default function useLocalStorage(key) {
  const prefixedKey = PREFIX + key
  const [value, setValue] = useState(() => {
    const jsonValue = localStorage.getItem('jwt')
    if (jsonValue != null) return JSON.parse(localStorage.getItem('jwt'))
 
  })

  useEffect(() => {
    
    localStorage.setItem(prefixedKey, JSON.stringify(value))
  }, [prefixedKey, value])

  return [value, setValue]
}