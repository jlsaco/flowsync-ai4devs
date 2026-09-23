# FlowSync — frontend

React 19 + Vite 8 (TypeScript), Tailwind CSS v4 y componentes [shadcn/ui](https://ui.shadcn.com) (`src/components/ui/`, config en `components.json`). Lint con oxlint.

## Puesta en marcha

```bash
npm install
npm run dev      # http://localhost:5173 (necesita el backend en http://localhost:3333)
npm run build    # tsc -b && vite build
npm run lint     # oxlint
```

En desarrollo, Vite hace proxy de `/api` → `http://localhost:3333`, así que el frontend llama a la API en el mismo origen. Para apuntar a otra URL (p. ej. en producción) define `VITE_API_URL` (sin barra final); por defecto es vacío (mismo origen).

Añadir componentes de shadcn: `npx shadcn@latest add <componente>`.

## Estructura

- `src/lib/api.ts` — cliente de la API (`/api/v1`): desempaqueta `{ data }` y traduce los errores del backend (`{ errors: [...] }`) a `ApiError` con mensajes en español y errores por campo.
- `src/auth/` — sesión: `AuthProvider` guarda el access token en `localStorage` (`flowsync.token`), `useAuth()` lo expone y `RequireAuth` / `GuestOnly` protegen las rutas.
- `src/pages/` — `/login`, `/signup` (solo invitados) y `/profile` (protegida; consume `GET /api/v1/account/profile`). Un 401 en el perfil cierra la sesión local y vuelve a `/login`.
