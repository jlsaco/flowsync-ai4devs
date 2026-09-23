/**
 * Cliente mínimo de la API de FlowSync (`/api/v1`).
 *
 * En desarrollo, Vite hace de proxy de `/api` hacia el backend (ver
 * `vite.config.ts`); `VITE_API_URL` permite apuntar a otro origen.
 */
const API_URL = `${import.meta.env.VITE_API_URL ?? ''}/api/v1`

export type User = {
  id: number
  fullName: string | null
  email: string
  initials: string
  createdAt: string
  updatedAt: string | null
}

type AuthResponse = { user: User; token: string }

type FieldName = 'email' | 'password' | 'passwordConfirmation'
export type FieldErrors = Partial<Record<FieldName, string>>

type BackendError = { message: string; rule?: string; field?: string }

export class ApiError extends Error {
  readonly status: number
  readonly fieldErrors: FieldErrors

  constructor(status: number, message: string, fieldErrors: FieldErrors = {}) {
    super(message)
    this.name = 'ApiError'
    this.status = status
    this.fieldErrors = fieldErrors
  }
}

const NETWORK_ERROR =
  'No se pudo conectar con el servidor. Inténtalo de nuevo en unos minutos.'
const SERVER_ERROR =
  'El servidor ha tenido un problema. Inténtalo de nuevo en unos minutos.'
const GENERIC_ERROR = 'Algo ha fallado. Inténtalo de nuevo.'

/** Traduce un error de validación de VineJS a un mensaje en español. */
function fieldMessage({ field, rule }: BackendError): string {
  if (field === 'email') {
    if (rule === 'database.unique')
      return 'Ya existe una cuenta con este email.'
    if (rule === 'required') return 'Introduce tu email.'
    return 'Introduce un email válido.'
  }
  if (field === 'passwordConfirmation' && rule === 'sameAs') {
    return 'Las contraseñas no coinciden.'
  }
  if (rule === 'required') return 'Este campo es obligatorio.'
  if (rule === 'minLength') return 'Debe tener al menos 8 caracteres.'
  if (rule === 'maxLength') return 'Es demasiado largo.'
  return 'El valor no es válido.'
}

async function toApiError(response: Response): Promise<ApiError> {
  const body = (await response.json().catch(() => null)) as {
    errors?: BackendError[]
  } | null
  const errors = body?.errors ?? []

  if (response.status === 401) {
    return new ApiError(401, 'Tu sesión ha caducado. Inicia sesión de nuevo.')
  }

  if (response.status === 422) {
    const fieldErrors: FieldErrors = {}
    for (const error of errors) {
      const field = error.field as FieldName | undefined
      if (field && !(field in fieldErrors)) {
        fieldErrors[field] = fieldMessage(error)
      }
    }
    if (Object.keys(fieldErrors).length > 0) {
      return new ApiError(422, 'Revisa los campos marcados.', fieldErrors)
    }
  }

  return new ApiError(
    response.status,
    response.status >= 500 ? SERVER_ERROR : GENERIC_ERROR,
  )
}

async function request<T>(
  method: 'GET' | 'POST',
  path: string,
  { token, body }: { token?: string | null; body?: unknown } = {},
): Promise<T> {
  const headers: Record<string, string> = { Accept: 'application/json' }
  if (body !== undefined) headers['Content-Type'] = 'application/json'
  if (token) headers.Authorization = `Bearer ${token}`

  let response: Response
  try {
    response = await fetch(`${API_URL}${path}`, {
      method,
      headers,
      body: body === undefined ? undefined : JSON.stringify(body),
    })
  } catch {
    throw new ApiError(0, NETWORK_ERROR)
  }

  if (!response.ok) throw await toApiError(response)

  return (await response.json().catch(() => null)) as T
}

/** Como `request`, pero desempaqueta el `{ data }` de `ctx.serialize`. */
async function requestData<T>(...args: Parameters<typeof request>): Promise<T> {
  const payload = await request<{ data?: T } | null>(...args)
  if (payload?.data === undefined) throw new ApiError(0, GENERIC_ERROR)
  return payload.data
}

/**
 * El backend compara el email distinguiendo mayúsculas, así que lo
 * normalizamos para que `Ana@x.com` y `ana@x.com` sean la misma cuenta.
 */
export const normalizeEmail = (email: string) => email.trim().toLowerCase()

export function signup(
  email: string,
  password: string,
  passwordConfirmation: string,
) {
  return requestData<AuthResponse>('POST', '/auth/signup', {
    body: {
      fullName: null,
      email: normalizeEmail(email),
      password,
      passwordConfirmation,
    },
  })
}

export async function login(email: string, password: string) {
  try {
    return await requestData<AuthResponse>('POST', '/auth/login', {
      body: { email: normalizeEmail(email), password },
    })
  } catch (error) {
    // El backend responde 400 (E_INVALID_CREDENTIALS) tanto si el email no
    // existe como si la contraseña no coincide.
    if (error instanceof ApiError && error.status === 400) {
      throw new ApiError(400, 'Email o contraseña incorrectos.')
    }
    throw error
  }
}

export function getProfile(token: string) {
  return requestData<User>('GET', '/account/profile', { token })
}

export function logout(token: string) {
  return request<{ message: string }>('POST', '/account/logout', { token })
}
