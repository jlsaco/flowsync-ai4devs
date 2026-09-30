# PRD — FlowSync MVP

- **Estado:** borrador para revisión.
- **Fecha:** 2026-09-30
- **Base:** [`alcance-mvp.md`](./alcance-mvp.md). Este PRD lo concreta y no lo sustituye.
- **Nivel:** producto. Sin modelo de datos, endpoints, arquitectura ni diagramas técnicos.
- **Convención:** `[SUPUESTO]` marca lo que se ha decidido aquí sin que nadie lo haya confirmado. Lo que además **cambia o amplía** el alcance acordado lleva `[SUPUESTO · cambia alcance]`. Todo `[SUPUESTO]` debe confirmarse o descartarse antes de construir.
- **Prioridad de los requisitos:** M = imprescindible para el MVP, S = deseable, C = recortable si hay presión de alcance.

## 1. Problema y contexto

Un equipo remoto pequeño no puede ver quién está en qué sin interrumpir a alguien. Hoy lo paga de dos formas:

- **La daily.** La ronda de «¿en qué estás?» ocupa una parte de los 15 minutos. Quien plantea el producto la estima en la mitad; es una estimación, no una medición.
- **El «¿en qué estás?» por chat.** Es el canal por el que se paga el problema, no el problema en sí.

El coste real aparece cuando dos personas trabajan sobre lo mismo sin saberlo. Episodio relatado por quien plantea el producto: dos personas tocaron el mismo módulo la misma semana y se perdieron dos días.

**Contexto.** Es un producto nuevo sobre una base ya existente: hoy solo hay cuentas de usuario (registro, inicio de sesión, perfil y cierre de sesión). No hay tareas, ni espacio compartido, ni pruebas automáticas. Ver «Restricciones».

**Fuera de este problema:** los bloqueos. La daily los conserva.

## 2. Usuarios y jobs-to-be-done

**Usuario:** integrante de un equipo remoto de 3 a 10 personas con roles planos. Todos ven y editan lo mismo. No hay usuario «manager» ni reporte hacia arriba.

**Caso de estudio de referencia:** equipo de 6 personas de un producto SaaS repartido en 3 husos horarios. Es un caso de estudio, **no** un cliente real ni una validación.

| # | Cuando… | Quiero… | Para… |
|---|---|---|---|
| JTBD-1 | voy a elegir qué hago a continuación | ver qué está libre y qué está cogido | no empezar algo que otra persona ya está tocando |
| JTBD-2 | empiezo, paro o termino un trabajo | dejarlo reflejado en dos clics | que el equipo lo sepa sin que yo tenga que contarlo |
| JTBD-3 | llego por la mañana o vuelvo de una reunión | ver qué se ha movido desde que estuve | ponerme al día sin preguntar a nadie |
| JTBD-4 | tengo trabajo por hacer | tener una lista que sea mi cola de trabajo | decidir qué coger sin abrir otra herramienta |
| JTBD-5 | necesito saber cómo va algo | consultarlo yo mismo | no interrumpir a otra persona |

## 3. Propuesta de valor

> Una lista de tareas que se actualiza en dos clics y que todo el equipo ve al instante. Así dejas de preguntar «¿en qué estás?» y de que te lo pregunten.

- **Es donde se hace el trabajo, no donde se cuenta.** Sustituye al gestor de tareas del equipo. No convive con él ni importa sus tareas.
- **Menos rollo que Jira:** crear una tarea y cambiarle el estado en segundos, sin campos obligatorios más allá del título.
- **«Tiempo real» significa frescura, no presencia.** Se ven los cambios de estado de las tareas sin refrescar. El estado es de la tarea, no de la persona.
- **Un resumen que espera, no un aviso que interrumpe.** No hay notificaciones push.
- **Por qué quien escribe el estado lo escribe:** son dos clics sobre la lista que ya usa como cola de trabajo, y a cambio deja de recibir interrupciones.

**Decisión que cambia:** no empezar algo que otra persona ya está tocando y elegir lo siguiente sabiendo qué está libre.

## 4. Alcance / Fuera de alcance

### Dentro

