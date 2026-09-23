import { createContext, useContext } from 'react'

export type AuthContextValue = {
  token: string | null
  /** Guarda el token recibido en signup/login. */
  setSession: (token: string) => void
  /** Borra la sesión local (sin llamar al backend). */
  clearSession: () => void
  /** Revoca el token en el backend (best-effort) y borra la sesión local. */
  logout: () => Promise<void>
}

export const AuthContext = createContext<AuthContextValue | null>(null)

export function useAuth() {
  const value = useContext(AuthContext)
  if (!value) throw new Error('useAuth debe usarse dentro de <AuthProvider>')
  return value
}
