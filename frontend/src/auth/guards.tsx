import { Navigate, Outlet } from 'react-router'
import { useAuth } from './auth-context'

/** Rutas que requieren sesión: sin token, a `/login`. */
export function RequireAuth() {
  const { token } = useAuth()
  return token ? <Outlet /> : <Navigate to="/login" replace />
}

/** Rutas solo para invitados (login, registro): con token, al perfil. */
export function GuestOnly() {
  const { token } = useAuth()
  return token ? <Navigate to="/profile" replace /> : <Outlet />
}
