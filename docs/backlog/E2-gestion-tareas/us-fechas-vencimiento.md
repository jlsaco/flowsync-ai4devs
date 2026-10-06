# FS-118 · Fecha de vencimiento y tareas vencidas

- **Épica:** E2 «Gestión de tareas»
- **Requisito de origen:** RF-13 de [`flowsync-mvp.md`](../../prd/flowsync-mvp.md)
- **Prioridad:** C (primer candidato a recorte si hay presión de alcance). Dentro del alcance acordado.

## Historia

**Como** miembro del equipo, **quiero** poner, cambiar o quitar una fecha de vencimiento en una tarea y ver marcadas como vencidas las que se pasaron de plazo sin terminar, **para** recordar los plazos y detectar lo atrasado de un vistazo.

## Criterios de aceptación

Etiquetas:
- **PRD** deriva directamente de lo ya escrito en el PRD (se indica el requisito).
- 🔶 **PROPUESTA** la propone el autor, está sin confirmar y necesita revisión.

### A. Poner, cambiar y quitar la fecha

**CA-1 · Poner una fecha** `PRD · RF-13`
- **DADO** una tarea sin fecha de vencimiento
- **CUANDO** le pongo una fecha
- **ENTONCES** la fila de la tarea muestra esa fecha, sin hora
- **Y** la sigue mostrando si recargo la página o entro desde otra sesión.

**CA-2 · Cambiar la fecha** `PRD · RF-13`
- **DADO** una tarea con fecha
- **CUANDO** la cambio por otra
- **ENTONCES** la tarea muestra solo la nueva fecha.

**CA-3 · Quitar la fecha** `PRD · RF-13`
- **DADO** una tarea con fecha
- **CUANDO** la quito
- **ENTONCES** la tarea queda sin fecha y no muestra ninguna.

**CA-4 · La fecha es opcional** `PRD · RF-6, RF-13`
- **DADO** que creo una tarea escribiendo solo el título
- **CUANDO** aparece en la lista
- **ENTONCES** no tiene fecha
- **Y** nunca se marca como vencida por no tenerla.

**CA-5 · Cualquier miembro puede hacerlo** `PRD · RF-4`
- **DADO** cualquier miembro con sesión abierta
- **CUANDO** pone, cambia o quita la fecha de cualquier tarea
- **ENTONCES** puede hacerlo sin ser su responsable y sin pedir permiso.

### B. Cuándo una tarea está vencida

**CA-6 · Camino feliz de «vencida»** `PRD · RF-13`
- **DADO** una tarea que no está «Hecha» y cuya fecha es anterior a hoy
- **CUANDO** veo la lista
- **ENTONCES** esa tarea aparece marcada como vencida.

**CA-7 · El día de la fecha todavía no está vencida** `PRD · RF-13`
- **DADO** una tarea no «Hecha» cuya fecha es hoy
- **CUANDO** veo la lista
- **ENTONCES** no está marcada como vencida
- **Y** empieza a estarlo al día siguiente.

**CA-8 · Terminar y reabrir** `PRD · RF-13, RF-17`
- **DADO** una tarea marcada como vencida
- **CUANDO** la marco «Hecha»
- **ENTONCES** deja de estar marcada como vencida, aunque su fecha siga pasada
- **Y** si después la reabro y su fecha sigue pasada, vuelve a marcarse.
- Una tarea «Hecha» nunca se marca como vencida, tenga la fecha que tenga.

**CA-9 · Dejar de estar vencida al corregir la fecha** `PRD · RF-13`
- **DADO** una tarea marcada como vencida
- **CUANDO** quito su fecha o la cambio por hoy o por un día posterior
- **ENTONCES** deja de estar marcada como vencida en ese momento.

**CA-10 · La marca es solo visual** `PRD · RF-22`
- **DADO** que una tarea pasa a estar vencida
- **CUANDO** nadie mira la lista
- **ENTONCES** no se envía ningún aviso a nadie (ni notificación, ni correo, ni sonido).