- Cuentas con el registro e inicio de sesión existentes, y un único espacio compartido.
- Crear tareas. Solo el título es obligatorio. Editar y borrar (RF-11, RF-12) es `[SUPUESTO · cambia alcance]`: el alcance acordado no definía el ciclo de vida.
- Responsable opcional. Sin responsable, la tarea está «libre».
- Estado de la tarea, cambiable en dos clics.
- Fecha de vencimiento opcional (recortable).
- Filtro por estado. El filtro por responsable (RF-16) es `[SUPUESTO · cambia alcance]`.
- Actualización en vivo de los cambios de los demás, con aviso visible si se pierde (RF-20, `[SUPUESTO · cambia alcance]`).
- Marca de «cambió desde tu última visita».

### Fuera

Se mantiene la tabla de exclusiones de `alcance-mvp.md`. Resumen:

- Estado derivado de Git, PRs, CI o calendario.
- Notificaciones de cualquier tipo (push, correo, sonido).
- Presencia e indicadores de actividad por persona.
- Chat y comentarios en las tareas.
- Bloqueos como concepto propio.
- Varios equipos, invitaciones, roles y permisos.
- Sprints, estimaciones, épicas, backlog priorizado e informes.
- Prioridad, etiquetas, descripciones, adjuntos.
- Vistas kanban, calendario o línea temporal; búsqueda; orden personalizado.
- Historial de actividad completo o auditoría.
- Importar tareas de otros gestores.
- Edición simultánea de un mismo texto.
- App móvil nativa e integración con Slack.
- Registro controlado por invitación. Ver RF-4 y las decisiones abiertas al final de la sección 8.

## 5. Épicas del MVP

- **E1 «Cuentas y acceso»:** registro, inicio y cierre de sesión, y que solo quien tiene sesión vea y toque las tareas.
- **E2 «Gestión de tareas»:** crear, editar, borrar, asignar, cambiar de estado, fechar (opcional) y filtrar las tareas de la lista compartida.
- **E3 «Actividad del equipo»:** ver los cambios de los demás en vivo y qué se ha movido desde la última visita.

## 6. Requisitos funcionales a nivel producto

Cada requisito indica su épica y su prioridad. «Persona» es quien tiene una cuenta y una sesión abierta.

### E1 — Cuentas y acceso

- **RF-1 (M) Registro.** Una persona puede crear una cuenta con su correo, una contraseña (8 a 32 caracteres) y su confirmación, y opcionalmente su nombre. Si el correo ya existe, se le informa sin crear otra cuenta. *(Ya existe.)*
- **RF-2 (M) Inicio de sesión.** Una persona con cuenta puede iniciar sesión con correo y contraseña; con credenciales erróneas recibe un mensaje de error y no entra. *(Ya existe.)*
- **RF-3 (M) Cierre de sesión.** Una persona puede cerrar su sesión; después de hacerlo no puede ver ni modificar tareas hasta iniciar sesión otra vez. *(Ya existe.)*
- **RF-4 (M) Solo con sesión.** Sin sesión abierta no se puede ver ni modificar ninguna tarea; se redirige al inicio de sesión. Toda persona con cuenta ve y edita las mismas tareas: un único espacio, sin roles. `[SUPUESTO]` El registro sigue abierto y el equipo restringe el acceso por fuera del producto (una instancia por equipo, no expuesta públicamente). Ver anexo, decisión 1. **Condición previa del piloto:** no se lanza con un equipo real hasta que alguien nombrado confirme cómo se restringe el acceso a la instancia; si no se puede, el registro por invitación pasa a ser alcance del MVP.
- **RF-5 (M) Identificación.** Junto a cada tarea con responsable se muestra el nombre de esa persona tal como lo registró; si no lo registró, se muestra su correo. `[SUPUESTO]` Si dos personas tienen el mismo nombre, se distinguen mostrando también el correo.

### E2 — Gestión de tareas

