import { Navigate, Outlet } from 'react-router'
import { useAuth } from './useAuth'

/** Solo deja pasar con sesión; si no, manda a /login. */
export function RequireAuth() {
  const { token } = useAuth()
  return token ? <Outlet /> : <Navigate to="/login" replace />
}

/** Pantallas de invitado (login/registro): con sesión activa, manda al perfil. */
export function GuestOnly() {
  const { token } = useAuth()
  return token ? <Navigate to="/profile" replace /> : <Outlet />
}
