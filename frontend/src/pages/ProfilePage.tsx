import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import { CircleAlert } from 'lucide-react'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { useAuth } from '@/auth/useAuth'
import { ApiError, getProfile, type User } from '@/lib/api'

const dateFormatter = new Intl.DateTimeFormat('es', { dateStyle: 'long' })

export function ProfilePage() {
  const { token, clearSession, logout } = useAuth()
  const navigate = useNavigate()
  const [user, setUser] = useState<User | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!token) return
    let cancelled = false
    getProfile(token)
      .then((profile) => {
        if (!cancelled) setUser(profile)
      })
      .catch((err: unknown) => {
        if (cancelled) return
        if (err instanceof ApiError && err.status === 401) {
          // Token inválido o revocado: cerrar sesión local y volver al login
          clearSession()
          return
        }
        setError(err instanceof ApiError ? err.message : 'No se pudo cargar tu perfil.')
      })
    return () => {
      cancelled = true
    }
  }, [token, clearSession])

  async function handleLogout() {
    await logout()
    navigate('/login', { replace: true })
  }

  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle className="text-xl">Tu perfil</CardTitle>
        <CardDescription>Datos de tu cuenta en FlowSync.</CardDescription>
      </CardHeader>
      <CardContent>
        {error ? (
          <Alert variant="destructive" role="alert">
            <CircleAlert />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        ) : !user ? (
          <p className="text-sm text-muted-foreground" aria-live="polite">
            Cargando perfil…
          </p>
        ) : (
          <div className="flex items-center gap-4">
            <div
              className="flex size-12 shrink-0 items-center justify-center rounded-full bg-primary text-base font-semibold text-primary-foreground"
              aria-hidden="true"
            >
              {user.initials}
            </div>
            <dl className="grid gap-1 text-sm">
              {user.fullName && (
                <div>
                  <dt className="sr-only">Nombre</dt>
                  <dd className="font-medium">{user.fullName}</dd>
                </div>
              )}
              <div>
                <dt className="sr-only">Email</dt>
                <dd className="font-medium break-all" data-testid="profile-email">
                  {user.email}
                </dd>
              </div>
              <div>
                <dt className="inline text-muted-foreground">Miembro desde </dt>
                <dd className="inline text-muted-foreground">
                  {dateFormatter.format(new Date(user.createdAt))}
                </dd>
              </div>
            </dl>
          </div>
        )}
      </CardContent>
      <CardFooter className="mt-6">
        <Button variant="outline" className="w-full" onClick={handleLogout}>
          Cerrar sesión
        </Button>
      </CardFooter>
    </Card>
  )
}
