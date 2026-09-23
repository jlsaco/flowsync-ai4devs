import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import { AlertCircle, LogOut } from 'lucide-react'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { useAuth } from '@/auth/auth-context'
import { ApiError, getProfile, type User } from '@/lib/api'

const dateFormat = new Intl.DateTimeFormat('es', { dateStyle: 'long' })

export function ProfilePage() {
  const { token, clearSession, logout } = useAuth()
  const navigate = useNavigate()
  const [user, setUser] = useState<User | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!token) return
    let ignore = false
    getProfile(token)
      .then((profile) => {
        if (!ignore) setUser(profile)
      })
      .catch((err: unknown) => {
        if (ignore) return
        // Token caducado o revocado: fuera la sesión local y RequireAuth
        // nos devuelve a /login.
        if (err instanceof ApiError && err.status === 401) clearSession()
        else
          setError(
            err instanceof ApiError
              ? err.message
              : 'No se pudo cargar tu perfil. Inténtalo de nuevo.',
          )
      })
    return () => {
      ignore = true
    }
  }, [token, clearSession])

  async function handleLogout() {
    await logout()
    navigate('/login', { replace: true })
  }

  return (
    <main className="flex min-h-svh items-center justify-center bg-muted/40 p-4">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle className="text-xl">Tu perfil</CardTitle>
          <CardDescription>Datos de tu cuenta en FlowSync.</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-6">
          {error && (
            <Alert variant="destructive">
              <AlertCircle />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          {!user && !error && (
            <p className="text-sm text-muted-foreground" aria-live="polite">
              Cargando perfil…
            </p>
          )}
          {user && (
            <div className="flex items-center gap-4">
              <div
                aria-hidden
                className="flex size-12 shrink-0 items-center justify-center rounded-full bg-primary text-lg font-semibold text-primary-foreground"
              >
                {user.initials}
              </div>
              <dl className="grid min-w-0 gap-1 text-sm">
                <dt className="sr-only">Email</dt>
                <dd className="truncate font-medium">{user.email}</dd>
                <dt className="sr-only">Miembro desde</dt>
                <dd className="text-muted-foreground">
                  Miembro desde {dateFormat.format(new Date(user.createdAt))}
                </dd>
              </dl>
            </div>
          )}
          <Button variant="outline" onClick={handleLogout}>
            <LogOut />
            Cerrar sesión
          </Button>
        </CardContent>
      </Card>
    </main>
  )
}
