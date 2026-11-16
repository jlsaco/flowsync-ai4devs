# Specs — <Nombre del proyecto>

Fuente de verdad de producto del proyecto. Estructura y reglas: skill `sdd-artefactos`.

- **Prefijo de historias:** `<PREF>` (p. ej. `FS`)
- **Responsable de producto (decide):** <rol>

## PRD

| PRD | Estado | Fecha | Versión |
|---|---|---|---|
| [<nombre>](./prd/<slug-producto>.md) | borrador | AAAA-MM-DD | 0.1 |

## Épicas

| Épica | PRD | RF cubiertos | Prioridad | Estado |
|---|---|---|---|---|
| [E01 · <nombre>](./epicas/E01-<slug-epica>/epica.md) | <slug-producto> | RF-1, RF-2 | M | pendiente |

## Matriz de trazabilidad

Una fila por requisito. Un RF sin épica o sin historia es un hueco que hay que cerrar o justificar.

| Requisito | Épica | Historias | Estado |
|---|---|---|---|
| RF-1 | E01 | <PREF>-1, <PREF>-2 | pendiente |
| RNF-1 | transversal | <PREF>-1 | pendiente |

## Pendiente de decidir

Resumen de los `[SUPUESTO]`, 🔶 `PROPUESTA` y preguntas abiertas de todo el árbol que bloquean construir.

| Dónde | ID | Qué | Decide |
|---|---|---|---|
| <documento> | PA-n / CA-n | <…> | <rol> |