- **RF-6 (M) Crear una tarea.** Una persona puede crear una tarea escribiendo solo un título. El título no puede estar vacío. `[SUPUESTO]` Máximo 200 caracteres. La tarea nace sin responsable y en el primer estado.
- **RF-7 (M) Estados.** Cada tarea tiene exactamente un estado de un conjunto cerrado. `[SUPUESTO]` El conjunto es «Por hacer», «En curso» y «Hecha».
- **RF-8 (M) Cambiar el estado en dos clics.** Desde la lista ya abierta, una persona cambia el estado de cualquier tarea visible en la lista con **como máximo dos clics** y sin abrir otra pantalla, ni rellenar campos, ni confirmar. El nuevo estado se ve de inmediato en su pantalla.
- **RF-9 (M) Responsable.** Una persona puede asignar una tarea a sí misma o a otra persona, cambiarla de responsable y quitárselo. Una tarea sin responsable se muestra como «libre». Cada tarea tiene como mucho un responsable. `[SUPUESTO · cambia alcance]` Asignar a otra persona no exige su aceptación.
- **RF-10 (M) Coger una tarea libre.** `[SUPUESTO · cambia alcance]` Desde la lista, una persona se asigna una tarea «libre» en un clic. No cambia el estado por sí solo, así que empezar una tarea libre son 1 clic para cogerla y hasta 2 para pasarla a «En curso»; los «dos clics» de RF-8 se refieren solo al cambio de estado. Si otra persona la cogió antes, la asignación **no** se pisa: se informa a quien lo intentó de que ya tiene responsable y quién es.
- **RF-11 (S) Editar el título.** `[SUPUESTO · cambia alcance]` Una persona puede cambiar el título de una tarea. Se aplican las reglas de RF-6.
- **RF-12 (S) Borrar una tarea.** `[SUPUESTO · cambia alcance]` Una persona puede borrar una tarea, previa confirmación. Una tarea borrada desaparece para todos. `[SUPUESTO]` No hay papelera ni deshacer. Si alguien edita una tarea que otra persona acaba de borrar, se le avisa de que ya no existe.
- **RF-13 (C) Fecha de vencimiento.** Una persona puede poner, cambiar o quitar una fecha de vencimiento en una tarea. La fecha es opcional. Una tarea no «Hecha» con fecha anterior a hoy se muestra como vencida. La fecha no lleva hora; `[SUPUESTO]` «hoy» es el día del navegador de quien mira. Es el primer candidato a recorte.
- **RF-14 (M) Lista compartida.** Hay una única lista con las tareas de todo el equipo. Cada fila muestra título, estado, responsable (o «libre»), la fecha de vencimiento si existe y, si se incluye RF-18, la antigüedad del estado. `[SUPUESTO · cambia alcance]` El orden es fijo: primero las modificadas más recientemente.
- **RF-15 (M) Filtrar por estado.** Una persona puede filtrar la lista por un estado y volver a la vista por defecto (RF-17). Los filtros de estado y de responsable se combinan (deben cumplirse los dos). `[SUPUESTO]` El filtro elegido se olvida al recargar.
- **RF-16 (M) Filtrar por responsable.** `[SUPUESTO · cambia alcance]` Una persona puede filtrar la lista por «mías», «libres» o por una persona concreta. Sin este filtro no se puede comprobar si alguien ya está en un módulo (decisión 2 del anexo).
- **RF-17 (S) Las «Hechas» no estorban.** `[SUPUESTO · cambia alcance]` La vista por defecto oculta las tareas «Hechas»; siguen accesibles filtrando por ese estado. Reabrir una «Hecha» exige filtrar primero: es una excepción a los dos clics de RF-8 aceptada en esta propuesta. Evita que la lista envejezca (decisión 3 del anexo).
- **RF-18 (S) Antigüedad del estado.** `[SUPUESTO · cambia alcance]` Cada tarea muestra desde cuándo tiene su estado actual, en días naturales («En curso desde hace 9 días»). Es la señal para detectar información vieja, que es el riesgo nº 1. No muestra quién hizo el cambio.

### E3 — Actividad del equipo

