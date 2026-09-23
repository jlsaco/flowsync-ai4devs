import { useRef, useState, type FormEvent } from 'react'
import { Link, useNavigate } from 'react-router'
import { AlertCircle } from 'lucide-react'
import { AuthLayout } from '@/components/AuthLayout'
import { FormField } from '@/components/FormField'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { useAuth } from '@/auth/auth-context'
import { ApiError, login, type FieldErrors } from '@/lib/api'

export function LoginPage() {
  const { setSession } = useAuth()
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({})
  const [formError, setFormError] = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)
  // El estado no se actualiza a tiempo si se pulsa Enter varias veces seguidas.
  const inFlight = useRef(false)

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (inFlight.current) return

    const errors: FieldErrors = {}
    if (!email.trim()) errors.email = 'Introduce tu email.'
    if (!password) errors.password = 'Introduce tu contraseña.'
    setFieldErrors(errors)
    setFormError(null)
    if (Object.keys(errors).length > 0) return

    inFlight.current = true
    setSubmitting(true)
    try {
      const { token } = await login(email, password)
      setSession(token)
      navigate('/profile', { replace: true })
    } catch (error) {
      if (error instanceof ApiError) {
        setFieldErrors(error.fieldErrors)
        setFormError(
          Object.keys(error.fieldErrors).length > 0 ? null : error.message,
        )
      } else {
        setFormError('Algo ha fallado. Inténtalo de nuevo.')
      }
    } finally {
      inFlight.current = false
      setSubmitting(false)
    }
  }

  return (
    <AuthLayout
      title="Inicia sesión"
      description="Accede con tu email y contraseña."
      footer={
        <p>
          ¿No tienes cuenta?{' '}
          <Link to="/signup" className="font-medium text-foreground underline">
            Regístrate
          </Link>
        </p>
      }
    >
      <form className="grid gap-4" onSubmit={handleSubmit} noValidate>
        {formError && (
          <Alert variant="destructive">
            <AlertCircle />
            <AlertDescription>{formError}</AlertDescription>
          </Alert>
        )}
        <FormField
          id="email"
          label="Email"
          type="email"
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          error={fieldErrors.email}
        />
        <FormField
          id="password"
          label="Contraseña"
          type="password"
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          error={fieldErrors.password}
        />
        <Button type="submit" disabled={submitting}>
          {submitting ? 'Entrando…' : 'Entrar'}
        </Button>
      </form>
    </AuthLayout>
  )
}
