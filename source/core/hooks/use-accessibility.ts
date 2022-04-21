import { useEffect, useState } from 'react'

export const useAccessibility = () => {
  const [isMounted, setIsMounted] = useState<boolean>(false)
  const [hasAccess, setHasAccess] = useState<boolean>(false)

  const checkAccessibility = () => {
    setHasAccess(true)
  }

  useEffect(() => {
    checkAccessibility()
    setIsMounted(true)
  }, [])

  return { isMounted, hasAccess }
}