- **RF-19 (M) Cambios en vivo.** Cuando otra persona crea, edita, reasigna, cambia de estado o borra una tarea, las demás personas lo ven sin recargar. El cambio se refleja en la lista abierta de los demás.
- **RF-20 (M) Aviso de desconexión.** `[SUPUESTO · cambia alcance]` Si la pantalla deja de recibir cambios en vivo, lo indica de forma visible y permanente hasta que se recupere. Al recuperarse, la lista se pone al día sola. Sin este aviso, la lista podría mostrar información vieja sin que nadie lo sepa.
- **RF-21 (S) Marca «cambió desde tu última visita».** `[SUPUESTO]` «Abrir la lista» es cargar la pantalla de la lista (inicio de sesión o recarga), y la última visita es por persona, no por dispositivo. En la primera visita no se marca nada. Al abrirla, las tareas que **otras personas** han creado, editado, reasignado o cambiado de estado desde la última vez que esta persona abrió la lista llevan una marca. Los cambios que llegan en vivo con la lista ya abierta también se marcan, y todas las marcas desaparecen la siguiente vez que se abra la lista. «Editado» incluye título, responsable, estado y fecha. Un cambio en una tarea «Hecha» oculta (RF-17) no se ve hasta filtrarla. Los cambios propios no se marcan. Las tareas nuevas sí. Las borradas no aparecen. No es un historial: no lista cambios pasados ni quién los hizo.
- **RF-22 (M) Sin notificaciones.** El producto no envía notificaciones de ningún tipo (push, correo, sonido, título de pestaña parpadeante). El aviso de desconexión de RF-20 no cuenta: es un estado de la pantalla, no un aviso sobre el trabajo de otros. Los cambios se ven al mirar la lista.
- **RF-23 (M) Sin presencia.** El producto no muestra si una persona está conectada, ni su última actividad, ni el tiempo dedicado. «Quién está en qué» se deduce **solo** del responsable de cada tarea, que es un dato que la propia gente pone (decisión 7 del anexo).

## 7. Requisitos no funcionales

Los umbrales numéricos son `[SUPUESTO]` y se ajustan tras la primera semana de uso.

- **RNF-1 Frescura.** Un cambio hecho por una persona es visible para el resto de personas con la lista abierta en menos de **5 segundos** en condiciones normales de red. `[SUPUESTO]`
- **RNF-2 Respuesta propia.** El cambio de estado propio se refleja en la pantalla de quien lo hace en menos de **1 segundo**; si el cambio falla, la pantalla vuelve al estado anterior y avisa. `[SUPUESTO]`
- **RNF-3 Simultaneidad.** Si dos personas cambian la misma tarea a la vez, gana el último cambio de estado, y todas las pantallas convergen al mismo estado sin recargar dentro del plazo de RNF-1. Excepción: la asignación de responsable no se pisa (RF-10).
- **RNF-4 Capacidad.** Funciona con hasta **10 personas** activas a la vez y **500 tareas** en la lista sin que RNF-1 y RNF-2 dejen de cumplirse. `[SUPUESTO]`
- **RNF-5 Persistencia.** Un cambio que el sistema ha aceptado (no el reflejo inmediato de RNF-2) no se pierde por cerrar el navegador ni por reiniciar el servicio.
- **RNF-6 Seguridad.** Toda lectura y escritura de tareas exige sesión (RF-4). Cerrar sesión invalida la sesión actual. `[SUPUESTO]` Se acepta, para el MVP, que la sesión no caduque por tiempo, como ocurre hoy.
- **RNF-7 Usabilidad.** Un integrante nuevo cambia el estado de una tarea sin instrucciones previas. La lista es operable con teclado. `[SUPUESTO]` Se verifica con 3 personas de prueba: aprueba si las 3 lo consiguen sin ayuda a la primera.
- **RNF-8 Compatibilidad.** Funciona en las dos últimas versiones estables de Chrome, Firefox, Safari y Edge. La lista se puede consultar y cambiar de estado desde el navegador de un móvil, aunque no haya app nativa. `[SUPUESTO]`
- **RNF-9 Idioma.** Todo texto que ve la persona en la interfaz, incluidos los errores, está en castellano.
- **RNF-10 Privacidad.** El producto no recoge datos de uso de las personas más allá de la última visita de cada persona (RF-21).

## 8. Restricciones

- **Stack actual:** backend AdonisJS 7 y frontend React 19. El MVP se construye sobre ellos.
- **Auth ya existe:** registro, inicio de sesión, perfil y cierre de sesión están hechos y no se rehacen (RF-1 a RF-3). `[SUPUESTO · cambia alcance]` El MVP no añade recuperación de contraseña, verificación de correo ni cuentas por invitación. El «perfil» existente no tiene requisito propio: solo alimenta RF-5.
- **Nada de tareas en esta rama base:** todo el dominio de E2 y E3 se construye desde cero.
- **Sin red de seguridad automática:** no hay pruebas en el backend ni un ejecutor de pruebas en el frontend. Los criterios de aceptación de este PRD deben poder comprobarse a mano y convertirse en pruebas.
- **Un espacio por instancia:** no existe la entidad «equipo». Un equipo = una instancia (RF-4).
- **Sin integraciones externas:** el MVP no lee ni escribe en otros sistemas.
- **Sustituye, no convive:** el equipo deja su gestor actual. Las tareas existentes se vuelven a teclear.

