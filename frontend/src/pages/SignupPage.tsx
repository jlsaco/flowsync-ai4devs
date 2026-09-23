import { useRef, useState, type FormEvent } from 'react'
import { Link, useNavigate } from 'react-router'
import { AlertCircle } from 'lucide-react'
import { AuthLayout } from '@/components/AuthLayout'
import { FormField } from '@/components/FormField'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { useAuth } from '@/auth/auth-context'
import { ApiError, signup, type FieldErrors } from '@/lib/api'

export function SignupPage() {
  const { setSession } = useAuth()
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [passwordConfirmation, setPasswordConfirmation] = useState('')
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
    if (!password) errors.password = 'Introduce una contraseña.'
    else if (password.length < 8) {
      errors.password = 'Debe tener al menos 8 caracteres.'
    }
    if (!passwordConfirmation) {
      errors.passwordConfirmation = 'Confirma tu contraseña.'
    } else if (passwordConfirmation !== password) {
      errors.passwordConfirmation = 'Las contraseñas no coinciden.'
    }
    setFieldErrors(errors)
    setFormError(null)
    if (Object.keys(errors).length > 0) return

    inFlight.current = true
    setSubmitting(true)
    try {
      // El backend ya devuelve un token al registrarse: la sesión queda iniciada.
      const { token } = await signup(email, password, passwordConfirmation)
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
      title="Crea tu cuenta"
      description="Regístrate con tu email y una contraseña."
      footer={
        <p>
          ¿Ya tienes cuenta?{' '}
          <Link to="/login" className="font-medium text-foreground underline">
            Inicia sesión
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
          autoComplete="new-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          error={fieldErrors.password}
        />
        <FormField
          id="passwordConfirmation"
          label="Confirmar contraseña"
          type="password"
          autoComplete="new-password"
          value={passwordConfirmation}
          onChange={(e) => setPasswordConfirmation(e.target.value)}
          error={fieldErrors.passwordConfirmation}
        />
        <Button type="submit" disabled={submitting}>
          {submitting ? 'Creando cuenta…' : 'Crear cuenta'}
        </Button>
      </form>
    </AuthLayout>
  )
}
