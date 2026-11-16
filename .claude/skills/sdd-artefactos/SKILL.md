---
name: sdd-artefactos
description: Define y genera la estructura estándar de los artefactos de producto para Spec-Driven Development (SDD) - PRD, épica e historia de usuario con criterios de aceptación en formato DADO/CUANDO/ENTONCES. Genérica, válida para cualquier proyecto. Úsala al redactar, revisar o completar un PRD, una épica o una HU, o al pedir "crea el PRD", "escribe la épica", "redacta la historia", "añade criterios de aceptación".
---

# Artefactos SDD: PRD → Épica → Historia de usuario

En SDD la especificación es la fuente de verdad: el código se deriva de ella y se verifica contra ella. Esta skill fija **qué artefactos existen, qué estructura tiene cada uno y cómo se enlazan**, para que cualquier persona o agente pueda escribirlos, revisarlos y construir a partir de ellos sin ambigüedad.

## Jerarquía y trazabilidad

```
PRD  (el problema, el qué y el porqué; nivel producto)
 └─ RF-n / RNF-n            requisitos numerados
     └─ Épica  E<n>         agrupa requisitos en un resultado entregable
         └─ Historia <ID>   una unidad de valor implementable en un ciclo
             └─ CA-n         criterio de aceptación verificable (→ test)
```

Regla de oro: **todo hacia abajo referencia su origen hacia arriba**. Un CA cita su RF; una historia cita su épica y sus RF; una épica cita los RF del PRD que cubre. Nada se construye si no puede trazarse a un requisito o está marcado explícitamente como propuesta.

## Carpeta `specs/` (estructura obligatoria)

Todos los artefactos de producto viven en `specs/`, en la raíz del repositorio. Es la única ubicación válida: no se crean PRD, épicas ni historias en ningún otro sitio.

```
specs/
├── README.md                          índice y matriz de trazabilidad (plantillas/indice.md)
├── prd/
│   └── <slug-producto>.md             un PRD por producto o iniciativa (plantillas/prd.md)
└── epicas/
    └── E<nn>-<slug-epica>/            una carpeta por épica
        ├── epica.md                   la épica (plantillas/epica.md)
        └── historias/
            └── <PREF>-<n>-<slug>.md   una historia por fichero (plantillas/historia.md)
```

Reglas de nombres y contenido:

- **Slugs** en minúsculas, sin tildes, palabras separadas por guiones: `gestion-tareas`.
- **Épicas** numeradas con dos dígitos para que ordenen bien: `E01-…`, `E02-…`. El número coincide con el ID `E<n>` del PRD (`E1` ↔ `E01`).
- **Historias**: el nombre del fichero empieza por su ID (`<PREF>-<n>`), así ID y fichero nunca divergen. `<PREF>` es el prefijo del proyecto (o el del gestor de tickets si existe) y se fija una vez en `specs/README.md`.
- **Nada más** dentro de `specs/`: ni diseño técnico, ni ADR, ni diagramas de arquitectura, ni código, ni notas sueltas. Si un proyecto necesita documentación técnica, vive fuera de `specs/` y nunca se enlaza como requisito.
- **Artefactos obsoletos** no se borran: se marcan `obsoleto` en su cabecera y en `specs/README.md`, para no romper la trazabilidad.
- Si `specs/` no existe, créala con esta estructura y su `README.md` a partir de `plantillas/indice.md` antes de escribir el primer artefacto.
- Si el proyecto tiene artefactos de producto en otra ubicación, propón moverlos a `specs/`; no los dupliques.

## Plantillas

Copia la plantilla correspondiente y rellénala. No elimines secciones: si una no aplica, escribe «No aplica» y por qué.

| Artefacto | Plantilla | Ubicación |
|---|---|---|
| Índice | [`plantillas/indice.md`](plantillas/indice.md) | `specs/README.md` |
| PRD | [`plantillas/prd.md`](plantillas/prd.md) | `specs/prd/<slug-producto>.md` |
| Épica | [`plantillas/epica.md`](plantillas/epica.md) | `specs/epicas/E<nn>-<slug-epica>/epica.md` |
| Historia de usuario | [`plantillas/historia.md`](plantillas/historia.md) | `specs/epicas/E<nn>-<slug-epica>/historias/<PREF>-<n>-<slug>.md` |

