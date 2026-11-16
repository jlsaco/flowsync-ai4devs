# E<n> · <Nombre de la épica>

- **Estado:** borrador | en revisión | aprobado | en curso | hecha | obsoleta
- **PRD de origen:** [<nombre>](../../prd/<slug>.md)
- **Requisitos cubiertos:** RF-a, RF-b, RNF-c
- **Prioridad:** M | S | C
- **Responsable (decide):** <rol>

## Objetivo

<Qué resultado entrega esta épica al usuario cuando esté completa, en una o dos frases. Debe ser demostrable por sí misma.>

## Valor y JTBD

- **JTBD que atiende:** JTBD-n (del PRD)
- **Por qué ahora:** <dependencia, riesgo o valor que justifica su orden.>

## Alcance

### Dentro
- <Capacidad> (RF-n)

### Fuera
- <Exclusión> — <motivo o épica donde vive>

## Historias de usuario

| ID | Historia | RF | Prioridad | Depende de | Estado |
|---|---|---|---|---|---|
| <PREF>-1 | [<título>](./historias/<PREF>-1-<slug>.md) | RF-a | M | — | pendiente |

> Todo RF de la épica debe estar cubierto por al menos una historia.

## Criterios de aceptación de la épica

Condiciones de alto nivel que, cumplidas, permiten dar la épica por terminada (no sustituyen a los CA de cada historia):

- [ ] <Resultado de extremo a extremo demostrable>
- [ ] <RNF transversal verificado, p. ej. accesibilidad o rendimiento>
- [ ] Todas las historias M en estado «hecha».

## Métricas de éxito

<Qué objetivo (OBJ-n) del PRD mueve y cómo se comprobará tras el lanzamiento.>

## Dependencias y riesgos

- **Dependencias:** <otras épicas o decisiones de producto pendientes.>
- **Riesgos:** <riesgo> — <mitigación>

## Preguntas abiertas y supuestos

| ID | Pregunta / supuesto | Bloquea a | Decide | Estado |
|---|---|---|---|---|
| PA-n | <…> | <historia> | <rol> | abierta |

---

### Checklist de autorrevisión
- [ ] El objetivo es un resultado demostrable, no una lista de tareas.
- [ ] Todos los RF citados existen en el PRD y no contradicen su texto.
- [ ] Cada RF de la épica tiene al menos una historia.
- [ ] Las historias son independientes o sus dependencias están explícitas.
- [ ] «Fuera» indica dónde vive lo excluido.
- [ ] La épica está enlazada desde la tabla de épicas del PRD.
- [ ] Cero decisiones técnicas (regla de la skill, sección «Prohibido»): pasa la comprobación automática sin coincidencias.