**CA-11 · La marca se mantiene con filtros activos** 🔶 **PROPUESTA**
- **DADO** un filtro por estado activo, por ejemplo «En curso»
- **CUANDO** veo la lista filtrada
- **ENTONCES** las tareas vencidas de ese estado siguen marcadas como vencidas.

### C. Lo que ven los demás

**CA-12 · Cambios en vivo** `PRD · RF-19`
- **DADO** otra persona con la lista abierta
- **CUANDO** pongo, cambio o quito una fecha
- **ENTONCES** ve el cambio, y la marca de vencida si corresponde, sin recargar.

**CA-13 · Marca de «cambió desde tu última visita»** `PRD · RF-21`
- **DADO** que otra persona cambia la fecha de una tarea mientras yo no estoy
- **CUANDO** abro la lista
- **ENTONCES** esa tarea lleva la marca de cambio
- **Y** si fui yo quien cambió la fecha, no se marca para mí.

### D. Edge cases y errores

**CA-14 · Poner una fecha que ya pasó** 🔶 **PROPUESTA**
- **DADO** una tarea cualquiera no «Hecha»
- **CUANDO** le pongo una fecha anterior a hoy
- **ENTONCES** se acepta
- **Y** la tarea aparece marcada como vencida al momento.
- *Alternativa a decidir:* rechazarla. Se propone aceptada para poder anotar un plazo ya incumplido.

**CA-15 · Cambio de día con la lista abierta** 🔶 **PROPUESTA**
- **DADO** que tengo la lista abierta y una tarea no «Hecha» con fecha de hoy
- **CUANDO** empieza el día siguiente
- **ENTONCES** la tarea pasa a aparecer como vencida sin que yo recargue.

**CA-16 · Personas en husos horarios distintos** 🔶 **PROPUESTA**
- **DADO** que «hoy» es el día del navegador de quien mira (`[SUPUESTO]` del PRD)
- **CUANDO** dos personas en husos horarios distintos miran la misma tarea cerca de la medianoche
- **ENTONCES** una puede verla como vencida y la otra todavía no
- **Y** esto no se considera un fallo.
- Es consecuencia directa del supuesto y afecta de lleno al equipo de referencia, repartido en 3 husos horarios. Se declara en vez de ocultarlo.

**CA-17 · Fecha no válida** 🔶 **PROPUESTA**
- **DADO** una tarea cualquiera
- **CUANDO** intento guardar algo que no es una fecha real, por ejemplo un 31 de febrero
- **ENTONCES** no se guarda
- **Y** la tarea conserva su fecha anterior
- **Y** se me explica el problema en castellano.

**CA-18 · No se pudo guardar** 🔶 **PROPUESTA**
- **DADO** que pongo, cambio o quito una fecha
- **CUANDO** el cambio no llega a guardarse
- **ENTONCES** la tarea vuelve a mostrar la fecha anterior
- **Y** se me avisa de que no se guardó.

**CA-19 · Dos personas cambian la fecha a la vez** 🔶 **PROPUESTA**
- **DADO** dos personas que cambian la fecha de la misma tarea casi a la vez
- **CUANDO** ambos cambios se guardan
- **ENTONCES** prevalece el último
- **Y** todas las pantallas acaban mostrando la misma fecha, sin aviso de conflicto.
- El PRD solo define esta regla para el estado (RNF-3); aquí se extiende.

**CA-20 · La tarea ya no existe** `PRD · RF-12`
- **DADO** que otra persona acaba de borrar una tarea
- **CUANDO** intento ponerle, cambiarle o quitarle la fecha
- **ENTONCES** se me avisa de que la tarea ya no existe
- **Y** no se crea ni se recupera nada.

## Fuera de esta historia

Recordatorios o avisos de vencimiento (RF-22), fecha con hora (RF-13: la fecha no lleva hora) y vista de calendario (fuera en la sección 4 del PRD).
