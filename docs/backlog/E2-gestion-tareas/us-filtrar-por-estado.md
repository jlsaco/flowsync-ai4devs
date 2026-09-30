# FS-142 · Filtrar las tareas por estado

- **Épica:** E2 «Gestión de tareas»
- **Requisito de origen:** RF-15 de [`flowsync-mvp.md`](../../prd/flowsync-mvp.md)
- **Prioridad:** M. Dentro del alcance acordado.

## Historia

**Como** miembro del equipo, **quiero** filtrar la lista por estado y volver a la vista por defecto, **para** centrarme en lo pendiente.

## Criterios de aceptación

Etiquetas:
- **PRD** deriva directamente de lo ya escrito en el PRD (se indica el requisito).
- **PEDIDO** es un caso solicitado expresamente al definir la historia; el detalle de redacción es del autor.
- 🔶 **PROPUESTA** la propone el autor, está sin confirmar y necesita revisión.

Los estados son los del PRD (`[SUPUESTO]` de RF-7): «Por hacer», «En curso» y «Hecha».

### A. Filtrar y volver

**CA-1 · Camino feliz** `PRD · RF-15`
- **DADO** una lista con tareas en varios estados
- **CUANDO** filtro por «En curso»
- **ENTONCES** solo veo tareas «En curso»
- **Y** se ve con claridad qué filtro está activo.

**CA-2 · Cada estado funciona** `PRD · RF-7, RF-15`
- **DADO** tareas en los tres estados
- **CUANDO** filtro por «Por hacer», por «En curso» o por «Hecha»
- **ENTONCES** en cada caso veo únicamente las tareas de ese estado, ni una más.

**CA-3 · Un solo estado a la vez** `PRD · RF-15`
- **DADO** un filtro activo por un estado
- **CUANDO** elijo otro estado
- **ENTONCES** el nuevo sustituye al anterior
- **Y** no se acumulan.

**CA-4 · Volver a la vista por defecto** `PRD · RF-15, RF-17`
- **DADO** un filtro activo
- **CUANDO** lo quito
- **ENTONCES** veo la vista por defecto: todas las tareas excepto las «Hechas».
- No vuelvo a «todas las tareas» sin más: las «Hechas» siguen ocultas.
- *Depende de RF-17, sin confirmar: sin él, la vista por defecto sería «todas».*

**CA-5 · Las «Hechas» solo se ven filtrando** `PRD · RF-17`
- **DADO** la vista por defecto, donde no aparece ninguna tarea «Hecha»
- **CUANDO** filtro por «Hecha»
- **ENTONCES** veo las tareas terminadas.
- *Depende de RF-17, sin confirmar.*

**CA-6 · El filtro se olvida al recargar** `PRD · RF-15 · [SUPUESTO] del PRD`
- **DADO** un filtro activo
- **CUANDO** recargo la página
- **ENTONCES** vuelvo a la vista por defecto, sin filtro.

**CA-7 · Se combina con el filtro por responsable** `PRD · RF-15, RF-16`
- **DADO** el filtro «mías» activo
- **CUANDO** filtro además por «En curso»
- **ENTONCES** veo solo mis tareas que están «En curso»
- **Y** quitar un filtro no quita el otro.
- *Depende de RF-16, sin confirmar.*

**CA-8 · Se puede hacer con teclado** `PRD · RNF-7`
- **DADO** que solo uso el teclado
- **CUANDO** aplico, cambio o quito el filtro por estado
- **ENTONCES** puedo hacerlo sin ratón.

### B. Resultado vacío frente a error

**CA-9 · Estado válido sin tareas** 🔶 **PROPUESTA**
- **DADO** un estado válido en el que ahora mismo no hay ninguna tarea
- **CUANDO** filtro por él
- **ENTONCES** se me dice de forma explícita que no hay tareas en ese estado
- **Y** eso es distinto de un error.

**CA-10 · Una lista vacía nunca oculta un fallo** 🔶 **PROPUESTA**
- **DADO** que no se pueden cargar las tareas, por ejemplo por pérdida de conexión
- **CUANDO** filtro por un estado
- **ENTONCES** se me avisa del problema
- **Y** no veo un «no hay tareas» que parezca un resultado real.
- Reutiliza el aviso de desconexión de RF-20.

### C. Estado que no existe

**CA-11 · Se avisa del error** `PEDIDO`
- **DADO** que se pide filtrar por un estado que no existe
- **CUANDO** se aplica esa petición
- **ENTONCES** el sistema avisa en castellano de que ese estado no existe
- **Y** indica cuáles son los válidos: «Por hacer», «En curso» y «Hecha»
- **Y** no presenta el resultado como una lista vacía ni como «no hay tareas».
- *Con el PRD actual, la interfaz solo ofrece tres estados fijos y el filtro se olvida al recargar, por lo que este caso solo puede darse si existen filtros guardados o compartidos, o si un estado se retira en el futuro. Hoy ese punto de entrada no existe.*

**CA-12 · Qué se ve tras el aviso** `PEDIDO · detalle 🔶`
- **DADO** el aviso del criterio anterior
- **CUANDO** lo veo
- **ENTONCES** queda claro que no se ha aplicado ningún filtro
- **Y** veo la vista por defecto con el aviso visible
- **Y** puedo elegir un estado válido desde ahí.
- *Alternativa a decidir:* no mostrar ninguna lista hasta elegir un estado válido.

### D. Filtro activo y cambios en vivo

**CA-13 · Otra persona lleva una tarea al estado filtrado** `PRD · RF-19`
- **DADO** el filtro «En curso» y mi lista abierta
- **CUANDO** otra persona crea una tarea o cambia una a «En curso»
- **ENTONCES** aparece en mi lista filtrada sin que yo recargue.

**CA-14 · Otra persona saca una tarea del estado filtrado** `PRD · RF-19`
- **DADO** el filtro «En curso» y una tarea que veo en él
- **CUANDO** otra persona la cambia a otro estado o la borra
- **ENTONCES** desaparece de mi lista filtrada sin que yo recargue.

**CA-15 · Mi propio cambio con filtro activo** 🔶 **PROPUESTA**
- **DADO** el filtro «Por hacer»
- **CUANDO** cambio una tarea a «En curso»
- **ENTONCES** deja de aparecer en mi lista filtrada en ese momento.
- Coincide con lo que ya hace RF-17 al marcar «Hecha». Tiene el mismo riesgo: la fila desaparece, sin deshacer (PA-6 y PA-7 del PRD).
- *Alternativa a decidir:* mantenerla visible hasta la siguiente acción.

## Fuera de esta historia

Por el NO-alcance del PRD: buscar por texto, guardar filtros y ordenar de otra manera. Seleccionar dos estados a la vez no está en el PRD y queda fuera de alcance MVP.
