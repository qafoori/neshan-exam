import { useEffect, useState } from 'react'

/**
 *
 *
 *
 * triggers on first app load
 * and checks if the user has access to the app or not
 * if have, then return `hasAccess:true`
 * and in `source/routes` we will map through the private routes only
 * but if `hasAccess:false` we will map through the public routes only
 *
 * here, because we don't have any authentication process, it returns `hasAccess:true` by default
 */
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
