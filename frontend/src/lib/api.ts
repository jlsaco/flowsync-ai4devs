/**
 * Cliente mínimo para la API de FlowSync (`/api/v1`).
 * Las respuestas correctas vienen envueltas en `{ data: ... }` y los errores
 * en `{ errors: [{ field?, rule?, message }] }` (VineJS / excepciones de auth).
 */

const API_URL = import.meta.env.VITE_API_URL ?? ''

export type User = {
  id: number
  fullName: string | null
  email: string
  createdAt: string
  updatedAt: string | null
  initials: string
}

export type AuthResponse = {
  user: User
  token: string
}

type BackendError = {
  field?: string
  rule?: string
  message: string
}

const NETWORK_ERROR = 'No se pudo conectar con el servidor. Inténtalo de nuevo.'
const GENERIC_ERROR = 'Ha ocurrido un error inesperado. Inténtalo de nuevo.'

export class ApiError extends Error {
  readonly status: number
  readonly fieldErrors: Record<string, string>

  constructor(status: number, message: string, fieldErrors: Record<string, string> = {}) {
    super(message)
    this.name = 'ApiError'
    this.status = status
    this.fieldErrors = fieldErrors
  }
}

/**
 * Traduce un error de validación de VineJS a un mensaje legible en español.
 */
function translateFieldError({ field, rule }: BackendError): string {
  if (field === 'email') {
    if (rule === 'database.unique') return 'Ya existe una cuenta con este email.'
    if (rule === 'required') return 'El email es obligatorio.'
    return 'Introduce un email válido.'
  }
  if (field === 'password') {
    if (rule === 'required') return 'La contraseña es obligatoria.'
    if (rule === 'minLength') return 'La contraseña debe tener al menos 8 caracteres.'
    if (rule === 'maxLength') return 'La contraseña no puede superar los 32 caracteres.'
    return 'Contraseña no válida.'
  }
  if (field === 'passwordConfirmation') {
    if (rule === 'required') return 'Confirma la contraseña.'
    return 'Las contraseñas no coinciden.'
  }
  return 'Revisa los datos introducidos.'
}

async function toApiError(response: Response): Promise<ApiError> {
  const body = (await response.json().catch(() => null)) as { errors?: BackendError[] } | null
  const errors = Array.isArray(body?.errors) ? body.errors : []

  if (response.status === 422) {
    const fieldErrors: Record<string, string> = {}
    for (const error of errors) {
      if (error.field && !fieldErrors[error.field]) {
        fieldErrors[error.field] = translateFieldError(error)
      }
    }
    const message = Object.values(fieldErrors)[0] ?? 'Revisa los datos introducidos.'
    return new ApiError(response.status, message, fieldErrors)
  }

  if (response.status === 400) {
    // E_INVALID_CREDENTIALS: el backend no distingue email inexistente de contraseña errónea
    return new ApiError(response.status, 'Email o contraseña incorrectos.')
  }

  if (response.status === 401) {
    return new ApiError(response.status, 'Tu sesión ha caducado. Inicia sesión de nuevo.')
  }

  return new ApiError(response.status, response.status >= 500 ? NETWORK_ERROR : GENERIC_ERROR)
}

/**
 * El backend compara emails de forma case-sensitive (unique + verifyCredentials):
 * normalizamos para no crear cuentas duplicadas ni fallar el login por mayúsculas.
 */
export function normalizeEmail(email: string) {
  return email.trim().toLowerCase()
}

type RequestOptions = {
  method?: 'GET' | 'POST'
  body?: unknown
  token?: string | null
}

async function apiFetch<T>(path: string, { method = 'GET', body, token }: RequestOptions = {}) {
  const headers: Record<string, string> = { Accept: 'application/json' }
  if (body !== undefined) headers['Content-Type'] = 'application/json'
  if (token) headers.Authorization = `Bearer ${token}`

  let response: Response
  try {
    response = await fetch(`${API_URL}/api/v1${path}`, {
      method,
      headers,
      body: body === undefined ? undefined : JSON.stringify(body),
    })
  } catch {
    throw new ApiError(0, NETWORK_ERROR)
  }

  if (!response.ok) throw await toApiError(response)

  const json = (await response.json().catch(() => null)) as { data?: T } | null
  if (!json || json.data === undefined) throw new ApiError(response.status, GENERIC_ERROR)
  return json.data
}

export function login(email: string, password: string) {
  return apiFetch<AuthResponse>('/auth/login', { method: 'POST', body: { email, password } })
}

export function signup(email: string, password: string, passwordConfirmation: string) {
  return apiFetch<AuthResponse>('/auth/signup', {
    method: 'POST',
    body: { fullName: null, email, password, passwordConfirmation },
  })
}

export function getProfile(token: string) {
  return apiFetch<User>('/account/profile', { token })
}

export async function logout(token: string) {
  const response = await fetch(`${API_URL}/api/v1/account/logout`, {
    method: 'POST',
    headers: { Accept: 'application/json', Authorization: `Bearer ${token}` },
  })
  if (!response.ok) throw await toApiError(response)
}
