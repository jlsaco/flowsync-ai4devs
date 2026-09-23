import { useCallback, useMemo, useState, type ReactNode } from 'react'
import { logout as revokeToken } from '@/lib/api'
import { AuthContext } from './auth-context'

const TOKEN_KEY = 'flowsync.token'

function readToken() {
  try {
    return localStorage.getItem(TOKEN_KEY)
  } catch {
    return null
  }
}

function writeToken(token: string | null) {
  try {
    if (token) localStorage.setItem(TOKEN_KEY, token)
    else localStorage.removeItem(TOKEN_KEY)
  } catch {
    // Sin storage (modo privado estricto): la sesión dura lo que la pestaña.
  }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [token, setToken] = useState<string | null>(readToken)

  const setSession = useCallback((next: string) => {
    writeToken(next)
    setToken(next)
  }, [])

  const clearSession = useCallback(() => {
    writeToken(null)
    setToken(null)
  }, [])

  const logout = useCallback(async () => {
    const current = token
    clearSession()
    if (current) await revokeToken(current).catch(() => {})
  }, [token, clearSession])

  const value = useMemo(
    () => ({ token, setSession, clearSession, logout }),
    [token, setSession, clearSession, logout],
  )

  return <AuthContext value={value}>{children}</AuthContext>
}