## Prohibido: decisiones técnicas (regla innegociable)

PRD, épica e historia contienen **cero decisiones técnicas**. Describen el **qué** y el **porqué** desde el punto de vista del usuario y del negocio; el **cómo** pertenece exclusivamente al diseño técnico (spec técnica, plan, ADR), que se deriva de estos documentos y es otro artefacto distinto.

No puede aparecer, ni como requisito, ni como nota, ejemplo, supuesto, pregunta abierta, riesgo o alternativa:

- Lenguajes, frameworks, librerías, herramientas, proveedores cloud o servicios concretos.
- Arquitectura, capas, componentes, módulos, servicios, patrones de diseño.
- Modelo de datos: bases de datos, tablas, columnas, campos, tipos, índices, migraciones, esquemas.
- Interfaces técnicas: endpoints, rutas, verbos o códigos HTTP, formatos (JSON, XML…), payloads, colas, eventos de sistema.
- Mecanismos: websockets, polling, caché, tokens, sesiones, cookies, almacenamiento local, cifrado concreto, algoritmos.
- Nombres de código: ficheros, carpetas, clases, funciones, variables, componentes de UI de una librería.
- Infraestructura, despliegue, entornos, CI/CD, monitorización.
- Estrategia o herramientas de test (el CA dice **qué** se verifica, no **cómo**).

**Cómo reformular.** Pregúntate «¿lo notaría un usuario o el negocio?». Si sí, descríbelo como comportamiento observable; si no, no va aquí.

| ❌ Decisión técnica | ✅ Comportamiento observable |
|---|---|
| «Usar websockets para actualizar la lista» | «Veo los cambios de los demás sin recargar, en menos de 5 s» |
| «El endpoint devuelve 422 si falta el título» | «Si no escribo título, se me avisa de que es obligatorio y no se crea nada» |
| «Guardar el token en localStorage» | «Si cierro y vuelvo a abrir el navegador, sigo dentro» |
| «Añadir columna `due_date` nullable» | «La fecha de vencimiento es opcional» |
| «Paginar con cursor de 50 en 50» | «Con 1.000 tareas la lista sigue respondiendo en menos de 1 s» |

Si quien pide el artefacto aporta una decisión técnica, **no la copies**: reformúlala como comportamiento y anota en la entrega que la decisión técnica original debe ir al diseño técnico.

**Comprobación obligatoria antes de entregar.** Ejecuta sobre cada fichero escrito y revisa cada coincidencia (puede haber falsos positivos; ninguna puede quedar como decisión técnica):

```bash
grep -inE '\b(api|endpoint|http|rest|graphql|json|xml|sql|columna|campo de (la )?bd|base de datos|bd|schema|esquema de datos|migraci[oó]n|backend|frontend|servidor|cliente http|websocket|polling|cach[eé]|token|cookie|sesi[oó]n|localstorage|framework|librer[ií]a|react|vue|angular|node|adonis|vite|docker|kubernetes|aws|gcp|azure|microservicio|controlador|modelo de datos|componente|clase|funci[oó]n|variable|fichero|repositorio|deploy|despliegue|ci/cd|pipeline|cola|queue|algoritmo|cifrado|hash|uuid|status code|[0-9]{3} (ok|error))\b' <fichero>
```

Si una palabra de la lista es vocabulario de negocio legítimo (p. ej. «sesión de formación»), déjala y justifícalo en la entrega.

## Convenciones comunes (los tres artefactos)

- **Nivel de abstracción.** Comportamiento observable y valor; nada técnico (ver «Prohibido»).
- **IDs estables.** `RF-n` (funcional), `RNF-n` (no funcional), `E<n>` (épica), `<PREFIJO>-<n>` (historia), `CA-n` (criterio, numeración local a la historia), `PA-n` (pregunta abierta). Un ID nunca se reutiliza; si algo se descarta, se tacha y se deja.
- **Prioridad MoSCoW:** M (imprescindible), S (deseable), C (recortable), W (no ahora, fuera de alcance).
- **Supuestos visibles.** Lo que decides sin confirmación se marca `[SUPUESTO]`; si además amplía o cambia el alcance, `[SUPUESTO · cambia alcance]`. Todo supuesto se confirma o descarta antes de construir.
- **Preguntas abiertas** en una tabla con ID, pregunta, a quién bloquea y quién decide. No se esconden en el texto.
- **Fuera de alcance explícito.** Cada artefacto lista lo que NO incluye. Es tan importante como lo que sí.
- **Estado del documento:** `borrador` → `en revisión` → `aprobado` → `obsoleto`. Solo se construye sobre `aprobado`.
- **Idioma consistente** y un mismo término para un mismo concepto en todo el árbol (define el glosario en el PRD).

