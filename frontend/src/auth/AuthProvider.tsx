import { useCallback, useMemo, useState, type ReactNode } from 'react'
import { logout as apiLogout } from '@/lib/api'
import { AuthContext } from './authContext'

const TOKEN_KEY = 'flowsync.token'

function readStoredToken() {
  try {
    return localStorage.getItem(TOKEN_KEY)
  } catch {
    return null
  }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [token, setTokenState] = useState<string | null>(readStoredToken)

  const setToken = useCallback((value: string) => {
    try {
      localStorage.setItem(TOKEN_KEY, value)
    } catch {
      // Sin storage disponible la sesión dura lo que la pestaña
    }
    setTokenState(value)
  }, [])

  const clearSession = useCallback(() => {
    try {
      localStorage.removeItem(TOKEN_KEY)
    } catch {
      // ignorado
    }
    setTokenState(null)
  }, [])

  const logout = useCallback(async () => {
    const current = token
    clearSession()
    if (current) {
      // Best-effort: aunque falle la revocación en el servidor, la sesión local ya está cerrada
      await apiLogout(current).catch(() => {})
    }
  }, [token, clearSession])

  const value = useMemo(
    () => ({ token, setToken, clearSession, logout }),
    [token, setToken, clearSession, logout],
  )

  return <AuthContext value={value}>{children}</AuthContext>
}
