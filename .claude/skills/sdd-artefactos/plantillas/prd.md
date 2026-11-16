# PRD — <Nombre del producto o iniciativa>

- **Estado:** borrador | en revisión | aprobado | obsoleto
- **Fecha:** AAAA-MM-DD · **Versión:** 0.1
- **Responsable (decide):** <rol>
- **Documentos base:** <enlaces a alcance, investigación, briefs> (este PRD los concreta, no los sustituye)
- **Nivel:** producto. Cero decisiones técnicas (ver regla «Prohibido» de la skill `sdd-artefactos`).
- **Convenciones:** `[SUPUESTO]` decidido aquí sin confirmar · `[SUPUESTO · cambia alcance]` además amplía o cambia el alcance · Prioridad MoSCoW: M / S / C / W.

## 1. Problema y contexto

<Qué duele, a quién, cuánto cuesta hoy y cómo se sabe (dato, estimación o anécdota: dilo). Situación actual del producto/sistema del que se parte.>

**Fuera de este problema:** <problemas cercanos que deliberadamente no se atacan.>

## 2. Usuarios y jobs-to-be-done

**Usuarios / personas:** <quién, tamaño, rasgos relevantes, roles.>

| # | Cuando… | Quiero… | Para… |
|---|---|---|---|
| JTBD-1 | <situación> | <motivación> | <resultado esperado> |

## 3. Propuesta de valor

> <Una o dos frases: qué es y por qué es mejor que la alternativa actual.>

- <Diferenciador 1>
- <Diferenciador 2>

**Decisión o comportamiento que cambia en el usuario:** <…>

## 4. Alcance

### Dentro
- <Capacidad incluida> (referencia a RF)

### Fuera
- <Exclusión explícita> — <motivo breve>

## 5. Objetivos y métricas de éxito

| # | Objetivo | Métrica | Línea base | Meta | Cómo se mide |
|---|---|---|---|---|---|
| OBJ-1 | <…> | <…> | <valor o «desconocida»> | <valor> | <de dónde sale el dato> |

**Señales de alarma (guardrails):** <métricas que no deben empeorar.>

## 6. Requisitos funcionales

| ID | Requisito (comportamiento observable) | Prioridad | JTBD | Notas / supuestos |
|---|---|---|---|---|
| RF-1 | El sistema permite… | M | JTBD-1 | |

## 7. Requisitos no funcionales

| ID | Categoría | Requisito medible | Prioridad |
|---|---|---|---|
| RNF-1 | Rendimiento percibido | <p. ej. el usuario ve la lista en menos de 1 s con 500 elementos> | M |
| RNF-2 | Accesibilidad | <p. ej. todo se puede hacer solo con teclado; nivel WCAG 2.2 AA> | M |
| RNF-3 | Seguridad / privacidad | <p. ej. nadie ve datos de otro espacio; los datos personales se pueden borrar a petición> | M |
| RNF-4 | Dónde se usa | <p. ej. navegadores de escritorio y móvil actuales> | S |
| RNF-5 | Idioma | <…> | S |

> Los RNF se expresan como lo que el usuario o el negocio percibe y puede medir, nunca como la solución técnica que los consigue.

## 8. Flujos principales

<Recorridos del usuario en pasos numerados, a nivel de producto. Uno por JTBD clave. Sin diseño visual.>

## 9. Restricciones y dependencias

- **Restricciones:** <plazo, tamaño del equipo, legal/normativa, presupuesto. Nunca tecnología: si hay una imposición técnica, vive en el diseño técnico.>
- **Dependencias:** <equipos, proveedores o decisiones de negocio externas.>

## 10. Riesgos

| # | Riesgo | Probabilidad | Impacto | Mitigación |
|---|---|---|---|---|
| R-1 | <…> | A/M/B | A/M/B | <…> |

## 11. Épicas

| Épica | Resultado entregable | RF cubiertos | Prioridad | Estado |
|---|---|---|---|---|
| E1 · <nombre> | <…> | RF-1, RF-2 | M | pendiente |

> Todo RF debe aparecer en exactamente una épica (o justificarse por qué no).

## 12. Preguntas abiertas y supuestos

| ID | Pregunta / supuesto | Bloquea a | Decide | Estado |
|---|---|---|---|---|
| PA-1 | <…> | RF-n / E<n> | <rol> | abierta |

## 13. Glosario

| Término | Definición |
|---|---|
| <término> | <definición única usada en todo el árbol> |

## Historial de cambios

| Fecha | Versión | Cambio | Autor |
|---|---|---|---|
| AAAA-MM-DD | 0.1 | Creación | <rol> |

---

### Checklist de autorrevisión
- [ ] El problema se entiende sin conocer la solución.
- [ ] Cada RF es un comportamiento observable, atómico y con prioridad.
- [ ] Cada RNF es medible.
- [ ] Cada objetivo tiene métrica, meta y forma de medirla.
- [ ] «Fuera de alcance» es explícito.
- [ ] Cero decisiones técnicas (regla de la skill, sección «Prohibido»): pasa la comprobación automática sin coincidencias.
- [ ] Todo RF está asignado a una épica.
- [ ] Todos los `[SUPUESTO]` y preguntas abiertas están en la sección 12.