## Criterios de aceptación: forma estándar

Cada criterio es un escenario **Gherkin en castellano**, verificable y atómico:

```markdown
**CA-<n> · <título corto en positivo>** `<origen>`
- **DADO** <contexto / estado inicial concreto>
- **Y** <contexto adicional, opcional>
- **CUANDO** <una única acción o evento>
- **ENTONCES** <resultado observable>
- **Y** <otro resultado observable, opcional>
- *Nota: dependencias, supuestos o alternativas a decidir (opcional).*
```

Etiqueta de **origen** (obligatoria, una por criterio):

| Etiqueta | Significa |
|---|---|
| `PRD · RF-n[, RNF-m]` | Deriva directamente de un requisito del PRD. |
| `PEDIDO` | Lo pidió expresamente quien define la historia; el detalle de redacción es del autor. |
| 🔶 `PROPUESTA` | Lo propone el autor, sin confirmar. Requiere revisión antes de construir. |

Reglas de un buen criterio:

1. **Un solo CUANDO.** Si hay dos acciones, son dos criterios.
2. **Observable desde fuera.** El ENTONCES describe lo que ve o vive el usuario, nunca cómo se implementa ni qué devuelve internamente el sistema.
3. **Concreto y medible.** Nada de «rápido», «intuitivo» o «correcto»: valores, mensajes, estados o umbrales.
4. **Independiente.** Se puede verificar sin depender del orden de otros criterios.
5. **Cubre más que el camino feliz.** Revisa siempre: camino feliz · variantes de datos válidos · límites (vacío, máximo, mínimo) · datos inválidos y errores · vacío frente a error · permisos/identidad · concurrencia o cambios de otros · persistencia (recargar, volver) · accesibilidad (teclado, lector) · RNF aplicables.
6. **Verificable.** Cada CA debe poder comprobarse 1:1 sin ambigüedad. El cómo se verifica lo decide el equipo técnico, no el CA.
7. **Agrupa** por tema (A, B, C…) cuando pasen de ~6 criterios.

Anti-patrones: CA que repite la historia; CA con «etc.»; CA que describe UI pixel a pixel sin necesidad; CA que mezcla varias historias; CA sin origen; CA con cualquier decisión técnica.

## Flujo de trabajo

1. **Antes de escribir**, lee los artefactos padre (PRD para una épica; PRD + épica para una historia) y el código/estado actual si existe. No inventes requisitos: si falta algo, conviértelo en `[SUPUESTO]` o en pregunta abierta.
2. **Rellena la plantilla** completa. Mantén las secciones en el orden de la plantilla.
3. **Autorrevisión** con la checklist de la plantilla (al final de cada una). Comprueba en particular:
   - toda historia es INVEST (Independiente, Negociable, Valiosa, Estimable, pequeña —*Small*—, Testeable);
   - todo CA tiene origen y un solo CUANDO;
   - todo RF de la épica está cubierto por al menos una historia, y todo RF de una historia por al menos un CA;
   - no hay contradicciones con el padre ni con artefactos hermanos;
   - la comprobación de «Prohibido» no deja ninguna decisión técnica. Si falla, reescribe y repite; no se entrega con decisiones técnicas.
4. **Actualiza la trazabilidad hacia arriba**: añade la historia a la tabla de la épica, la épica a la tabla del PRD, y ambas a `specs/README.md` (épicas, matriz de trazabilidad y pendientes).
5. **Entrega**: el artefacto pasa a `en revisión`. Las 🔶 PROPUESTAS y los `[SUPUESTO]` se listan al final para que quien decide los cierre.

## Definition of Ready / Done (para historias)

- **Ready:** estado `aprobado`; sin 🔶 ni `[SUPUESTO]` pendientes que afecten al alcance; dependencias resueltas o planificadas; estimada; CA completos.
- **Done:** todos los CA verificados con evidencia enlazada; RNF aplicables comprobados; trazabilidad actualizada; revisada y aceptada.