### Decisiones abiertas de `alcance-mvp.md` y cómo las trata este PRD (el «anexo» al que remiten los requisitos)

Ninguna está confirmada por el usuario. Aquí solo se indica el valor por defecto adoptado para poder escribir requisitos testables.

| # | Decisión | Tratamiento en este PRD | Confirmar |
|---|---|---|---|
| 1 | Acceso y validación | RF-4: registro abierto, acceso restringido fuera del producto, una instancia por equipo. Se mide con un equipo real. | Quién despliega y restringe el acceso al piloto. Si no se puede, hay que subir el registro por invitación al alcance. |
| 2 | Ver «quién está en qué» | RF-9, RF-10 y RF-16: asignar a otros y filtrar por responsable. Sin búsqueda. | Confirmar que amplía el alcance. |
| 3 | Ciclo de vida | RF-11, RF-12, RF-17. | Confirmar borrado sin papelera y ocultar «Hechas». |
| 4 | Sustituir al gestor actual | Riesgo de adopción; la métrica «Una sola fuente» lo vigila. No se añaden descripción ni comentarios. | Decidir si el equipo puede trabajar sin descripción. |
| 5 | Tiempo real frente a asíncrono | RF-19 y RNF-1 se mantienen. La marca (RF-21) cubre el uso asíncrono. | Decidir si el «sin refrescar» justifica su coste frente a solo la marca. |
| 6 | Fecha de vencimiento | RF-13 con prioridad C. | Decidir si se saca del MVP. |
| 7 | Estado frente a vigilancia | RF-23 y RF-18: el responsable es un dato puesto por la gente; no se muestra presencia ni quién hizo un cambio. | Confirmar la frontera. |
| 8 | Medición del éxito | Sección 9: umbrales y fuente definidos. | Confirmar umbrales y quién decide que la ronda está cancelada. |

## 9. Métricas de éxito

**Métrica principal.** A una semana de uso real, el equipo cancela la ronda de «¿en qué estás?» de la daily y nadie pide que vuelva.
- Fuente: lo declara el equipo piloto. Se comprueba en el calendario del equipo y preguntando a cada integrante al cierre de la semana.
- Éxito: la ronda queda cancelada los 5 días laborables `[SUPUESTO]` y ninguna persona pide restablecerla. La parte de bloqueos de la daily no cuenta.
- Fracaso: la ronda se mantiene o vuelve.
- Intermedio (la ronda se acorta sin cancelarse): no es éxito; se anota cuánto y se decide con el equipo.

**Requisito para medirla.** Un **equipo real** de 3 a 10 personas, no el caso de estudio. Antes del piloto se mide cuánto dura hoy la ronda de estado (no se da por buena la estimación de la mitad de 15 minutos). Ver anexo, decisión 1.

**Métricas de apoyo.**

| Métrica | Cómo se mide | Umbral |
|---|---|---|
| Frescura del estado (riesgo nº 1) | Una vez por semana se toman hasta 5 tareas «En curso» con responsable al azar y se pregunta a su responsable si el estado es cierto. | ≥ 90 % correctas `[SUPUESTO]` |
| Adopción | Personas activas que cambian al menos un estado cada día laborable, sobre el total del equipo. | ≥ 80 % `[SUPUESTO]` |
| Dos clics | Prueba manual con cada estado posible. | Máximo 2 clics en el 100 % de los cambios |
| Solapes | Casos que el equipo reporta al cierre de la semana de dos personas trabajando en lo mismo sin saberlo. | 0 |
| Una sola fuente | Se confirma que el gestor anterior ya no se actualiza durante la semana. | Sin altas ni cambios en el gestor anterior |

**Señales tempranas de fracaso** `[SUPUESTO]`: más de una tarea «En curso» sin tocar desde hace más de 5 días laborables; personas que piden por chat «¿en qué estás?» durante la semana; el equipo sigue anotando trabajo en el gestor anterior.

