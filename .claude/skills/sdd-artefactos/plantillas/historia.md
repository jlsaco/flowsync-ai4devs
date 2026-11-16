# <PREF>-<n> · <Título en infinitivo, orientado al usuario>

- **Estado:** borrador | en revisión | aprobado | en curso | hecha
- **Épica:** E<n> «<nombre>» ([enlace](../epica.md))
- **Requisitos de origen:** RF-a, RNF-b de [<PRD>](../../../prd/<slug>.md)
- **Prioridad:** M | S | C
- **Estimación:** <puntos o talla XS/S/M/L>
- **Depende de:** <IDs de historias o «—»>

## Historia

**Como** <rol de usuario>, **quiero** <capacidad>, **para** <beneficio/valor>.

## Contexto

<Lo mínimo para entender la historia sin leer todo el PRD: situación actual, reglas de negocio relevantes, estados o valores válidos. Sin decisiones de implementación.>

## Criterios de aceptación

Etiquetas de origen:
- `PRD · RF-n` deriva directamente del requisito indicado.
- `PEDIDO` lo pidió expresamente quien define la historia; la redacción es del autor.
- 🔶 `PROPUESTA` la propone el autor, sin confirmar; necesita revisión.

### A. <Tema: p. ej. camino feliz>

**CA-1 · <Título corto>** `PRD · RF-a`
- **DADO** <estado inicial concreto>
- **CUANDO** <una única acción o evento>
- **ENTONCES** <resultado observable>
- **Y** <otro resultado observable>

**CA-2 · <Título corto>** `PRD · RF-a`
- **DADO** <…>
- **CUANDO** <…>
- **ENTONCES** <…>

### B. <Tema: p. ej. validaciones y errores>

**CA-3 · <Dato inválido>** `PEDIDO`
- **DADO** <…>
- **CUANDO** <…>
- **ENTONCES** <mensaje o comportamiento concreto>
- **Y** <no ocurre el efecto indebido>

### C. <Tema: p. ej. límites, vacío frente a error, permisos, concurrencia, persistencia, accesibilidad>

**CA-4 · <Título corto>** 🔶 `PROPUESTA`
- **DADO** <…>
- **CUANDO** <…>
- **ENTONCES** <…>
- *Alternativa a decidir:* <…>

## Requisitos no funcionales aplicables

| RNF | Cómo se verifica en esta historia |
|---|---|
| RNF-n | <criterio concreto o CA que lo cubre> |

## Fuera de esta historia

- <Exclusión> — <motivo: NO-alcance del PRD, otra historia, decisión pendiente>

## Preguntas abiertas y supuestos

| ID | Pregunta / supuesto | Afecta a | Decide | Estado |
|---|---|---|---|---|
| PA-n | <…> | CA-n | <rol> | abierta |

---

### Checklist de autorrevisión
- [ ] INVEST: independiente, negociable, valiosa, estimable, pequeña, testeable.
- [ ] Cada CA tiene origen, un solo CUANDO y un ENTONCES observable y concreto.
- [ ] Cubiertos: camino feliz, variantes, límites, errores, vacío frente a error, permisos, concurrencia, persistencia, accesibilidad (los que apliquen; los que no, justificados).
- [ ] Cada RF de origen está cubierto por al menos un CA.
- [ ] Ningún CA contradice el PRD ni la épica.
- [ ] Cada CA puede convertirse 1:1 en un test o paso de verificación.
- [ ] Cero decisiones técnicas (regla de la skill, sección «Prohibido»): pasa la comprobación automática sin coincidencias.
- [ ] La historia está enlazada desde la tabla de historias de la épica.
